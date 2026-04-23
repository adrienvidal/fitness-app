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
        desc: 'Allongé sur un banc plat, pieds à plat au sol. Saisir la barre en prise pronation, mains légèrement plus larges que les épaules. Descendre lentement la barre vers le milieu des pectoraux, puis pousser de manière explosive. Coudes à 45–75° du corps. (Poids barre à vide: 20kg) ',
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
        name: 'Barre au front',
        series: '3×10',
        rest: '60s',
        hasWeight: true,
        defaultWeight: 0,
        img: '/images/exercises/barre-au-front.webp',
        muscles: ['Triceps'],
        desc: 'Allongé sur un banc, barre EZ au-dessus de la poitrine, bras tendus. Fléchir les coudes pour descendre la barre vers le front (ou légèrement derrière la tête). Remonter en extension sans bouger les coudes.',
        tips: [
          'Coudes pointés vers le plafond et fixes',
          'Descendre lentement pour contrôler',
          'Ne pas verrouiller brutalement les coudes en haut'
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
    label: 'CALI',
    type: 'cali',
    color: '#0D2B0D',
    accent: '#2ECC71',
    emoji: '🟢',
    exercises: [
      {
        name: 'Jumping Jacks',
        series: '3×30s',
        rest: '30s',
        hasWeight: false,
        cat: 'Full body',
        img: '/images/exercises/jumping-jacks.webp',
        muscles: ['Corps entier', 'Cardio', 'Mollets'],
        desc: "Debout, pieds joints et bras le long du corps. Sauter en écartant les jambes à largeur d'épaules tout en levant les bras au-dessus de la tête. Revenir à la position de départ. Maintenir un rythme régulier.",
        tips: [
          "Atterrir doucement sur l'avant du pied",
          "Bras tendus jusqu'au-dessus de la tête",
          'Maintenir le rythme sur toute la durée'
        ]
      },
      {
        name: 'Pompes',
        series: '3×12',
        rest: '60s',
        hasWeight: false,
        cat: 'Haut du corps',
        img: '/images/exercises/pompes.webp',
        muscles: ['Pectoraux', 'Triceps', 'Épaules ant.'],
        desc: "Mains à largeur d'épaules, corps aligné des épaules aux talons. Descendre la poitrine vers le sol en fléchissant les coudes à 45° du corps. Remonter en extension complète sans verrouiller brutalement les coudes.",
        tips: [
          'Corps gainé de la tête aux talons — ne pas cambrer',
          'Coudes à 45° du corps, pas écartés à 90°',
          'Amplitude complète : poitrine au ras du sol'
        ]
      },
      {
        name: 'Crunchs',
        series: '3×15',
        rest: '60s',
        hasWeight: false,
        cat: 'Core',
        img: '/images/exercises/crunchs.webp',
        muscles: ['Abdominaux', 'Rectus abdominis'],
        desc: 'Allongé sur le dos, genoux fléchis, pieds à plat au sol. Mains derrière la nuque sans tirer dessus. Contracter les abdos pour décoller les omoplates du sol, en gardant le bas du dos au sol. Redescendre lentement.',
        tips: [
          'Ne pas tirer sur la nuque avec les mains',
          'Expirer à la montée, inspirer à la descente',
          'Mouvement court et contrôlé — pas besoin de monter haut'
        ]
      },
      {
        name: 'Twists obliques',
        series: '3×20',
        rest: '60s',
        hasWeight: false,
        cat: 'Core rotation',
        img: '/images/exercises/twists-obliques.webp',
        muscles: ['Obliques', 'Abdominaux', 'Transverse'],
        desc: 'Assis au sol, genoux fléchis, pieds légèrement soulevés ou posés selon le niveau. Pencher légèrement le buste en arrière, mains jointes devant la poitrine. Tourner le buste alternativement à droite et à gauche en contractant les obliques.',
        tips: [
          'Rotation vient du buste, pas des hanches',
          "Dos droit, ne pas s'affaisser",
          'Contrôler le mouvement, ne pas aller trop vite'
        ]
      },
      {
        name: 'Relevé de jambes',
        series: '3×12',
        rest: '60s',
        hasWeight: false,
        cat: 'Core',
        img: '/images/exercises/releve-de-jambes.webp',
        muscles: ['Abdominaux bas', 'Hip flexors', 'Transverse'],
        desc: "Allongé sur le dos, mains sous les fessiers ou le long du corps. Jambes tendues, les lever jusqu'à la verticale en contractant les abdos. Redescendre lentement sans laisser les talons toucher le sol.",
        tips: [
          'Bas du dos plaqué au sol en permanence',
          "Ne pas prendre d'élan — mouvement contrôlé",
          'Jambes le plus tendues possible'
        ]
      },
      {
        name: 'Squats',
        series: '3×30',
        rest: '60s',
        hasWeight: false,
        cat: 'Bas du corps',
        img: '/images/exercises/squats.webp',
        muscles: ['Quadriceps', 'Fessiers', 'Ischio-jambiers'],
        desc: "Pieds à largeur d'épaules, orteils légèrement vers l'extérieur. Descendre en poussant les hanches vers l'arrière et en fléchissant les genoux, comme pour s'asseoir sur une chaise. Cuisses parallèles au sol. Remonter en poussant dans les talons.",
        tips: [
          "Genoux dans l'axe des orteils, ne pas les laisser rentrer",
          'Dos droit, regard devant soi',
          'Talons au sol tout au long'
        ]
      },
      {
        name: 'Jambe tendue',
        series: '3×12',
        rest: '60s',
        hasWeight: false,
        cat: 'Bas du corps',
        img: '/images/exercises/jambe-tendue.webp',
        muscles: ['Ischio-jambiers', 'Fessiers', 'Quadriceps'],
        desc: "Debout, pieds à largeur des hanches. Tendre une jambe vers l'avant à hauteur de hanche en gardant le dos droit et la jambe d'appui légèrement fléchie. Redescendre lentement et alterner les jambes.",
        tips: [
          'Garder le dos droit, ne pas se pencher en avant',
          'Jambe tendue mais genou non verrouillé',
          'Contracter le fessier de la jambe levée'
        ]
      },
      {
        name: 'Mountain climbers',
        series: '3×30',
        rest: '60s',
        hasWeight: false,
        cat: 'Full body',
        img: '/images/exercises/mountains-climbers.gif',
        muscles: ['Abdominaux', 'Épaules', 'Hip flexors'],
        desc: 'Position de pompes bras tendus, corps aligné des épaules aux talons. Ramener alternativement chaque genou vers la poitrine en courant sur place. Hanches basses et stables tout au long du mouvement.',
        tips: [
          'Hanches restent basses, ne pas les lever vers le plafond',
          'Bras tendus et stables sous les épaules',
          'Inspirer/expirer régulièrement sans bloquer la respiration'
        ]
      }
    ]
  },
  {
    id: 4,
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
