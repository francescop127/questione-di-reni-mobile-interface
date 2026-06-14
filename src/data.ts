export interface Post {
  id: string;
  authorName?: string;
  authorUsername?: string;
  authorAvatar?: string;
  image: string;
  caption: string;
  date: string;
  likes: number;
  commentsCount: number;
  comments: { user: string; text: string }[];
  location?: string;
  isEvent?: boolean;
  eventDetails?: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  recentCallDate?: string;
  recentCallType?: 'incoming' | 'outgoing' | 'missed';
  recentCallDuration?: string;
}

export interface Message {
  id: string;
  sender: 'me' | 'other';
  text?: string;
  image?: string;
  voiceDuration?: string; // e.g. "0:42" if it is a voice message
  voicePlayed?: boolean;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  name: string;
  username: string;
  avatar: string;
  status: string;
  messages: Message[];
}

export interface NewspaperContent {
  journalTitle: string;
  articleHeadline: string;
  articleSubtitle: string;
  publicationDate: string;
  authorName: string;
  mainImage: string;
  paragraphs: string[];
}

export interface CalendarShift {
  id: string;
  day: number;
  title: string;
  time: string;
  type: 'night' | 'day' | 'on-call' | 'rest';
  location: string;
}

export interface SvevaPhoto {
  id: string;
  url: string;
  caption: string;
  likes: number;
  commentsCount: number;
}

export interface VoiceNotification {
  senderName: string;
  messagePreview: string;
  timeStr: string;
  durationStr: string;
}

export interface AppData {
  annaProfile: {
    username: string;
    fullName: string;
    avatar: string;
    bio: string;
    followers: number;
    following: number;
    postsCount: number;
    isVerified: boolean;
  };
  posts: Post[];
  aldoContacts: Contact[];
  annaContacts: Contact[];
  chatHistory: Message[]; // fallback
  chatsAldo: ChatThread[];
  chatsAnna: ChatThread[];
  newspaper: NewspaperContent;
  mauroCalendar: CalendarShift[];
  svevaGallery: SvevaPhoto[];
  voiceNotification: VoiceNotification;
}

