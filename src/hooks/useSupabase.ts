import { useMemo } from 'react';
import { createClient } from '@/utils/supabase/client';

export const useSupabase = () => {
  return useMemo(() => createClient(), []);
};
