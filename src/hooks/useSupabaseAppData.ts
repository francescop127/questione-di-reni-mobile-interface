import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { AppData, hydrateAppData } from '../data';
import { useSupabase } from './useSupabase';

const APP_STATE_TABLE = 'app_state';
const APP_STATE_ID = 'ecolife_sim_app_data';
const MEDIA_BUCKET = 'regia-media';

type SyncStatus = 'disabled' | 'loading' | 'synced' | 'saving' | 'error';

const cleanFileName = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const explainSupabaseError = (message: string) => {
  if (message.includes("Could not find the table 'public.app_state'")) {
    return "Tabella Supabase mancante: esegui supabase/regia_sync.sql nel SQL Editor.";
  }

  if (message.includes('Bucket not found')) {
    return "Bucket Supabase mancante: esegui supabase/regia_sync.sql per creare regia-media.";
  }

  return message;
};

export const useSupabaseAppData = (
  appData: AppData,
  setAppData: Dispatch<SetStateAction<AppData>>
) => {
  const supabase = useSupabase();
  const [status, setStatus] = useState<SyncStatus>(supabase ? 'loading' : 'disabled');
  const [error, setError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const remoteLoadedRef = useRef(!supabase);
  const applyingRemoteRef = useRef(false);
  const latestDataRef = useRef(appData);
  const saveTimerRef = useRef<number | null>(null);

  useEffect(() => {
    latestDataRef.current = appData;
  }, [appData]);

  useEffect(() => {
    if (!supabase) {
      setStatus('disabled');
      return;
    }

    let cancelled = false;

    const loadRemoteState = async () => {
      setStatus('loading');
      setError(null);

      const { data, error: loadError } = await supabase
        .from(APP_STATE_TABLE)
        .select('data, updated_at')
        .eq('id', APP_STATE_ID)
        .maybeSingle();

      if (cancelled) return;

      if (loadError) {
        setError(explainSupabaseError(loadError.message));
        setStatus('error');
        remoteLoadedRef.current = true;
        return;
      }

      if (data?.data) {
        applyingRemoteRef.current = true;
        setAppData(hydrateAppData(data.data as AppData));
        setLastSyncedAt(data.updated_at || new Date().toISOString());
      } else {
        const { error: seedError } = await supabase
          .from(APP_STATE_TABLE)
          .upsert({
            id: APP_STATE_ID,
            data: hydrateAppData(latestDataRef.current),
            updated_at: new Date().toISOString()
          });

        if (seedError) {
          setError(explainSupabaseError(seedError.message));
          setStatus('error');
          remoteLoadedRef.current = true;
          return;
        }

        setLastSyncedAt(new Date().toISOString());
      }

      remoteLoadedRef.current = true;
      setStatus('synced');
    };

    loadRemoteState();

    const channel = supabase
      .channel('regia-app-state')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: APP_STATE_TABLE,
          filter: `id=eq.${APP_STATE_ID}`
        },
        payload => {
          const nextData = (payload.new as { data?: AppData; updated_at?: string })?.data;
          if (!nextData) return;

          applyingRemoteRef.current = true;
          setAppData(hydrateAppData(nextData));
          setLastSyncedAt((payload.new as { updated_at?: string })?.updated_at || new Date().toISOString());
          setStatus('synced');
          setError(null);
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [supabase, setAppData]);

  useEffect(() => {
    if (!supabase || !remoteLoadedRef.current) return;

    if (applyingRemoteRef.current) {
      applyingRemoteRef.current = false;
      return;
    }

    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    setStatus('saving');

    saveTimerRef.current = window.setTimeout(async () => {
      const now = new Date().toISOString();
      const { error: saveError } = await supabase
        .from(APP_STATE_TABLE)
        .upsert({
          id: APP_STATE_ID,
          data: hydrateAppData(latestDataRef.current),
          updated_at: now
        });

      if (saveError) {
        setError(explainSupabaseError(saveError.message));
        setStatus('error');
        return;
      }

      setError(null);
      setLastSyncedAt(now);
      setStatus('synced');
    }, 650);

    return () => {
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    };
  }, [appData, supabase]);

  const uploadImage = useCallback(
    async (file: File, folder = 'posts') => {
      if (!supabase) {
        throw new Error('Supabase non configurato: aggiungi VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY oppure VITE_SUPABASE_ANON_KEY.');
      }

      const safeName = cleanFileName(file.name) || 'upload.jpg';
      const path = `${folder}/${Date.now()}-${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from(MEDIA_BUCKET)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type || undefined
        });

      if (uploadError) throw new Error(explainSupabaseError(uploadError.message));

      const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
      return data.publicUrl;
    },
    [supabase]
  );

  return {
    enabled: Boolean(supabase),
    status,
    error,
    lastSyncedAt,
    uploadImage
  };
};
