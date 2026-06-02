import type { Day } from '../types/index.types'

export const days: Day[] = [
  {
    id: 1,
    label: 'PUSH',
    type: 'push',
    color: '#3D1A00',
    accent: '#FF6B35',
    emoji: '💪',
    exercises: [
      {
        name: 'Développé couché barre',
        warmupSeries: '2×15',
        series: '3×10',
        rest: '2 min',
        hasWeight: true,
        defaultWeight: 40,
        img: '/images/exercises/developpe-couche-halteres.webp',
        muscles: ['Pectoraux', 'Triceps', 'Épaules ant.'],
        desc: 'Allongé sur un banc plat, pieds à plat au sol. Saisir la barre en prise pronation, mains légèrement plus larges que les épaules. Descendre lentement la barre vers le milieu des pectoraux, puis pousser de manière explosive. Coudes à 45–75° du corps. (Poids barre à vide: 20kg)',
        tips: [
          'Omoplates serrées et fesses sur le banc',
          'Ne jamais rebondir la barre sur la poitrine',
          'Expirer à la poussée'
        ]
      },
      {
        name: 'Développé incliné haltères',
        series: '3×10',
        rest: '90s',
        hasWeight: true,
        defaultWeight: 12,
        img: '/images/exercises/developpe-incline-halteres.webp',
        muscles: ['Pectoraux hauts', 'Épaules ant.', 'Triceps'],
        desc: "Banc incliné à 30–45°. Haltères au niveau des épaules, paumes vers l'avant. Pousser verticalement en arc de cercle jusqu'à ce que les haltères se rejoignent au-dessus. Descendre lentement en contrôlant le mouvement.",
        tips: [
          'Angle 30–45° pour cibler le chef claviculaire',
          "Ne pas écraser les épaules vers l'avant",
          'Amplitude complète à chaque répétition'
        ]
      },
      {
        name: 'Pecfly',
        series: '3×10',
        rest: '90s',
        hasWeight: true,
        defaultWeight: 32,
        img: '/images/exercises/pecfly.webp',
        muscles: ['Pectoraux', 'Épaules ant.'],
        desc: 'Sur machine pec deck ou câbles. Bras légèrement fléchis, partir en ouverture complète. Ramener les bras devant en arc de cercle, en imaginant serrer quelque chose entre les pectoraux. Contraction maximale en fin de mouvement.',
        tips: [
          'Coudes légèrement fléchis et fixes pendant tout le mouvement',
          'Contraction 1 sec en position fermée',
          "Descendre lentement à l'ouverture"
        ]
      },
      {
        name: 'Dips assistés',
        series: '3×10',
        rest: '90s',
        hasWeight: true,
        assistedWeight: true,
        defaultWeight: 36,
        img: '/images/exercises/dips-assistes.webp',
        muscles: ['Triceps', 'Pectoraux inf.', 'Épaules ant.'],
        desc: "Sur machine à dips assistés. Corps légèrement incliné vers l'avant pour cibler les pectoraux. Descendre lentement jusqu'à 90° de flexion du coude, remonter en extension. L'assistance permet de progresser vers les dips libres.",
        tips: [
          'Épaules vers le bas, pas vers les oreilles',
          'Descendre lentement (2–3 sec)',
          "Réduire l'assistance au fil des semaines"
        ]
      },
      {
        name: 'Développé militaire machine',
        series: '3×10',
        rest: '90s',
        hasWeight: true,
        defaultWeight: 9,
        img: '/images/exercises/developpe-militaire-machine.gif',
        muscles: ['Épaules (deltoïdes)', 'Triceps', 'Trapèzes'],
        desc: 'Sur machine shoulder press ou avec haltères assis. Partir à hauteur des épaules, pousser verticalement sans verrouiller les coudes en haut. Revenir lentement. Dos en contact avec le dossier, gainage serré.',
        tips: [
          'Ne pas cambrer le bas du dos',
          'Amplitude complète : bras presque tendus en haut',
          'Expirer à la poussée'
        ]
      },
      {
        name: 'Triceps poulie',
        series: '3×10',
        rest: '60s',
        hasWeight: true,
        defaultWeight: 23,
        img: '/images/exercises/triceps-poulie.webp',
        muscles: ['Triceps'],
        desc: "Debout face à la poulie haute, saisir la corde ou la barre. Coudes collés au corps et fixes, pousser vers le bas jusqu'à extension complète. Remonter lentement en contrôlant.",
        tips: [
          'Coudes ne bougent pas — seuls les avant-bras se déplacent',
          'Extension complète à chaque rep',
          'Contraction maximale en bas'
        ]
      },
      {
        name: 'Lombaires (finish)',
        series: '3×20',
        rest: '60s',
        hasWeight: false,
        img: '/images/exercises/lombaires.webp',
        muscles: ['Érecteurs du dos', 'Fessiers', 'Ischio-jambiers'],
        desc: "Sur banc à lombaires ou au sol. Partir en flexion avant, dos arrondi, puis étendre le dos jusqu'à la position neutre (ligne droite). Ne pas hyper-étendre. Mouvement lent et contrôlé.",
        tips: [
          'Ne pas dépasser la ligne droite en haut',
          'Gainage abdominal léger pendant le mouvement',
          'Respiration régulière'
        ]
      }
    ]
  },
  {
    id: 2,
    label: 'PULL',
    type: 'pull',
    color: '#001F3D',
    accent: '#4A90D9',
    emoji: '🔵',
    exercises: [
      {
        name: 'Tirage vertical divergent',
        warmupSeries: '2×15',
        series: '3×10',
        rest: '2 min',
        hasWeight: true,
        defaultWeight: 32,
        img: '/images/exercises/tirage-vertical-divergent.webp',
        muscles: ['Grand dorsal', 'Biceps', 'Rhomboïdes'],
        desc: "Diverging lat pulldown machine : les poignées s'écartent dans le bas du mouvement, ce qui maximise l'étirement du grand dorsal. Saisir les poignées, s'asseoir et tirer vers les épaules en pensant à ramener les coudes vers les hanches.",
        tips: [
          "Penser 'coudes vers les poches de pantalon'",
          'Ne pas incliner excessivement le buste en arrière',
          'Contraction dorsale maximale en bas'
        ]
      },
      {
        name: 'Tirage vertical (lat pull)',
        series: '3×10',
        rest: '90s',
        hasWeight: true,
        defaultWeight: 32,
        img: '/images/exercises/tirage-vertical-lat-pull.webp',
        muscles: ['Grand dorsal', 'Biceps', 'Trapèzes'],
        desc: "Poulie lat pulldown classique, prise pronation légèrement plus large que les épaules. Tirer la barre vers le haut de la poitrine en sortant les coudes vers le bas et l'extérieur. Contrôler la remontée.",
        tips: [
          'Buste légèrement incliné en arrière (10–15°)',
          'Ne pas tirer avec les bras uniquement — penser aux dorsaux',
          'Amplitude complète, bras bien tendus en haut'
        ]
      },
      {
        name: 'Tractions assistées',
        series: '3×10',
        rest: '90s',
        hasWeight: true,
        assistedWeight: true,
        defaultWeight: 27,
        img: '/images/exercises/tractions-assistees.webp',
        muscles: ['Grand dorsal', 'Biceps', 'Rhomboïdes'],
        desc: "Sur machine à tractions assistées. Prise pronation, mains légèrement plus larges que les épaules. Partir bras tendus, tirer jusqu'à ce que le menton dépasse la barre. Descendre lentement en 3 sec. Réduire l'assistance au fil du temps.",
        tips: [
          'Full range of motion obligatoire',
          'Serrer les omoplates en haut',
          "Réduire l'assistance dès que les reps sont propres"
        ]
      },
      {
        name: 'Tirage horizontal (seated row)',
        series: '3×10',
        rest: '90s',
        hasWeight: true,
        defaultWeight: 32,
        img: '/images/exercises/tirage-horizontal-seated-row.webp',
        muscles: ['Grand dorsal', 'Rhomboïdes', 'Biceps'],
        desc: "Assis face à la poulie basse, pieds sur les repose-pieds, genoux légèrement fléchis. Saisir la poignée, dos droit. Tirer vers le bas de l'abdomen en ramenant les coudes derrière le corps. Contraction maximale, puis retour contrôlé.",
        tips: [
          'Ne pas arrondir le dos au retour',
          'Le mouvement part des coudes, pas des mains',
          'Serrer les omoplates à chaque rep'
        ]
      },
      {
        name: 'Pupitre biceps',
        series: '3×10',
        rest: '60s',
        hasWeight: true,
        defaultWeight: 12,
        img: '/images/exercises/pupitre-biceps.webp',
        muscles: ['Biceps', 'Avant-bras'],
        desc: "Sur banc pupitre (preacher curl). Bras posés sur le coussin incliné, saisir la barre ou les haltères. Fléchir les coudes en enroulant les biceps, amener les mains vers les épaules. Descendre lentement jusqu'à l'extension complète.",
        tips: [
          "Amplitude complète — descendre jusqu'à l'extension",
          "Pas d'élan, mouvement pur des biceps",
          'Contraction 1 sec en haut'
        ]
      },
      {
        name: 'Poulie biceps',
        series: '3×10',
        rest: '60s',
        hasWeight: true,
        defaultWeight: 18,
        img: '/images/exercises/poulie-biceps.gif',
        muscles: ['Biceps', 'Avant-bras'],
        desc: 'Debout face à la poulie basse, saisir la corde ou la barre. Coudes collés au corps et fixes. Fléchir les avant-bras vers les épaules en rotation supination. Descendre lentement. La tension constante de la poulie stimule le muscle différemment des haltères.',
        tips: [
          'Coudes fixes et collés aux côtes',
          'Supination maximale en haut (paumes vers le plafond)',
          'Ne pas basculer le buste en arrière'
        ]
      },
      {
        name: 'Lombaires (finish)',
        series: '3×10',
        rest: '60s',
        hasWeight: false,
        img: '/images/exercises/lombaires.webp',
        muscles: ['Érecteurs du dos', 'Fessiers', 'Ischio-jambiers'],
        desc: "Sur banc à lombaires ou au sol. Partir en flexion avant, dos arrondi, puis étendre le dos jusqu'à la position neutre (ligne droite). Ne pas hyper-étendre. Mouvement lent et contrôlé.",
        tips: [
          'Ne pas dépasser la ligne droite en haut',
          'Gainage abdominal léger pendant le mouvement',
          'Respiration régulière'
        ]
      }
    ]
  },
  {
    id: 3,
    label: 'LEGS',
    type: 'legs',
    color: '#1A0033',
    accent: '#9B59B6',
    emoji: '🦵',
    exercises: [
      {
        name: 'Squat barre',
        warmupSeries: '2×15',
        series: '4×8',
        rest: '2 min',
        hasWeight: true,
        defaultWeight: 40,
        img: '/images/exercises/squat-barre.webp',
        muscles: ['Quadriceps', 'Fessiers', 'Ischio-jambiers'],
        desc: "Barre posée sur les trapèzes, pieds à largeur d'épaules, orteils légèrement vers l'extérieur. Descendre en gardant le dos droit et les genoux dans l'axe des orteils. Cuisses parallèles au sol minimum. Remonter en poussant dans les talons.",
        tips: [
          'Regard droit devant, ne pas baisser la tête',
          'Genoux dans l\'axe des orteils, ne pas les laisser rentrer',
          'Descendre lentement (3 sec), remonter fort'
        ]
      },
      {
        name: 'Presse à cuisses',
        series: '3×12',
        rest: '90s',
        hasWeight: true,
        defaultWeight: 60,
        img: '/images/exercises/presse-cuisses.webp',
        muscles: ['Quadriceps', 'Fessiers', 'Ischio-jambiers'],
        desc: "Pieds à largeur d'épaules sur la plateforme, à mi-hauteur. Descendre la plateforme lentement jusqu'à 90° de flexion du genou, puis repousser sans verrouiller les genoux en haut. Ne jamais laisser les fesses décoller du siège.",
        tips: [
          'Pieds ni trop hauts ni trop bas sur la plateforme',
          'Ne pas verrouiller les genoux en extension',
          'Fesses collées au siège en permanence'
        ]
      },
      {
        name: 'Leg curl couché',
        series: '3×12',
        rest: '90s',
        hasWeight: true,
        defaultWeight: 25,
        img: '/images/exercises/leg-curl.webp',
        muscles: ['Ischio-jambiers', 'Mollets'],
        desc: "Allongé sur la machine, coussin au-dessus des chevilles. Fléchir les genoux pour ramener les talons vers les fessiers. Contracter les ischio-jambiers en haut, redescendre lentement. Hanches plaquées sur le coussin.",
        tips: [
          'Ne pas décoller les hanches du coussin',
          'Contraction maximale en haut (1 sec)',
          'Descente lente et contrôlée (3 sec)'
        ]
      },
      {
        name: 'Leg extension',
        series: '3×12',
        rest: '90s',
        hasWeight: true,
        defaultWeight: 25,
        img: '/images/exercises/leg-extension.webp',
        muscles: ['Quadriceps'],
        desc: "Assis sur la machine, coussin sur le dessus des chevilles. Étendre les jambes jusqu'à la position horizontale en contractant les quadriceps. Redescendre lentement sans laisser les poids toucher la pile.",
        tips: [
          'Extension complète à chaque répétition',
          'Contraction 1 sec en haut',
          'Ne pas prendre d\'élan avec le buste'
        ]
      },
      {
        name: 'Fentes haltères',
        series: '3×10',
        rest: '90s',
        hasWeight: true,
        defaultWeight: 12,
        img: '/images/exercises/fentes-halteres.webp',
        muscles: ['Quadriceps', 'Fessiers', 'Ischio-jambiers'],
        desc: "Debout, haltères en main, faire un grand pas en avant. Descendre le genou arrière vers le sol sans le toucher. Genou avant dans l'axe du pied, jamais en avant du pied. Repousser pour revenir à la position initiale et alterner.",
        tips: [
          'Grand pas pour protéger le genou avant',
          'Buste droit, regard devant',
          'Descente lente, poussée explosive'
        ]
      },
      {
        name: 'Mollets debout',
        series: '4×15',
        rest: '60s',
        hasWeight: true,
        defaultWeight: 0,
        img: '/images/exercises/mollets-debout.webp',
        muscles: ['Mollets', 'Soléaire'],
        desc: "Sur une marche ou au sol. Monter sur la pointe des pieds le plus haut possible, contraction maximale, redescendre lentement jusqu'à l'étirement complet. Ajouter du poids (haltère, barre) quand le poids du corps devient insuffisant.",
        tips: [
          'Amplitude complète : étirement total en bas',
          'Contraction 1 sec en haut',
          'Mouvement lent et contrôlé, pas de rebond'
        ]
      },
      {
        name: 'Lombaires (finish)',
        series: '3×20',
        rest: '60s',
        hasWeight: false,
        img: '/images/exercises/lombaires.webp',
        muscles: ['Érecteurs du dos', 'Fessiers', 'Ischio-jambiers'],
        desc: "Sur banc à lombaires ou au sol. Partir en flexion avant, dos arrondi, puis étendre le dos jusqu'à la position neutre (ligne droite). Ne pas hyper-étendre. Mouvement lent et contrôlé.",
        tips: [
          'Ne pas dépasser la ligne droite en haut',
          'Gainage abdominal léger pendant le mouvement',
          'Respiration régulière'
        ]
      }
    ]
  },
  {
    id: 4,
    label: 'FULL BODY',
    type: 'fullbody',
    color: '#1A1A00',
    accent: '#F1C40F',
    emoji: '⚡',
    exercises: [
      {
        name: 'Soulevé de terre roumain',
        warmupSeries: '2×15',
        series: '3×10',
        rest: '2 min',
        hasWeight: true,
        defaultWeight: 40,
        img: '/images/exercises/soulevé-terre-roumain.webp',
        muscles: ['Ischio-jambiers', 'Fessiers', 'Érecteurs du dos'],
        desc: "Barre en pronation, pieds à largeur des hanches. Descendre la barre le long des jambes en poussant les hanches vers l'arrière, dos parfaitement droit. Sentir l'étirement des ischio-jambiers. Remonter en contractant les fessiers.",
        tips: [
          'Le mouvement vient des hanches, pas du dos',
          'Barre proche du corps tout au long',
          'Genoux légèrement fléchis mais fixes'
        ]
      },
      {
        name: 'Développé couché haltères',
        series: '3×10',
        rest: '90s',
        hasWeight: true,
        defaultWeight: 14,
        img: '/images/exercises/developpe-couche-halteres.webp',
        muscles: ['Pectoraux', 'Triceps', 'Épaules ant.'],
        desc: "Allongé sur banc plat, haltères au niveau des épaules. Pousser verticalement jusqu'à extension presque complète, revenir lentement. Plus grande amplitude que la barre, meilleur étirement pectoral.",
        tips: [
          'Omoplates serrées sur le banc',
          'Descente lente en 3 sec',
          'Ne pas cogner les haltères en haut'
        ]
      },
      {
        name: 'Tirage horizontal unilatéral',
        series: '3×10',
        rest: '90s',
        hasWeight: true,
        defaultWeight: 16,
        img: '/images/exercises/tirage-horizontal-seated-row.webp',
        muscles: ['Grand dorsal', 'Rhomboïdes', 'Biceps'],
        desc: "Un genou et une main sur un banc, haltère dans l'autre main. Tirer l'haltère vers la hanche en gardant le coude près du corps. Dos horizontal, gainage actif. Alterner les côtés.",
        tips: [
          'Coude proche du corps, pas écarté',
          'Rotation du buste minimale',
          'Amplitude maximale : bras tendu en bas'
        ]
      },
      {
        name: 'Squat goblet',
        series: '3×15',
        rest: '90s',
        hasWeight: true,
        defaultWeight: 16,
        img: '/images/exercises/squat-barre.webp',
        muscles: ['Quadriceps', 'Fessiers', 'Core'],
        desc: "Tenir un haltère verticalement contre la poitrine. Pieds légèrement plus larges que les épaules, orteils vers l'extérieur. Descendre profondément en gardant le buste droit. Le goblet squat force une posture verticale et cible davantage les quadriceps.",
        tips: [
          'Coudes restent à l\'intérieur des genoux en bas',
          'Descendre le plus bas possible',
          'Talons au sol en permanence'
        ]
      },
      {
        name: 'Développé militaire haltères',
        series: '3×10',
        rest: '90s',
        hasWeight: true,
        defaultWeight: 10,
        img: '/images/exercises/developpe-militaire-machine.gif',
        muscles: ['Épaules (deltoïdes)', 'Triceps', 'Trapèzes'],
        desc: "Assis ou debout, haltères à hauteur des épaules, paumes vers l'avant. Pousser verticalement jusqu'à extension presque complète. Revenir lentement. Le travail libre active davantage les stabilisateurs.",
        tips: [
          'Gainage abdominal serré pour protéger le dos',
          'Ne pas verrouiller les coudes en haut',
          'Expirer à la poussée'
        ]
      },
      {
        name: 'Gainage planche',
        series: '3×45s',
        rest: '60s',
        hasWeight: false,
        img: '/images/exercises/gainage-planche.webp',
        muscles: ['Core', 'Transverse', 'Épaules'],
        desc: "Avant-bras au sol, corps aligné de la tête aux talons. Contracter abdominaux, fessiers et jambes simultanément. Maintenir la position sans laisser les hanches monter ou descendre.",
        tips: [
          'Hanches dans le prolongement du corps — ni trop hautes ni trop basses',
          'Respirer normalement sans bloquer',
          'Regard vers le sol, nuque neutre'
        ]
      },
      {
        name: 'Lombaires (finish)',
        series: '3×20',
        rest: '60s',
        hasWeight: false,
        img: '/images/exercises/lombaires.webp',
        muscles: ['Érecteurs du dos', 'Fessiers', 'Ischio-jambiers'],
        desc: "Sur banc à lombaires ou au sol. Partir en flexion avant, dos arrondi, puis étendre le dos jusqu'à la position neutre (ligne droite). Ne pas hyper-étendre. Mouvement lent et contrôlé.",
        tips: [
          'Ne pas dépasser la ligne droite en haut',
          'Gainage abdominal léger pendant le mouvement',
          'Respiration régulière'
        ]
      }
    ]
  },
  {
    id: 5,
    label: 'CARDIO',
    type: 'cardio',
    color: '#001A2E',
    accent: '#7b00ce',
    emoji: '🏃',
    exercises: [
      {
        name: 'Rameur',
        series: '10 min',
        rest: '',
        hasWeight: false,
        img: '/images/exercises/rameur.webp',
        muscles: ['Cardio', 'Grand dorsal', 'Biceps'],
        desc: "Séquence par phase : 60% de puissance avec le poussé des jambes, 20% avec le recul du tronc, 20% avec le tirage des bras. Retour dans l'ordre inverse. Objectif : maintenir une allure régulière sur 10 minutes, pas de sprint.",
        tips: [
          "Jambes d'abord, puis tronc, puis bras — dans cet ordre",
          'Dos droit tout au long, jamais arrondi',
          'Cadence cible : 22–26 coups/min en endurance'
        ]
      },
      {
        name: 'Marche inclinée tapis',
        series: '40 min',
        rest: '',
        hasWeight: false,
        img: '/images/exercises/marche-inclinees-tapis.webp',
        muscles: ['Cardio', 'Fessiers', 'Ischio-jambiers'],
        desc: 'Vitesse : 5 km/h. Inclinaison : commencer à 8 et progresser jusqu\'à 10 en cours de séance. Ce protocole ("12-3-30" adapté) maximise la combustion des graisses sans impact articulaire. Ne pas tenir les barres — laisser les bras balancer naturellement.',
        tips: [
          "Ne pas s'accrocher aux barres latérales",
          'Inclinaison 8 les 20 premières minutes, 10 ensuite si possible',
          'Maintenir un pas actif et régulier'
        ]
      },
      {
        name: 'Vélo stationnaire',
        series: '10 min',
        rest: '',
        hasWeight: false,
        img: '/images/exercises/velo-stationnaire.webp',
        muscles: ['Cardio', 'Quadriceps', 'Fessiers'],
        desc: 'Récupération active post-marche. Résistance légère à modérée, cadence de 70–90 rpm. Permet de récupérer les jambes tout en maintenant le rythme cardiaque actif. Dernier effort de la séance.',
        tips: [
          'Selle à hauteur des hanches pour protéger les genoux',
          "Résistance légère — c'est de la récupération active",
          'Rythme de pédalage régulier, ne pas mouliner'
        ]
      }
    ]
  }
]