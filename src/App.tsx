import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Search, User, MessageSquare, Phone, PhoneOff, Play, Pause, 
  MapPin, Heart, CheckCheck, Send, Calendar, Bookmark, Clock, 
  Volume2, VolumeX, Sliders, X, Check, Smartphone, ChevronLeft, 
  Eye, Sparkles, BookOpen, Clock4, Bell, HelpCircle, Flame, Layers, Camera,
  Lock, Battery, Wifi, MoreHorizontal, UploadCloud, Plus, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom subcomponents
import NewspaperView from './components/NewspaperView';
import CalendarView from './components/CalendarView';
import SvevaGalleryView from './components/SvevaGalleryView';
import DirectorDrawer from './components/DirectorDrawer';

// State and types
import { INITIAL_DATA, CONTACT_PLACEHOLDER_AVATAR, ANNA_CONTACT_AVATAR, AppData, Post, Contact, Message, ChatThread, CalendarShift, hydrateAppData } from './data';
import { useSupabaseAppData } from './hooks/useSupabaseAppData';

export default function App() {
  const getContactDisplayAvatar = (name: string) =>
    name === 'Anna Calligaris' || name === 'Anna' ? ANNA_CONTACT_AVATAR : CONTACT_PLACEHOLDER_AVATAR;

  // 1. Centralized Persisted Data State
  const [appData, setAppData] = useState<AppData>(() => {
    const cached = localStorage.getItem('ecolife_sim_app_data');
    if (cached) {
      try {
        return hydrateAppData(JSON.parse(cached));
      } catch (err) {
        // Fallback
      }
    }
    return INITIAL_DATA;
  });

  // Save changes to cache so film operators can persist edited texts/images
  useEffect(() => {
    localStorage.setItem('ecolife_sim_app_data', JSON.stringify(appData));
  }, [appData]);

  const supabaseSync = useSupabaseAppData(appData, setAppData);

  // 2. Active Screen Routing
  // Options: 'feed' | 'search' | 'profile' | 'chat' | 'contacts' | 'newspaper' | 'calendar' | 'gallery_sveva'
  const [activeScreen, setActiveScreen] = useState<string>('profile');
  const [phoneOwner, setPhoneOwner] = useState<'Aldo' | 'Anna'>('Anna');
  const [adminDrawerOpen, setAdminDrawerOpen] = useState<boolean>(false);
  const [mainMenuOpen, setMainMenuOpen] = useState<boolean>(false);

  // Search & Profile states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [profileViewMode, setProfileViewMode] = useState<'grid' | 'feed'>('grid');
  const [focusedPostId, setFocusedPostId] = useState<string | null>(null);
  const [postImageSettingsOpen, setPostImageSettingsOpen] = useState<boolean>(false);
  const [postImageUploading, setPostImageUploading] = useState<boolean>(false);
  const [postImageUploadError, setPostImageUploadError] = useState<string | null>(null);
  const [focusedChatImage, setFocusedChatImage] = useState<{
    url: string;
    owner: 'Aldo' | 'Anna';
    threadId: string;
    messageId: string;
  } | null>(null);
  const [chatImageSettingsOpen, setChatImageSettingsOpen] = useState<boolean>(false);
  const [chatImageUploading, setChatImageUploading] = useState<boolean>(false);
  const [chatImageUploadError, setChatImageUploadError] = useState<string | null>(null);
  const [activeProfileUsername, setActiveProfileUsername] = useState<string>('anna_calligaris_eco');
  const [profileListOpen, setProfileListOpen] = useState<'followers' | 'following' | null>(null);

  const defaultSocialProfileAvatars = {
    aldo_reni: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300',
    lorenzo_vidal: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    bar_appennino: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300'
  };
  const [socialProfileAvatars, setSocialProfileAvatars] = useState(() => {
    const cached = localStorage.getItem('ecolife_sim_social_profile_avatars');
    if (cached) {
      try {
        return {
          ...defaultSocialProfileAvatars,
          ...JSON.parse(cached)
        };
      } catch (err) {
        // Keep defaults if cached avatar settings are not readable.
      }
    }
    return defaultSocialProfileAvatars;
  });

  useEffect(() => {
    localStorage.setItem('ecolife_sim_social_profile_avatars', JSON.stringify(socialProfileAvatars));
  }, [socialProfileAvatars]);

  const getPostAuthor = (post: Post) => {
    const username = post.authorUsername || appData.annaProfile.username;
    const editableAvatar = socialProfileAvatars[username as keyof typeof socialProfileAvatars];

    return {
      name: post.authorName || appData.annaProfile.fullName,
      username,
      avatar: editableAvatar || post.authorAvatar || appData.annaProfile.avatar
    };
  };
  const socialProfiles = [
    {
      username: appData.annaProfile.username,
      fullName: appData.annaProfile.fullName,
      avatar: appData.annaProfile.avatar,
      bio: appData.annaProfile.bio,
      followers: appData.annaProfile.followers,
      following: appData.annaProfile.following,
      postsCount: appData.annaProfile.postsCount,
      isVerified: appData.annaProfile.isVerified,
      linkLabel: 'leggi_giornata_piazza_celli_news.it',
      linkScreen: 'newspaper',
      highlights: [
        { label: "Bici Libere", icon: "🚴‍♀️" },
        { label: "FlashMob", icon: "📢" },
        { label: "Amici Coda", icon: "🐾" }
      ]
    },
    {
      username: 'aldo_reni',
      fullName: 'Aldo Reni',
      avatar: socialProfileAvatars.aldo_reni,
      bio: 'Roma, lavoro e poche fotografie.\n📍 Studio Reni\nPreferisco osservare prima di parlare.',
      followers: 7,
      following: 32,
      postsCount: 5,
      isVerified: false,
      linkLabel: '',
      linkScreen: '',
      highlights: [
        { label: "Studio", icon: "📁" },
        { label: "Roma", icon: "🏛️" },
        { label: "Note", icon: "☕" }
      ]
    },
    {
      username: 'lorenzo_vidal',
      fullName: 'Lorenzo Vidal',
      avatar: socialProfileAvatars.lorenzo_vidal,
      bio: 'Vivo a Roma con Ines, che viene dalla Spagna e corregge il mio modo di salare tutto.\nCase, mercati, strade lente.',
      followers: 86,
      following: 144,
      postsCount: 7,
      isVerified: false,
      linkLabel: '',
      linkScreen: '',
      highlights: [
        { label: "Ines", icon: "🇪🇸" },
        { label: "Casa", icon: "🪴" },
        { label: "Roma", icon: "🌙" }
      ]
    },
    {
      username: 'bar_appennino',
      fullName: 'Mirella Bardi',
      avatar: socialProfileAvatars.bar_appennino,
      bio: 'Tengo aperto un piccolo bar sul passo.\n☕ Caffe, giornali, neve quando arriva.\n📍 Appennino Centrale',
      followers: 213,
      following: 97,
      postsCount: 4,
      isVerified: false,
      linkLabel: '',
      linkScreen: '',
      highlights: [
        { label: "Banco", icon: "☕" },
        { label: "Neve", icon: "❄️" },
        { label: "Paese", icon: "🃏" }
      ]
    }
  ];
  const profileByUsername = new Map(socialProfiles.map(profile => [profile.username, profile]));
  const activeProfile = profileByUsername.get(activeProfileUsername) || socialProfiles[0];
  const activeProfilePosts = appData.posts.filter(post => {
    if (post.id.startsWith('post_contact_')) return false;
    const username = post.authorUsername || appData.annaProfile.username;
    return username === activeProfile.username;
  });
  const profileFollowersByUsername: Record<string, { name: string; username?: string }[]> = {
    anna_calligaris_eco: [
      { name: 'Aldo Reni', username: 'aldo_reni' },
      { name: 'Lorenzo Vidal', username: 'lorenzo_vidal' },
      { name: 'Mirella Bardi', username: 'bar_appennino' },
      { name: 'Margherita ❤️' },
      { name: 'Marco' },
      { name: 'Lucia Nature' },
      { name: 'Tommaso' },
      { name: 'Sveva' },
      { name: 'Marta' },
      { name: 'Nadia' },
      { name: 'Brian Eco' },
      { name: 'Claudio Valle' }
    ],
    aldo_reni: [
      { name: 'Anna Calligaris', username: appData.annaProfile.username },
      { name: 'Lorenzo Vidal', username: 'lorenzo_vidal' },
      { name: 'Mirella Bardi', username: 'bar_appennino' },
      { name: 'Marco' },
      { name: 'Margherita ❤️' },
      { name: 'Mauro' },
      { name: 'Paola Reni' }
    ],
    lorenzo_vidal: [
      { name: 'Mirella Bardi', username: 'bar_appennino' },
      { name: 'Aldo Reni', username: 'aldo_reni' },
      { name: 'Ines Vidal' },
      { name: 'Claudia M.' },
      { name: 'Pablo Serrano' },
      { name: 'Marco' },
      { name: 'Elena R.' },
      { name: 'Gianni Costa' },
      { name: 'Sara L.' },
      { name: 'Lorenzo Vidal', username: 'lorenzo_vidal' },
      { name: 'Martina P.' }
    ],
    bar_appennino: [
      { name: 'Lorenzo Vidal', username: 'lorenzo_vidal' },
      { name: 'Aldo Reni', username: 'aldo_reni' },
      { name: 'Gino del Passo' },
      { name: 'Teresa Forno' },
      { name: 'Nadia Social' },
      { name: 'Carlo Autista' },
      { name: 'Mirella Bardi', username: 'bar_appennino' },
      { name: 'Lucia Nature' },
      { name: 'Roberto Megafoni' },
      { name: 'Pietro Comune' },
      { name: 'Sveva' }
    ]
  };
  const profileFollowingByUsername: Record<string, { name: string; username?: string }[]> = {
    anna_calligaris_eco: [
      { name: 'Aldo Reni', username: 'aldo_reni' },
      { name: 'Lorenzo Vidal', username: 'lorenzo_vidal' },
      { name: 'Mirella Bardi', username: 'bar_appennino' },
      { name: 'Margherita ❤️' },
      { name: 'Marco' },
      { name: 'ENPA Sede Centrale' },
      { name: 'Tommaso' },
      { name: 'Lucia Nature' },
      { name: 'Brian Eco' },
      { name: 'Bici Lifestyle Shop' },
      { name: 'Santuario Animali Selci' },
      { name: 'Radio Civica Roma' }
    ],
    aldo_reni: [
      { name: 'Anna Calligaris', username: appData.annaProfile.username },
      { name: 'Lorenzo Vidal', username: 'lorenzo_vidal' },
      { name: 'Mirella Bardi', username: 'bar_appennino' },
      { name: 'Bartolomeo Reni' },
      { name: 'Dott. De Santis' },
      { name: 'Avvocato Moretti' },
      { name: 'Mauro' },
      { name: 'Paola Reni' },
      { name: 'Luca Reni' },
      { name: 'Giulia Amministrazione' },
      { name: 'Prof. Caruso' },
      { name: 'Francesca Commercialista' }
    ],
    lorenzo_vidal: [
      { name: 'Aldo Reni', username: 'aldo_reni' },
      { name: 'Mirella Bardi', username: 'bar_appennino' },
      { name: 'Ines Vidal' },
      { name: 'Pablo Serrano' },
      { name: 'Claudia M.' },
      { name: 'Elena R.' },
      { name: 'Gianni Costa' },
      { name: 'Sara L.' },
      { name: 'Martina P.' },
      { name: 'Diego R.' },
      { name: 'Rosa Navarro' },
      { name: 'Miguel Torres' }
    ],
    bar_appennino: [
      { name: 'Aldo Reni', username: 'aldo_reni' },
      { name: 'Lorenzo Vidal', username: 'lorenzo_vidal' },
      { name: 'Gino del Passo' },
      { name: 'Teresa Forno' },
      { name: 'Carlo Autista' },
      { name: 'Nadia Social' },
      { name: 'Pietro Comune' },
      { name: 'Lucia Nature' },
      { name: 'Roberto Megafoni' },
      { name: 'Sveva' },
      { name: 'Franco Neve' },
      { name: 'Assunta Alimentari' }
    ]
  };
  const activeProfileFollowers = profileFollowersByUsername[activeProfile.username] || [];
  const activeProfileFollowing = profileFollowingByUsername[activeProfile.username] || [];
  const activeProfileList = profileListOpen === 'followers' ? activeProfileFollowers : profileListOpen === 'following' ? activeProfileFollowing : [];
  const clickableSocialUsernames = new Set([appData.annaProfile.username, 'aldo_reni', 'lorenzo_vidal', 'bar_appennino']);
  const feedPosts = appData.posts
    .filter(post => !post.id.startsWith('post_contact_'))
    .slice()
    .sort((a, b) => {
      const aIsAnna = (a.authorUsername || appData.annaProfile.username) === appData.annaProfile.username;
      const bIsAnna = (b.authorUsername || appData.annaProfile.username) === appData.annaProfile.username;
      if (aIsAnna !== bIsAnna) return aIsAnna ? 1 : -1;
      const rank = (id: string) => Array.from(id).reduce((total, char) => total + char.charCodeAt(0), 0) % 17;
      return rank(a.id) - rank(b.id) || a.id.localeCompare(b.id);
    });
  const profileShortcuts = socialProfiles.filter(profile => profile.username !== appData.annaProfile.username);
  const openProfile = (username: string) => {
    if (!profileByUsername.has(username)) return;
    setActiveProfileUsername(username);
    setActiveScreen('profile');
    setProfileViewMode('grid');
    setFocusedPostId(null);
    setSearchQuery('');
    setProfileListOpen(null);
    playInteractionBeep(1000, 0.1);
  };
  const appNavItems = [
    { id: 'feed', icon: Camera, label: 'Feed Sociale' },
    { id: 'search', icon: Search, label: 'Cerca Attivisti' },
    { id: 'profile', icon: User, label: 'Anna Profilo' },
    { id: 'chat', icon: MessageSquare, label: 'Direct Messaggi', badge: 1 },
    { id: 'contacts', icon: BookOpen, label: 'Rubrica Contatti' },
    { id: 'newspaper', icon: Layers, label: 'Leggi Giornale' },
    { id: 'calendar', icon: Calendar, label: 'Turni Clinica Mauro' },
    { id: 'gallery_sveva', icon: Heart, label: 'Sofia Album (Sveva)' }
  ];

  // Direct DM state
  const [activeChatId, setActiveChatId] = useState<string>('chat_anna');
  const [typedMessage, setTypedMessage] = useState<string>('');
  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);
  const [mobileShowActiveChat, setMobileShowActiveChat] = useState<boolean>(false);

  const defaultCallConfig = {
    callerName: 'Anna Calligaris',
    callerNumber: '+39 347 129 8834',
    callerAvatar: ANNA_CONTACT_AVATAR,
    phoneOwnerTarget: 'Aldo' as 'Aldo' | 'Anna',
    autoAnswerEnabled: true,
    autoAnswerDelay: 5,
    noAnswerTimeoutEnabled: true,
    noAnswerTimeout: 18,
    delayedStartMode: 'standby' as 'standby' | 'inapp'
  };
  const defaultDirectorSettings = {
    standbyTotalSeconds: 10,
    lockScreenWallpaper: '/img/Foto Anna (Ronchi)/profilo.jpeg',
    callTotalSeconds: 5,
    callConfig: defaultCallConfig,
    ringerEnabled: true,
    currentTime: '15:10'
  };
  const loadDirectorSettings = () => {
    const cached = localStorage.getItem('ecolife_sim_director_settings');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return {
          ...defaultDirectorSettings,
          ...parsed,
          callConfig: {
            ...defaultCallConfig,
            ...(parsed.callConfig || {})
          }
        };
      } catch (err) {
        // Keep defaults if cached settings are not readable.
      }
    }
    return defaultDirectorSettings;
  };
  const directorSettings = loadDirectorSettings();

  // Screen-wake notification standby scene configuration
  const [standbyActive, setStandbyActive] = useState<boolean>(false);
  const [standbyTimerRunning, setStandbyTimerRunning] = useState<boolean>(false);
  const [standbySecondsLeft, setStandbySecondsLeft] = useState<number>(directorSettings.standbyTotalSeconds);
  const [standbyTotalSeconds, setStandbyTotalSeconds] = useState<number>(directorSettings.standbyTotalSeconds);
  const [standbyPulseActive, setStandbyPulseActive] = useState<boolean>(false);
  const [lockScreenActive, setLockScreenActive] = useState<boolean>(false);
  const [lockScreenWallpaper, setLockScreenWallpaper] = useState<string>(directorSettings.lockScreenWallpaper);

  const defaultWakeConfig = {
    senderName: 'Anna',
    messagePreview: '🎤 Messaggio Vocale (0:42)',
    timestamp: 'Adesso',
    voiceDuration: '0:42',
    useVibratingPulse: true,
    notificationBehavior: 'lockscreen' as 'lockscreen' | 'inapp',
    phoneOwnerTarget: 'Aldo' as 'Aldo' | 'Anna',
    targetChatId: 'chat_anna',
    notificationTitle: 'Messaggio Vocale',
    actionLabel: 'TOCCA PER ASCOLTARE ➔',
    showLockDateTime: true,
    lockScreenTime: '15:10',
    lockScreenDate: '25 giugno 2026'
  };
  const [wakeConfig, setWakeConfig] = useState(() => {
    const cachedWakeConfig = localStorage.getItem('ecolife_sim_wake_config');
    if (cachedWakeConfig) {
      try {
        const parsedWakeConfig = JSON.parse(cachedWakeConfig);
        return {
          ...defaultWakeConfig,
          ...parsedWakeConfig,
          targetChatId: parsedWakeConfig.targetChatId === 'chat_aldo_anna'
            ? 'chat_negroni_anna'
            : parsedWakeConfig.targetChatId
        };
      } catch (err) {
        // Keep defaults if cached config is not readable.
      }
    }
    return defaultWakeConfig;
  });

  useEffect(() => {
    localStorage.setItem('ecolife_sim_wake_config', JSON.stringify(wakeConfig));
  }, [wakeConfig]);

  // Call simulation overlay state
  const [callState, setCallState] = useState<{
    callerName: string;
    callerNumber: string;
    callerAvatar: string;
    type: 'incoming' | 'outgoing' | 'connected' | null;
    phoneOwnerTarget: 'Aldo' | 'Anna';
    timeElapsed: number;
  }>({
    callerName: '',
    callerNumber: '',
    callerAvatar: '',
    type: null,
    phoneOwnerTarget: 'Anna',
    timeElapsed: 0
  });

  // Call simulation countdown and configurations
  const [callTimerRunning, setCallTimerRunning] = useState<boolean>(false);
  const [callSecondsLeft, setCallSecondsLeft] = useState<number>(directorSettings.callTotalSeconds);
  const [callTotalSeconds, setCallTotalSeconds] = useState<number>(directorSettings.callTotalSeconds);
  const [callAutoAnswerDelayLeft, setCallAutoAnswerDelayLeft] = useState<number>(directorSettings.callConfig.autoAnswerDelay);
  const [callNoAnswerSecondsLeft, setCallNoAnswerSecondsLeft] = useState<number>(directorSettings.callConfig.noAnswerTimeout);

  const [callConfig, setCallConfig] = useState(directorSettings.callConfig);

  useEffect(() => {
    const blackoutActive = standbyActive;
    const html = document.documentElement;
    const body = document.body;
    const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const previousThemeColor = themeMeta?.content;
    const managedThemeMeta = themeMeta || document.createElement('meta');

    if (!themeMeta) {
      managedThemeMeta.name = 'theme-color';
      document.head.appendChild(managedThemeMeta);
    }

    html.classList.toggle('blackout-active', blackoutActive);
    body.classList.toggle('blackout-active', blackoutActive);
    managedThemeMeta.content = blackoutActive ? '#000000' : previousThemeColor || '#fafafa';

    return () => {
      html.classList.remove('blackout-active');
      body.classList.remove('blackout-active');
      managedThemeMeta.content = previousThemeColor || '#fafafa';
    };
  }, [callTimerRunning, standbyActive]);

  // Notifications Pop Down
  const [bannerNotificationActive, setBannerNotificationActive] = useState<boolean>(false);

  // Audio & Synthesizer State
  const [ringerEnabled, setRingerEnabled] = useState<boolean>(directorSettings.ringerEnabled);
  const [currentTime, setCurrentTime] = useState<string>(directorSettings.currentTime);

  useEffect(() => {
    localStorage.setItem('ecolife_sim_director_settings', JSON.stringify({
      standbyTotalSeconds,
      lockScreenWallpaper,
      callTotalSeconds,
      callConfig,
      ringerEnabled,
      currentTime
    }));
  }, [standbyTotalSeconds, lockScreenWallpaper, callTotalSeconds, callConfig, ringerEnabled, currentTime]);

  // Voice message player simulated progression
  const [voiceIsPlaying, setVoiceIsPlaying] = useState<boolean>(false);
  const [voiceProgress, setVoiceProgress] = useState<number>(0);
  const voiceProgressIntervalRef = useRef<number | null>(null);
  const voiceNotificationDelayRef = useRef<number | null>(null);

  // Audio Context for beeps and simulated dial rings
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ringIntervalRef = useRef<number | null>(null);

  // Live timer for calls
  const callDurationIntervalRef = useRef<number | null>(null);

  // Sync clock time live if wanted, or let it be static for shooting continuity
  useEffect(() => {
    const timer = setInterval(() => {
      // Do not auto-update unless specified, to maintain film scene visual matching
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Handle call timer ticks
  useEffect(() => {
    if (callState.type === 'connected') {
      callDurationIntervalRef.current = window.setInterval(() => {
        setCallState(prev => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }));
      }, 1000);
    } else {
      if (callDurationIntervalRef.current) {
        clearInterval(callDurationIntervalRef.current);
        callDurationIntervalRef.current = null;
      }
    }
    return () => {
      if (callDurationIntervalRef.current) clearInterval(callDurationIntervalRef.current);
    };
  }, [callState.type]);

  // Audio Synthesizer Cadences (Safe fallback)
  const startSynthRingtone = () => {
    if (!ringerEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      audioCtxRef.current = new AudioCtx();

      const playBeepPair = () => {
        if (!audioCtxRef.current) return;
        
        // Custom double cadence ringtone (Italian telecom standard)
        const osc1 = audioCtxRef.current.createOscillator();
        const osc2 = audioCtxRef.current.createOscillator();
        const gainNode = audioCtxRef.current.createGain();

        osc1.frequency.setValueAtTime(425, audioCtxRef.current.currentTime);
        osc2.frequency.setValueAtTime(400, audioCtxRef.current.currentTime);

        gainNode.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.12, audioCtxRef.current.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.12, audioCtxRef.current.currentTime + 0.9);
        gainNode.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1.0);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtxRef.current.destination);

        osc1.start();
        osc2.start();

        // Stop oscillator
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
          } catch(err) {}
        }, 1100);
      };

      // Play initially and then set interval
      playBeepPair();
      ringIntervalRef.current = window.setInterval(playBeepPair, 3000);

    } catch (e) {
      console.warn("Audio Context blocked by policy", e);
    }
  };

  const stopSynthRingtone = () => {
    if (ringIntervalRef.current) {
      clearInterval(ringIntervalRef.current);
      ringIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
  };

  const endUnansweredCallToBlack = () => {
    playInteractionBeep(260, 0.25);
    stopSynthRingtone();
    setCallTimerRunning(false);
    setCallState(prev => ({ ...prev, type: null, timeElapsed: 0 }));
    setLockScreenActive(false);
    setBannerNotificationActive(false);
    setStandbyTimerRunning(false);
    setStandbyActive(true);
    setAdminDrawerOpen(false);
  };

  // Sound beep when playing simulated voice or answering
  const playInteractionBeep = (freq = 600, duration = 0.15) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch(e) {}
  };

  // Sound triggers based on callState transitions
  useEffect(() => {
    if (callState.type === 'incoming' || callState.type === 'outgoing') {
      startSynthRingtone();
    } else {
      stopSynthRingtone();
    }
    return () => stopSynthRingtone();
  }, [callState.type, ringerEnabled]);

  const triggerWakeNotification = () => {
    playInteractionBeep(880, 0.4);
    setCallState(prev => ({ ...prev, type: null }));
    setCallTimerRunning(false);
    if (wakeConfig.notificationBehavior === 'lockscreen') {
      setLockScreenActive(true);
      setBannerNotificationActive(false);
    } else {
      setLockScreenActive(false);
      setBannerNotificationActive(true);
    }
    if (wakeConfig.useVibratingPulse) {
      setStandbyPulseActive(true);
      setTimeout(() => {
        setStandbyPulseActive(false);
      }, 2500);
    }
  };

  useEffect(() => {
    let interval: number | undefined;
    if (standbyTimerRunning && standbyActive) {
      interval = window.setInterval(() => {
        setStandbySecondsLeft(prev => {
          if (prev <= 1) {
            setStandbyTimerRunning(false);
            setStandbyActive(false);
            // Wake Up and Trigger
            triggerWakeNotification();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [standbyTimerRunning, standbyActive, wakeConfig]);

  // Countdown for pre-call delay
  useEffect(() => {
    let interval: number | undefined;
    if (callTimerRunning) {
      // Automatically turn standby screen off immediately for realism
      setStandbyActive(callConfig.delayedStartMode === 'standby');
      setLockScreenActive(false);
      setBannerNotificationActive(false);
      setAdminDrawerOpen(false);
      interval = window.setInterval(() => {
        setCallSecondsLeft(prev => {
          if (prev <= 1) {
            setCallTimerRunning(false);
            // Trigger the call before dropping the black cover, avoiding a home-screen flash.
            setPhoneOwner(callConfig.phoneOwnerTarget);
            setCallState({
              callerName: callConfig.callerName,
              callerNumber: callConfig.callerNumber,
              callerAvatar: getContactDisplayAvatar(callConfig.callerName),
              type: 'incoming',
              phoneOwnerTarget: callConfig.phoneOwnerTarget,
              timeElapsed: 0
            });
            // Turn standby screen off after the call overlay is ready.
            setStandbyActive(false);
            // Prepare auto-answer countdown from config
            setCallAutoAnswerDelayLeft(callConfig.autoAnswerDelay);
            setCallNoAnswerSecondsLeft(callConfig.noAnswerTimeout);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callTimerRunning, callConfig]);

  // Countdown for auto-answering active ringing/outgoing calls
  useEffect(() => {
    let interval: number | undefined;
    if ((callState.type === 'incoming' || callState.type === 'outgoing') && callConfig.autoAnswerEnabled && !callTimerRunning) {
      interval = window.setInterval(() => {
        setCallAutoAnswerDelayLeft(prev => {
          if (prev <= 1) {
            // Auto Answer!
            playInteractionBeep(925, 0.15);
            stopSynthRingtone();
            setCallState(cs => ({ ...cs, type: 'connected', timeElapsed: 0 }));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callState.type, callConfig.autoAnswerEnabled, callTimerRunning]);

  // Countdown for unanswered active ringing/outgoing calls returning to black.
  useEffect(() => {
    let interval: number | undefined;
    if ((callState.type === 'incoming' || callState.type === 'outgoing') && callConfig.noAnswerTimeoutEnabled && !callTimerRunning) {
      interval = window.setInterval(() => {
        setCallNoAnswerSecondsLeft(prev => {
          if (prev <= 1) {
            endUnansweredCallToBlack();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callState.type, callConfig.noAnswerTimeoutEnabled, callTimerRunning]);

  // Reset call timers whenever any ringing/outgoing call starts
  useEffect(() => {
    if (callState.type === 'incoming' || callState.type === 'outgoing') {
      setCallAutoAnswerDelayLeft(callConfig.autoAnswerDelay);
      setCallNoAnswerSecondsLeft(callConfig.noAnswerTimeout);
    }
  }, [callState.type, callConfig.autoAnswerDelay, callConfig.noAnswerTimeout]);

  // Prevent visual leak of director's settings panel underneath black, locked, or call screens.
  useEffect(() => {
    if (standbyActive || lockScreenActive || callTimerRunning || callState.type !== null) {
      setAdminDrawerOpen(false);
    }
  }, [standbyActive, lockScreenActive, callTimerRunning, callState.type]);

  const triggerVoiceMessageReceipt = () => {
    if (voiceNotificationDelayRef.current) {
      window.clearTimeout(voiceNotificationDelayRef.current);
      voiceNotificationDelayRef.current = null;
    }

    setCallTimerRunning(false);
    setCallState(prev => ({ ...prev, type: null }));
    setPhoneOwner(wakeConfig.phoneOwnerTarget);
    setActiveScreen('chat');
    setActiveChatId(wakeConfig.targetChatId);
    setMobileShowActiveChat(true);
    setStandbyActive(false);
    setStandbyTimerRunning(false);

    if (wakeConfig.notificationBehavior === 'lockscreen') {
      setLockScreenActive(false);
      setBannerNotificationActive(false);
      setStandbySecondsLeft(standbyTotalSeconds);
      setStandbyActive(true);
      setStandbyTimerRunning(true);
      return;
    }

    setLockScreenActive(false);
    setBannerNotificationActive(false);
    setStandbySecondsLeft(standbyTotalSeconds);
    voiceNotificationDelayRef.current = window.setTimeout(() => {
      voiceNotificationDelayRef.current = null;
      triggerWakeNotification();
    }, standbyTotalSeconds * 1000);
  };

  // Voice message simulation progression
  const handlePlayVoiceSimulated = () => {
    if (voiceIsPlaying) {
      // Pause
      setVoiceIsPlaying(false);
      if (voiceProgressIntervalRef.current) {
        clearInterval(voiceProgressIntervalRef.current);
        voiceProgressIntervalRef.current = null;
      }
    } else {
      // Play
      setVoiceIsPlaying(true);
      playInteractionBeep(850, 0.2);
      
      voiceProgressIntervalRef.current = window.setInterval(() => {
        setVoiceProgress(prev => {
          if (prev >= 100) {
            setVoiceIsPlaying(false);
            if (voiceProgressIntervalRef.current) clearInterval(voiceProgressIntervalRef.current);
            voiceProgressIntervalRef.current = null;
            playInteractionBeep(1200, 0.45); // complete sound
            return 100;
          }
          return prev + 1.2;
        });
      }, 100);
    }
  };

  useEffect(() => {
    return () => {
      if (voiceProgressIntervalRef.current) clearInterval(voiceProgressIntervalRef.current);
      if (voiceNotificationDelayRef.current) clearTimeout(voiceNotificationDelayRef.current);
    };
  }, []);

  // Predefined lists swaps
  const imagePresets = [
    { label: 'Anna Provetta Laboratorio', url: '/img/Foto Anna (Ronchi)/post_eco_quote.jpeg' },
    { label: 'Serraglio Clinica Protesta', url: '/img/Foto Anna (Ronchi)/post_flashmob.jpeg' },
    { label: 'Autoscatto / Selfie Anna', url: '/img/Foto Anna (Ronchi)/profilo.jpeg' },
    { label: 'Biciclette Sentiero Bosco', url: '/img/Foto Anna (Ronchi)/post_bicycle.jpeg' }
  ];

  // CENTRALIZED ACCELERATOR PRESETS TRIGGERS
  const triggerScenePreset = (presetKey: string) => {
    playInteractionBeep(980, 0.25);
    switch (presetKey) {
      case 'scena_aldo_ricerca':
        setPhoneOwner('Aldo');
        setActiveScreen('search');
        setSearchQuery('');
        break;

      case 'scena_profilo_anna':
        setPhoneOwner('Aldo');
        setActiveScreen('profile');
        setFocusedPostId(null);
        break;

      case 'scena_post_flashmob':
        setActiveScreen('feed');
        setPhoneOwner('Aldo');
        // Scroll target or focus can be simulated by focused modal
        setFocusedPostId('post_flashmob');
        break;

      case 'scena_rubrica_aldo':
        setPhoneOwner('Aldo');
        setActiveScreen('contacts');
        setSearchQuery('');
        break;

      case 'scena_rubrica_anna':
        setPhoneOwner('Anna');
        setActiveScreen('contacts');
        setSearchQuery('');
        break;

      case 'scena_chat_messaggi':
        setPhoneOwner('Aldo');
        setActiveScreen('chat');
        setActiveChatId('chat_anna');
        setFocusedPostId(null);
        break;

      case 'scena_chat_selfie_ingrandito':
        setPhoneOwner('Aldo');
        setActiveScreen('chat');
        setActiveChatId('chat_anna');
        setFocusedPostId('selfie_zoom');
        break;

      case 'scena_riproduci_vocale':
        setPhoneOwner('Aldo');
        setActiveScreen('chat');
        setActiveChatId('chat_anna');
        setVoiceProgress(0);
        setVoiceIsPlaying(false);
        // Instant play trigger
        setTimeout(() => {
          handlePlayVoiceSimulated();
        }, 500);
        break;

      case 'scena_chiama_aldo_da_anna':
        // Incoming on Aldo's phone from Anna Calligaris
        setPhoneOwner('Aldo');
        setCallState({
          callerName: appData.aldoContacts.find(c => c.id === 'contact_anna')?.name || 'Anna Calligaris',
          callerNumber: '+39 347 129 8834',
          callerAvatar: ANNA_CONTACT_AVATAR,
          type: 'incoming',
          phoneOwnerTarget: 'Aldo',
          timeElapsed: 0
        });
        break;

      case 'scena_chiama_anna_da_aldo':
        // Incoming on Anna's phone from Aldo
        setPhoneOwner('Anna');
        setCallState({
          callerName: 'Aldo Reni',
          callerNumber: '+39 328 110 4492',
          callerAvatar: CONTACT_PLACEHOLDER_AVATAR,
          type: 'incoming',
          phoneOwnerTarget: 'Anna',
          timeElapsed: 0
        });
        break;

      case 'scena_negroni_chiama_anna':
        // Legacy preset kept safe: calls are only Aldo <-> Anna.
        setPhoneOwner('Anna');
        setCallState({
          callerName: 'Aldo Reni',
          callerNumber: '+39 328 110 4492',
          callerAvatar: CONTACT_PLACEHOLDER_AVATAR,
          type: 'incoming',
          phoneOwnerTarget: 'Anna',
          timeElapsed: 0
        });
        break;

      case 'scena_anna_chiama_negroni':
        // Legacy preset kept safe: calls are only Aldo <-> Anna.
        setPhoneOwner('Aldo');
        setCallState({
          callerName: appData.aldoContacts.find(c => c.id === 'contact_anna')?.name || 'Anna Calligaris',
          callerNumber: '+39 347 129 8834',
          callerAvatar: ANNA_CONTACT_AVATAR,
          type: 'incoming',
          phoneOwnerTarget: 'Aldo',
          timeElapsed: 0
        });
        break;

      default:
        console.log("No custom preset matched", presetKey);
    }
  };

  // Senders/Send Logic inside text input
  const handleSendDirectMessage = () => {
    if (!typedMessage.trim()) return;
    playInteractionBeep(1100, 0.1);
    
    // Add msg to list based on device owner
    const newMsg: Message = {
      id: `m_user_${Date.now()}`,
      sender: 'me',
      text: typedMessage,
      timestamp: currentTime
    };

    setAppData(prev => {
      const isAldo = phoneOwner === 'Aldo';
      const targetListKey = isAldo ? 'chatsAldo' : 'chatsAnna';
      
      return {
        ...prev,
        [targetListKey]: prev[targetListKey].map(thread => {
          if (thread.id === activeChatId) {
            return {
              ...thread,
              messages: [...thread.messages, newMsg]
            };
          }
          return thread;
        })
      };
    });

    setTypedMessage('');
  };

  const handleFocusedChatImageChange = (url: string) => {
    if (!focusedChatImage) return;

    const listKey = focusedChatImage.owner === 'Aldo' ? 'chatsAldo' : 'chatsAnna';
    setFocusedChatImage(prev => prev ? { ...prev, url } : prev);
    setAppData(prev => ({
      ...prev,
      [listKey]: prev[listKey].map(thread => thread.id === focusedChatImage.threadId ? {
        ...thread,
        messages: thread.messages.map(message => message.id === focusedChatImage.messageId ? {
          ...message,
          image: url
        } : message)
      } : thread)
    }));
  };

  const handleFocusedChatImageUpload = async (file: File | undefined) => {
    if (!file || !focusedChatImage) return;

    setChatImageUploading(true);
    setChatImageUploadError(null);

    try {
      const url = await supabaseSync.uploadImage(file, 'messages');
      handleFocusedChatImageChange(url);
    } catch (err) {
      setChatImageUploadError(err instanceof Error ? err.message : 'Upload non riuscito.');
    } finally {
      setChatImageUploading(false);
    }
  };

  const handleFocusedPostImageChange = (url: string) => {
    if (!focusedPostId) return;

    setAppData(prev => ({
      ...prev,
      posts: prev.posts.map(post => post.id === focusedPostId ? {
        ...post,
        image: url
      } : post)
    }));
  };

  const handleFocusedPostImageUpload = async (file: File | undefined) => {
    if (!file || !focusedPostId) return;

    setPostImageUploading(true);
    setPostImageUploadError(null);

    try {
      const url = await supabaseSync.uploadImage(file, 'posts');
      handleFocusedPostImageChange(url);
    } catch (err) {
      setPostImageUploadError(err instanceof Error ? err.message : 'Upload non riuscito.');
    } finally {
      setPostImageUploading(false);
    }
  };

  const handleDeleteFocusedPost = () => {
    if (!focusedPostId) return;

    setAppData(prev => ({
      ...prev,
      posts: prev.posts.filter(post => post.id !== focusedPostId)
    }));
    setFocusedPostId(null);
    setPostImageSettingsOpen(false);
    setPostImageUploadError(null);
  };

  const handleAddPostBelowFocused = () => {
    if (!focusedPostId) return;

    const newPostId = `post_custom_${Date.now()}`;

    setAppData(prev => {
      const sourcePost = prev.posts.find(post => post.id === focusedPostId);
      if (!sourcePost) return prev;

      const sourceAuthor = getPostAuthor(sourcePost);
      const newPost: Post = {
        id: newPostId,
        authorName: sourcePost.authorName || sourceAuthor.name,
        authorUsername: sourcePost.authorUsername || sourceAuthor.username,
        authorAvatar: sourceAuthor.avatar,
        image: '',
        caption: '',
        date: 'Adesso',
        likes: 0,
        commentsCount: 0,
        location: sourcePost.location || '',
        comments: []
      };
      const insertIndex = prev.posts.findIndex(post => post.id === focusedPostId);
      const nextPosts = [...prev.posts];
      nextPosts.splice(insertIndex + 1, 0, newPost);

      return {
        ...prev,
        posts: nextPosts
      };
    });

    setFocusedPostId(newPostId);
    setPostImageSettingsOpen(true);
    setPostImageUploadError(null);
  };

  // Contacts dataset filtering resolver
  const hiddenContactNames = phoneOwner === 'Aldo'
    ? new Set(['Aldo Reni', 'Aldo', 'Conte Negroni'])
    : new Set(['Anna Calligaris', 'Anna']);
  const activeContacts = (phoneOwner === 'Aldo' ? appData.aldoContacts : appData.annaContacts)
    .filter(contact => !hiddenContactNames.has(contact.name));
  const filteredContacts = activeContacts.filter(contact => {
    const q = searchQuery.toLowerCase();
    return contact.name.toLowerCase().includes(q);
  }).sort((a, b) => a.name.localeCompare(b.name, 'it', { sensitivity: 'base' }));

  const resolveContactThreadId = (contact: Contact) => {
    if (phoneOwner === 'Aldo') {
      return contact.id === 'contact_anna' ? 'chat_anna' : 'chat_negroni';
    }

    return 'chat_negroni_anna';
  };

  // Hot simulated triggers
  const handleTriggerPopNotification = () => {
    playInteractionBeep(880, 0.35); // simulated chime
    setBannerNotificationActive(true);
    // automatic dismissal
    setTimeout(() => {
      // do not auto dismiss on movie set unless targeted, so actors can read it.
    }, 8000);
  };

  const handleUpdateMauroCalendar = (rows: CalendarShift[]) => {
    setAppData(prev => ({
      ...prev,
      mauroCalendar: rows
    }));
  };

  return (
    <div className={`min-h-screen bg-zinc-50 flex flex-col justify-between text-zinc-900 select-none ${standbyPulseActive ? 'animate-pulse border-4 border-red-500/20' : ''}`}>
      
      {/* IMMERSIVE BLACK STANDBY SCREEN FOR ALDO'S MESSAGE SCENE */}
      {standbyActive && (
        <div 
          onClick={() => {
            if (callTimerRunning) return;
            setStandbyActive(false);
            setStandbyTimerRunning(false);
            triggerWakeNotification();
          }}
          className={`cinematic-blackout z-[2147483647] flex flex-col items-center justify-center ${callTimerRunning ? 'cursor-wait' : 'cursor-pointer'}`}
        >
          {/* Extremely faint standby marker for tech crew */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-zinc-900 select-none pointer-events-none text-center">
            {callTimerRunning ? 'SCHERMO NERO PRE-CHIAMATA' : 'SCHERMO IN STANDBY DI ALDO'}<br/>
            {callTimerRunning ? `CHIAMATA IN ARRIVO TRA ${callSecondsLeft} SECONDI` : standbyTimerRunning ? `RILASCIO IN CORSO... -${standbySecondsLeft} SECONDI` : 'SVEGLIA MANUALE DISPONIBILE'}<br/>
            <span className="text-zinc-950">{callTimerRunning ? '(COUNTDOWN CHIAMATA ATTIVO)' : '(TOCCA LO SCHERMO PER RISVEGLIO RAPIDO)'}</span>
          </div>
        </div>
      )}

      {/* IMMERSIVE SMARTPHONE LOCK SCREEN WITH NEUTRAL BACKGROUND */}
      <AnimatePresence>
        {lockScreenActive && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -800 }}
            transition={{ type: 'spring', damping: 30, stiffness: 180 }}
            className="fixed inset-0 z-[99990] flex flex-col justify-between p-6 select-none text-white font-sans overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #18181b 0%, #09090b 100%)',
            }}
          >
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            {/* Status bar top */}
            <div className="relative z-10 flex justify-between items-center text-[11px] font-semibold tracking-wider text-zinc-100 px-2 pt-1 select-none">
              <div className="flex items-center gap-1.5 font-mono">
                <span>LTE</span>
                <Wifi className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-[9px]">BLOCCATO</span>
              </div>
              <div className="flex items-center gap-1 font-mono">
                <span>84%</span>
                <Battery className="w-4 h-4 text-white rotate-0" />
              </div>
            </div>

            {/* Large Cinematic Clock and Date */}
            {wakeConfig.showLockDateTime ? (
              <div className="relative z-10 flex flex-col items-center mt-12 text-center">
                <h2 className="text-7xl font-display font-light tracking-tight mt-1 mb-0.5 select-none text-white drop-shadow-xl">
                  {wakeConfig.lockScreenTime || currentTime}
                </h2>
                <span className="text-[14px] font-medium tracking-wide text-zinc-200 opacity-90 drop-shadow-sm font-sans">
                  {wakeConfig.lockScreenDate}
                </span>
              </div>
            ) : (
              <div className="relative z-10 mt-12 min-h-[98px]" />
            )}

            {/* Middle part - Interactive Notifications Area */}
            <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[420px] mx-auto w-full pt-1">
              <motion.div
                initial={{ transform: 'scale(0.92)', opacity: 0, y: 30 }}
                animate={{ transform: 'scale(1)', opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 20, delay: 0.15 }}
                onClick={() => {
                  // Direct unlock and navigate straight to chat message thread
                  playInteractionBeep(1100, 0.15);
                  setLockScreenActive(false);
                  setBannerNotificationActive(false);
                  setPhoneOwner(wakeConfig.phoneOwnerTarget);
                  setActiveScreen('chat');
                  setActiveChatId(wakeConfig.targetChatId);
                  setMobileShowActiveChat(true); // Open details panel on mobile reactively
                }}
                className="bg-white/15 backdrop-blur-[24px] border border-white/20 rounded-2xl p-4 shadow-2xl hover:scale-102 hover:bg-white/20 transition duration-300 cursor-pointer active:scale-98 relative overflow-hidden group select-none"
              >
                {/* Shiny highlight overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition duration-300" />
                
                <div className="flex gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/95 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-950/20">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 space-y-0.5 text-left">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-black tracking-widest text-emerald-400 font-mono uppercase leading-none">NUOVO MESSAGGIO</span>
                      <span className="text-[9px] text-zinc-300 font-medium font-mono lowercase">{wakeConfig.timestamp}</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-white leading-tight">{wakeConfig.senderName}</h4>
                    <p className="text-[11px] text-zinc-200 line-clamp-2 leading-snug tracking-wide font-sans mt-0.5">
                      {wakeConfig.messagePreview}
                    </p>
                  </div>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[9px] font-bold text-zinc-300 uppercase tracking-widest">
                  <span className="text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" /> {wakeConfig.notificationTitle}
                  </span>
                  <span className="opacity-80 group-hover:translate-x-1 transition-transform cursor-pointer">{wakeConfig.actionLabel}</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Panel controls for natural film handling */}
            <div className="relative z-10 max-w-[420px] mx-auto w-full flex flex-col items-center gap-4 select-none pb-4">
              
              {/* Quick bypass unlock button */}
              <button
                onClick={() => {
                  playInteractionBeep(980, 0.1);
                  setLockScreenActive(false);
                }}
                className="px-5 py-2.5 bg-black/40 hover:bg-black/60 border border-white/15 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition cursor-pointer flex items-center gap-2 backdrop-blur-md"
              >
                <span>🔓 TOCCA PER SBLOCCARE IL TELEFONO</span>
              </button>

              {/* Torch & Camera standard lock screen quick launches */}
              <div className="w-full flex justify-between px-6 select-none opacity-80">
                <button 
                  onClick={() => playInteractionBeep(700, 0.08)}
                  className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/65 transition backdrop-blur-md cursor-pointer"
                  title="Torcia"
                >
                  <Flame className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => playInteractionBeep(750, 0.08)}
                  className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/65 transition backdrop-blur-md cursor-pointer"
                  title="Fotocamera"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* IMMERSIVE SLIDE-DOWN MESSAGE NOTIFICATION */}
      <AnimatePresence>
        {bannerNotificationActive && !lockScreenActive && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={standbyPulseActive ? {
              y: 12,
              opacity: 1,
              x: [-4, 4, -4, 4, -2, 2, -1, 1, 0],
              transition: { x: { repeat: Infinity, duration: 0.22 } }
            } : { y: 12, x: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            onClick={() => {
              // Clicking the WhatsApp banner routes to the configured target chat.
              setPhoneOwner(wakeConfig.phoneOwnerTarget);
              setActiveScreen('chat');
              setActiveChatId(wakeConfig.targetChatId);
              setMobileShowActiveChat(true); // show the chat thread on mobile
              setBannerNotificationActive(false);
              playInteractionBeep(1000, 0.15);
            }}
            className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white border border-zinc-200/90 rounded-2xl p-4 shadow-xl z-[999] cursor-pointer ${
              standbyPulseActive ? 'ring-4 ring-emerald-500/40 shadow-emerald-500/20' : ''
            }`}
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] font-black tracking-wider text-emerald-800 uppercase font-mono">{wakeConfig.notificationTitle}</span>
                  <span className="text-[9px] text-zinc-400 font-bold font-mono">{wakeConfig.timestamp}</span>
                </div>
                <h4 className="text-xs font-black text-zinc-900">{wakeConfig.senderName}</h4>
                <p className="text-[11px] text-zinc-500 font-medium truncate">{wakeConfig.messagePreview}</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setBannerNotificationActive(false);
                }}
                className="p-1 text-zinc-400 hover:text-zinc-650"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLOWING CALL PILL FOR USER SHIFT NOTIFICATION WHEN VIEWING OTHER PHONE */}
      <AnimatePresence>
        {callState.type !== null && callState.phoneOwnerTarget !== phoneOwner && (
          <motion.div
            initial={{ y: -50, x: '-50%', opacity: 0 }}
            animate={{ y: 20, x: '-50%', opacity: 1 }}
            exit={{ y: -50, x: '-50%', opacity: 0 }}
            onClick={() => {
              playInteractionBeep(900, 0.15);
              setPhoneOwner(callState.phoneOwnerTarget);
            }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[9990] bg-zinc-900 border border-emerald-500/40 text-white rounded-full px-5 py-2.5 shadow-2xl hover:bg-zinc-850 transition duration-300 cursor-pointer active:scale-95 flex items-center gap-3 select-none"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
            </div>
            <div className="text-left font-sans">
              <p className="text-[9px] font-mono font-black text-emerald-400 uppercase tracking-widest leading-none">Chiamata per {callState.phoneOwnerTarget.toUpperCase()}</p>
              <p className="text-[10px] font-medium text-zinc-350 leading-tight">
                {callState.type === 'incoming' ? 'Squillo in arrivo' : callState.type === 'outgoing' ? 'Chiamata in corso' : 'Chiamata attiva'}: <strong className="text-white">{callState.callerName}</strong>
              </p>
            </div>
            <span className="text-[9px] bg-emerald-600 px-2.5 py-0.5 rounded-full text-white font-mono uppercase font-black tracking-wider shadow-sm ml-1 select-none animate-pulse">
              PASSA A {callState.phoneOwnerTarget.toUpperCase()}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN IMMERSIVE CALL INCOMING/OUTGOING EMULATOR */}
      <AnimatePresence>
        {callState.type !== null && callState.phoneOwnerTarget === phoneOwner && (
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 h-[100dvh] z-[100000] bg-zinc-950 flex flex-col justify-between px-6 pt-16 pb-10 text-white select-none text-center overflow-hidden"
          >
            {/* Visual background blurred circle decor */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-emerald-800/10 blur-[80px] pointer-events-none" />

            {/* Calling Status Details */}
            <div className="space-y-4">
              
              <div className="flex flex-col items-center pt-8 space-y-4">
                {/* Caller Huge Rounded Photo */}
                <div className="relative">
                  <div className={`w-28 h-28 rounded-full overflow-hidden border-2 border-white/90 shadow-2xl relative ${
                    callState.type === 'incoming' ? 'animate-pulse' : ''
                  }`}>
                    <img 
                      src={getContactDisplayAvatar(callState.callerName)} 
                      alt="Avatar Chiamata" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {callState.type === 'connected' && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[8px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                      ATTIVA
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-2xl font-black tracking-tight text-white">{callState.callerName}</h2>
                </div>

                <div className="pt-2 text-xs font-bold uppercase tracking-wider text-emerald-450">
                  {callState.type === 'incoming' && 'Chiamata in arrivo...'}
                  {callState.type === 'outgoing' && 'Chiamata in corso...'}
                  {callState.type === 'connected' && (
                    <div className="flex items-center justify-center gap-2 font-mono font-black text-rose-500 bg-white/5 py-1 px-4 rounded-full border border-white/10">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                      <span>
                        {Math.floor(callState.timeElapsed / 60).toString().padStart(2, '0')}:
                        {(callState.timeElapsed % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Immersive Sound waves representation */}
            <div className="h-10 flex items-center justify-center gap-1.5 max-w-[200px] mx-auto w-full">
              {callState.type === 'connected' ? (
                Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1 bg-emerald-500 rounded-full animate-pulse"
                    style={{
                      height: `${Math.floor(Math.random() * 32) + 6}px`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))
              ) : null}
            </div>

            {/* Calling action buttons */}
            <div className="flex justify-center items-center gap-16">
              {/* Decline Call (Red Dial) */}
              <button
                onClick={() => {
                  playInteractionBeep(350, 0.25);
                  setCallState(prev => ({ ...prev, type: null }));
                  stopSynthRingtone();
                }}
                className="w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-xl transition transform hover:scale-105 active:scale-95 cursor-pointer"
                title="Rifiuta o Termina"
              >
                <PhoneOff className="w-7 h-7" />
              </button>

              {/* Accept Call (Green Dial, only on incoming) */}
              {callState.type === 'incoming' && (
                <button
                  onClick={() => {
                    playInteractionBeep(920, 0.15);
                    stopSynthRingtone();
                    setCallState(prev => ({ ...prev, type: 'connected', timeElapsed: 0 }));
                  }}
                  className="w-16 h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-xl transition transform hover:scale-105 active:scale-95 cursor-pointer"
                  title="Rispondi"
                >
                  <Phone className="w-7 h-7 animate-bounce" />
                </button>
              )}
            </div>


          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN PUBLIC WEB APPLICATION CONTENT FRAME */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        <button
          type="button"
          onClick={() => {
            setMainMenuOpen(true);
            playInteractionBeep(850, 0.08);
          }}
          className="safe-menu-button fixed z-50 h-10 w-10 rounded-xl bg-white/95 border border-zinc-200 shadow-sm flex items-center justify-center text-zinc-800 hover:bg-zinc-100 transition"
          title="Apri menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <AnimatePresence>
          {mainMenuOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Chiudi menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMainMenuOpen(false)}
                className="fixed inset-0 z-[60] bg-black/25 backdrop-blur-[1px]"
              />
              <motion.div
                initial={{ x: -320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -320, opacity: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className="fixed top-0 left-0 bottom-0 z-[70] w-[300px] max-w-[86vw] bg-white border-r border-zinc-200 shadow-2xl p-4 flex flex-col gap-4 select-none"
              >
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-500">Menu</span>
                  <button
                    type="button"
                    onClick={() => setMainMenuOpen(false)}
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                    title="Chiudi"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="space-y-1 text-xs font-semibold">
                  {appNavItems.map(item => {
                    const IconComp = item.icon;
                    const isActive = activeScreen === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveScreen(item.id);
                          if (item.id === 'profile') setActiveProfileUsername(appData.annaProfile.username);
                          setFocusedPostId(null);
                          setSearchQuery('');
                          setMainMenuOpen(false);
                          playInteractionBeep(1200, 0.05);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition ${
                          isActive
                            ? 'bg-zinc-100 text-zinc-950 font-black'
                            : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-zinc-950' : 'text-zinc-400'}`} />
                          <span>{item.label}</span>
                        </span>
                        {item.badge && (
                          <span className="bg-red-500 text-white font-mono font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>

                <div className="space-y-2 border-t border-zinc-100 pt-3">
                  <span className="text-[9px] font-mono font-black uppercase tracking-widest text-zinc-400">Profili</span>
                  <div className="grid grid-cols-3 gap-2">
                    {profileShortcuts.map(profile => (
                      <button
                        key={profile.username}
                        type="button"
                        onClick={() => {
                          setMainMenuOpen(false);
                          openProfile(profile.username);
                        }}
                        className="flex flex-col items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 p-2 hover:bg-white transition"
                        title={profile.fullName}
                      >
                        <img
                          src={profile.avatar}
                          alt={profile.fullName}
                          className="h-9 w-9 rounded-full object-cover border border-zinc-200"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[9px] font-black text-zinc-700 truncate max-w-full">
                          {profile.fullName.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-zinc-200">
                  <button
                    type="button"
                    onClick={() => {
                      setMainMenuOpen(false);
                      setAdminDrawerOpen(true);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-black transition"
                  >
                    <Sliders className="w-4 h-4" />
                    <span>Strumenti Regia</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* CONTAINER VIEW FOR ALL PUBLIC SCREENS */}
        <main className="safe-app-main flex-1 overflow-y-auto p-4 sm:p-8 no-scrollbar bg-[#fafafa]">
          
          {/* SCREEN: HOME SOCIAL FEED */}
          {activeScreen === 'feed' && (
            <div className="max-w-[480px] mx-auto space-y-6">
              
              {/* Stories row slider */}
              <div className="bg-white border border-zinc-250 p-4 rounded-2xl flex gap-4 overflow-x-auto no-scrollbar">
                {[
                  { username: 'anna_calligaris_eco', avatar: appData.annaProfile.avatar, active: true },
                  { username: 'green_margherita', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
                  { username: 'eco_brian', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
                  { username: 'sveva', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', trigger: () => setActiveScreen('gallery_sveva') }
                ].map((st, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (st.trigger) {
                        st.trigger();
                      } else {
                        setActiveProfileUsername(appData.annaProfile.username);
                        setActiveScreen('profile');
                        setFocusedPostId(null);
                      }
                      playInteractionBeep(1200, 0.05);
                    }}
                    className="flex flex-col items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-full p-[2px] bg-linear-to-tr from-pink-500 to-rose-400">
                      <div className="w-full h-full rounded-full border border-white overflow-hidden bg-white">
                        <img src={st.avatar} alt="Story visual" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 truncate max-w-[55px] font-mono">{st.username}</span>
                  </div>
                ))}
              </div>

              {/* Feed items */}
              {feedPosts.map(post => {
                const author = getPostAuthor(post);
                const authorProfileAvailable = profileByUsername.has(author.username);

                return (
                <div key={post.id} className="bg-white border border-zinc-250 rounded-3xl overflow-hidden shadow-2xs">
                  {/* Item Header */}
                  <div className="p-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (authorProfileAvailable) openProfile(author.username);
                      }}
                      className={`flex items-center gap-3 text-left ${authorProfileAvailable ? 'cursor-pointer hover:opacity-80 transition' : 'cursor-default'}`}
                    >
                      <img
                        src={author.avatar}
                        alt="Profile Post" 
                        className="w-9 h-9 rounded-full object-cover border border-zinc-100 bg-zinc-100"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-black text-zinc-900">{author.username}</h4>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-[10px] text-zinc-400 font-bold">{post.location || author.name}</p>
                      </div>
                    </button>
                  </div>

                  {/* Photo content */}
                  <div 
                    onClick={() => {
                      setFocusedPostId(post.id);
                      setPostImageSettingsOpen(false);
                      setPostImageUploadError(null);
                    }}
                    className="aspect-square bg-zinc-50 border-y border-zinc-150 relative cursor-pointer group"
                  >
                    {post.image ? (
                      <img src={post.image} alt="Feed Post visual" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-zinc-100 text-zinc-400">
                        <Camera className="w-8 h-8" />
                        <span className="text-[10px] font-mono uppercase tracking-widest">Post vuoto</span>
                      </div>
                    )}
                    {post.isEvent && (
                      <span className="absolute top-4 left-4 bg-red-650 text-white font-mono font-black uppercase text-[9px] px-3 py-1.5 rounded-full tracking-wider shadow-md">
                        📅 FLASHMOB ATTIVO
                      </span>
                    )}
                  </div>

                  {/* Interactions area */}
                  <div className="p-4 space-y-2 text-xs font-medium">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <button className="p-1 text-zinc-700 hover:text-red-500 transition">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-1 text-zinc-700 hover:text-emerald-600 transition">
                          <MessageSquare className="w-5 h-5" />
                        </button>
                      </div>

                      <button className="p-1 text-zinc-700 hover:text-zinc-900 transition">
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>

                    <div>
                      <p className="text-xs font-black text-zinc-900">{post.likes} Mi piace</p>
                    </div>

                    <div className="space-y-1">
                      <p className="leading-relaxed">
                        <strong className="text-zinc-900 mr-1.5 font-bold">{author.username}</strong>
                        {post.caption || 'Descrizione da inserire'}
                      </p>
                    </div>

                    {/* Comments preview */}
                    <div className="pt-2 border-t border-zinc-100 space-y-1 text-[11px] text-zinc-500">
                      {post.comments.slice(0, 2).map((comment, index) => (
                        <p key={index}>
                          <strong className="text-zinc-950 font-bold mr-1.5 font-mono">{comment.user}</strong>
                          {comment.text}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )}

          {/* SCREEN: SEARCH / DISCOVER INTERACTIVE DIRECTORY */}
          {activeScreen === 'search' && (
            <div className="max-w-[500px] mx-auto space-y-6 select-none">
              <h2 className="text-xl font-display font-black text-zinc-900 tracking-tight">Esplora Attivisti & Movimento</h2>
              
              <div className="relative">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Digita per cercare (es. Anna Calligaris)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    playInteractionBeep(1400, 0.05);
                  }}
                  className="w-full bg-white border border-zinc-250 rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>

              <div className="bg-white border border-zinc-200 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs">
                <div>
                  <span className="text-[9px] font-mono font-black uppercase tracking-wider text-zinc-500">Risposta chiamata</span>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Vale anche per le chiamate avviate dalla rubrica.</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={callConfig.autoAnswerDelay}
                    onChange={(e) => {
                      const v = parseInt(e.target.value) || 5;
                      setCallConfig(prev => ({ ...prev, autoAnswerDelay: v }));
                      setCallAutoAnswerDelayLeft(v);
                    }}
                    className="w-16 bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-1.5 text-xs font-mono text-right focus:outline-hidden focus:border-emerald-500"
                  />
                  <span className="text-[10px] font-mono font-bold text-zinc-500">sec</span>
                </div>
              </div>

              {/* Dynamic search suggested listings */}
              {socialProfiles.filter(profile => {
                const q = searchQuery.toLowerCase();
                return q === '' || profile.fullName.toLowerCase().includes(q) || profile.username.toLowerCase().includes(q);
              }).length > 0 ? (
                <div className="bg-white border border-zinc-250 rounded-2xl overflow-hidden divide-y divide-zinc-150">
                  {socialProfiles
                    .filter(profile => {
                      const q = searchQuery.toLowerCase();
                      return q === '' || profile.fullName.toLowerCase().includes(q) || profile.username.toLowerCase().includes(q);
                    })
                    .map(profile => (
                      <div 
                        key={profile.username}
                        onClick={() => {
                          openProfile(profile.username);
                        }}
                        className="p-4 flex justify-between items-center hover:bg-zinc-50 cursor-pointer transition"
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={profile.avatar} 
                            alt="Search suggest" 
                            className="w-11 h-11 rounded-full object-cover border border-zinc-200" 
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="text-xs font-black text-zinc-900">{profile.fullName}</h3>
                              {profile.isVerified && (
                                <span className="w-3.5 h-3.5 rounded-full bg-cyan-500 flex items-center justify-center text-[7px] text-white font-extrabold font-mono font-sans font-black">
                                  ✓
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-gray-500 font-mono">@{profile.username}</p>
                          </div>
                        </div>

                        <button className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase">
                          Vedi Profilo
                        </button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs italic text-zinc-400">
                  Nessun profilo con prefisso "{searchQuery}" trovato. Svuota la ricerca per riprovare.
                </div>
              )}

              {/* Explore grid placeholder */}
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-wider text-zinc-400 uppercase font-mono">In Evidenza nella Rete</span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-square bg-zinc-200 rounded-xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-zinc-200 rounded-xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-zinc-200 rounded-xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN: SOCIAL PROFILE LAYOUT */}
          {activeScreen === 'profile' && (
            <div className="max-w-[650px] mx-auto space-y-8 select-none">
              
              {/* Profile Head Grid */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 sm:items-center bg-white border border-zinc-250 p-6 sm:p-8 rounded-3xl">
                {/* Pro Photo circle */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] bg-linear-to-tr from-emerald-500 to-cyan-400 shrink-0 mx-auto sm:mx-0">
                  <div className="w-full h-full bg-white rounded-full p-[2px]">
                    <img 
                      src={activeProfile.avatar} 
                      alt={`${activeProfile.fullName} avatar`}
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-4 text-center sm:text-left">
                  {/* Verified username section */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-center sm:justify-start">
                    <h2 className="text-lg font-black tracking-tight text-neutral-900 font-mono">
                      {activeProfile.username}
                    </h2>
                    
                    {activeProfile.isVerified && (
                      <span className="inline-flex self-center bg-cyan-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full font-sans uppercase tracking-widest">
                        ✓ VERIFICATO
                      </span>
                    )}
                  </div>

                  {/* Core stats block */}
                  <div className="flex justify-center sm:justify-start gap-8 text-xs font-semibold text-zinc-550">
                    <div>
                      <strong className="text-zinc-900 text-sm block font-black">{activeProfile.postsCount}</strong> post
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (!activeProfileFollowers.length) return;
                        setProfileListOpen(prev => prev === 'followers' ? null : 'followers');
                        playInteractionBeep(950, 0.08);
                      }}
                      className={`text-left ${activeProfileFollowers.length ? 'cursor-pointer hover:text-zinc-900' : 'cursor-default'}`}
                    >
                      <strong className="text-zinc-900 text-sm block font-black">{activeProfile.followers}</strong> follower
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!activeProfileFollowing.length) return;
                        setProfileListOpen(prev => prev === 'following' ? null : 'following');
                        playInteractionBeep(950, 0.08);
                      }}
                      className={`text-left ${activeProfileFollowing.length ? 'cursor-pointer hover:text-zinc-900' : 'cursor-default'}`}
                    >
                      <strong className="text-zinc-900 text-sm block font-black">{activeProfile.following}</strong> seguiti
                    </button>
                  </div>

                  {activeProfileList.length > 0 && profileListOpen && (
                    <div className="bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden text-left">
                      <div className="px-3 py-2 border-b border-zinc-200 text-[9px] font-mono font-black uppercase tracking-widest text-zinc-500">
                        {profileListOpen === 'followers' ? 'Follower' : 'Seguiti'}
                      </div>
                      <div className="divide-y divide-zinc-100 max-h-44 overflow-y-auto no-scrollbar">
                        {activeProfileList.map((person, index) => {
                          const canOpen = person.username ? clickableSocialUsernames.has(person.username) : false;

                          return (
                            <button
                              key={`${person.name}-${index}`}
                              type="button"
                              onClick={() => {
                                if (canOpen && person.username) openProfile(person.username);
                              }}
                              className="w-full px-3 py-2.5 text-left text-xs font-black text-zinc-900"
                            >
                              {person.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Bio descriptions */}
                  <div className="text-xs leading-relaxed text-zinc-800 text-justify">
                    <h4 className="font-bold text-zinc-900 text-xs mb-1">{activeProfile.fullName}</h4>
                    <p className="whitespace-pre-line font-medium text-zinc-600">{activeProfile.bio}</p>
                    
                    {/* Fake Bio Web Link */}
                    {activeProfile.linkLabel && (
                      <button
                        onClick={() => setActiveScreen(activeProfile.linkScreen)}
                        className="text-emerald-700 font-bold hover:underline mt-2.5 block text-left"
                      >
                        🔗 {activeProfile.linkLabel}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Story Highlights simulated badges */}
              <div className="flex gap-4 overflow-x-auto no-scrollbar py-1">
                {activeProfile.highlights.map((high, i) => (
                  <div 
                    key={i} 
                    onClick={() => {
                      if (activeProfile.username === appData.annaProfile.username && high.label === "FlashMob") setActiveScreen('feed');
                      playInteractionBeep(800, 0.1);
                    }}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-lg bg-white shadow-3xs">
                      {high.icon}
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 font-mono">{high.label}</span>
                  </div>
                ))}
              </div>

              {/* Profile Posts continuous or Grid trigger deck */}
              <div className="space-y-4">
                {profileViewMode === 'feed' && (
                  <button 
                    onClick={() => {
                      setProfileViewMode('grid');
                      playInteractionBeep(900, 0.1);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg text-[10px] font-black uppercase tracking-wider transition w-fit mb-4 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 inline align-middle" /> Torna alla griglia
                  </button>
                )}

                {/* Content selector */}
                {profileViewMode === 'grid' ? (
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {activeProfilePosts.map(post => (
                      <div
                        key={post.id}
                        onClick={() => {
                          setProfileViewMode('feed');
                          playInteractionBeep(1100, 0.1);
                        }}
                        className="aspect-square bg-zinc-100 rounded-2xl overflow-hidden cursor-pointer border border-zinc-200 hover:border-emerald-600 transition group relative"
                      >
                        {post.image ? (
                          <img
                            src={post.image}
                            alt="Thumbnail Profile"
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-400">
                            <Camera className="w-5 h-5" />
                          </div>
                        )}
                        {post.isEvent && (
                          <span className="absolute top-2 left-2 bg-red-600 text-white font-mono font-black uppercase text-[8px] px-2 py-0.5 rounded">
                            EVENTO
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6 max-w-[480px] mx-auto">
                    {activeProfilePosts.map(post => {
                      const author = getPostAuthor(post);

                      return (
                      <div key={post.id} className="bg-white border border-zinc-250 rounded-2xl overflow-hidden">
                        <div className="p-3 bg-zinc-50/50 border-b border-zinc-100 flex items-center gap-2">
                          <img src={author.avatar} className="w-6 h-6 rounded-full object-cover bg-zinc-100" />
                          <span className="text-[11px] font-extrabold text-zinc-800">{author.username}</span>
                        </div>
                        {post.image ? (
                          <img
                            src={post.image}
                            onClick={() => {
                              setFocusedPostId(post.id);
                              setPostImageSettingsOpen(false);
                              setPostImageUploadError(null);
                            }}
                            className="w-full h-64 object-cover cursor-zoom-in"
                          />
                        ) : (
                          <div
                            onClick={() => {
                              setFocusedPostId(post.id);
                              setPostImageSettingsOpen(false);
                              setPostImageUploadError(null);
                            }}
                            className="w-full h-64 flex items-center justify-center bg-zinc-100 text-zinc-400 cursor-zoom-in"
                          >
                            <Camera className="w-6 h-6" />
                          </div>
                        )}
                        <div className="p-4 text-xs">
                          <p>{post.caption || 'Descrizione da inserire'}</p>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SCREEN: DIRECT PRIVATE MESSAGES */}
          {activeScreen === 'chat' && (
            <div className="max-w-[750px] mx-auto bg-white border border-zinc-250 rounded-3xl shadow-xs overflow-hidden flex h-[580px] select-none relative">
              
              {/* Left Column: Chats list (on-the-fly toggled by who owns the active phone) */}
              <div className={`w-full md:w-1/3 border-r border-zinc-200 flex flex-col justify-between ${mobileShowActiveChat ? 'hidden md:flex' : 'flex'}`}>
                <div>
                  <div className="p-4 border-b border-zinc-200 bg-zinc-50/50">
                    <h3 className="text-sm font-black text-zinc-900 flex items-center gap-1.5 leading-none">
                      <MessageSquare className="w-4.5 h-4.5 text-zinc-500" />
                      <span>Cassetta Posta</span>
                    </h3>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase mt-1 leading-none">Owner: {phoneOwner.toUpperCase()}</p>
                  </div>

                  <div className="divide-y divide-zinc-100 max-h-[480px] overflow-y-auto no-scrollbar">
                  {(phoneOwner === 'Aldo' ? appData.chatsAldo : appData.chatsAnna).map(thread => {
                    const isSelected = activeChatId === thread.id;
                    const threadAvatar = thread.name === 'Conte Negroni' ? CONTACT_PLACEHOLDER_AVATAR : thread.avatar;
                    
                    return (
                        <div
                          key={thread.id}
                          onClick={() => {
                            setActiveChatId(thread.id);
                            setMobileShowActiveChat(true); // Open details panel on mobile
                            playInteractionBeep(1100, 0.08);
                          }}
                          className={`p-3 flex items-center gap-3 cursor-pointer transition ${
                            isSelected ? 'bg-zinc-100' : 'hover:bg-zinc-50/50'
                          }`}
                        >
                          <img 
                            src={threadAvatar} 
                            alt={thread.name} 
                            className="w-10 h-10 rounded-full object-cover border border-zinc-200"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-black text-zinc-900 truncate">{thread.name}</h4>
                            <p className="text-[10px] text-zinc-400 font-mono truncate">@{thread.username}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Active Conversation viewport */}
              {(() => {
                const activeThread = (phoneOwner === 'Aldo' ? appData.chatsAldo : appData.chatsAnna)
                  .find(t => t.id === activeChatId);
                const activeThreadAvatar = activeThread?.name === 'Conte Negroni' ? CONTACT_PLACEHOLDER_AVATAR : activeThread?.avatar;

                return (
                  <div className={`w-full md:flex-1 flex flex-col justify-between bg-[#fafafa] ${mobileShowActiveChat ? 'flex' : 'hidden md:flex'}`}>
                    {activeThread ? (
                      <>
                        {/* Conversation Header */}
                        <div className="p-4 bg-white border-b border-zinc-200 flex justify-between items-center shrink-0">
                          <div className="flex items-center gap-3">
                            {/* Back arrow on mobile */}
                            <button
                              onClick={() => {
                                setMobileShowActiveChat(false);
                                playInteractionBeep(920, 0.1);
                              }}
                              className="md:hidden p-1.5 text-zinc-650 hover:text-zinc-950 -ml-1 rounded-lg hover:bg-zinc-100 transition mr-1 cursor-pointer"
                              title="Indietro alla lista"
                            >
                              <ChevronLeft className="w-5 h-5 align-middle" />
                            </button>

                            <img 
                              src={activeThreadAvatar} 
                              alt={activeThread.name} 
                              className="w-9 h-9 rounded-full object-cover border border-zinc-200"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <h4 className="text-xs font-black text-zinc-900">{activeThread.name}</h4>
                              <p className="text-[9px] text-emerald-600 font-semibold uppercase">{activeThread.status}</p>
                            </div>
                          </div>

                          {/* Dial output button */}
                          <button
                            onClick={() => {
                              setCallState({
                                callerName: activeThread.name,
                                callerNumber: activeThread.name === 'Aldo Reni' || activeThread.name === 'Aldo' ? '+39 328 110 4492' : '+39 335 881 7711',
                                callerAvatar: getContactDisplayAvatar(activeThread.name),
                                type: 'outgoing',
                                phoneOwnerTarget: phoneOwner,
                                timeElapsed: 0
                              });
                            }}
                            className="p-2 bg-zinc-100 hover:bg-emerald-100 text-zinc-650 hover:text-emerald-800 rounded-xl transition cursor-pointer"
                            title="Avvia Chiamata Outgoing"
                          >
                            <Phone className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Message log items area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
                          {activeThread.messages.map((msg, i) => {
                            const isMe = msg.sender === 'me';
                            
                            return (
                              <div
                                key={msg.id || i}
                                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                              >
                                <div className={`max-w-[70%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed space-y-1 shadow-3xs ${
                                  isMe 
                                    ? 'bg-emerald-600 text-white rounded-br-none' 
                                    : 'bg-white text-zinc-900 border border-zinc-150 rounded-bl-none'
                                }`}>
                                  
                                  {/* Text content if present */}
                                  {msg.text && <p className="font-medium">{msg.text}</p>}

                                  {/* Image attachments selfie / photos preview */}
                                  {msg.image && (
                                    <div 
                                      onClick={() => {
                                        setFocusedChatImage({
                                          url: msg.image || '',
                                          owner: phoneOwner,
                                          threadId: activeThread.id,
                                          messageId: msg.id
                                        });
                                        setChatImageSettingsOpen(false);
                                      }}
                                      className="relative aspect-square max-w-[160px] rounded-xl overflow-hidden cursor-zoom-in border border-zinc-100/30"
                                    >
                                      <img 
                                        src={msg.image} 
                                        alt="Chat received attachment" 
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                      />
                                      <span className="absolute bottom-1 right-1 bg-black/60 text-white font-mono text-[8px] px-1.5 py-0.5 rounded font-bold">
                                        Zoom 🔍
                                      </span>
                                    </div>
                                  )}

                                  {/* Simulated Voice Message waveform */}
                                  {msg.voiceDuration && (
                                    <div className="flex items-center gap-2.5 py-1 min-w-[200px]">
                                      <button
                                        onClick={handlePlayVoiceSimulated}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition ${
                                          isMe 
                                            ? 'bg-white text-emerald-800 hover:bg-zinc-100' 
                                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                                        }`}
                                      >
                                        {voiceIsPlaying ? (
                                          <Pause className="w-3.5 h-3.5 fill-current" />
                                        ) : (
                                          <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                                        )}
                                      </button>

                                      <div className="flex-1 space-y-1">
                                        {/* Wave ticks */}
                                        <div className="h-6 flex items-center gap-0.5">
                                          {Array.from({ length: 18 }).map((_, waveIdx) => {
                                            const activeFillColors = voiceProgress > (waveIdx * 5.5);
                                            return (
                                              <span
                                                key={waveIdx}
                                                className={`w-[2.5px] rounded-full transition-all duration-100`}
                                                style={{
                                                  height: `${Math.floor(Math.sin((waveIdx + 1) * 0.5) * 14) + 6}px`,
                                                  backgroundColor: activeFillColors
                                                    ? (isMe ? '#ffffff' : '#047857') // full emerald
                                                    : (isMe ? '#a7f3d0' : '#d1d5db') // faded
                                                }}
                                              />
                                            );
                                          })}
                                        </div>

                                        <div className="flex justify-between text-[8px] font-mono tracking-wider">
                                          <span>0:42</span>
                                          <span className="font-extrabold uppercase uppercase">Vocale Anna</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  <div className="flex justify-end gap-1 items-center text-[8px] opacity-80 font-mono">
                                    <span>{msg.timestamp}</span>
                                    {isMe && <CheckCheck className="w-3 h-3" />}
                                  </div>

                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Live input text messaging bar */}
                        <div className="p-4 bg-white border-t border-zinc-200 shrink-0">
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              placeholder="Scrivi un messaggio in italiano..."
                              value={typedMessage}
                              onChange={(e) => setTypedMessage(e.target.value)}
                              onFocus={() => {
                                playInteractionBeep(1000, 0.05);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSendDirectMessage();
                                }
                              }}
                              className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-hidden focus:border-emerald-600 focus:bg-white transition font-medium"
                            />
                            <button 
                              onClick={handleSendDirectMessage}
                              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition cursor-pointer"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="p-8 text-center text-xs italic text-zinc-400">
                        Nessun thread selezionato. Clicca su un contatto a sinistra.
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* SCREEN: CONTACTS / PHONEBOOK */}
          {activeScreen === 'contacts' && (
            <div className="max-w-[500px] mx-auto space-y-6 select-none">
              <div className="flex justify-between items-baseline">
                <div>
                  <h2 className="text-xl font-display font-black text-zinc-900 tracking-tight">Rubrica Contatti</h2>
                </div>
                <span className="text-[9px] font-mono px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-full font-bold text-zinc-500 uppercase">
                  {filteredContacts.length} record
                </span>
              </div>

              {/* Filtering prefisso or search name inputs */}
              <div className="relative">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Filtra contatti per nome..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    playInteractionBeep(1400, 0.05);
                  }}
                  className="w-full bg-white border border-zinc-250 rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>

              {/* Scrollable contact card blocks */}
              <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden divide-y divide-zinc-100 shadow-2xs">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map(contact => (
                    <div key={contact.id} className="p-4 flex justify-between items-center hover:bg-zinc-50/50 transition duration-150">
                      
                      <div className="flex items-center gap-3">
                        <img 
                          src={getContactDisplayAvatar(contact.name)} 
                          alt={contact.name} 
                          className="w-10 h-10 rounded-full object-cover border border-zinc-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h3 className="text-xs font-black text-zinc-950 font-sans">{contact.name}</h3>
                        </div>
                      </div>

                      {/* Messaging or Calling triggers */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setActiveScreen('chat');
                            setActiveChatId(resolveContactThreadId(contact));
                            playInteractionBeep(1100, 0.08);
                          }}
                          className="p-2 transition bg-zinc-50 hover:bg-zinc-100 text-zinc-500 hover:text-emerald-700 rounded-lg"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            setLockScreenActive(false);
                            setBannerNotificationActive(false);
                            setStandbyActive(false);
                            setStandbyTimerRunning(false);
                            setCallAutoAnswerDelayLeft(callConfig.autoAnswerDelay);
                            setCallState({
                              callerName: contact.name,
                              callerNumber: contact.phone,
                              callerAvatar: getContactDisplayAvatar(contact.name),
                              type: 'outgoing',
                              phoneOwnerTarget: phoneOwner,
                              timeElapsed: 0
                            });
                          }}
                          className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg transition"
                          title="Dial Call Outgoing"
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-xs italic text-zinc-400">
                    Nessun contatto corrispondente trovato.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* SCREEN: DIGITAL NEWSPAPER (TABLET PORTAL) */}
          {activeScreen === 'newspaper' && (
            <NewspaperView 
              newspaper={appData.newspaper} 
              onBackFeed={() => setActiveScreen('profile')}
            />
          )}

          {/* SCREEN: CLINIC CALENDAR PLANNER (MAURO'S COMPUTER WORKSTATION) */}
          {activeScreen === 'calendar' && (
            <CalendarView 
              rows={appData.mauroCalendar}
              onBackFeed={() => setActiveScreen('feed')}
              onUpdateRows={handleUpdateMauroCalendar}
            />
          )}

          {/* SCREEN: SVEVA ALBUUM / DAUGHTER SOFIA CHILHOOD VISUALS */}
          {activeScreen === 'gallery_sveva' && (
            <SvevaGalleryView 
              photos={appData.svevaGallery}
              onBackFeed={() => setActiveScreen('feed')}
            />
          )}

        </main>
      </div>
      {/* FULLSCREEN LIGHTBOX FOR SOCIAL POST IMAGES */}
      <AnimatePresence>
        {focusedPostId !== null && focusedPostId !== 'selfie_zoom' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setFocusedPostId(null);
              setPostImageSettingsOpen(false);
            }}
            className="fixed inset-0 bg-black z-[9999] flex items-center justify-center text-white cursor-zoom-out"
          >
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPostImageSettingsOpen(prev => !prev);
                }}
                className="h-10 w-10 bg-black/55 hover:bg-black/80 text-white rounded-full transition flex items-center justify-center border border-white/10"
                title="Impostazioni immagine"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFocusedPostId(null);
                  setPostImageSettingsOpen(false);
                }}
                className="h-10 w-10 bg-black/55 hover:bg-black/80 text-white rounded-full transition flex items-center justify-center border border-white/10"
                title="Chiudi"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {(() => {
              const activePost = appData.posts.find(p => p.id === focusedPostId);
              if (!activePost) return null;

              return (
                <>
                  {postImageSettingsOpen && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-16 right-4 z-20 w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-zinc-950/95 p-3 shadow-2xl cursor-default"
                    >
                      <label className="block space-y-2">
                        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-400">URL immagine post</span>
                        <input
                          type="text"
                          value={activePost.image}
                          onChange={(e) => handleFocusedPostImageChange(e.target.value)}
                          className="w-full rounded-lg border border-zinc-800 bg-black px-3 py-2 text-xs font-mono text-white focus:outline-hidden focus:border-emerald-500"
                        />
                      </label>

                      <label className={`relative mt-3 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-[10px] font-mono font-black uppercase tracking-widest transition ${
                        supabaseSync.enabled && !postImageUploading
                          ? 'cursor-pointer border-emerald-700 bg-emerald-950/40 text-emerald-200 hover:bg-emerald-900/50'
                          : 'cursor-not-allowed border-zinc-800 bg-zinc-900 text-zinc-500'
                      }`}>
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>
                          {!supabaseSync.enabled
                            ? 'Configura Supabase per caricare'
                            : postImageUploading
                              ? 'Caricamento...'
                              : 'Carica su Supabase'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={!supabaseSync.enabled || postImageUploading}
                          onChange={(e) => {
                            handleFocusedPostImageUpload(e.target.files?.[0]);
                            e.currentTarget.value = '';
                          }}
                          className="absolute inset-0 h-full w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        />
                      </label>

                      {postImageUploadError && (
                        <p className="mt-2 text-[10px] font-semibold text-red-300">
                          {postImageUploadError}
                        </p>
                      )}

                      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-zinc-800 pt-3">
                        <button
                          type="button"
                          onClick={handleAddPostBelowFocused}
                          className="flex items-center justify-center gap-1.5 rounded-lg border border-cyan-700 bg-cyan-950/40 px-3 py-2 text-[10px] font-mono font-black uppercase tracking-widest text-cyan-200 hover:bg-cyan-900/50 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Aggiungi sotto</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleDeleteFocusedPost}
                          className="flex items-center justify-center gap-1.5 rounded-lg border border-red-800 bg-red-950/50 px-3 py-2 text-[10px] font-mono font-black uppercase tracking-widest text-red-200 hover:bg-red-900/60 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Elimina post</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="h-full w-full flex items-center justify-center"
                  >
                    {activePost.image ? (
                      <img
                        src={activePost.image}
                        alt="Post fullscreen"
                        className="max-h-full max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 text-zinc-500">
                        <Camera className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN LIGHTBOX FOR CHAT IMAGE ATTACHMENTS */}
      <AnimatePresence>
        {focusedChatImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setFocusedChatImage(null);
              setChatImageSettingsOpen(false);
            }}
            className="fixed inset-0 bg-black z-[9999] flex items-center justify-center text-white cursor-zoom-out"
          >
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setChatImageSettingsOpen(prev => !prev);
                }}
                className="h-10 w-10 bg-black/55 hover:bg-black/80 text-white rounded-full transition flex items-center justify-center border border-white/10"
                title="Impostazioni immagine"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFocusedChatImage(null);
                  setChatImageSettingsOpen(false);
                }}
                className="h-10 w-10 bg-black/55 hover:bg-black/80 text-white rounded-full transition flex items-center justify-center border border-white/10"
                title="Chiudi"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {chatImageSettingsOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-16 right-4 z-20 w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-zinc-950/95 p-3 shadow-2xl cursor-default"
              >
                <label className="block space-y-2">
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-400">URL immagine</span>
                  <input
                    type="text"
                    value={focusedChatImage.url}
                    onChange={(e) => handleFocusedChatImageChange(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-black px-3 py-2 text-xs font-mono text-white focus:outline-hidden focus:border-emerald-500"
                  />
                </label>

                <label className={`relative mt-3 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-[10px] font-mono font-black uppercase tracking-widest transition ${
                  supabaseSync.enabled && !chatImageUploading
                    ? 'cursor-pointer border-emerald-700 bg-emerald-950/40 text-emerald-200 hover:bg-emerald-900/50'
                    : 'cursor-not-allowed border-zinc-800 bg-zinc-900 text-zinc-500'
                }`}>
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>
                    {!supabaseSync.enabled
                      ? 'Configura Supabase per caricare'
                      : chatImageUploading
                        ? 'Caricamento...'
                        : 'Carica su Supabase'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={!supabaseSync.enabled || chatImageUploading}
                    onChange={(e) => {
                      handleFocusedChatImageUpload(e.target.files?.[0]);
                      e.currentTarget.value = '';
                    }}
                    className="absolute inset-0 h-full w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                </label>

                {chatImageUploadError && (
                  <p className="mt-2 text-[10px] font-semibold text-red-300">
                    {chatImageUploadError}
                  </p>
                )}
              </div>
            )}

            <div
              onClick={(e) => e.stopPropagation()}
              className="h-full w-full flex items-center justify-center"
            >
              <img 
                src={focusedChatImage.url}
                alt="Zoomed chat attachment"
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REGIA DRAWER COMPONENT - TRIGGERED VIA INVISIBLE SETTINGS BURGER */}
      <DirectorDrawer
        isOpen={adminDrawerOpen}
        onClose={() => setAdminDrawerOpen(false)}
        appData={appData}
        setAppData={setAppData}
        socialProfileAvatars={socialProfileAvatars}
        setSocialProfileAvatars={setSocialProfileAvatars}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        ringerEnabled={ringerEnabled}
        setRingerEnabled={setRingerEnabled}
        phoneOwner={phoneOwner}
        setPhoneOwner={setPhoneOwner}
        triggerScenePreset={triggerScenePreset}
        imagePresets={imagePresets}
        standbyActive={standbyActive}
        setStandbyActive={setStandbyActive}
        standbyTimerRunning={standbyTimerRunning}
        setStandbyTimerRunning={setStandbyTimerRunning}
        standbySecondsLeft={standbySecondsLeft}
        setStandbySecondsLeft={setStandbySecondsLeft}
        standbyTotalSeconds={standbyTotalSeconds}
        setStandbyTotalSeconds={setStandbyTotalSeconds}
        wakeConfig={wakeConfig}
        setWakeConfig={setWakeConfig}
        triggerWakeNotification={triggerWakeNotification}
        triggerVoiceMessageReceipt={triggerVoiceMessageReceipt}
        lockScreenActive={lockScreenActive}
        setLockScreenActive={setLockScreenActive}
        lockScreenWallpaper={lockScreenWallpaper}
        setLockScreenWallpaper={setLockScreenWallpaper}
        callTimerRunning={callTimerRunning}
        setCallTimerRunning={setCallTimerRunning}
        callSecondsLeft={callSecondsLeft}
        setCallSecondsLeft={setCallSecondsLeft}
        callTotalSeconds={callTotalSeconds}
        setCallTotalSeconds={setCallTotalSeconds}
        callConfig={callConfig}
        setCallConfig={setCallConfig}
        callNoAnswerSecondsLeft={callNoAnswerSecondsLeft}
        callState={callState}
        setCallState={setCallState}
        supabaseSync={supabaseSync}
      />

      {/* SIMULATED SYSTEM KEYBOARD PANEL */}
      <AnimatePresence>
        {keyboardOpen && (
          <motion.div
            initial={{ y: 350 }}
            animate={{ y: 0 }}
            exit={{ y: 350 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 md:left-auto md:right-auto md:w-[450px] md:left-1/2 md:-translate-x-1/2 bg-zinc-100 border-t border-zinc-300 p-2 pb-5 z-55 select-none shadow-2xl rounded-t-2xl"
          >
            {/* Keyboard utility bar */}
            <div className="flex justify-between items-center px-2 py-1 mb-1.5 text-zinc-500 font-bold border-b border-zinc-200">
              <span className="text-[9px] font-mono tracking-wider uppercase text-zinc-400">Tastiera Social (Prop Cinematografico)</span>
              <button 
                onClick={() => {
                  setKeyboardOpen(false);
                  playInteractionBeep(855, 0.08);
                }}
                className="px-2.5 py-1 bg-white hover:bg-zinc-50 border border-zinc-300 text-zinc-800 rounded-md text-[9px] font-black uppercase transition cursor-pointer"
              >
                Chiudi ✕
              </button>
            </div>

            {/* QWERTY matrix */}
            <div className="space-y-1">
              {/* Row 1 */}
              <div className="flex justify-center gap-1">
                {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map(key => (
                  <button
                    key={key}
                    onClick={() => {
                      setTypedMessage(prev => prev + key);
                      playInteractionBeep(1000, 0.04);
                    }}
                    className="flex-1 max-w-[38px] aspect-square rounded-md bg-white hover:bg-zinc-50 border border-zinc-250 text-xs font-bold text-zinc-850 shadow-3xs uppercase flex items-center justify-center cursor-pointer active:scale-95 transition"
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Row 2 */}
              <div className="flex justify-center gap-1 px-2.5">
                {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map(key => (
                  <button
                    key={key}
                    onClick={() => {
                      setTypedMessage(prev => prev + key);
                      playInteractionBeep(1000, 0.04);
                    }}
                    className="flex-1 max-w-[38px] aspect-square rounded-md bg-white hover:bg-zinc-50 border border-zinc-250 text-xs font-bold text-zinc-850 shadow-3xs uppercase flex items-center justify-center cursor-pointer active:scale-95 transition"
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Row 3 */}
              <div className="flex justify-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    playInteractionBeep(1100, 0.05);
                  }}
                  className="px-2.5 rounded-md bg-zinc-200 border border-zinc-250 text-xs font-bold text-zinc-800 cursor-pointer active:scale-95 transition"
                >
                  ⇧
                </button>
                {["z", "x", "c", "v", "b", "n", "m"].map(key => (
                  <button
                    key={key}
                    onClick={() => {
                      setTypedMessage(prev => prev + key);
                      playInteractionBeep(1000, 0.04);
                    }}
                    className="flex-1 max-w-[38px] aspect-square rounded-md bg-white hover:bg-zinc-50 border border-zinc-250 text-xs font-bold text-zinc-850 shadow-3xs uppercase flex items-center justify-center cursor-pointer active:scale-95 transition"
                  >
                    {key}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setTypedMessage(prev => prev.slice(0, -1));
                    playInteractionBeep(700, 0.06);
                  }}
                  className="px-2.5 rounded-md bg-zinc-200 border border-zinc-250 text-[10px] font-bold text-zinc-800 cursor-pointer active:scale-95 transition"
                >
                  ⌫
                </button>
              </div>

              {/* Row 4 (Space bar & Invio) */}
              <div className="flex gap-1.5 px-4 mt-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setTypedMessage(prev => prev + " ");
                    playInteractionBeep(920, 0.04);
                  }}
                  className="flex-1 py-2.5 rounded-md bg-white hover:bg-zinc-50 border border-zinc-250 text-xs font-bold text-zinc-850 shadow-3xs cursor-pointer active:scale-95 transition"
                >
                  Spazio
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleSendDirectMessage();
                    setKeyboardOpen(false);
                  }}
                  className="px-4 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-700 border border-emerald-700 text-xs font-black text-white shadow-3xs uppercase cursor-pointer"
                >
                  Invia
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
