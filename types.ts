export interface WordItem {
  id: string;
  es: string;
  am: string;
  category?: string;
  roleExplanationEs?: string;
  roleExplanationAm?: string;
  note?: string;
}

export interface SubCategory {
  id: string;
  nameEs: string;
  nameAm: string;
  descEs?: string;
  descAm?: string;
  items: WordItem[];
}

export interface ExampleSentence {
  id: string;
  es: string;
  am: string;
  highlightWords?: {
    word: string;
    categoryEs: string;
    categoryAm: string;
  }[];
  noteEs?: string;
  noteAm?: string;
}

export interface GrammarCategory {
  id: string;
  number: number;
  slug: string;
  titleEs: string;
  titleAm: string;
  badgeColor: string;
  iconName: string;
  quickSummaryEs: string;
  quickSummaryAm: string;
  explanationEs: string;
  explanationAm: string;
  notesEs?: string;
  notesAm?: string;
  examples: WordItem[];
  sentences: ExampleSentence[];
  subCategories?: SubCategory[];
  extraSectionTitleEs?: string;
  extraSectionTitleAm?: string;
  extraItems?: {
    es: string;
    am: string;
    descEs?: string;
    descAm?: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  questionEs: string;
  questionAm: string;
  promptWord?: string;
  options: {
    textEs: string;
    textAm: string;
    isCorrect: boolean;
  }[];
  explanationEs: string;
  explanationAm: string;
}
