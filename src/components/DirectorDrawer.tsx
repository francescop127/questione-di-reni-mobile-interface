import React, { useState } from 'react';
import { Sliders, X, Sparkles, Phone, MessageSquare, Volume2, VolumeX, RefreshCw, Layers, Edit, UploadCloud } from 'lucide-react';
import { AppData, Post, Contact, Message, INITIAL_DATA, CONTACT_PLACEHOLDER_AVATAR } from '../data';

interface UploadImageControlProps {
  enabled: boolean;
  disabled: boolean;
  loading: boolean;
  label: string;
  loadingLabel: string;
  onFile: (file: File | undefined) => void;
  compact?: boolean;
}

function UploadImageControl({
  enabled,
  disabled,
  loading,
  label,
  loadingLabel,
  onFile,
  compact = false
}: UploadImageControlProps) {
  const isDisabled = disabled || !enabled;

  return (
    <div className={`relative flex items-center justify-center gap-2 w-full rounded-lg border font-black uppercase tracking-wider font-mono transition overflow-hidden ${
      compact ? 'py-1.5 text-[8px]' : 'py-2 text-[9px]'
    } ${
      enabled
        ? 'bg-slate-950 border-slate-800 text-emerald-300 hover:border-emerald-600'
        : 'bg-slate-950 border-slate-850 text-slate-600'
    } ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <UploadCloud className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{!enabled ? 'Configura Supabase per caricare' : loading ? loadingLabel : label}</span>
      <input
        type="file"
        accept="image/*"
        disabled={isDisabled}
        onChange={(e) => {
          onFile(e.target.files?.[0]);
          e.currentTarget.value = '';
        }}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
    </div>
  );
}

interface DirectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  appData: AppData;
  setAppData: React.Dispatch<React.SetStateAction<AppData>>;
  currentTime: string;
  setCurrentTime: (t: string) => void;
  ringerEnabled: boolean;
  setRingerEnabled: (r: boolean) => void;
  phoneOwner: 'Aldo' | 'Anna';
  setPhoneOwner: (owner: 'Aldo' | 'Anna') => void;
  triggerScenePreset: (presetKey: string) => void;
  imagePresets: { label: string; url: string }[];
  standbyActive: boolean;
  setStandbyActive: (b: boolean) => void;
  standbyTimerRunning: boolean;
  setStandbyTimerRunning: (b: boolean) => void;
  standbySecondsLeft: number;
  setStandbySecondsLeft: (n: number) => void;
  standbyTotalSeconds: number;
  setStandbyTotalSeconds: (n: number) => void;
  wakeConfig: {
    senderName: string;
    messagePreview: string;
    timestamp: string;
    voiceDuration: string;
    useVibratingPulse: boolean;
    notificationBehavior: 'lockscreen' | 'inapp';
  };
  setWakeConfig: React.Dispatch<React.SetStateAction<{
    senderName: string;
    messagePreview: string;
    timestamp: string;
    voiceDuration: string;
    useVibratingPulse: boolean;
    notificationBehavior: 'lockscreen' | 'inapp';
  }>>;
  triggerWakeNotification: () => void;
  triggerVoiceMessageReceipt: () => void;
  lockScreenActive: boolean;
  setLockScreenActive: (b: boolean) => void;
  lockScreenWallpaper: string;
  setLockScreenWallpaper: (url: string) => void;
  callTimerRunning: boolean;
  setCallTimerRunning: (b: boolean) => void;
  callSecondsLeft: number;
  setCallSecondsLeft: (n: number) => void;
  callTotalSeconds: number;
  setCallTotalSeconds: (n: number) => void;
  callConfig: {
    callerName: string;
    callerNumber: string;
    callerAvatar: string;
    phoneOwnerTarget: 'Aldo' | 'Anna';
    autoAnswerEnabled: boolean;
    autoAnswerDelay: number;
    delayedStartMode: 'standby' | 'inapp';
  };
  setCallConfig: React.Dispatch<React.SetStateAction<{
    callerName: string;
    callerNumber: string;
    callerAvatar: string;
    phoneOwnerTarget: 'Aldo' | 'Anna';
    autoAnswerEnabled: boolean;
    autoAnswerDelay: number;
    delayedStartMode: 'standby' | 'inapp';
  }>>;
  callState: {
    callerName: string;
    callerNumber: string;
    callerAvatar: string;
    type: 'incoming' | 'outgoing' | 'connected' | null;
    phoneOwnerTarget: 'Aldo' | 'Anna';
    timeElapsed: number;
  };
  setCallState: React.Dispatch<React.SetStateAction<{
    callerName: string;
    callerNumber: string;
    callerAvatar: string;
    type: 'incoming' | 'outgoing' | 'connected' | null;
    phoneOwnerTarget: 'Aldo' | 'Anna';
    timeElapsed: number;
  }>>;
  supabaseSync: {
    enabled: boolean;
    status: 'disabled' | 'loading' | 'synced' | 'saving' | 'error';
    error: string | null;
    lastSyncedAt: string | null;
    uploadImage: (file: File, folder?: string) => Promise<string>;
  };
}

export default function DirectorDrawer({
  isOpen,
  onClose,
  appData,
  setAppData,
  currentTime,
  setCurrentTime,
  ringerEnabled,
  setRingerEnabled,
  phoneOwner,
  setPhoneOwner,
  triggerScenePreset,
  imagePresets,
  standbyActive,
  setStandbyActive,
  standbyTimerRunning,
  setStandbyTimerRunning,
  standbySecondsLeft,
  setStandbySecondsLeft,
  standbyTotalSeconds,
  setStandbyTotalSeconds,
  wakeConfig,
  setWakeConfig,
  triggerWakeNotification,
  triggerVoiceMessageReceipt,
  lockScreenActive,
  setLockScreenActive,
  lockScreenWallpaper,
  setLockScreenWallpaper,
  callTimerRunning,
  setCallTimerRunning,
  callSecondsLeft,
  setCallSecondsLeft,
  callTotalSeconds,
  setCallTotalSeconds,
  callConfig,
  setCallConfig,
  callState,
  setCallState,
  supabaseSync
}: DirectorDrawerProps) {
  const [selectedPostId, setSelectedPostId] = useState('post_flashmob');
  const [activeTab, setActiveTab] = useState<'standby' | 'presets' | 'profile' | 'posts' | 'chats' | 'contacts' | 'media'>('standby');
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  // Fast edits states
  const selectedPost = appData.posts.find(p => p.id === selectedPostId);

  // Profile data edits
  const handleProfileChange = (key: keyof typeof appData.annaProfile, val: any) => {
    setAppData(prev => ({
      ...prev,
      annaProfile: {
        ...prev.annaProfile,
        [key]: val
      }
    }));
  };

  // Post caption/location/event edits
  const handlePostChange = (postId: string, key: keyof Post, val: any) => {
    setAppData(prev => ({
      ...prev,
      posts: prev.posts.map(p => p.id === postId ? { ...p, [key]: val } : p)
    }));
  };

  const handlePostImageUpload = async (file: File | undefined, key: 'image' | 'authorAvatar') => {
    if (!file || !selectedPost) return;

    const fieldId = `${selectedPost.id}-${key}`;
    setUploadingField(fieldId);
    setUploadError(null);
    setUploadNotice(`Caricamento ${file.name}...`);

    try {
      const url = await supabaseSync.uploadImage(file, key === 'authorAvatar' ? 'avatars' : 'posts');
      handlePostChange(selectedPost.id, key, url);
      setUploadNotice(`Upload completato: ${file.name}`);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload non riuscito.');
      setUploadNotice(null);
    } finally {
      setUploadingField(null);
    }
  };

  const handleProfileImageUpload = async (file: File | undefined) => {
    if (!file) return;

    setUploadingField('anna-profile-avatar');
    setUploadError(null);
    setUploadNotice(`Caricamento ${file.name}...`);

    try {
      const url = await supabaseSync.uploadImage(file, 'profiles');
      handleProfileChange('avatar', url);
      setUploadNotice(`Upload completato: ${file.name}`);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload non riuscito.');
      setUploadNotice(null);
    } finally {
      setUploadingField(null);
    }
  };

  const handleMessageImageUpload = async (owner: 'Aldo' | 'Anna', threadId: string, messageId: string, file: File | undefined) => {
    if (!file) return;

    const fieldId = `${threadId}-${messageId}-image`;
    setUploadingField(fieldId);
    setUploadError(null);
    setUploadNotice(`Caricamento ${file.name}...`);

    try {
      const url = await supabaseSync.uploadImage(file, 'messages');
      const listKey = owner === 'Aldo' ? 'chatsAldo' : 'chatsAnna';
      setAppData(prev => ({
        ...prev,
        [listKey]: prev[listKey].map(t => t.id === threadId ? {
          ...t,
          messages: t.messages.map(msg => msg.id === messageId ? { ...msg, image: url } : msg)
        } : t)
      }));
      setUploadNotice(`Upload completato: ${file.name}`);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload non riuscito.');
      setUploadNotice(null);
    } finally {
      setUploadingField(null);
    }
  };

  const handleNewspaperImageUpload = async (file: File | undefined) => {
    if (!file) return;

    setUploadingField('newspaper-main-image');
    setUploadError(null);
    setUploadNotice(`Caricamento ${file.name}...`);

    try {
      const url = await supabaseSync.uploadImage(file, 'newspaper');
      handleNewspaperChange('mainImage', url);
      setUploadNotice(`Upload completato: ${file.name}`);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload non riuscito.');
      setUploadNotice(null);
    } finally {
      setUploadingField(null);
    }
  };

  const handleContactAvatarUpload = async (owner: 'Aldo' | 'Anna', contactId: string, file: File | undefined) => {
    if (!file) return;

    const fieldId = `${owner}-${contactId}-avatar`;
    setUploadingField(fieldId);
    setUploadError(null);
    setUploadNotice(`Caricamento ${file.name}...`);

    try {
      const url = await supabaseSync.uploadImage(file, 'contacts');
      const listKey = owner === 'Aldo' ? 'aldoContacts' : 'annaContacts';
      setAppData(prev => ({
        ...prev,
        [listKey]: (prev[listKey] as Contact[]).map(c => c.id === contactId ? { ...c, avatar: url } : c)
      }));
      setUploadNotice(`Upload completato: ${file.name}`);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload non riuscito.');
      setUploadNotice(null);
    } finally {
      setUploadingField(null);
    }
  };

  // Contacts edits
  const handleContactChange = (owner: 'Aldo' | 'Anna', contactId: string, name: string, phone: string) => {
    const listKey = owner === 'Aldo' ? 'aldoContacts' : 'annaContacts';
    setAppData(prev => ({
      ...prev,
      [listKey]: (prev[listKey] as Contact[]).map(c => 
        c.id === contactId ? { ...c, name, phone } : c
      )
    }));
  };

  // Chats message text override on the fly
  const handleMessageChange = (owner: 'Aldo' | 'Anna', threadId: string, messageId: string, val: string) => {
    const listKey = owner === 'Aldo' ? 'chatsAldo' : 'chatsAnna';
    setAppData(prev => ({
      ...prev,
      [listKey]: prev[listKey].map(thread => {
        if (thread.id === threadId) {
          return {
            ...thread,
            messages: thread.messages.map(msg => msg.id === messageId ? { ...msg, text: val } : msg)
          };
        }
        return thread;
      })
    }));
  };

  // Newspaper text edit
  const handleNewspaperChange = (key: keyof typeof appData.newspaper, val: any) => {
    setAppData(prev => ({
      ...prev,
      newspaper: {
        ...prev.newspaper,
        [key]: val
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex select-none font-sans text-xs">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer" 
      />

      {/* Slideout right panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-[480px] bg-slate-950 text-slate-100 flex flex-col justify-between shadow-2xl overflow-hidden animate-slide-in">
        
        {/* Panel Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center shrink-0">
          <div>
            <div className="flex items-center gap-2 text-emerald-450">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <h3 className="font-extrabold uppercase tracking-tight text-white text-sm">PANNELLO DI REGIA CINEMATOGRAFICA</h3>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-zinc-400 block font-mono">ECO LIFE DISPOSITIVO • COD: REM-PRO-026</span>
              <span className={`text-[8px] font-black uppercase font-mono px-1.5 py-0.5 rounded border ${
                supabaseSync.status === 'synced'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : supabaseSync.status === 'saving' || supabaseSync.status === 'loading'
                    ? 'bg-amber-950 text-amber-300 border-amber-800'
                    : supabaseSync.status === 'error'
                      ? 'bg-red-950 text-red-300 border-red-800'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}>
                {supabaseSync.status === 'disabled'
                  ? 'Locale'
                  : supabaseSync.status === 'loading'
                    ? 'Carico cloud'
                    : supabaseSync.status === 'saving'
                      ? 'Salvo cloud'
                      : supabaseSync.status === 'error'
                        ? 'Errore cloud'
                        : 'Cloud sync'}
              </span>
            </div>
            {(uploadingField || uploadNotice || supabaseSync.error || uploadError) && (
              <div className={`mt-1 max-w-[380px] rounded border px-2 py-1 text-[9px] font-mono ${
                uploadError || supabaseSync.error
                  ? 'bg-red-950/70 border-red-800 text-red-200'
                  : uploadingField
                    ? 'bg-amber-950/70 border-amber-800 text-amber-200'
                    : 'bg-emerald-950/70 border-emerald-800 text-emerald-200'
              }`}>
                <span className="block truncate">
                  {uploadError || supabaseSync.error || uploadNotice || 'Caricamento in corso...'}
                </span>
              </div>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Navigation Tabs for Edits */}
        <div className="flex bg-slate-900 border-b border-slate-850 overflow-x-auto no-scrollbar shrink-0 px-2 font-mono text-[9px] uppercase font-bold text-slate-400">
          {[
            { id: 'standby', label: '📟 Standby Scena' },
            { id: 'presets', label: '⚡ Preset' },
            { id: 'profile', label: '👤 Dati Anna' },
            { id: 'posts', label: '🖼️ Social Post' },
            { id: 'chats', label: '💬 Chat Dial' },
            { id: 'contacts', label: '📱 Rubrica' },
            { id: 'media', label: '📰 Giornale / Var' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 border-b-2 text-center shrink-0 transition ${
                activeTab === tab.id 
                  ? 'border-emerald-550 text-white font-extrabold bg-slate-850' 
                  : 'border-transparent hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-5 no-scrollbar bg-slate-950 text-slate-300">

          {/* TAB: STANDBY / SVEGLIA SCHERMO DI ALDO */}
          {activeTab === 'standby' && (
            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-[9px] font-black uppercase text-emerald-400 tracking-wider block font-mono">📟 SCENA VOCALE DI ALDO (SVEGLIA SCHERMO)</span>
                <p className="text-[10px] text-slate-400 leading-normal font-sans">
                  Configura e gestisci la sequenza della sveglia del telefono con notifica d\'arrivo per la scena del messaggio vocale inviato da Anna ad Aldo.
                </p>

                {/* Status indicator */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-850 flex flex-col justify-between">
                    <span className="text-[9px] font-mono uppercase text-slate-400">Standby Schermo (Nero):</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${standbyActive ? 'bg-red-500 animate-pulse' : 'bg-zinc-650 bg-zinc-600'}`} />
                      <span className="text-[10px] font-mono uppercase font-black text-white">
                        {standbyActive ? 'ATTIVO (NERO)' : 'SPENTO'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-850 flex flex-col justify-between">
                    <span className="text-[9px] font-mono uppercase text-slate-400">Schermata di Blocco:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${lockScreenActive ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-650 bg-zinc-600'}`} />
                      <span className="text-[10px] font-mono uppercase font-black text-white">
                        {lockScreenActive ? 'BLOCCATO' : 'SBLOCCATO'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary AVVIA Button in full contrast red/gold to fulfill exact user specifications */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (standbyActive) {
                        // If already standby, force wake to lock screen!
                        setStandbyActive(false);
                        setStandbyTimerRunning(false);
                        triggerWakeNotification();
                      } else {
                        if (wakeConfig.notificationBehavior === 'inapp') {
                          triggerVoiceMessageReceipt();
                        } else {
                          // Start the process: Standby active + start timer
                          setStandbySecondsLeft(standbyTotalSeconds);
                          setStandbyActive(true);
                          setStandbyTimerRunning(true);
                        }
                      }
                    }}
                    className={`w-full p-4 rounded-xl font-bold font-mono text-xs uppercase tracking-wider text-center transition flex flex-col items-center justify-center gap-1 border cursor-pointer ${
                      standbyTimerRunning
                        ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-500 animate-pulse shadow-md'
                        : 'bg-red-600 hover:bg-red-700 text-white border-red-500 shadow-lg shadow-red-950/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🚀</span>
                      <span className="font-extrabold tracking-widest text-[11px]">
                        {standbyTimerRunning ? `RILASCIO IN CORSO... (${standbySecondsLeft}s)` : wakeConfig.notificationBehavior === 'inapp' ? 'AVVIA NOTIFICA IN-APP' : 'AVVIA PROCESSO (STANDBY + SVEGLIA)'}
                      </span>
                    </div>
                    <span className="text-[9px] opacity-75 font-normal tracking-normal lowercase italic font-sans block mt-0.5">
                      {standbyTimerRunning ? 'tocca lo schermo nero nel mockup per risveglio immediato' : wakeConfig.notificationBehavior === 'inapp' ? 'mostra subito il banner senza passare dallo schermo nero' : `metti in nero per ${standbyTotalSeconds}s poi sblocca con notifica vocale`}
                    </span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    triggerVoiceMessageReceipt();
                    onClose();
                  }}
                  className="w-full p-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 border border-emerald-500 text-white font-black font-mono text-[11px] uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md shadow-emerald-950/30 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Avvia ricezione messaggio audio</span>
                </button>

                {/* Controls Area */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      if (standbyActive) {
                        setStandbyActive(false);
                        setStandbyTimerRunning(false);
                      } else {
                        setStandbyActive(true);
                        setStandbyTimerRunning(false);
                      }
                    }}
                    className={`p-2.5 rounded-lg font-bold text-center transition flex flex-col items-center justify-center gap-1 ${
                      standbyActive 
                        ? 'bg-neutral-800 hover:bg-neutral-750 text-white border border-neutral-700' 
                        : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border border-slate-800'
                    }`}
                  >
                    <span className="text-xs">📟</span>
                    <span className="text-[9px] uppercase font-mono">{standbyActive ? 'Disattiva Standby' : 'Metti solo Standby'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setLockScreenActive(!lockScreenActive);
                    }}
                    className={`p-2.5 rounded-lg font-bold text-center transition flex flex-col items-center justify-center gap-1 ${
                      lockScreenActive
                        ? 'bg-emerald-950/60 hover:bg-emerald-900/50 text-emerald-400 border border-emerald-900/60'
                        : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border border-slate-800'
                    }`}
                  >
                    <span className="text-xs">{lockScreenActive ? '🔓' : '🔒'}</span>
                    <span className="text-[9px] uppercase font-mono">
                      {lockScreenActive ? 'Sblocca Temp' : 'Forza Scherm. Blocco'}
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setStandbyActive(false);
                      setStandbyTimerRunning(false);
                      triggerWakeNotification();
                    }}
                    className="p-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-center transition flex flex-col items-center justify-center gap-1 border border-emerald-800 cursor-pointer"
                  >
                    <span className="text-xs">⚡</span>
                    <span className="text-[9px] uppercase font-mono">Sveglia + Notifica Ora</span>
                  </button>

                  <button
                    onClick={() => {
                      setStandbyActive(false);
                      setStandbyTimerRunning(false);
                      setLockScreenActive(false);
                    }}
                    className="p-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-350 font-bold text-center transition flex flex-col items-center justify-center gap-1 border border-zinc-700"
                  >
                    <span className="text-xs">🧹</span>
                    <span className="text-[9px] uppercase font-mono">Reset Generale</span>
                  </button>
                </div>
              </div>

              {/* BACKEND EDITOR PER MODIFICARE LO SFONDO DI DEFAULT */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase text-pink-400 tracking-wider block font-mono">🖼️ BACKEND WALLPAPER (SFONDO BLOCCO)</span>
                  <span className="text-[8px] font-mono text-slate-500 uppercase">scena aldo</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal font-sans">
                  Scegli uno sfondo cinematografico ad alta definizione per la schermata di blocco di Aldo, oppure incolla un URL web personalizzato.
                </p>

                {/* Sfondo presets collection */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {[
                    {
                      label: "Foresta",
                      url: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1000",
                      preview: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=150"
                    },
                    {
                      label: "Alba",
                      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000",
                      preview: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=150"
                    },
                    {
                      label: "Cosmo",
                      url: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=1000",
                      preview: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=150"
                    },
                    {
                      label: "Monocromo",
                      url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000",
                      preview: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=150"
                    }
                  ].map((bg, idx) => {
                    const isSelected = lockScreenWallpaper === bg.url;
                    return (
                      <button
                        key={idx}
                        onClick={() => setLockScreenWallpaper(bg.url)}
                        className={`group relative aspect-video rounded-md overflow-hidden border transition text-left cursor-pointer ${
                          isSelected ? 'border-pink-500 ring-2 ring-pink-500/30' : 'border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <img 
                          src={bg.preview} 
                          alt={bg.label} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end p-1">
                          <span className="text-[8px] font-bold text-white uppercase font-mono tracking-tighter truncate">{bg.label}</span>
                        </div>
                        {isSelected && (
                          <span className="absolute top-0.5 right-0.5 bg-pink-550 bg-pink-600 rounded-full w-2.5 h-2.5 flex items-center justify-center text-[6px] text-white font-extrabold">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Sfondo URL input */}
                <div className="space-y-1">
                  <label className="text-[9px] text-zinc-400 block font-mono uppercase">O incolla URL sfondo personalizzato:</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={lockScreenWallpaper}
                      onChange={(e) => setLockScreenWallpaper(e.target.value)}
                      placeholder="Incolla l'indirizzo dell'immagine..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-[10px] focus:outline-hidden focus:border-pink-500"
                    />
                    {lockScreenWallpaper && (
                      <button 
                        onClick={() => {
                          setLockScreenWallpaper("https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1000");
                        }}
                        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg text-[10px] font-mono border border-slate-750"
                        title="Ripristina Sfondo Default"
                      >
                        Reset Sfondo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Notification Configuration form */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider block font-mono">⚙️ PARAMETRI DI NOTIFICA</span>
                
                {/* Delay Select */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 block font-mono uppercase">Ritardo Timer (secondi prima del risveglio):</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={standbyTotalSeconds}
                    onChange={(e) => {
                      const v = parseInt(e.target.value) || 10;
                      setStandbyTotalSeconds(v);
                      setStandbySecondsLeft(v);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-xs focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                {/* Sender Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 block font-mono uppercase">Nome Mittente (Sender):</label>
                  <input
                    type="text"
                    value={wakeConfig.senderName}
                    onChange={(e) => setWakeConfig(prev => ({ ...prev, senderName: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-semibold text-xs focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                {/* Preview text */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 block font-mono uppercase">Testo Anteprima Notifica:</label>
                  <input
                    type="text"
                    value={wakeConfig.messagePreview}
                    onChange={(e) => setWakeConfig(prev => ({ ...prev, messagePreview: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-semibold text-xs focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                {/* Timestamp custom text */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 block font-mono uppercase">Orario Notifica:</label>
                    <input
                      type="text"
                      value={wakeConfig.timestamp}
                      onChange={(e) => setWakeConfig(prev => ({ ...prev, timestamp: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-semibold text-xs focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 block font-mono uppercase">Durata Vocale:</label>
                    <input
                      type="text"
                      value={wakeConfig.voiceDuration}
                      onChange={(e) => setWakeConfig(prev => ({ ...prev, voiceDuration: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-semibold text-xs focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Vibration pulse state switcher */}
                <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-850 mt-1">
                  <div>
                    <span className="text-[10px] font-bold text-white block uppercase font-mono">Effetto Vibrazione Visiva</span>
                    <span className="text-[9px] text-zinc-400 font-sans block">Aggiunge un impulso oscillante per focalizzare l'attore</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={wakeConfig.useVibratingPulse}
                    onChange={(e) => setWakeConfig(prev => ({ ...prev, useVibratingPulse: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded bg-slate-900 border-slate-800 cursor-pointer"
                  />
                </div>

                {/* Comportamento Notifica (Blocco o In-App) */}
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 mt-1 space-y-2 text-left">
                  <span className="text-[10px] font-bold text-white block uppercase font-mono">Modalità Notifica Vocale</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setWakeConfig(prev => ({ ...prev, notificationBehavior: 'lockscreen' }))}
                      className={`p-2 rounded font-mono text-[9px] uppercase font-bold text-center border cursor-pointer transition ${
                        wakeConfig.notificationBehavior === 'lockscreen'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-500'
                          : 'bg-slate-900 text-zinc-400 border-slate-850 hover:text-white'
                      }`}
                    >
                      🔒 Schermo Bloccato
                    </button>
                    <button
                      type="button"
                      onClick={() => setWakeConfig(prev => ({ ...prev, notificationBehavior: 'inapp' }))}
                      className={`p-2 rounded font-mono text-[9px] uppercase font-bold text-center border cursor-pointer transition ${
                        wakeConfig.notificationBehavior === 'inapp'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-500'
                          : 'bg-slate-900 text-zinc-400 border-slate-850 hover:text-white'
                      }`}
                    >
                      📱 In-App Attiva
                    </button>
                  </div>
                  <span className="text-[8.5px] text-zinc-500 font-sans block leading-tight">
                    Scegli se forzare lo schermo bloccato del cellulare o lasciarlo sbloccato mostrando un banner a comparsa.
                  </span>
                </div>
              </div>

              {/* AUTOMAZIONE CHIAMATE IN ARRIVO (TIMED) */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase text-cyan-400 tracking-wider block font-mono">📞 AUTOMAZIONE CHIAMATE SUL SET</span>
                  <span className="text-[8px] font-mono text-zinc-500 uppercase">scena timer</span>
                </div>
                <p className="text-[10px] text-zinc-400 leading-normal font-sans">
                  Gestisci il telefono facendolo squillare e poi <strong>rispondere automaticamente</strong> dopo tot secondi, programmando un conto alla rovescia preventivo.
                </p>

                {/* Status indicator / Live countdown feedback */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-850 space-y-2">
                  <div className="flex justify-between items-center text-[9px] font-mono uppercase text-slate-400">
                    <span>Stato Timer Chiamata:</span>
                    <span className="font-bold text-[9px] text-slate-350">LIVE</span>
                  </div>
                  
                  {callTimerRunning ? (
                    <div className="flex items-center gap-2 text-rose-400 font-mono text-[11px] font-semibold animate-pulse bg-rose-950/40 p-2 rounded-md border border-rose-900/40">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      <span>CHIAMATA PARTE IN {callSecondsLeft} SECONDI!</span>
                    </div>
                  ) : callState.type === 'incoming' ? (
                    <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] font-semibold animate-pulse bg-amber-950/40 p-2 rounded-md border border-amber-900/40">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      <span>SQUILLO DI {callState.callerName.toUpperCase()}! Auto-risposta in {callConfig.autoAnswerEnabled ? `${callConfig.autoAnswerDelay} secondi` : 'Disattivata'}...</span>
                    </div>
                  ) : callState.type === 'connected' ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] font-semibold bg-emerald-950/40 p-2 rounded-md border border-emerald-900/40">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>CHIAMATA CONNESSA SUL CELLULARE (CONVERSAZIONE IN CORSO: {Math.floor(callState.timeElapsed / 60)}:{(callState.timeElapsed % 60).toString().padStart(2, '0')})</span>
                    </div>
                  ) : (
                    <div className="text-[10px] text-slate-500 font-mono italic">
                      Nessun timer attivo. Pronto per l'avvio.
                    </div>
                  )}
                </div>

                {/* Pre-Delay and Auto Answer Delay Parameters */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5 bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                    <label className="text-[9px] text-zinc-400 block font-mono uppercase font-black text-left">Pre-ritardo Chiamata (s):</label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={callTotalSeconds}
                      onChange={(e) => {
                        const v = parseInt(e.target.value) || 5;
                        setCallTotalSeconds(v);
                        setCallSecondsLeft(v);
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-white font-mono text-xs focus:outline-hidden"
                    />
                    <span className="text-[8px] text-slate-500 font-sans block leading-tight text-left">Secondi prima che inizi a squillare</span>
                  </div>

                  <div className="space-y-1.5 bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                    <label className="text-[9px] text-zinc-400 block font-mono uppercase font-black text-left">Risposta Automatica (s):</label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={callConfig.autoAnswerDelay}
                      onChange={(e) => {
                        const v = parseInt(e.target.value) || 5;
                        setCallConfig(prev => ({ ...prev, autoAnswerDelay: v }));
                      }}
                      disabled={!callConfig.autoAnswerEnabled}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-white font-mono text-xs focus:outline-hidden disabled:opacity-40"
                    />
                    <div className="flex items-center gap-1.5 mt-1 text-left">
                      <input
                        type="checkbox"
                        id="autoAnswerEnabledCheck"
                        checked={callConfig.autoAnswerEnabled}
                        onChange={(e) => setCallConfig(prev => ({ ...prev, autoAnswerEnabled: e.target.checked }))}
                        className="w-3.5 h-3.5 text-emerald-600 rounded bg-slate-900 border-slate-800 cursor-pointer"
                      />
                      <label htmlFor="autoAnswerEnabledCheck" className="text-[8px] text-slate-350 font-bold uppercase select-none cursor-pointer">Attiva Risposta</label>
                    </div>
                  </div>
                </div>

                {/* Delayed call visual behavior */}
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 space-y-2 text-left">
                  <span className="text-[9px] text-zinc-400 block font-mono uppercase font-black">Durante il pre-ritardo:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCallConfig(prev => ({ ...prev, delayedStartMode: 'standby' }))}
                      className={`p-2 rounded font-mono text-[9px] uppercase font-bold text-center border cursor-pointer transition ${
                        callConfig.delayedStartMode === 'standby'
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                          : 'bg-slate-900 text-zinc-400 border-slate-850 hover:text-white'
                      }`}
                    >
                      Nero Standby
                    </button>
                    <button
                      type="button"
                      onClick={() => setCallConfig(prev => ({ ...prev, delayedStartMode: 'inapp' }))}
                      className={`p-2 rounded font-mono text-[9px] uppercase font-bold text-center border cursor-pointer transition ${
                        callConfig.delayedStartMode === 'inapp'
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                          : 'bg-slate-900 text-zinc-400 border-slate-850 hover:text-white'
                      }`}
                    >
                      App Visibile
                    </button>
                  </div>
                  <span className="text-[8px] text-slate-500 font-sans block leading-tight">
                    Scegli se nascondere tutto con schermo nero o far arrivare la chiamata mentre il telefono è in uso.
                  </span>
                </div>

                {/* Target phone and Presets selectors */}
                <div className="space-y-2 bg-slate-950 p-3 rounded-lg border border-slate-850">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Configura Identità & Telefono:</span>
                    <span className="text-[8px] text-emerald-400 font-mono font-black">PRESETS RAPIDI</span>
                  </div>

                  {/* Fast selection caller buttons */}
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      {
                        label: "Anna chiama Aldo",
                        name: "Anna Calligaris",
                        number: "+39 347 129 8834",
                        avatar: "/img/Foto Anna (Ronchi)/chiamata.jpeg",
                        target: "Aldo" as const
                      },
                      {
                        label: "Conte Negroni chiama Anna",
                        name: "Conte Negroni",
                        number: "+39 328 110 4492",
                        avatar: CONTACT_PLACEHOLDER_AVATAR,
                        target: "Anna" as const
                      }
                    ].map((item, keyIdx) => {
                      const isMatch = callConfig.callerName === item.name && callConfig.phoneOwnerTarget === item.target;
                      return (
                        <button
                          key={keyIdx}
                          onClick={() => {
                            setCallConfig(prev => ({
                              ...prev,
                              callerName: item.name,
                              callerNumber: item.number,
                              callerAvatar: item.avatar,
                              phoneOwnerTarget: item.target
                            }));
                          }}
                          className={`py-1.5 px-2 text-[8.5px] rounded border font-mono font-bold uppercase tracking-tighter truncate cursor-pointer ${
                            isMatch
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-500 ring-1 ring-emerald-500/20'
                              : 'bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-350 border-slate-800'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Mini Form fields for custom dialers */}
                  <div className="space-y-1.5 pt-1 border-t border-slate-900 text-left">
                    <div className="space-y-0.5">
                      <span className="text-[8px] text-zinc-500 uppercase font-mono block">Nome Chiamante:</span>
                      <input
                        type="text"
                        value={callConfig.callerName}
                        onChange={(e) => setCallConfig(prev => ({ ...prev, callerName: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-white text-[9.5px] font-bold focus:outline-hidden"
                      />
                    </div>

                    <div className="flex justify-between items-center pt-1.5">
                      <span className="text-[8px] text-zinc-500 uppercase font-mono block">Telefono che Riceve:</span>
                      <div className="flex gap-1.5">
                        {(['Aldo', 'Anna'] as const).map(owner => (
                          <button
                            key={owner}
                            onClick={() => setCallConfig(prev => ({ ...prev, phoneOwnerTarget: owner }))}
                            className={`px-3 py-1 rounded text-[9px] font-mono font-bold uppercase transition cursor-pointer ${
                              callConfig.phoneOwnerTarget === owner
                                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-black'
                                : 'bg-slate-900 hover:bg-slate-850 text-slate-400 border border-slate-850'
                            }`}
                          >
                            CEL {owner.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call Timer action triggers */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      if (callTimerRunning) {
                        setCallTimerRunning(false);
                      } else {
                        setCallSecondsLeft(callTotalSeconds);
                        setLockScreenActive(false);
                        setStandbyTimerRunning(false);
                        setStandbyActive(callConfig.delayedStartMode === 'standby');
                        setCallTimerRunning(true);
                      }
                    }}
                    className={`w-full p-3 rounded-lg font-bold font-mono text-xs uppercase tracking-wider text-center transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                      callTimerRunning
                        ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-500 animate-pulse shadow-md'
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-500 shadow-md'
                    }`}
                  >
                    <span>⏱️</span>
                    <span>
                      {callTimerRunning ? `ANNULLA CONTO ROVESCIA (${callSecondsLeft}s)` : 'AVVIA CON TIMER DI RITARDO'}
                    </span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setCallTimerRunning(false);
                        setStandbyActive(false);
                        setStandbyTimerRunning(false);
                        setLockScreenActive(false);
                        setPhoneOwner(callConfig.phoneOwnerTarget);
                        setCallState({
                          callerName: callConfig.callerName,
                          callerNumber: callConfig.callerNumber,
                          callerAvatar: callConfig.callerAvatar,
                          type: 'incoming',
                          phoneOwnerTarget: callConfig.phoneOwnerTarget,
                          timeElapsed: 0
                        });
                      }}
                      className="p-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 border border-emerald-600 text-white font-bold text-center transition flex flex-col items-center justify-center gap-1 leading-none text-[9.5px] uppercase font-mono cursor-pointer"
                    >
                      <span>📞 AVVIA ORA</span>
                    </button>

                    <button
                      onClick={() => {
                        setCallTimerRunning(false);
                        setCallState(cs => ({ ...cs, type: null }));
                      }}
                      className="p-2.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-900 text-red-100 font-bold text-center transition flex flex-col items-center justify-center gap-1 leading-none text-[9.5px] uppercase font-mono cursor-pointer"
                    >
                      <span>❌ DISCONNETTI</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PRESETS & CONFIGS */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              {/* Scene Shortcuts Grid */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-[9px] font-black uppercase text-emerald-400 tracking-wider block font-mono">🎬 ACCELERATORI DI RIPRESA PER ATTORI & CREW</span>
                <p className="text-[10px] text-slate-400 leading-normal font-sans">
                  Attiva istantaneamente le configurazioni previste dal copione cinematografico:
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'scena_aldo_ricerca', label: '1. Aldo cerca Anna' },
                    { key: 'scena_profilo_anna', label: '2. Profilo di Anna' },
                    { key: 'scena_post_flashmob', label: '3. Volantino Piazza Celli' },
                    { key: 'scena_rubrica_aldo', label: '4. Rubrica di Aldo' },
                    { key: 'scena_rubrica_anna', label: '5. Rubrica di Anna' },
                    { key: 'scena_chat_messaggi', label: '6. Chat con Selfie Aldo' },
                    { key: 'scena_chat_selfie_ingrandito', label: '7. Zoom Selfie Lightbox' },
                    { key: 'scena_riproduci_vocale', label: '8. Avvia Vocale Anna' },
                    { key: 'scena_chiama_aldo_da_anna', label: '9. Inc. Anna su Aldo' },
                    { key: 'scena_chiama_anna_da_aldo', label: '10. Inc. Aldo su Anna' }
                  ].map(p => (
                    <button
                      key={p.key}
                      onClick={() => {
                        triggerScenePreset(p.key);
                        onClose();
                      }}
                      className="py-2 px-2.5 bg-slate-950 hover:bg-emerald-800/90 border border-slate-800 hover:border-emerald-500 rounded-lg text-left text-[11px] hover:text-white transition leading-snug font-bold font-mono"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800/60 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.setItem('ecolife_sim_app_data', JSON.stringify(INITIAL_DATA));
                      setAppData(INITIAL_DATA);
                    }}
                    className="w-full py-2 px-3 bg-red-950/60 hover:bg-rose-950 text-[10px] font-black uppercase tracking-wider text-rose-300 hover:text-white rounded-lg border border-red-900/60 hover:border-rose-700/80 transition font-mono cursor-pointer"
                  >
                    🔄 RIPRISTINA POST & CONTATTI PREDEFINITI (AZZERA CACHE)
                  </button>
                </div>
              </div>

              {/* device configuration options */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-[9px] font-black uppercase text-pink-400 tracking-wider block font-mono font-sans font-black">🕹️ CONFIGURATION DISPOSITIVO ATTIVO</span>
                
                <div className="grid grid-cols-2 gap-2 text-center">
                  <button
                    onClick={() => setPhoneOwner('Aldo')}
                    className={`py-2 px-3 rounded-lg transition font-bold font-mono ${
                      phoneOwner === 'Aldo' 
                        ? 'bg-emerald-600 text-white font-black' 
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    🔍 TELEFONO DI ALDO
                  </button>
                  <button
                    onClick={() => setPhoneOwner('Anna')}
                    className={`py-2 px-3 rounded-lg transition font-bold font-mono ${
                      phoneOwner === 'Anna' 
                        ? 'bg-emerald-605 text-white font-black' 
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    🚴‍♀️ TELEFONO DI ANNA
                  </button>
                </div>
              </div>

              {/* Time Sync */}
              <div className="p-4 bg-slate-900 rounded-xl space-y-3.5 border border-slate-800">
                <span className="text-[9px] font-black uppercase text-emerald-400 tracking-wider block font-mono">🕒 SINCRONIZZAZIONE ORA DI SCENA</span>
                <div className="grid grid-cols-2 gap-3 items-center">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 block uppercase font-bold">Ora Telefono</label>
                    <input 
                      type="text" 
                      value={currentTime} 
                      onChange={(e) => setCurrentTime(e.target.value)}
                      placeholder="es. 15:10"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs font-mono text-white text-center"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 block uppercase font-bold">Suoneria Audio</label>
                    <button 
                      onClick={() => setRingerEnabled(!ringerEnabled)}
                      className={`w-full py-2 text-xs font-bold rounded-lg transition ${
                        ringerEnabled 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}
                    >
                      {ringerEnabled ? '🔊 ON (Attiva)' : '🔇 MUTA (Silenzioso)'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PROFILE EDITS */}
          {activeTab === 'profile' && (
            <div className="space-y-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <span className="text-[9px] font-black uppercase text-emerald-450 tracking-wider font-mono">📝 PROFILO SOCIAL ANNA CALLIGARIS</span>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 block font-bold">Nome Completo</label>
                  <input
                    type="text"
                    value={appData.annaProfile.fullName}
                    onChange={(e) => handleProfileChange('fullName', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 block font-bold">Username</label>
                  <input
                    type="text"
                    value={appData.annaProfile.username}
                    onChange={(e) => handleProfileChange('username', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-205 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 block font-bold">URL Avatar Profilo Anna</label>
                <div className="flex gap-2 items-center">
                  <img
                    src={appData.annaProfile.avatar}
                    alt="Avatar Anna preview"
                    className="w-10 h-10 rounded-full object-cover border border-slate-800 bg-slate-950 shrink-0"
                  />
                  <input
                    type="text"
                    value={appData.annaProfile.avatar}
                    onChange={(e) => handleProfileChange('avatar', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-[10px] text-cyan-300"
                  />
                </div>
                <UploadImageControl
                  enabled={supabaseSync.enabled}
                  disabled={uploadingField !== null}
                  loading={uploadingField === 'anna-profile-avatar'}
                  label="Carica avatar Anna su Supabase"
                  loadingLabel="Caricamento avatar..."
                  onFile={handleProfileImageUpload}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 block font-bold">Posts</label>
                  <input
                    type="number"
                    value={appData.annaProfile.postsCount}
                    onChange={(e) => handleProfileChange('postsCount', Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 block font-bold">Followers</label>
                  <input
                    type="number"
                    value={appData.annaProfile.followers}
                    onChange={(e) => handleProfileChange('followers', Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 block font-bold">Seguiti</label>
                  <input
                    type="number"
                    value={appData.annaProfile.following}
                    onChange={(e) => handleProfileChange('following', Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 block font-bold font-sans">Biografia (Testo in Italiano)</label>
                <textarea
                  rows={4}
                  value={appData.annaProfile.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 resize-none font-medium text-xs leading-normal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 block font-bold font-sans">Verifica Account Spunta</label>
                <button
                  type="button"
                  onClick={() => handleProfileChange('isVerified', !appData.annaProfile.isVerified)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold transition ${
                    appData.annaProfile.isVerified ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-400'
                  }`}
                >
                  {appData.annaProfile.isVerified ? 'Spunta Azzurra Attiva' : 'Nessuna Spunta'}
                </button>
              </div>
            </div>
          )}

          {/* TAB: POSTS & CAPTIONS */}
          {activeTab === 'posts' && (
            <div className="space-y-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <span className="text-[9px] font-black uppercase text-emerald-400 tracking-wider font-mono">🖼️ MODIFICA DIDASCALIE E FOTO SOCIAL</span>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 block font-bold">Seleziona Post da modificare</label>
                <select
                  value={selectedPostId}
                  onChange={(e) => setSelectedPostId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-[11px] text-white"
                >
                  {appData.posts.map(p => {
                    let typeLabel = 'VIAGGIO/NEWS';
                    if (p.isEvent) typeLabel = 'VOLANTINO EVENTO';
                    else if (p.id.includes('_empty')) typeLabel = 'POST VUOTO EDITABILE';
                    else if (p.id.includes('bee')) typeLabel = 'BENE COMUNE';
                    else if (p.id.includes('hiking')) typeLabel = 'MONTAGNA / OUTDOOR';
                    else if (p.id.includes('wind')) typeLabel = 'ENERGIA PULITA';
                    else if (p.id.includes('river')) typeLabel = 'ECO CLEANUP';
                    else if (p.id.includes('market')) typeLabel = 'CIBO BIO';

                    return (
                      <option key={p.id} value={p.id}>
                        {(p.authorName || p.id.substring(5)).toUpperCase()} ({typeLabel})
                      </option>
                    );
                  })}
                </select>
              </div>

              {selectedPost && (
                <div className="space-y-3 pt-2">
                  {/* Real-time live thumbnail preview */}
                  <div className="flex gap-3 items-center p-2.5 bg-slate-950 rounded-lg border border-slate-850">
                    <div className="w-14 h-14 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-slate-700">
                      {selectedPost.image ? (
                        <img 
                          src={selectedPost.image} 
                          alt="Thumbnail preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-500 font-mono">NO IMG</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">Anteprima Post Attivo:</span>
                      <p className="text-[10px] text-white font-black truncate">{selectedPost.authorName || appData.annaProfile.fullName}</p>
                      <p className="text-[9px] text-cyan-300 font-mono truncate">@{selectedPost.authorUsername || appData.annaProfile.username}</p>
                      <p className="text-[10px] text-zinc-350 font-bold truncate">{selectedPost.location || 'Nessun Luogo'}</p>
                      <p className="text-[9px] text-slate-400 truncate leading-snug">{selectedPost.caption || 'Nessuna didascalia'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 block font-bold font-sans">Nome Autore</label>
                      <input
                        type="text"
                        value={selectedPost.authorName || appData.annaProfile.fullName}
                        onChange={(e) => handlePostChange(selectedPostId, 'authorName', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-medium text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 block font-bold font-sans">Username Autore</label>
                      <input
                        type="text"
                        value={selectedPost.authorUsername || appData.annaProfile.username}
                        onChange={(e) => handlePostChange(selectedPostId, 'authorUsername', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-[10px] text-cyan-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 block font-bold">URL Immagine Profilo Autore</label>
                    <input
                      type="text"
                      value={selectedPost.authorAvatar || appData.annaProfile.avatar}
                      onChange={(e) => handlePostChange(selectedPostId, 'authorAvatar', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-[10px] text-cyan-300"
                      placeholder="Incolla URL o percorso locale dell'avatar..."
                    />
                    <UploadImageControl
                      enabled={supabaseSync.enabled}
                      disabled={uploadingField !== null}
                      loading={uploadingField === `${selectedPost.id}-authorAvatar`}
                      label="Carica avatar su Supabase"
                      loadingLabel="Caricamento avatar..."
                      onFile={(file) => handlePostImageUpload(file, 'authorAvatar')}
                    />
                  </div>

                  {/* Preset alternative pictures library */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase text-teal-400 font-black tracking-wider block">⚡ CAMBIA FOTO AL VOLO (PRESET RAPIDI):</span>
                    <div className="grid grid-cols-4 gap-1 pt-0.5">
                      {[
                        { label: "Mondo/Natura", url: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&q=80&w=800" },
                        { label: "Protesta Piazzale", url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800" },
                        { label: "Cane Rifugio", url: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800" },
                        { label: "Pulizia Boschi", url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800" },
                        { label: "Orto Permacultura", url: "https://images.unsplash.com/photo-1464241353294-0f3162391696?auto=format&fit=crop&q=80&w=800" },
                        { label: "Bicicletta Corsa", url: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800" },
                        { label: "Pannelli Solari", url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800" },
                        { label: "Picnic Vegano", url: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800" },
                        { label: "Api e Fiori", url: "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=800" },
                        { label: "Cresta Montagna", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" },
                        { label: "Eolico Sostenibile", url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800" },
                        { label: "Fiume Bonifico", url: "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=800" }
                      ].map((preset, pIdx) => {
                        const isSelected = selectedPost.image === preset.url;
                        return (
                          <button
                            key={pIdx}
                            onClick={() => handlePostChange(selectedPostId, 'image', preset.url)}
                            className={`group relative aspect-video rounded overflow-hidden border text-left cursor-pointer transition ${
                              isSelected ? 'border-emerald-500 ring-2 ring-emerald-500/25' : 'border-slate-800 hover:border-slate-700'
                            }`}
                            title={preset.label}
                          >
                            <img src={preset.url} alt={preset.label} className="w-full h-full object-cover group-hover:scale-105 transition" />
                            <div className="absolute inset-x-0 bottom-0 bg-black/70 py-0.5 text-center">
                              <span className="text-[6.5px] font-mono text-zinc-300 uppercase select-none leading-none truncate block px-0.5">{preset.label.split("/")[0]}</span>
                            </div>
                            {isSelected && (
                              <span className="absolute top-0.5 right-0.5 bg-emerald-600 rounded-full w-2 h-2 flex items-center justify-center text-[5px] text-white font-extrabold select-none">✓</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 block font-bold">Visual URL Immagine Personalizzato</label>
                    <input
                      type="text"
                      value={selectedPost.image}
                      onChange={(e) => handlePostChange(selectedPostId, 'image', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-[10px] text-cyan-300"
                      placeholder="Incolla l'indirizzo di un'immagine online..."
                    />
                    <UploadImageControl
                      enabled={supabaseSync.enabled}
                      disabled={uploadingField !== null}
                      loading={uploadingField === `${selectedPost.id}-image`}
                      label="Carica foto post su Supabase"
                      loadingLabel="Caricamento foto..."
                      onFile={(file) => handlePostImageUpload(file, 'image')}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 block font-bold font-sans">Luogo Tag</label>
                    <input
                      type="text"
                      value={selectedPost.location || ''}
                      onChange={(e) => handlePostChange(selectedPostId, 'location', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-medium text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 block font-bold font-sans">Didascalia Post (Italiano)</label>
                    <textarea
                      rows={4}
                      value={selectedPost.caption}
                      onChange={(e) => handlePostChange(selectedPostId, 'caption', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 font-medium resize-none text-xs leading-normal"
                    />
                  </div>

                  {selectedPost.isEvent && (
                    <div className="space-y-1 p-3.5 bg-slate-950 rounded-lg border border-slate-800">
                      <label className="text-[10px] text-emerald-400 block font-bold uppercase font-mono">Dettagli Volantino Evento (Fisico)</label>
                      <textarea
                        rows={3}
                        value={selectedPost.eventDetails || ''}
                        onChange={(e) => handlePostChange(selectedPostId, 'eventDetails', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-emerald-350 p-2 text-xs font-mono rounded"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB: CHATS DIALOGUES */}
          {activeTab === 'chats' && (
            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-4">
                <span className="text-[9px] font-black uppercase text-pink-400 tracking-wider block font-mono">💬 DIALOGHI CHAT ALDO & ANNA</span>
                
                <p className="text-[10px] text-slate-402 leading-normal italic">
                  Qui di seguito vedi i messaggi scritti o vocali pianificati nello storico dei Direct. Sostituisci i testi per i primi piani:
                </p>

                <div className="space-y-3.5 max-h-[300px] overflow-y-auto no-scrollbar pr-1">
                  {/* Aldo and Anna message logs */}
                  {appData.chatsAldo.find(c => c.id === 'chat_anna')?.messages.map((m, i) => (
                    <div key={m.id || i} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                      <div className="flex justify-between font-mono text-[9px] text-zinc-450">
                        <span className="font-extrabold text-emerald-450 uppercase">
                          {m.sender === 'me' ? 'Aldo' : 'Anna'}
                        </span>
                        <span>Inviato alle: {m.timestamp}</span>
                      </div>

                      {m.text !== undefined && (
                        <textarea
                          rows={2}
                          value={m.text}
                          onChange={(e) => handleMessageChange('Aldo', 'chat_anna', m.id, e.target.value)}
                          className="w-full p-2 bg-slate-900 border border-slate-800 rounded font-sans text-xs text-white"
                        />
                      )}

                      {m.image && (
                        <div className="space-y-1 font-mono text-[9px]">
                          <span>Autoscatto / Foto Ricevuta:</span>
                          <input
                            type="text"
                            value={m.image}
                            onChange={(e) => {
                              const v = e.target.value;
                              setAppData(prev => ({
                                ...prev,
                                chatsAldo: prev.chatsAldo.map(t => t.id === 'chat_anna' ? {
                                  ...t,
                                  messages: t.messages.map(msg => msg.id === m.id ? { ...msg, image: v } : msg)
                                } : t)
                              }));
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-1"
                          />
                          <UploadImageControl
                            enabled={supabaseSync.enabled}
                            disabled={uploadingField !== null}
                            loading={uploadingField === `chat_anna-${m.id}-image`}
                            label="Carica immagine messaggio"
                            loadingLabel="Caricamento..."
                            onFile={(file) => handleMessageImageUpload('Aldo', 'chat_anna', m.id, file)}
                            compact
                          />
                        </div>
                      )}

                      {m.voiceDuration && (
                        <div className="bg-slate-900 p-2 rounded flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                          <span>🎤 Messaggio Vocale</span>
                          <input 
                            type="text" 
                            value={m.voiceDuration} 
                            onChange={(e) => {
                              const v = e.target.value;
                              setAppData(prev => ({
                                ...prev,
                                chatsAldo: prev.chatsAldo.map(t => t.id === 'chat_anna' ? {
                                  ...t,
                                  messages: t.messages.map(msg => msg.id === m.id ? { ...msg, voiceDuration: v } : msg)
                                } : t)
                              }));
                            }}
                            className="w-14 text-center bg-slate-950 border border-slate-800 p-1 text-xs text-white"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: PHONEBOOK CONTACTS */}
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-4">
                <span className="text-[9px] font-black uppercase text-emerald-450 tracking-wider block font-mono">📱 NOMI E NUMERI CONTATTI IN RUBRICA</span>
                
                <p className="text-[10px] text-zinc-400 leading-normal">
                  Modifica i nomi visibili nel selettore e nei registri chiamate di Aldo e Anna:
                </p>

                <div className="space-y-4">
                  {/* Aldo phone entries */}
                  <div className="space-y-2 border-b border-slate-800 pb-3">
                    <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-pink-400 block">📞 Nella Rubrica di Aldo</span>
                    {appData.aldoContacts.slice(0, 3).map(contact => (
                      <div key={contact.id} className="grid grid-cols-[36px_1fr] gap-2 bg-slate-950 p-2 rounded">
                        <label className={`relative w-9 h-9 rounded-full overflow-hidden border border-slate-800 bg-slate-900 cursor-pointer ${
                          supabaseSync.enabled ? 'hover:border-emerald-500' : 'opacity-60 cursor-not-allowed'
                        }`}>
                          <img src={CONTACT_PLACEHOLDER_AVATAR} alt="" className="w-full h-full object-cover" />
                          <input
                            type="file"
                            accept="image/*"
                            disabled={!supabaseSync.enabled || uploadingField !== null}
                            onChange={(e) => {
                              handleContactAvatarUpload('Aldo', contact.id, e.target.files?.[0]);
                              e.currentTarget.value = '';
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                          />
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={contact.name}
                            onChange={(e) => handleContactChange('Aldo', contact.id, e.target.value, contact.phone)}
                            className="bg-slate-900 p-1.5 rounded font-bold border border-slate-850"
                            title="Nome Contatto"
                          />
                          <input
                            type="text"
                            value={contact.phone}
                            onChange={(e) => handleContactChange('Aldo', contact.id, contact.name, e.target.value)}
                            className="bg-slate-900 p-1.5 rounded font-mono border border-slate-850"
                            title="Prefisso e Numero"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Anna phone entries */}
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-pink-400 block">📞 Nella Rubrica di Anna</span>
                    {appData.annaContacts.slice(0, 3).map(contact => (
                      <div key={contact.id} className="grid grid-cols-[36px_1fr] gap-2 bg-slate-950 p-2 rounded">
                        <label className={`relative w-9 h-9 rounded-full overflow-hidden border border-slate-800 bg-slate-900 cursor-pointer ${
                          supabaseSync.enabled ? 'hover:border-emerald-500' : 'opacity-60 cursor-not-allowed'
                        }`}>
                          <img src={CONTACT_PLACEHOLDER_AVATAR} alt="" className="w-full h-full object-cover" />
                          <input
                            type="file"
                            accept="image/*"
                            disabled={!supabaseSync.enabled || uploadingField !== null}
                            onChange={(e) => {
                              handleContactAvatarUpload('Anna', contact.id, e.target.files?.[0]);
                              e.currentTarget.value = '';
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                          />
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={contact.name}
                            onChange={(e) => handleContactChange('Anna', contact.id, e.target.value, contact.phone)}
                            className="bg-slate-900 p-1.5 rounded font-bold border border-slate-850"
                          />
                          <input
                            type="text"
                            value={contact.phone}
                            onChange={(e) => handleContactChange('Anna', contact.id, contact.name, e.target.value)}
                            className="bg-slate-900 p-1.5 rounded font-mono border border-slate-850"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: MEDIA & NEWSPAPER JOURNAL */}
          {activeTab === 'media' && (
            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-4">
                <span className="text-[9px] font-black uppercase text-emerald-450 tracking-wider block font-mono">📰 ARTICOLO DEL GIORNALE SU TABLET ANNA</span>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 block font-bold">Titolo Testata</label>
                    <input
                      type="text"
                      value={appData.newspaper.journalTitle}
                      onChange={(e) => handleNewspaperChange('journalTitle', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-extrabold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 block font-bold">Occhiello / Sottotitolo</label>
                    <textarea
                      rows={2}
                      value={appData.newspaper.articleSubtitle}
                      onChange={(e) => handleNewspaperChange('articleSubtitle', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 block font-bold">Immagine Principale Articolo</label>
                    <input
                      type="text"
                      value={appData.newspaper.mainImage}
                      onChange={(e) => handleNewspaperChange('mainImage', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 font-mono text-[10px]"
                    />
                    <UploadImageControl
                      enabled={supabaseSync.enabled}
                      disabled={uploadingField !== null}
                      loading={uploadingField === 'newspaper-main-image'}
                      label="Carica immagine articolo su Supabase"
                      loadingLabel="Caricamento immagine..."
                      onFile={handleNewspaperImageUpload}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 block font-bold">Paragrafo 1 (Inizio)</label>
                    <textarea
                      rows={3}
                      value={appData.newspaper.paragraphs[0] || ''}
                      onChange={(e) => {
                        const arr = [...appData.newspaper.paragraphs];
                        arr[0] = e.target.value;
                        handleNewspaperChange('paragraphs', arr);
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs font-serif leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 block font-bold">Paragrafo 2 (Dettaglio)</label>
                    <textarea
                      rows={3}
                      value={appData.newspaper.paragraphs[1] || ''}
                      onChange={(e) => {
                        const arr = [...appData.newspaper.paragraphs];
                        arr[1] = e.target.value;
                        handleNewspaperChange('paragraphs', arr);
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs font-serif leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Panel Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 text-center space-y-2 shrink-0 font-sans">
          <p className="text-[9px] text-zinc-500 font-mono leading-normal">
            "QUESTIONE DI RENI" PORTALE TECNICO • COD: PRO-INSTA-2026<br />
            Salvataggio automatico locale e cloud quando Supabase è configurato.
          </p>
          <button 
            onClick={onClose}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] rounded-lg uppercase tracking-wider transition"
          >
            Chiudi Pannello Regia
          </button>
        </div>

      </div>
    </div>
  );
}