export const INITIAL_DATA: AppData = {
  annaProfile: {
    username: "anna_calligaris_eco",
    fullName: "Anna Calligaris",
    avatar: "/img/Foto Anna (Ronchi)/profilo.jpeg",
    bio: "🚴‍♀️ In sella alla mia bici verso un futuro sostenibile.\n🌿 Attivista per la difesa degli animali e dell'ambiente.\n📍 Spostarsi senza inquinare è una scelta quotidiana.",
    followers: 124,
    following: 89,
    postsCount: 24,
    isVerified: true
  },
  posts: [
    {
      id: "post_contact_conte_negroni_empty",
      authorName: "Conte Negroni",
      authorUsername: "conte_negroni",
      authorAvatar: "/img/Foto Anna (Ronchi)/post_bicycle.jpeg",
      image: "",
      caption: "",
      date: "Adesso",
      likes: 0,
      commentsCount: 0,
      location: "",
      comments: []
    },
    {
      id: "post_contact_aldo_empty",
      authorName: "Aldo",
      authorUsername: "aldo_reni",
      authorAvatar: "/img/Foto Anna (Ronchi)/post_dog_rescue.jpeg",
      image: "",
      caption: "",
      date: "Adesso",
      likes: 0,
      commentsCount: 0,
      location: "",
      comments: []
    },
    {
      id: "post_contact_mamma_empty",
      authorName: "Mamma",
      authorUsername: "mamma_anna",
      authorAvatar: "/img/Foto Anna (Ronchi)/post_solar_panels.jpeg",
      image: "",
      caption: "",
      date: "Adesso",
      likes: 0,
      commentsCount: 0,
      location: "",
      comments: []
    },
    {
      id: "post_contact_enpa_empty",
      authorName: "ENPA Sede Centrale",
      authorUsername: "enpa_sede",
      authorAvatar: "/img/Foto Anna (Ronchi)/post_zerowaste.jpeg",
      image: "",
      caption: "",
      date: "Adesso",
      likes: 0,
      commentsCount: 0,
      location: "",
      comments: []
    },
    {
      id: "post_contact_tommaso_empty",
      authorName: "Tommaso (Attivista Milano)",
      authorUsername: "tommaso_attivista",
      authorAvatar: "/img/Foto Anna (Ronchi)/post_flashmob.jpeg",
      image: "",
      caption: "",
      date: "Adesso",
      likes: 0,
      commentsCount: 0,
      location: "",
      comments: []
    },
    {
      id: "post_flashmob",
      image: "/img/Foto Anna (Ronchi)/post_flashmob.jpeg",
      caption: "🔴 STOP VIVISEZIONE! Non possiamo più restare in silenzio di fronte a questa crudeltà. Domani scendiamo in piazza per dare voce a chi non ce l'ha. Vi aspetto numerosi, portate cartelli e tanta energia positiva. Condividete il più possibile!",
      date: "Oggi, 12:30",
      likes: 47,
      commentsCount: 9,
      location: "Piazza Celli, Roma",
      comments: [
        { user: "eco_brian", text: "Presente! Condivido subito nei gruppi universitari." },
        { user: "green_margherita", text: "Porto altri 3 amici con me. Fermiamo questo scempio!" },
        { user: "claudio_valle", text: "Finalmente qualcuno che si muove a Piazza Celli. Ci vediamo lì." }
      ]
    },
    {
      id: "post_bicycle",
      image: "/img/Foto Anna (Ronchi)/post_bicycle.jpeg",
      caption: "Libertà è una strada sterrata, il vento in faccia e zero emissioni. 🚴‍♀️ Oggi ho fatto 45km scoprendo sentieri dimenticati. La terra non ci appartiene, ne siamo solo custodi temporanei.",
      date: "2 giorni fa",
      likes: 38,
      commentsCount: 4,
      location: "Aniene Trail, Tivoli",
      comments: [
        { user: "stefano_run", text: "Splendido posto Anna! Che itinerario hai seguito?" },
        { user: "bici_lifestyle", text: "Grande! Bellissima foto e bellissima filosofia di vita." }
      ]
    },
    {
      id: "post_eco_quote",
      image: "/img/Foto Anna (Ronchi)/post_eco_quote.jpeg",
      caption: "Spesso camminiamo nella natura selvaggia sognando spiagge esotiche, ma dimentichiamo che la bellezza più pura è proprio dietro casa. Impariamo a viaggiare leggeri, a piedi o su due ruote. 🌍💚",
      date: "5 giorni fa",
      likes: 51,
      commentsCount: 2,
      location: "Vigneti di Montefiascone",
      comments: [
        { user: "lucia_nature", text: "Concordo pienamente. Viaggiare a chilometro zero apre gli occhi." }
      ]
    },
    {
      id: "post_dog_rescue",
      image: "/img/Foto Anna (Ronchi)/post_dog_rescue.jpeg",
      caption: "Incontri speciali durante la ronda mattutina al rifugio locale. 🐾 Ogni sguardo recuperato dice più di mille parole. Adottate, non comprate, date a queste anime una seconda possibilità!",
      date: "1 settimana fa",
      likes: 64,
      commentsCount: 6,
      location: "Santuario Animali Selci",
      comments: [
        { user: "amici_animali", text: "Lavoro straordinario Anna! Quel cucciolo ha degli occhi dolcissimi." },
        { user: "martina_p", text: "Ci passerò questo weekend per dare una mano!" }
      ]
    },
    {
      id: "post_forest_cleanup",
      image: "/img/Foto Anna (Ronchi)/post_forest_cleanup.jpeg",
      caption: "Oggi con il gruppo locale abbiamo riempito ben 15 sacchi di plastica abbandonata nei boschi della Costiera. Un piccolo gesto collettivo per guarire la nostra terra ferita. 🌳🎒",
      date: "10 giorni fa",
      likes: 42,
      commentsCount: 3,
      location: "Macchia Grande di Focene",
      comments: [
        { user: "eco_brian", text: "Grazie a tutti per la straordinaria partecipazione attiva!" }
      ]
    },
    {
      id: "post_vegan_picnic",
      image: "/img/Foto Anna (Ronchi)/post_vegan_picnic.jpeg",
      caption: "Alimentazione consapevole, cruelty-free e a impatto zero. Un delizioso picnic vegano autoprodotto all'ombra degli ulivi secolari. Mangiare sano fa bene a noi e al pianeta! 🍇🥗",
      date: "2 settimane fa",
      likes: 59,
      commentsCount: 5,
      location: "Ulivi Secolari di Sabina",
      comments: [
        { user: "green_margherita", text: "La torta salata con le zucchine biologiche era favolosa!" },
        { user: "claudio_valle", text: "Ricetta subito! Dobbiamo fare più eventi così." }
      ]
    },
    {
      id: "post_zerowaste",
      image: "/img/Foto Anna (Ronchi)/post_zerowaste.jpeg",
      caption: "Rispettare l'ambiente significa anche ridurre gli imballaggi al minimo. Oggi spesa sfusa e barattoli riutilizzabili per azzerare la plastica monouso. 🫙🌾 Ogni piccolo passo conta infinitamente!",
      date: "2 settimane fa",
      likes: 72,
      commentsCount: 4,
      location: "Mercato Biologico Trullo",
      comments: [
        { user: "eco_brian", text: "Bellissima iniziativa! Dove si trova esattamente questo negozio sfuso?" },
        { user: "lucia_nature", text: "Anch'io compro solo sfuso ormai! È liberatorio." }
      ]
    },
    {
      id: "post_solar_panels",
      image: "/img/Foto Anna (Ronchi)/post_solar_panels.jpeg",
      caption: "Finalmente è arrivata l'energia pulita! ☀️ Installati i nuovi pannelli solari sul tetto della sede. Da oggi produciamo elettricità green al 100% per alimentare i nostri progetti e le assemblee.",
      date: "3 settimane fa",
      likes: 85,
      commentsCount: 7,
      location: "Centro Studi Ambiente Latina",
      comments: [
        { user: "claudio_valle", text: "Un passo concreto gigantesco! Congratulazioni team!" },
        { user: "amici_animali", text: "Potere al sole! Che meraviglia di installazione." }
      ]
    },
    {
      id: "post_organic_orchard",
      image: "/img/Foto Anna (Ronchi)/post_organic_orchard.jpeg",
      caption: "Raccolto del giorno dall'orto biologico comunitario coltivato a permacultura. 🌱 Pomodori profumatissimi, zucchine giganti e tanta soddisfazione di mangiare cibo vero, libero da pesticidi e chimica estrema.",
      date: "1 mese fa",
      likes: 93,
      commentsCount: 11,
      location: "Orti Didattici San Lorenzo",
      comments: [
        { user: "green_margherita", text: "Che colori splendidi! La permacultura rigenera davvero il terreno." },
        { user: "martina_p", text: "Ci organizzate un workshop? Vorrei imparare le basi." }
      ]
    },
    {
      id: "post_bee_rescue",
      image: "/img/Foto Anna (Ronchi)/post_bee_rescue.jpeg",
      caption: "Salviamo le api! Oggi abbiamo seminato fiori nettariferi biologici in tutta l'area urbana dismessa vicino alla ferrovia. Un corridoio ecologico fondamentale per preservare la biodiversità nel cemento. 🐝🌻",
      date: "1 mese fa",
      likes: 110,
      commentsCount: 8,
      location: "Parco Lineare Ostia",
      comments: [
        { user: "eco_brian", text: "Se manca l'ape alla terra, all'uomo resterebbero quattro anni di vita." },
        { user: "stefano_run", text: "Verrò ad aiutarvi alla prossima semina!" }
      ]
    },
    {
      id: "post_hiking",
      image: "/img/Foto Anna (Ronchi)/post_hiking.jpeg",
      caption: "Respirare a pieni polmoni quassù, sopra le nuvole e lontano dal baccano della città. 🏔️ Un cammino stancante ma che ti riconnette con la grandezza ancestrale della natura incontaminata. Rispettiamo i sentieri!",
      date: "1 mese fa",
      likes: 125,
      commentsCount: 5,
      location: "Vetta Monte Terminillo",
      comments: [
        { user: "lucia_nature", text: "Che vista pazzesca! Ti fa sentire così piccola ed grata." },
        { user: "stefano_run", text: "La montagna insegna la fatica e regala il silenzio." }
      ]
    },
    {
      id: "post_wind_energy",
      image: "/img/Foto Anna (Ronchi)/post_wind_energy.jpeg",
      caption: "Il vento del cambiamento profuma di aria pulita. 💨 Le nostre pale eoliche comunitarie producono energia sostenibile senza sosta. Questa è la vera transizione energetica dal basso!",
      date: "2 mesi fa",
      likes: 98,
      commentsCount: 3,
      location: "Colline Eoliche di Frosinone",
      comments: [
        { user: "claudio_valle", text: "Efficienza e intelligenza. Avanti tutta!" }
      ]
    },
    {
      id: "post_river_clean",
      image: "/img/Foto Anna (Ronchi)/post_river_clean.jpeg",
      caption: "Operazione fiume pulito completata! Oggi con gli stivali nell'acqua abbiamo rimosso decine di pneumatici e plastica depositati dalle correnti. Un fiume sano è la sorgente della vita. 💧🐟",
      date: "2 mesi fa",
      likes: 142,
      commentsCount: 9,
      location: "Isola Tiberina, Roma",
      comments: [
        { user: "eco_brian", text: "Orgoglioso di aver fatto parte di questa squadra pazzesca!" },
        { user: "green_margherita", text: "Siete degli eroi silenziosi! Grazie di cuore per quello che fate." }
      ]
    },
    {
      id: "post_organic_market",
      image: "/img/Foto Anna (Ronchi)/post_organic_market.jpeg",
      caption: "Cibo vero, persone vere. 🍏 Sosteniamo i piccoli produttori locali della nostra terra. Comprare direttamente da chi coltiva rispetta il lavoro, riduce i trasporti km-zero e nutre la salute.",
      date: "3 mesi fa",
      likes: 79,
      commentsCount: 4,
      location: "Fattoria Biologica Valle Verde",
      comments: [
        { user: "lucia_nature", text: "Il sapore di quelle mele è indescrivibile, un altro pianeta!" }
      ]
    },
    {
      id: "post_marco_bici",
      image: "/img/Foto Anna (Ronchi)/post_bicycle.jpeg",
      caption: "In giro per la città con la mia single speed. Non c'è niente di meglio che pedalare sotto il sole! 🚴‍♂️ #fixedgear #urbancycling",
      date: "3 mesi fa",
      likes: 203,
      commentsCount: 12,
      location: "Testaccio, Roma",
      comments: [
        { user: "anna_calligaris_eco", text: "Bella Marco! Anch'io domani faccio un giro sui Castelli." },
        { user: "lucia_nature", text: "Che scatto perfetto! La luce è incredibile." }
      ]
    },
    {
      id: "post_sara_yoga",
      image: "/img/Foto Anna (Ronchi)/post_hiking.jpeg",
      caption: "Meditazione mattutina in montagna. Lasciare andare tutto per trovare se stessi. 🧘‍♀️🌄 #mindfulness #naturelover",
      date: "4 mesi fa",
      likes: 145,
      commentsCount: 8,
      location: "Monti Lucretili",
      comments: [
        { user: "eco_brian", text: "Bellissimo video, mi hai ispirato!" }
      ]
    },
    {
      id: "post_luigi_foto",
      image: "/img/Foto Anna (Ronchi)/post_forest_cleanup.jpeg",
      caption: "Reportage fotografico dal bosco sacro. Quando la natura parla, il fotografo ascolta. 📸🌲 #landscape #reportage",
      date: "5 mesi fa",
      likes: 289,
      commentsCount: 15,
      location: "Foresta di Castelporziano",
      comments: [
        { user: "green_margherita", text: "Composizione perfetta Luigi!" },
        { user: "stefano_run", text: "Questi colori sono surreali, bravissimo!" }
      ]
    },
    {
      id: "post_giancarlo_gastronomia",
      image: "/img/Foto Anna (Ronchi)/post_vegan_picnic.jpeg",
      caption: "Cucina consapevole: piatti a km zero con ingredienti bio dal nostro orto. La sostenibilità ha un sapore meraviglioso! 🍽️✨ #slowfood #biodinamico",
      date: "6 mesi fa",
      likes: 156,
      commentsCount: 9,
      location: "Osteria del Sordo, Tivoli",
      comments: [
        { user: "anna_calligaris_eco", text: "Giancarlo, questa è arte! Vengo subito." },
        { user: "lucia_nature", text: "Finalmente qualcuno che capisce il legame tra cibo e territorio." }
      ]
    }
  ],
  aldoContacts: [
    {
      id: "contact_anna",
      name: "Anna Calligaris",
      phone: "+39 347 129 8834",
      avatar: "/img/Foto Anna (Ronchi)/chiamata.jpeg",
      recentCallDate: "Oggi, 11:15",
      recentCallType: "incoming",
      recentCallDuration: "2 min 14 s"
    },
    {
      id: "contact_conte",
      name: "Conte Negroni",
      phone: "+39 335 881 7711",
      avatar: "/img/Foto Anna (Ronchi)/post_bicycle.jpeg",
      recentCallDate: "Ieri, 18:40",
      recentCallType: "outgoing",
      recentCallDuration: "45 s"
    },
    {
      id: "contact_barto",
      name: "Bartolomeo Reni",
      phone: "+39 348 711 0291",
      avatar: "/img/Foto Anna (Ronchi)/post_dog_rescue.jpeg",
      recentCallDate: "3 giorni fa",
      recentCallType: "missed"
    },
    {
      id: "contact_dottore",
      name: "Dott. De Santis",
      phone: "+39 339 444 8920",
      avatar: "/img/Foto Anna (Ronchi)/post_solar_panels.jpeg",
      recentCallDate: "4 giorni fa",
      recentCallType: "incoming",
      recentCallDuration: "8 min 12 s"
    },
    {
      id: "contact_avvocato",
      name: "Avvocato Moretti",
      phone: "+39 333 111 2233",
      avatar: "/img/Foto Anna (Ronchi)/post_zerowaste.jpeg"
    },
    {
      id: "contact_clinica",
      name: "Clinica San Raffaele",
      phone: "+39 06 5509 0110",
      avatar: "/img/Foto Anna (Ronchi)/post_flashmob.jpeg"
    },
    {
      id: "contact_valerio",
      name: "Ing. Valerio Marini (Efficienza)",
      phone: "+39 349 881 2200",
      avatar: "/img/Foto Anna (Ronchi)/post_organic_orchard.jpeg"
    },
    {
      id: "contact_sergio",
      name: "Sergio (Gommista Eco)",
      phone: "+39 347 555 9011",
      avatar: "/img/Foto Anna (Ronchi)/post_bee_rescue.jpeg"
    },
    {
      id: "contact_monica",
      name: "Monica (Fotografa Set)",
      phone: "+39 329 123 4567",
      avatar: "/img/Foto Anna (Ronchi)/post_hiking.jpeg"
    },
    {
      id: "contact_beatrice",
      name: "Beatrice Reni (Cugina)",
      phone: "+39 345 999 1111",
      avatar: "/img/Foto Anna (Ronchi)/post_wind_energy.jpeg"
    },
    {
      id: "contact_riccardo",
      name: "Riccardo (Climatizzazione)",
      phone: "+39 334 777 8888",
      avatar: "/img/Foto Anna (Ronchi)/post_river_clean.jpeg"
    },
    {
      id: "contact_barbieri",
      name: "Dott.ssa Barbieri (Ricerca)",
      phone: "+39 320 333 4444",
      avatar: "/img/Foto Anna (Ronchi)/post_organic_market.jpeg"
    }
  ],
  annaContacts: [
    {
      id: "contact_conte_negroni",
      name: "Conte Negroni",
      phone: "+39 335 881 7711",
      avatar: "/img/Foto Anna (Ronchi)/post_bicycle.jpeg",
      recentCallDate: "Oggi, 12:45",
      recentCallType: "outgoing",
      recentCallDuration: "1 min 05 s"
    },
    {
      id: "contact_aldo",
      name: "Aldo",
      phone: "+39 328 110 4492",
      avatar: "/img/Foto Anna (Ronchi)/post_dog_rescue.jpeg",
      recentCallDate: "Oggi, 11:15",
      recentCallType: "outgoing",
      recentCallDuration: "2 min 14 s"
    },
    {
      id: "contact_mamme",
      name: "Mamma",
      phone: "+39 338 900 1122",
      avatar: "/img/Foto Anna (Ronchi)/post_solar_panels.jpeg",
      recentCallDate: "Ieri, 15:30",
      recentCallType: "incoming",
      recentCallDuration: "10 min 40 s"
    },
    {
      id: "contact_enpa",
      name: "ENPA Sede Centrale",
      phone: "+39 06 3242 0011",
      avatar: "/img/Foto Anna (Ronchi)/post_zerowaste.jpeg"
    },
    {
      id: "contact_tommaso",
      name: "Tommaso (Attivista Milano)",
      phone: "+39 333 888 9999",
      avatar: "/img/Foto Anna (Ronchi)/post_flashmob.jpeg"
    },
    {
      id: "contact_chiara",
      name: "Chiara (Grafica Volantini)",
      phone: "+39 346 111 2222",
      avatar: "/img/Foto Anna (Ronchi)/post_organic_orchard.jpeg"
    },
    {
      id: "contact_barbara_gatti",
      name: "Barbara (Rifugio Gatti)",
      phone: "+39 328 333 4444",
      avatar: "/img/Foto Anna (Ronchi)/post_bee_rescue.jpeg"
    },
    {
      id: "contact_stefano_coord",
      name: "Stefano (Coordinamento Bici)",
      phone: "+39 345 555 6666",
      avatar: "/img/Foto Anna (Ronchi)/post_hiking.jpeg"
    },
    {
      id: "contact_federica",
      name: "Federica (Permacultura RM)",
      phone: "+39 331 444 5555",
      avatar: "/img/Foto Anna (Ronchi)/post_wind_energy.jpeg"
    },
    {
      id: "contact_salvaterra",
      name: "Associazione Salvaterra",
      phone: "+39 06 999 888",
      avatar: "/img/Foto Anna (Ronchi)/post_river_clean.jpeg"
    }
  ],
  chatHistory: [
    {
      id: "msg_1",
      sender: "me",
      text: "Ciao Anna, ho pensato molto alla nostra discussione dell'altro giorno.",
      timestamp: "10:05"
    },
    {
      id: "msg_2",
      sender: "other",
      text: "Spero tu abbia capito che certe battaglie ecologiche non si possono rimandare, Aldo.",
      timestamp: "10:11"
    },
    {
      id: "msg_3",
      sender: "me",
      text: "Sì, capisco la tua passione. Tra l'altro volevo chiederti se sei libera oggi pomeriggio.",
      timestamp: "10:14"
    },
    {
      id: "msg_4",
      sender: "other",
      text: "Oggi sto preparando i cartelli per Piazza Celli. Ma ti mando un autoscatto per farti vedere come sta venendo il logo per il flashmob!",
      timestamp: "10:16"
    },
    {
      id: "msg_5",
      sender: "other",
          image: "/img/Foto Anna (Ronchi)/profilo.jpeg",
      timestamp: "10:17"
    },
    {
      id: "msg_6",
      sender: "me",
      text: "Che bella foto! Dimostra davvero che sei pronta a tutto. Ma ti va se ne parliamo a voce?",
      timestamp: "10:20"
    },
    {
      id: "msg_7",
      sender: "other",
      text: "Ti lascio un messaggio vocale che sto camminando verso il noleggio dei megafoni. Ascolta bene:",
      timestamp: "10:22"
    },
    {
      id: "msg_8",
      sender: "other",
      voiceDuration: "0:42",
      voicePlayed: false,
      timestamp: "10:23"
    }
  ],
  chatsAldo: [
    {
      id: "chat_anna",
      name: "Anna Calligaris",
      username: "anna_calligaris_eco",
      avatar: "/img/Foto Anna (Ronchi)/profilo.jpeg",
      status: "attiva ora",
      messages: [
        {
          id: "msg_1",
          sender: "other",
          text: "Ciao Aldo, ho preparato i cartelli per Piazza Celli. Domani sarà una giornata cruciale.",
          timestamp: "10:05"
        },
        {
          id: "msg_2",
          sender: "me",
          text: "Pensi davvero che scendere in piazza cambierà le cose? Comunque sono con te.",
          timestamp: "10:11"
        },
        {
          id: "msg_3",
          sender: "other",
          text: "Te lo dimostro subito! Ecco l'autoscatto che mi hai chiesto poco fa:",
          timestamp: "10:14"
        },
        {
          id: "msg_4",
          sender: "other",
          image: "/img/Foto Anna (Ronchi)/profilo.jpeg",
          timestamp: "10:16"
        },
        {
          id: "msg_5",
          sender: "me",
          text: "Bellissima foto, si vede la tua determinazione! Ma non rischiare troppo.",
          timestamp: "10:20"
        },
        {
          id: "msg_6",
          sender: "other",
          text: "Ascolta, ti lascio un messaggio vocale urgente sui megafoni per Piazza Celli:",
          timestamp: "10:22"
        },
        {
          id: "msg_7",
          sender: "other",
          voiceDuration: "0:42",
          voicePlayed: false,
          timestamp: "10:23"
        }
      ]
    },
    {
      id: "chat_negroni",
      name: "Conte Negroni",
      username: "conte_negroni_dial",
      avatar: "/img/Foto Anna (Ronchi)/chiamata.jpeg",
      status: "attivo 2 ore fa",
      messages: [
        {
          id: "msg_neg_1",
          sender: "other",
          text: "Reni, hai poi parlato con la Calligaris? Quella ragazza sta per causare grandi ritardi.",
          timestamp: "08:30"
        },
        {
          id: "msg_neg_2",
          sender: "me",
          text: "Ci sto parlando, Conte. Sto cercando di capire le sue intenzioni per domani a Piazza Celli.",
          timestamp: "08:35"
        },
        {
          id: "msg_neg_3",
          sender: "other",
          text: "Sbrigati, dobbiamo risolvere la questione prima possibile. Conto sulla tua discrezione.",
          timestamp: "08:38"
        }
      ]
    }
  ],
  chatsAnna: [
    {
      id: "chat_aldo_anna",
      name: "Aldo Reni",
      username: "aldo_reni_real",
      avatar: "/img/Foto Anna (Ronchi)/chiamata.jpeg",
      status: "attivo ora",
      messages: [
        {
          id: "msg_1_a",
          sender: "me",
          text: "Ciao Aldo, ho preparato i cartelli per Piazza Celli. Domani sarà una giornata cruciale.",
          timestamp: "10:05"
        },
        {
          id: "msg_2_a",
          sender: "other",
          text: "Pensi davvero che scendere in piazza cambierà le cose? Comunque sono con te.",
          timestamp: "10:11"
        },
        {
          id: "msg_3_a",
          sender: "me",
          text: "Te lo dimostro subito! Ecco l'autoscatto che mi hai chiesto poco fa:",
          timestamp: "10:14"
        },
        {
          id: "msg_4_a",
          sender: "me",
          image: "/img/Foto Anna (Ronchi)/profilo.jpeg",
          timestamp: "10:16"
        },
        {
          id: "msg_5_a",
          sender: "other",
          text: "Bellissima foto, si vede la tua determinazione! Ma non rischiare troppo.",
          timestamp: "10:20"
        },
        {
          id: "msg_6_a",
          sender: "me",
          text: "Ascolta, ti lascio un messaggio vocale urgente sui megafoni per Piazza Celli:",
          timestamp: "10:22"
        },
        {
          id: "msg_7_a",
          sender: "me",
          voiceDuration: "0:42",
          voicePlayed: false,
          timestamp: "10:23"
        }
      ]
    },
    {
      id: "chat_negroni_anna",
      name: "Conte Negroni",
      username: "conte_negroni_dial",
      avatar: "/img/Foto Anna (Ronchi)/chiamata.jpeg",
      status: "attivo ora",
      messages: [
        {
          id: "msg_neg_anna_1",
          sender: "other",
          text: "Anna, sfilare per le strade domani non servirà a molto se non cambiamo i regolamenti.",
          timestamp: "11:30"
        },
        {
          id: "msg_neg_anna_2",
          sender: "me",
          text: "Non si preoccupi Conte, sarà un flashmob pacifico ma di grande impatto visivo. Piazza Celli sarà piena.",
          timestamp: "11:45"
        }
      ]
    }
  ],
  newspaper: {
    journalTitle: "CORRIERE DELLA COSTIERA",
    articleHeadline: "Piazza Celli Sotto i Riflettori: Cresce la Tensione per il Flashmob di Domani alle 18:00",
    articleSubtitle: "Attivisti ambientali guidati da Anna Calligaris si preparano alla manifestazione contro i laboratori di ricerca medica.",
    publicationDate: "9 Giugno 2026",
    authorName: "Giacomo Salvemini",
    mainImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800",
    paragraphs: [
      "La piazza centrale di Piazza Celli si appresta a diventare il teatro di uno scontro civile pacifico ma determinato. Al centro della disputa vi sono i laboratori di ricerca scientifica accusati dalle reti attiviste locali di praticare test di vivisezione non autorizzati o eticamente inaccettabili.",
      "Anna Calligaris, attivista di punta del movimento attivo, ha lanciato nelle ultime ore un coordinamento digitale che conta già centinaia di adesioni. 'Siamo pronti a fare sentire la nostra voce', ha dichiarato l'attivista ai nostri microfoni: 'Non stiamo solo protestando contro la vivisezione, stiamo difendendo il diritto fondamentale alla trasparenza etica nella ricerca scientifica.'",
      "Il flashmob è previsto per domani pomeriggio alle ore 18:00 precise. Gli organizzatori raccomandano l'uso esclusivo di biciclette e slogan pacifici per evitare provocazioni esterne. Nel frattempo, le istituzioni locali monitorano strettamente la zona nel tentativo di garantire il normale ordinamento pubblico ed evitare escalation di tensioni riscontrate lo scorso lunedì."
    ]
  },
  mauroCalendar: [
    {
      id: "shift_1",
      day: 8,
      title: "Guardia Clinica",
      time: "08:00 - 16:00",
      type: "day",
      location: "San Raffaele, Reparto B"
    },
    {
      id: "shift_2",
      day: 9,
      title: "Turno Notturno",
      time: "20:00 - 08:00",
      type: "night",
      location: "Clinica San Raffaele"
    },
    {
      id: "shift_3",
      day: 10,
      title: "Reperibilità Telefonica",
      time: "08:00 - 20:00",
      type: "on-call",
      location: "Domicilio"
    },
    {
      id: "shift_4",
      day: 11,
      title: "Riposo Pianificato",
      time: "Tutto il giorno",
      type: "rest",
      location: "-"
    },
    {
      id: "shift_5",
      day: 12,
      title: "Guardia Clinica",
      time: "12:00 - 20:00",
      type: "day",
      location: "San Raffaele, Lab Reni"
    }
  ],
  svevaGallery: [
    {
      id: "sveva_p1",
      url: "https://images.unsplash.com/photo-1519689680058-324335c77eb6?auto=format&fit=crop&q=80&w=400",
      caption: "Sofia che gioca nel parco quest'oggi 🌸 Cresce così in fretta Anna!",
      likes: 12,
      commentsCount: 2
    },
    {
      id: "sveva_p2",
      url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=400",
      caption: "I suoi primi sorrisi stampati sul viso. Un raggio di sole!",
      likes: 18,
      commentsCount: 1
    },
    {
      id: "sveva_p3",
      url: "https://images.unsplash.com/photo-1471286174241-d6a59bc88a87?auto=format&fit=crop&q=80&w=400",
      caption: "Passi incerti sulla sabbia. La nostra piccola esploratrice.",
      likes: 24,
      commentsCount: 4
    }
  ],
  voiceNotification: {
    senderName: "Anna Calligaris",
    messagePreview: "🎤 Messaggio Vocale ricevuto (0:42)",
    timeStr: "Adesso",
    durationStr: "0:42"
  }
};

export const hydrateAppData = (data: AppData): AppData => {
  const existingPostIds = new Set(data.posts.map(post => post.id));
  const missingInitialPosts = INITIAL_DATA.posts.filter(post => !existingPostIds.has(post.id));

  if (!missingInitialPosts.length) return data;

  return {
    ...data,
    posts: [...missingInitialPosts, ...data.posts]
  };
};
