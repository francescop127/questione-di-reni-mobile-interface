export interface Post {
  id: string;
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
    avatar: "/img/profilo",
    bio: "🚴‍♀️ In sella alla mia bici verso un futuro sostenibile.\n🌿 Attivista per la difesa degli animali e dell'ambiente.\n📍 Spostarsi senza inquinare è una scelta quotidiana.",
    followers: 124,
    following: 89,
    postsCount: 24,
    isVerified: true
  },
  posts: [
    {
      id: "post_flashmob",
      image: "/img/post_flashmob",
      caption: "🔴 STOP VIVISEZIONE! Non possiamo più restare in silenzio di fronte a questa crudeltà. Domani scendiamo in piazza per dare voce a chi non ce l'ha. Vi aspetto numerosi, portate cartelli e tanta energia positiva. Condividete il più possibile!",
      date: "Oggi, 12:30",
      likes: 47,
      commentsCount: 9,
      location: "Piazza Celli, Roma",
      isEvent: true,
      eventDetails: "FLASHMOB CONTRO LA VIVISEZIONE\n📍 Piazza Celli\n📅 Domani\n⏰ Ore 18:00",
      comments: [
        { user: "eco_brian", text: "Presente! Condivido subito nei gruppi universitari." },
        { user: "green_margherita", text: "Porto altri 3 amici con me. Fermiamo questo scempio!" },
        { user: "claudio_valle", text: "Finalmente qualcuno che si muove a Piazza Celli. Ci vediamo lì." }
      ]
    },
    {
      id: "post_bicycle",
      image: "/img/post_bicycle",
      caption: "Libertà è una strada sterrata, il vento in faccia e zero emissioni. 🚴‍♀️ Oggi ho fatto 45km scoprendo sentieri dimenticati. La terra non ci appartiene, ne siamo solo custodi temporanei.",
      date: "2 giorni fa",
      likes: 38,
      commentsCount: 4,
      location: "Parco dell'Appia Antica",
      comments: [
        { user: "stefano_run", text: "Splendido posto Anna! Che itinerario hai seguito?" },
        { user: "bici_lifestyle", text: "Grande! Bellissima foto e bellissima filosofia di vita." }
      ]
    },
    {
      id: "post_eco_quote",
      image: "/img/post_eco_quote",
      caption: "Spesso camminiamo nella natura selvaggia sognando spiagge esotiche, ma dimentichiamo che la bellezza più pura è proprio dietro casa. Impariamo a viaggiare leggeri, a piedi o su due ruote. 🌍💚",
      date: "5 giorni fa",
      likes: 51,
      commentsCount: 2,
      location: "Val d'Orcia",
      comments: [
        { user: "lucia_nature", text: "Concordo pienamente. Viaggiare a chilometro zero apre gli occhi." }
      ]
    },
    {
      id: "post_dog_rescue",
      image: "/img/post_dog_rescue",
      caption: "Incontri speciali durante la ronda mattutina al rifugio locale. 🐾 Ogni sguardo recuperato dice più di mille parole. Adottate, non comprate, date a queste anime una seconda possibilità!",
      date: "1 settimana fa",
      likes: 64,
      commentsCount: 6,
      location: "Rifugio Code Felici",
      comments: [
        { user: "amici_animali", text: "Lavoro straordinario Anna! Quel cucciolo ha degli occhi dolcissimi." },
        { user: "martina_p", text: "Ci passerò questo weekend per dare una mano!" }
      ]
    },
    {
      id: "post_forest_cleanup",
      image: "/img/post_forest_cleanup",
      caption: "Oggi con il gruppo locale abbiamo riempito ben 15 sacchi di plastica abbandonata nei boschi della Costiera. Un piccolo gesto collettivo per guarire la nostra terra ferita. 🌳🎒",
      date: "10 giorni fa",
      likes: 42,
      commentsCount: 3,
      location: "Bosco di Castel Fusano",
      comments: [
        { user: "eco_brian", text: "Grazie a tutti per la straordinaria partecipazione attiva!" }
      ]
    },
    {
      id: "post_vegan_picnic",
      image: "/img/post_vegan_picnic",
      caption: "Alimentazione consapevole, cruelty-free e a impatto zero. Un delizioso picnic vegano autoprodotto all'ombra degli ulivi secolari. Mangiare sano fa bene a noi e al pianeta! 🍇🥗",
      date: "2 settimane fa",
      likes: 59,
      commentsCount: 5,
      location: "Prati della Costiera",
      comments: [
        { user: "green_margherita", text: "La torta salata con le zucchine biologiche era favolosa!" },
        { user: "claudio_valle", text: "Ricetta subito! Dobbiamo fare più eventi così." }
      ]
    },
    {
      id: "post_zerowaste",
      image: "/img/post_zerowaste",
      caption: "Rispettare l'ambiente significa anche ridurre gli imballaggi al minimo. Oggi spesa sfusa e barattoli riutilizzabili per azzerare la plastica monouso. 🫙🌾 Ogni piccolo passo conta infinitamente!",
      date: "2 settimane fa",
      likes: 72,
      commentsCount: 4,
      location: "Bottega Sotto Casa",
      comments: [
        { user: "eco_brian", text: "Bellissima iniziativa! Dove si trova esattamente questo negozio sfuso?" },
        { user: "lucia_nature", text: "Anch'io compro solo sfuso ormai! È liberatorio." }
      ]
    },
    {
      id: "post_solar_panels",
      image: "/img/post_solar_panels",
      caption: "Finalmente è arrivata l'energia pulita! ☀️ Installati i nuovi pannelli solari sul tetto della sede. Da oggi produciamo elettricità green al 100% per alimentare i nostri progetti e le assemblee.",
      date: "3 settimane fa",
      likes: 85,
      commentsCount: 7,
      location: "Sede Nazionale del Movimento",
      comments: [
        { user: "claudio_valle", text: "Un passo concreto gigantesco! Congratulazioni team!" },
        { user: "amici_animali", text: "Potere al sole! Che meraviglia di installazione." }
      ]
    },
    {
      id: "post_organic_orchard",
      image: "/img/post_organic_orchard",
      caption: "Raccolto del giorno dall'orto biologico comunitario coltivato a permacultura. 🌱 Pomodori profumatissimi, zucchine giganti e tanta soddisfazione di mangiare cibo vero, libero da pesticidi e chimica estrema.",
      date: "1 mese fa",
      likes: 93,
      commentsCount: 11,
      location: "Orto Urbano Condiviso",
      comments: [
        { user: "green_margherita", text: "Che colori splendidi! La permacultura rigenera davvero il terreno." },
        { user: "martina_p", text: "Ci organizzate un workshop? Vorrei imparare le basi." }
      ]
    },
    {
      id: "post_bee_rescue",
      image: "/img/post_bee_rescue",
      caption: "Salviamo le api! Oggi abbiamo seminato fiori nettariferi biologici in tutta l'area urbana dismessa vicino alla ferrovia. Un corridoio ecologico fondamentale per preservare la biodiversità nel cemento. 🐝🌻",
      date: "1 mese fa",
      likes: 110,
      commentsCount: 8,
      location: "Area Verde ex-Scalo",
      comments: [
        { user: "eco_brian", text: "Se manca l'ape alla terra, all'uomo resterebbero quattro anni di vita." },
        { user: "stefano_run", text: "Verrò ad aiutarvi alla prossima semina!" }
      ]
    },
    {
      id: "post_hiking",
      image: "/img/post_hiking",
      caption: "Respirare a pieni polmoni quassù, sopra le nuvole e lontano dal baccano della città. 🏔️ Un cammino stancante ma che ti riconnette con la grandezza ancestrale della natura incontaminata. Rispettiamo i sentieri!",
      date: "1 mese fa",
      likes: 125,
      commentsCount: 5,
      location: "Cresta del Gran Sasso",
      comments: [
        { user: "lucia_nature", text: "Che vista pazzesca! Ti fa sentire così piccola ed grata." },
        { user: "stefano_run", text: "La montagna insegna la fatica e regala il silenzio." }
      ]
    },
    {
      id: "post_wind_energy",
      image: "/img/post_wind_energy",
      caption: "Il vento del cambiamento profuma di aria pulita. 💨 Le nostre pale eoliche comunitarie producono energia sostenibile senza sosta. Questa è la vera transizione energetica dal basso!",
      date: "2 mesi fa",
      likes: 98,
      commentsCount: 3,
      location: "Parco Eolico del Vento",
      comments: [
        { user: "claudio_valle", text: "Efficienza e intelligenza. Avanti tutta!" }
      ]
    },
    {
      id: "post_river_clean",
      image: "/img/post_river_clean",
      caption: "Operazione fiume pulito completata! Oggi con gli stivali nell'acqua abbiamo rimosso decine di pneumatici e plastica depositati dalle correnti. Un fiume sano è la sorgente della vita. 💧🐟",
      date: "2 mesi fa",
      likes: 142,
      commentsCount: 9,
      location: "Argine del Fiume Tevere",
      comments: [
        { user: "eco_brian", text: "Orgoglioso di aver fatto parte di questa squadra pazzesca!" },
        { user: "green_margherita", text: "Siete degli eroi silenziosi! Grazie di cuore per quello che fate." }
      ]
    },
    {
      id: "post_organic_market",
      image: "/img/post_organic_market",
      caption: "Cibo vero, persone vere. 🍏 Sosteniamo i piccoli produttori locali della nostra terra. Comprare direttamente da chi coltiva rispetta il lavoro, riduce i trasporti km-zero e nutre la salute.",
      date: "3 mesi fa",
      likes: 79,
      commentsCount: 4,
      location: "Mercato Contadino del Sabato",
      comments: [
        { user: "lucia_nature", text: "Il sapore di quelle mele è indescrivibile, un altro pianeta!" }
      ]
    },
    {
      id: "post_electric_car",
      image: "/img/post_electric_car",
      caption: "In viaggio verso la mobilità del futuro! ⚡ Oggi carichiamo la citycar del collettivo con la nostra pensilina fotovoltaica. Muoversi a impatto zero è un'emozione pulita e silenziosa.",
      date: "3 mesi fa",
      likes: 112,
      commentsCount: 3,
      location: "Stazione Ricarica Green",
      comments: [
        { user: "stefano_run", text: "Finalmente le colonnine comunitarie funzionano a dovere!" }
      ]
    },
    {
      id: "post_lake_paddle",
      image: "/img/post_lake_paddle",
      caption: "Un'alba lucente sul lago di Bracciano. 🌅 Pagaiando dolcemente sul SUP per misurare la limpidezza delle nostre acque protette. Preserviamo i bacini lacustri dall'inquinamento da idrocarburi e plastiche.",
      date: "4 mesi fa",
      likes: 135,
      commentsCount: 2,
      location: "Lago di Bracciano",
      comments: [
        { user: "lucia_nature", text: "Che foto pazzesca Anna! La quiete pura incarnata." }
      ]
    },
    {
      id: "post_composting",
      image: "/img/post_composting",
      caption: "Nulla si distrugge, tutto si trasforma! 🍂 Oggi laboratorio di compostaggio domestico per trasformare gli scarti organici della cucina in fertile humus per le piantine. La terra ringrazia!",
      date: "4 mesi fa",
      likes: 67,
      commentsCount: 4,
      location: "Orto Condiviso Sotto Casa",
      comments: [
        { user: "eco_brian", text: "Laboratorio utilissimo, non compro più terriccio industriale!" }
      ]
    },
    {
      id: "post_plastic_free_school",
      image: "/img/post_plastic_free_school",
      caption: "Borracce ecologiche distribuite in tutte le classi delle elementari! 🎒 Un'iniziativa dal basso per ridurre migliaia di bottigliette di plastica monouso ogni mese. Educare al futuro parte da qui.",
      date: "5 mesi fa",
      likes: 189,
      commentsCount: 8,
      location: "Scuola Elementare Mazzini",
      comments: [
        { user: "green_margherita", text: "I bambini erano felicissimi delle loro nuove borracce colorate!" },
        { user: "martina_p", text: "Esempio eccezionale da replicare in tutta la regione!" }
      ]
    },
    {
      id: "post_autumn_leaves",
      image: "/img/post_autumn_leaves",
      caption: "La magia d'autunno ci ricorda il ciclo vitale della foresta. 🍂 Camminiamo in punta di piedi rispettando il letargo della fauna selvatica. Ogni rametto e foglia ha un ruolo nell'ecosistema.",
      date: "5 mesi fa",
      likes: 95,
      commentsCount: 1,
      location: "Parco Nazionale d'Abruzzo",
      comments: [
        { user: "stefano_run", text: "Colori meravigliosi che scaldano il cuore." }
      ]
    },
    {
      id: "post_sustainable_fashion",
      image: "/img/post_sustainable_fashion",
      caption: "Armadio etico e circolare! 🏷️ Oggi scambiamo abiti vintage al mercatino del riuso. Scegliere tessuti naturali e riciclati combatte la sovrapproduzione selvaggia del fast fashion.",
      date: "6 mesi fa",
      likes: 121,
      commentsCount: 5,
      location: "Spazio Riuso Creativo",
      comments: [
        { user: "lucia_nature", text: "Ho trovato dei maglioni in lana rigenerata caldissimi!" }
      ]
    },
    {
      id: "post_green_roof",
      image: "/img/post_green_roof",
      caption: "Un tetto verde ed ecologico nel cuore del quartiere direzionale! 🏙️ Questi giardini pensili assorbono CO2, riducono le isole di calore estive e creano piccoli scrigni di biodiversità metropolitana.",
      date: "6 mesi fa",
      likes: 154,
      commentsCount: 3,
      location: "Skyline Green Hub",
      comments: [
        { user: "claudio_valle", text: "Architettura intelligente! Dovrebbe essere obbligatorio in pianificazione." }
      ]
    },
    {
      id: "post_reusable_bags",
      image: "/img/post_reusable_bags",
      caption: "Sacchetti di stoffa cuciti a mano riciclando vecchie lenzuola dismesse. 🧵🛍️ Un modo pratico ed elegante per fare la spesa senza sprecare mai più sacchetti monouso. Chi ne desidera uno?",
      date: "7 mesi fa",
      likes: 83,
      commentsCount: 6,
      location: "Bottega Popolare Re-Use",
      comments: [
        { user: "green_margherita", text: "Io ne prenoto tre per la spesa del sabato!" }
      ]
    },
    {
      id: "post_smart_irrigation",
      image: "/img/post_smart_irrigation",
      caption: "Acqua piovana è oro liquido. 💦 Installata la cisterna intelligente di recupero collegata ai sensori di umidità del terreno. Irrighiamo solo quando serve e solo quanto basta per evitare sprechi.",
      date: "7 mesi fa",
      likes: 104,
      commentsCount: 2,
      location: "Serra Didattica Condivisa",
      comments: [
        { user: "eco_brian", text: "Sana tecnologia applicata alla terra." }
      ]
    },
    {
      id: "post_wildflowers",
      image: "/img/post_wildflowers",
      caption: "Prato selvatico condominiale cresciuto! 🌸 Invece di tagliare l'erba ossessivamente, abbiamo lasciato fiorire i papaveri e la camomilla selvatica per far felici farfalle, bombi e biodiversità urbana.",
      date: "8 mesi fa",
      likes: 118,
      commentsCount: 4,
      location: "Retro Condominio Verde",
      comments: [
        { user: "stefano_run", text: "L'effetto visivo è stupendo e gli impollinatori ringraziano di cuore." }
      ]
    }
  ],
  aldoContacts: [
    {
      id: "contact_anna",
      name: "Anna Calligaris",
      phone: "+39 347 129 8834",
      avatar: "/img/chiamata",
      recentCallDate: "Oggi, 11:15",
      recentCallType: "incoming",
      recentCallDuration: "2 min 14 s"
    },
    {
      id: "contact_conte",
      name: "Conte Negroni",
      phone: "+39 335 881 7711",
      avatar: "/img/chiamata",
      recentCallDate: "Ieri, 18:40",
      recentCallType: "outgoing",
      recentCallDuration: "45 s"
    },
    {
      id: "contact_barto",
      name: "Bartolomeo Reni",
      phone: "+39 348 711 0291",
      avatar: "/img/chiamata",
      recentCallDate: "3 giorni fa",
      recentCallType: "missed"
    },
    {
      id: "contact_dottore",
      name: "Dott. De Santis",
      phone: "+39 339 444 8920",
      avatar: "/img/chiamata",
      recentCallDate: "4 giorni fa",
      recentCallType: "incoming",
      recentCallDuration: "8 min 12 s"
    },
    {
      id: "contact_avvocato",
      name: "Avvocato Moretti",
      phone: "+39 333 111 2233",
      avatar: "/img/chiamata"
    },
    {
      id: "contact_clinica",
      name: "Clinica San Raffaele",
      phone: "+39 06 5509 0110",
      avatar: "/img/chiamata"
    },
    {
      id: "contact_valerio",
      name: "Ing. Valerio Marini (Efficienza)",
      phone: "+39 349 881 2200",
      avatar: "/img/chiamata"
    },
    {
      id: "contact_sergio",
      name: "Sergio (Gommista Eco)",
      phone: "+39 347 555 9011",
      avatar: "/img/chiamata"
    },
    {
      id: "contact_monica",
      name: "Monica (Fotografa Set)",
      phone: "+39 329 123 4567",
      avatar: "/img/chiamata"
    },
    {
      id: "contact_beatrice",
      name: "Beatrice Reni (Cugina)",
      phone: "+39 345 999 1111",
      avatar: "/img/chiamata"
    },
    {
      id: "contact_riccardo",
      name: "Riccardo (Climatizzazione)",
      phone: "+39 334 777 8888",
      avatar: "/img/chiamata"
    },
    {
      id: "contact_barbieri",
      name: "Dott.ssa Barbieri (Ricerca)",
      phone: "+39 320 333 4444",
      avatar: "/img/chiamata"
    }
  ],
  annaContacts: [
    {
      id: "contact_conte_negroni",
      name: "Conte Negroni",
      phone: "+39 335 881 7711",
      avatar: "/img/chiamata",
      recentCallDate: "Oggi, 12:45",
      recentCallType: "outgoing",
      recentCallDuration: "1 min 05 s"
    },
    {
      id: "contact_aldo",
      name: "Aldo",
      phone: "+39 328 110 4492",
      avatar: "/img/chiamata",
      recentCallDate: "Oggi, 11:15",
      recentCallType: "outgoing",
      recentCallDuration: "2 min 14 s"
    },
    {
      id: "contact_mamme",
      name: "Mamma",
      phone: "+39 338 900 1122",
      avatar: "/img/chiamata",
      recentCallDate: "Ieri, 15:30",
      recentCallType: "incoming",
      recentCallDuration: "10 min 40 s"
    },
    {
      id: "contact_enpa",
      name: "ENPA Sede Centrale",
      phone: "+39 06 3242 0011",
      avatar: "/img/chiamata"
    },
    {
      id: "contact_tommaso",
      name: "Tommaso (Attivista Milano)",
      phone: "+39 333 888 9999",
      avatar: "/img/chiamata"
    },
    {
      id: "contact_chiara",
      name: "Chiara (Grafica Volantini)",
      phone: "+39 346 111 2222",
      avatar: "/img/chiamata"
    },
    {
      id: "contact_barbara_gatti",
      name: "Barbara (Rifugio Gatti)",
      phone: "+39 328 333 4444",
      avatar: "/img/chiamata"
    },
    {
      id: "contact_stefano_coord",
      name: "Stefano (Coordinamento Bici)",
      phone: "+39 345 555 6666",
      avatar: "/img/chiamata"
    },
    {
      id: "contact_federica",
      name: "Federica (Permacultura RM)",
      phone: "+39 331 444 5555",
      avatar: "/img/chiamata"
    },
    {
      id: "contact_salvaterra",
      name: "Associazione Salvaterra",
      phone: "+39 06 999 888",
      avatar: "/img/chiamata"
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
          image: "/img/profilo",
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
      avatar: "/img/profilo",
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
          image: "/img/profilo",
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
      avatar: "/img/chiamata",
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
      avatar: "/img/chiamata",
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
          image: "/img/profilo",
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
      avatar: "/img/chiamata",
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
