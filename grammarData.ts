import { GrammarCategory, QuizQuestion, ExampleSentence } from './types.ts';

export const introSentence: ExampleSentence = {
  id: 'intro-sentence',
  es: 'María compra un libro interesante hoy.',
  am: 'Մարիան այսօր հետաքրքիր գիրք է գնում։',
  highlightWords: [
    { word: 'María', categoryEs: 'sustantivo', categoryAm: 'գոյական' },
    { word: 'compra', categoryEs: 'verbo', categoryAm: 'բայ' },
    { word: 'un', categoryEs: 'determinante', categoryAm: 'որոշիչ' },
    { word: 'libro', categoryEs: 'sustantivo', categoryAm: 'գոյական' },
    { word: 'interesante', categoryEs: 'adjetivo', categoryAm: 'ածական' },
    { word: 'hoy', categoryEs: 'adverbio', categoryAm: 'մակբայ' },
  ]
};

export const categoriesData: GrammarCategory[] = [
  {
    id: 'sustantivo',
    number: 1,
    slug: 'sustantivo',
    titleEs: 'Sustantivo',
    titleAm: 'Գոյական',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    iconName: 'tag',
    quickSummaryEs: 'Nombra personas, animales, cosas, lugares o ideas',
    quickSummaryAm: 'Անվանում է մարդ, կենդանի, առարկա, վայր կամ գաղափար',
    explanationEs: 'El sustantivo es una palabra que sirve para nombrar personas, animales, objetos, lugares, sentimientos o ideas. Puede ser masculino o femenino, singular o plural.',
    explanationAm: 'Գոյականը բառ է, որը անվանում է մարդ, կենդանի, առարկա, վայր, զգացում կամ գաղափար։ Գոյականը կարող է լինել արական կամ իգական սեռի, եզակի կամ հոգնակի թվով։',
    examples: [
      { id: 'sus-1', es: 'niño', am: 'տղա', note: 'persona / անձ' },
      { id: 'sus-2', es: 'perro', am: 'շուն', note: 'animal / կենդանի' },
      { id: 'sus-3', es: 'mesa', am: 'սեղան', note: 'objeto / առարկա' },
      { id: 'sus-4', es: 'Madrid', am: 'Մադրիդ', note: 'lugar / վայր' },
      { id: 'sus-5', es: 'amor', am: 'սեր', note: 'sentimiento / զգացմունք' },
      { id: 'sus-6', es: 'libertad', am: 'ազատություն', note: 'idea / գաղափար' },
    ],
    sentences: [
      {
        id: 'sus-sent-1',
        es: 'María tiene un perro pequeño.',
        am: 'Մարիան փոքր շուն ունի։',
        highlightWords: [
          { word: 'María', categoryEs: 'sustantivo (propio)', categoryAm: 'գոյական (հատուկ)' },
          { word: 'perro', categoryEs: 'sustantivo (común)', categoryAm: 'գոյական (հասարակ)' }
        ],
        noteEs: 'María y perro son sustantivos.',
        noteAm: 'María և perro → գոյականներ։'
      }
    ],
    extraSectionTitleEs: 'Tipos de sustantivos',
    extraSectionTitleAm: 'Գոյականների տեսակները',
    extraItems: [
      {
        es: 'Comunes: nombres generales (casa, profesor, ciudad)',
        am: 'Հասարակ գոյականներ: ընդհանուր անուններ (տուն, ուսուցիչ, քաղաք)',
        descEs: 'Sirven para nombrar cualquier persona, animal o cosa de una misma clase.',
        descAm: 'Ծառայում են նույն տեսակի ցանկացած մարդու, կենդանու կամ առարկայի անվանման համար։'
      },
      {
        es: 'Propios: nombres específicos y se escriben con mayúscula (María, España, Barcelona)',
        am: 'Հատուկ գոյականներ: կոնկրետ անուններ են և իսպաներենում գրվում են մեծատառով (Մարիա, Իսպանիա, Բարսելոնա)',
        descEs: 'Identifican a un ser o lugar individual distinguiéndolo de los demás.',
        descAm: 'Առանձնացնում են կոնկրետ անհատին կամ վայրը մյուսներից։'
      },
      {
        es: 'Concretos: cosas que podemos percibir (mesa, gato, agua)',
        am: 'Կոնկրետ գոյականներ: այն բաները, որոնք կարելի է տեսնել, լսել կամ զգալ (սեղան, կատու, ջուր)',
        descEs: 'Hacen referencia a realidades tangibles o perceptibles por los sentidos.',
        descAm: 'Վերաբերում են շոշափելի կամ զգայարաններով ընկալվող իրականությանը։'
      },
      {
        es: 'Abstractos: sentimientos, ideas o conceptos (amor, miedo, felicidad)',
        am: 'Վերացական գոյականներ: զգացմունքներ, գաղափարներ կամ հասկացություններ (սեր, վախ, երջանկություն)',
        descEs: 'Nombran realidades que no se pueden tocar ni percibir con los sentidos.',
        descAm: 'Անվանում են հասկացություններ, որոնք հնարավոր չէ շոշափել կամ տեսնել։'
      }
    ]
  },
  {
    id: 'adjetivo',
    number: 2,
    slug: 'adjetivo',
    titleEs: 'Adjetivo',
    titleAm: 'Ածական',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    iconName: 'sparkles',
    quickSummaryEs: 'Describe cómo es o está el sustantivo',
    quickSummaryAm: 'Նկարագրում է գոյականի հատկանիշը կամ վիճակը',
    explanationEs: 'El adjetivo acompaña al sustantivo y explica cómo es una persona, un animal, una cosa o un lugar. Normalmente concuerda con el sustantivo en género y número.',
    explanationAm: 'Ածականը նկարագրում է գոյականը և ցույց է տալիս, թե ինչպիսին է մարդը, կենդանին, առարկան կամ վայրը։ Իսպաներենում ածականը սովորաբար համաձայնվում է գոյականի հետ սեռով և թվով։',
    examples: [
      { id: 'adj-1', es: 'grande', am: 'մեծ', note: 'tamaño / չափ' },
      { id: 'adj-2', es: 'pequeño', am: 'փոքր', note: 'tamaño / չափ' },
      { id: 'adj-3', es: 'bonito', am: 'գեղեցիկ', note: 'apariencia / տեսք' },
      { id: 'adj-4', es: 'inteligente', am: 'խելացի', note: 'cualidad / հատկանիշ' },
      { id: 'adj-5', es: 'rápido', am: 'արագ', note: 'velocidad / արագություն' },
      { id: 'adj-6', es: 'interesante', am: 'հետաքրքիր', note: 'cualidad / հատկանիշ' },
    ],
    sentences: [
      {
        id: 'adj-sent-1',
        es: 'Una casa grande.',
        am: 'Մեծ տուն։',
        highlightWords: [
          { word: 'casa', categoryEs: 'sustantivo', categoryAm: 'գոյական' },
          { word: 'grande', categoryEs: 'adjetivo', categoryAm: 'ածական' }
        ]
      },
      {
        id: 'adj-sent-2',
        es: 'Un chico inteligente.',
        am: 'Խելացի տղա։',
        highlightWords: [
          { word: 'chico', categoryEs: 'sustantivo', categoryAm: 'գոյական' },
          { word: 'inteligente', categoryEs: 'adjetivo', categoryAm: 'ածական' }
        ]
      }
    ],
    extraSectionTitleEs: 'Concordancia (Género y Número)',
    extraSectionTitleAm: 'Համաձայնություն (Սեռ և Թիվ)',
    extraItems: [
      {
        es: 'niño alto',
        am: 'բարձրահասակ տղա',
        descEs: 'Masculino singular (արական եզակի)',
        descAm: 'Գոյականն ու ածականը արական սեռի են և եզակի թվով'
      },
      {
        es: 'niña alta',
        am: 'բարձրահասակ աղջիկ',
        descEs: 'Femenino singular (իգական եզակի)',
        descAm: 'Ածականը ստանում է -a վերջավորություն իգական սեռի համար'
      },
      {
        es: 'niños altos',
        am: 'բարձրահասակ տղաներ',
        descEs: 'Masculino plural (արական հոգնակի)',
        descAm: 'Երկուսն էլ ստանում են հոգնակի թվի -s վերջավորությունը'
      },
      {
        es: 'niñas altas',
        am: 'բարձրահասակ աղջիկներ',
        descEs: 'Femenino plural (իգական հոգնակի)',
        descAm: 'Իգական հոգնակի համաձայնեցում (-as)'
      }
    ]
  },
  {
    id: 'verbo',
    number: 3,
    slug: 'verbo',
    titleEs: 'Verbo',
    titleAm: 'Բայ',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    iconName: 'zap',
    quickSummaryEs: 'Expresa acción, estado o proceso',
    quickSummaryAm: 'Ցույց է տալիս գործողություն, վիճակ կամ գործընթաց',
    explanationEs: 'El verbo expresa una acción, un estado o un proceso. Los verbos cambian según la persona, el número, el tiempo y el modo.',
    explanationAm: 'Բայը ցույց է տալիս գործողություն, վիճակ կամ գործընթաց։ Իսպաներենում բայը փոխվում է ըստ դեմքի, թվի, ժամանակի և եղանակի։',
    subCategories: [
      {
        id: 'verb-accion',
        nameEs: 'Acción',
        nameAm: 'Գործողություն',
        descEs: 'Indican una actividad física o mental.',
        descAm: 'Ցույց են տալիս ֆիզիկական կամ մտավոր գործունեություն։',
        items: [
          { id: 'v-act-1', es: 'comer', am: 'ուտել' },
          { id: 'v-act-2', es: 'estudiar', am: 'սովորել' },
          { id: 'v-act-3', es: 'correr', am: 'վազել' },
          { id: 'v-act-4', es: 'escribir', am: 'գրել' },
        ]
      },
      {
        id: 'verb-estado',
        nameEs: 'Estado',
        nameAm: 'Վիճակ',
        descEs: 'Describen cómo está o cómo es algo/alguien.',
        descAm: 'Նկարագրում են ինչպիսին է կամ ինչ վիճակում է գտնվում սուբյեկտը։',
        items: [
          { id: 'v-est-1', es: 'ser', am: 'լինել (հիմնական/մշտական)' },
          { id: 'v-est-2', es: 'estar', am: 'լինել / գտնվել (ժամանակավոր վիճակ կամ տեղ)' },
          { id: 'v-est-3', es: 'parecer', am: 'թվալ' },
        ]
      }
    ],
    examples: [],
    sentences: [
      {
        id: 'verb-sent-1',
        es: 'Ana estudia español.',
        am: 'Անան իսպաներեն է սովորում։',
        highlightWords: [
          { word: 'estudia', categoryEs: 'verbo (acción, presente)', categoryAm: 'բայ (գործողություն, ներկա ժամանակ)' }
        ],
        noteEs: 'estudia → verbo.',
        noteAm: 'estudia → բայ։'
      },
      {
        id: 'verb-sent-2',
        es: 'Pedro está cansado.',
        am: 'Պեդրոն հոգնած է։',
        highlightWords: [
          { word: 'está', categoryEs: 'verbo (estado)', categoryAm: 'բայ (վիճակ)' }
        ],
        noteEs: 'está → verbo.',
        noteAm: 'está → բայ։'
      }
    ]
  },
  {
    id: 'adverbio',
    number: 4,
    slug: 'adverbio',
    titleEs: 'Adverbio',
    titleAm: 'Մակբայ',
    badgeColor: 'bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800',
    iconName: 'compass',
    quickSummaryEs: 'Modifica al verbo, adjetivo u otro adverbio',
    quickSummaryAm: 'Լրացնում է բային, ածականին կամ այլ մակբայի',
    explanationEs: 'El adverbio es una palabra que modifica principalmente a un verbo, pero también puede modificar a un adjetivo o a otro adverbio. Puede indicar lugar, tiempo, modo, cantidad, afirmación, negación o duda.',
    explanationAm: 'Մակբայը հիմնականում լրացնում է բային, բայց կարող է նաև լրացնել ածականին կամ մեկ այլ մակբայի։ Այն կարող է ցույց տալ տեղ, ժամանակ, ձև, քանակ և այլն։',
    subCategories: [
      {
        id: 'adv-lugar',
        nameEs: 'Lugar',
        nameAm: 'Տեղ',
        descEs: '¿Dónde ocurre la acción?',
        descAm: 'Որտե՞ղ է տեղի ունենում գործողությունը։',
        items: [
          { id: 'adv-l-1', es: 'aquí', am: 'այստեղ' },
          { id: 'adv-l-2', es: 'allí', am: 'այնտեղ' },
          { id: 'adv-l-3', es: 'cerca', am: 'մոտ' },
          { id: 'adv-l-4', es: 'lejos', am: 'հեռու' },
        ]
      },
      {
        id: 'adv-tiempo',
        nameEs: 'Tiempo',
        nameAm: 'Ժամանակ',
        descEs: '¿Cuándo ocurre?',
        descAm: 'Ե՞րբ է տեղի ունենում։',
        items: [
          { id: 'adv-t-1', es: 'hoy', am: 'այսօր' },
          { id: 'adv-t-2', es: 'ayer', am: 'երեկ' },
          { id: 'adv-t-3', es: 'mañana', am: 'վաղը' },
          { id: 'adv-t-4', es: 'siempre', am: 'միշտ' },
          { id: 'adv-t-5', es: 'nunca', am: 'երբեք' },
        ]
      },
      {
        id: 'adv-modo',
        nameEs: 'Modo',
        nameAm: 'Ձև',
        descEs: '¿Cómo se realiza?',
        descAm: 'Ինչպե՞ս է կատարվում։',
        items: [
          { id: 'adv-m-1', es: 'bien', am: 'լավ' },
          { id: 'adv-m-2', es: 'mal', am: 'վատ' },
          { id: 'adv-m-3', es: 'rápidamente', am: 'արագորեն' },
        ]
      },
      {
        id: 'adv-cantidad',
        nameEs: 'Cantidad',
        nameAm: 'Քանակ',
        descEs: '¿En qué grado o cantidad?',
        descAm: 'Ինչքա՞ն կամ որքա՞ն չափով։',
        items: [
          { id: 'adv-c-1', es: 'mucho', am: 'շատ' },
          { id: 'adv-c-2', es: 'poco', am: 'քիչ' },
          { id: 'adv-c-3', es: 'bastante', am: 'բավականին' },
          { id: 'adv-c-4', es: 'demasiado', am: 'չափազանց շատ' },
        ]
      }
    ],
    examples: [],
    sentences: [
      {
        id: 'adv-sent-1',
        es: 'María habla bien.',
        am: 'Մարիան լավ է խոսում։',
        highlightWords: [
          { word: 'habla', categoryEs: 'verbo', categoryAm: 'բայ' },
          { word: 'bien', categoryEs: 'adverbio de modo', categoryAm: 'ձևի մակբայ' }
        ],
        noteEs: 'bien explica cómo habla María.',
        noteAm: 'bien բառը բացատրում է, թե ինչպես է խոսում Մարիան (bien → մակբայ)։'
      }
    ]
  },
  {
    id: 'pronombres',
    number: 5,
    slug: 'pronombres',
    titleEs: 'Pronombres',
    titleAm: 'Դերանուններ',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',
    iconName: 'user-check',
    quickSummaryEs: 'Sustituyen al sustantivo para evitar repetirlo',
    quickSummaryAm: 'Փոխարինում են գոյականին՝ կրկնությունից խուսափելու համար',
    explanationEs: 'Los pronombres son palabras que sustituyen a un sustantivo para evitar repetirlo.',
    explanationAm: 'Դերանունը փոխարինում է գոյականին, որպեսզի նույն բառը անընդհատ չկրկնենք։',
    examples: [],
    sentences: [
      {
        id: 'pro-sent-1',
        es: 'María es profesora. Ella trabaja en una escuela.',
        am: 'Մարիան ուսուցչուհի է։ Նա աշխատում է դպրոցում։',
        highlightWords: [
          { word: 'María', categoryEs: 'sustantivo', categoryAm: 'գոյական' },
          { word: 'Ella', categoryEs: 'pronombre personal', categoryAm: 'անձնական դերանուն' }
        ],
        noteEs: 'En la segunda oración usamos ella en lugar de repetir María.',
        noteAm: 'ella բառը փոխարինում է María բառին։'
      }
    ],
    extraSectionTitleEs: 'Pronombres personales',
    extraSectionTitleAm: 'Անձնական դերանուններ',
    extraItems: [
      { es: 'yo', am: 'ես', descEs: '1.ª persona singular', descAm: '1-ին դեմք եզակի' },
      { es: 'tú', am: 'դու', descEs: '2.ª persona singular (informal)', descAm: '2-րդ դեմք եզակի (մտերիմ)' },
      { es: 'él', am: 'նա (արական)', descEs: '3.ª persona singular masculino', descAm: '3-րդ դեմք եզակի արական' },
      { es: 'ella', am: 'նա (իգական)', descEs: '3.ª persona singular femenino', descAm: '3-րդ դեմք եզակի իգական' },
      { es: 'nosotros / nosotras', am: 'մենք', descEs: '1.ª persona plural', descAm: '1-ին դեմք հոգնակի' },
      { es: 'vosotros / vosotras', am: 'դուք', descEs: '2.ª persona plural (informal España)', descAm: '2-րդ դեմք հոգնակի' },
      { es: 'ellos / ellas', am: 'նրանք', descEs: '3.ª persona plural', descAm: '3-րդ դեմք հոգնակի' },
    ]
  },
  {
    id: 'determinantes',
    number: 6,
    slug: 'determinantes',
    titleEs: 'Determinantes',
    titleAm: 'Որոշիչներ',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
    iconName: 'sliders',
    quickSummaryEs: 'Acompañan al sustantivo y lo concretan',
    quickSummaryAm: 'Ուղեկցում և որոշակիացնում են գոյականը',
    explanationEs: 'Los determinantes acompañan al sustantivo y ayudan a indicar de qué persona, cosa o cantidad estamos hablando. Normalmente aparecen delante del sustantivo.',
    explanationAm: 'Որոշիչները գործածվում են գոյականի հետ և ցույց են տալիս, թե որ անձի կամ առարկայի մասին է խոսքը, ում է այն պատկանում կամ ինչ քանակի մասին է խոսքը։ Սովորաբար գտնվում են գոյականից առաջ։',
    examples: [
      { id: 'det-ex-1', es: 'el libro', am: 'գիրքը', note: 'artículo determinado / որոշյալ հոդ' },
      { id: 'det-ex-2', es: 'una casa', am: 'մի տուն', note: 'artículo indeterminado / անորոշ հոդ' },
      { id: 'det-ex-3', es: 'mi hermano', am: 'իմ եղբայրը', note: 'posesivo / ստացական' },
      { id: 'det-ex-4', es: 'esta mesa', am: 'այս սեղանը', note: 'demostrativo / ցուցական' },
      { id: 'det-ex-5', es: 'dos coches', am: 'երկու մեքենա', note: 'numeral / թվական' },
    ],
    sentences: [],
    subCategories: [
      {
        id: 'det-articulos',
        nameEs: 'Artículos',
        nameAm: 'Հոդեր',
        descEs: 'Determinados e indeterminados.',
        descAm: 'Որոշյալ և անորոշ հոդեր։',
        items: [
          { id: 'det-a-1', es: 'el, la, los, las', am: 'որոշյալ հոդեր (արական, իգական, հոգնակի)' },
          { id: 'det-a-2', es: 'un, una, unos, unas', am: 'անորոշ հոդեր (մի, ինչ-որ, մի քանի)' },
        ]
      },
      {
        id: 'det-posesivos',
        nameEs: 'Posesivos',
        nameAm: 'Ստացական որոշիչներ',
        descEs: 'Indican posesión o pertenencia.',
        descAm: 'Ցույց են տալիս պատկանելություն։',
        items: [
          { id: 'det-p-1', es: 'mi, mis', am: 'իմ' },
          { id: 'det-p-2', es: 'tu, tus', am: 'քո' },
          { id: 'det-p-3', es: 'su, sus', am: 'նրա / իր / ձեր' },
          { id: 'det-p-4', es: 'nuestro, nuestra', am: 'մեր' },
        ]
      },
      {
        id: 'det-demostrativos',
        nameEs: 'Demostrativos',
        nameAm: 'Ցուցական որոշիչներ',
        descEs: 'Indican distancia respecto al hablante.',
        descAm: 'Ցույց են տալիս հեռավորություն խոսողից։',
        items: [
          { id: 'det-d-1', es: 'este, esta, estos, estas', am: 'այս (մոտ)' },
          { id: 'det-d-2', es: 'ese, esa, esos, esas', am: 'այդ (միջին հեռավորություն)' },
          { id: 'det-d-3', es: 'aquel, aquella, aquellos, aquellas', am: 'այն (հեռու)' },
        ]
      },
      {
        id: 'det-numerales',
        nameEs: 'Numerales',
        nameAm: 'Թվական որոշիչներ',
        descEs: 'Indican una cantidad exacta.',
        descAm: 'Ցույց են տալիս ստույգ քանակ։',
        items: [
          { id: 'det-n-1', es: 'uno, dos, tres...', am: 'մեկ, երկու, երեք...' },
        ]
      }
    ]
  },
  {
    id: 'nexos',
    number: 7,
    slug: 'nexos',
    titleEs: 'Nexos',
    titleAm: 'Կապակցիչներ',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800',
    iconName: 'link',
    quickSummaryEs: 'Unen palabras, grupos u oraciones',
    quickSummaryAm: 'Կապում են բառեր, բառակապակցություններ կամ նախադասություններ',
    explanationEs: 'Los nexos son palabras que sirven para unir palabras, grupos de palabras u oraciones. Ayudan a mostrar la relación entre dos ideas.',
    explanationAm: 'Կապակցիչները կապում են բառեր, բառակապակցություններ կամ նախադասություններ։ Դրանք ցույց են տալիս տարբեր գաղափարների միջև կապը։',
    examples: [
      { id: 'nex-1', es: 'y', am: 'և (suma / միացում)' },
      { id: 'nex-2', es: 'o', am: 'կամ (elección / ընտրություն)' },
      { id: 'nex-3', es: 'pero', am: 'բայց (contraste / հակադրություն)' },
      { id: 'nex-4', es: 'porque', am: 'որովհետև (causa / պատճառ)' },
      { id: 'nex-5', es: 'aunque', am: 'թեև / չնայած (concesión / զիջում)' },
    ],
    sentences: [
      {
        id: 'nex-sent-1',
        es: 'María estudia y trabaja.',
        am: 'Մարիան սովորում է և աշխատում է։',
        highlightWords: [
          { word: 'y', categoryEs: 'nexo (conjunción copulativa)', categoryAm: 'կապակցիչ (միացական շաղկապ)' }
        ]
      },
      {
        id: 'nex-sent-2',
        es: 'Quiero salir, pero está lloviendo.',
        am: 'Ուզում եմ դուրս գալ, բայց անձրև է գալիս։',
        highlightWords: [
          { word: 'pero', categoryEs: 'nexo (conjunción adversativa)', categoryAm: 'կապակցիչ (հակադրական շաղկապ)' }
        ]
      },
      {
        id: 'nex-sent-3',
        es: 'Me quedo en casa porque estoy cansado.',
        am: 'Ես մնում եմ տանը, որովհետև հոգնած եմ։',
        highlightWords: [
          { word: 'porque', categoryEs: 'nexo (conjunción causal)', categoryAm: 'կապակցիչ (պատճառական շաղկապ)' }
        ]
      }
    ]
  }
];

export const summaryCheatSheet = [
  {
    esTerm: 'Sustantivo',
    amTerm: 'Գոյական',
    esRole: 'nombra.',
    amRole: 'անվանում է։',
    color: 'border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
  },
  {
    esTerm: 'Adjetivo',
    amTerm: 'Ածական',
    esRole: 'describe al sustantivo.',
    amRole: 'նկարագրում է գոյականը։',
    color: 'border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20'
  },
  {
    esTerm: 'Verbo',
    amTerm: 'Բայ',
    esRole: 'expresa acción o estado.',
    amRole: 'ցույց է տալիս գործողություն կամ վիճակ։',
    color: 'border-l-rose-500 bg-rose-50/50 dark:bg-rose-950/20'
  },
  {
    esTerm: 'Adverbio',
    amTerm: 'Մակբայ',
    esRole: 'indica cómo, cuándo, dónde, cuánto...',
    amRole: 'ցույց է տալիս ինչպես, երբ, որտեղ, որքան։',
    color: 'border-l-violet-500 bg-violet-50/50 dark:bg-violet-950/20'
  },
  {
    esTerm: 'Pronombre',
    amTerm: 'Դերանուն',
    esRole: 'sustituye al sustantivo.',
    amRole: 'փոխարինում է գոյականին։',
    color: 'border-l-sky-500 bg-sky-50/50 dark:bg-sky-950/20'
  },
  {
    esTerm: 'Determinante',
    amTerm: 'Որոշիչ',
    esRole: 'acompaña al sustantivo.',
    amRole: 'ուղեկցում և որոշում է գոյականը։',
    color: 'border-l-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20'
  },
  {
    esTerm: 'Nexo',
    amTerm: 'Կապակցիչ',
    esRole: 'une palabras o ideas.',
    amRole: 'կապում է բառերն ու մտքերը։',
    color: 'border-l-teal-500 bg-teal-50/50 dark:bg-teal-950/20'
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    promptWord: 'perro',
    questionEs: '¿A qué categoría gramatical pertenece la palabra "perro"?',
    questionAm: 'Ի՞նչ խոսքի մաս է "perro" (շուն) բառը։',
    options: [
      { textEs: 'Sustantivo', textAm: 'Գոյական', isCorrect: true },
      { textEs: 'Verbo', textAm: 'Բայ', isCorrect: false },
      { textEs: 'Adjetivo', textAm: 'Ածական', isCorrect: false },
      { textEs: 'Adverbio', textAm: 'Մակբայ', isCorrect: false },
    ],
    explanationEs: '"perro" es un sustantivo porque nombra a un animal.',
    explanationAm: '"perro"-ն գոյական է, քանի որ անվանում է կենդանի։'
  },
  {
    id: 'q2',
    promptWord: 'inteligente',
    questionEs: '¿A qué categoría gramatical pertenece la palabra "inteligente"?',
    questionAm: 'Ի՞նչ խոսքի մաս է "inteligente" (խելացի) բառը։',
    options: [
      { textEs: 'Adjetivo', textAm: 'Ածական', isCorrect: true },
      { textEs: 'Determinante', textAm: 'Որոշիչ', isCorrect: false },
      { textEs: 'Sustantivo', textAm: 'Գոյական', isCorrect: false },
      { textEs: 'Nexo', textAm: 'Կապակցիչ', isCorrect: false },
    ],
    explanationEs: '"inteligente" describe una cualidad del sustantivo, por tanto es un adjetivo.',
    explanationAm: '"inteligente"-ն նկարագրում է գոյականի հատկանիշը, հետևաբար ածական է։'
  },
  {
    id: 'q3',
    promptWord: 'estudiar',
    questionEs: '¿Qué tipo de palabra es "estudiar"?',
    questionAm: 'Ի՞նչ տեսակի բառ է "estudiar" (սովորել) բառը։',
    options: [
      { textEs: 'Verbo (acción)', textAm: 'Բայ (գործողություն)', isCorrect: true },
      { textEs: 'Pronombre', textAm: 'Դերանուն', isCorrect: false },
      { textEs: 'Adverbio', textAm: 'Մակբայ', isCorrect: false },
      { textEs: 'Determinante', textAm: 'Որոշիչ', isCorrect: false },
    ],
    explanationEs: '"estudiar" indica una acción, por lo que es un verbo.',
    explanationAm: '"estudiar"-ը ցույց է տալիս գործողություն, ուստի այն բայ է։'
  },
  {
    id: 'q4',
    promptWord: 'rápidamente',
    questionEs: '¿A qué categoría pertenece "rápidamente"?',
    questionAm: 'Ի՞նչ կարգի է պատկանում "rápidamente" (արագորեն) բառը։',
    options: [
      { textEs: 'Adverbio de modo', textAm: 'Ձևի մակբայ', isCorrect: true },
      { textEs: 'Sustantivo común', textAm: 'Հասարակ գոյական', isCorrect: false },
      { textEs: 'Nexo copulativo', textAm: 'Միացական կապակցիչ', isCorrect: false },
      { textEs: 'Pronombre', textAm: 'Դերանուն', isCorrect: false },
    ],
    explanationEs: '"rápidamente" explica la manera o modo en que se realiza una acción.',
    explanationAm: '"rápidamente"-ն ցույց է տալիս գործողության կատարման ձևը (մակբայ)։'
  },
  {
    id: 'q5',
    promptWord: 'ella',
    questionEs: 'En la frase "Ella trabaja", ¿qué función cumple "Ella"?',
    questionAm: '"Ella trabaja" նախադասության մեջ ի՞նչ դեր ունի "Ella" բառը։',
    options: [
      { textEs: 'Pronombre personal', textAm: 'Անձնական դերանուն', isCorrect: true },
      { textEs: 'Artículo indeterminado', textAm: 'Անորոշ հոդ', isCorrect: false },
      { textEs: 'Adjetivo calificativo', textAm: 'Որակական ածական', isCorrect: false },
      { textEs: 'Nexo causal', textAm: 'Պատճառական կապակցիչ', isCorrect: false },
    ],
    explanationEs: '"Ella" sustituye al nombre propio de una persona (ej. María), es un pronombre.',
    explanationAm: '"Ella" (նա) փոխարինում է անձի անվանը, հետևաբար դերանուն է։'
  },
  {
    id: 'q6',
    promptWord: 'porque',
    questionEs: '¿Qué expresa el nexo "porque"?',
    questionAm: 'Ի՞նչ է արտահայտում "porque" կապակցիչը։',
    options: [
      { textEs: 'Causa (պատճառ)', textAm: 'Պատճառ', isCorrect: true },
      { textEs: 'Suma (միացում)', textAm: 'Միացում', isCorrect: false },
      { textEs: 'Tiempo (ժամանակ)', textAm: 'Ժամանակ', isCorrect: false },
      { textEs: 'Lugar (տեղ)', textAm: 'Տեղ', isCorrect: false },
    ],
    explanationEs: '"porque" une ideas expresando el motivo o causa.',
    explanationAm: '"porque" (որովհետև) արտահայտում է պատճառ։'
  }
];
