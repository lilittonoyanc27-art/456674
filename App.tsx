/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  categoriesData,
  introSentence,
  summaryCheatSheet,
  quizQuestions
} from './grammarData.ts';
import { GrammarCategory, ExampleSentence, WordItem } from './types.ts';
import {
  BookOpen,
  Volume2,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Languages,
  BookmarkCheck,
  Layers,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function App() {
  // Navigation & Active View state
  const [activeTab, setActiveTab] = useState<'learn' | 'cheatsheet' | 'quiz'>('learn');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Global toggle: Reveal all translations or click-to-reveal
  const [globalRevealArmenian, setGlobalRevealArmenian] = useState<boolean>(false);

  // Set of revealed item IDs for click-to-reveal behavior
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  // Sentence inspector state for the intro sentence
  const [selectedIntroWordIndex, setSelectedIntroWordIndex] = useState<number | null>(null);

  // Audio speaking helper
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  const speakSpanish = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    setSpeakingText(text);
    utterance.onend = () => setSpeakingText(null);
    utterance.onerror = () => setSpeakingText(null);
    window.speechSynthesis.speak(utterance);
  };

  const toggleReveal = (id: string) => {
    setRevealedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isRevealed = (id: string): boolean => {
    if (globalRevealArmenian) return true;
    return !!revealedIds[id];
  };

  // Filtered categories based on search or category filter
  const filteredCategories = useMemo(() => {
    let list = categoriesData;
    if (selectedCategorySlug !== 'all') {
      list = list.filter(cat => cat.slug === selectedCategorySlug);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(cat =>
        cat.titleEs.toLowerCase().includes(q) ||
        cat.titleAm.toLowerCase().includes(q) ||
        cat.explanationEs.toLowerCase().includes(q) ||
        cat.explanationAm.toLowerCase().includes(q) ||
        cat.examples.some(e => e.es.toLowerCase().includes(q) || e.am.toLowerCase().includes(q)) ||
        (cat.subCategories && cat.subCategories.some(sub =>
          sub.nameEs.toLowerCase().includes(q) ||
          sub.nameAm.toLowerCase().includes(q) ||
          sub.items.some(i => i.es.toLowerCase().includes(q) || i.am.toLowerCase().includes(q))
        ))
      );
    }
    return list;
  }, [selectedCategorySlug, searchQuery]);

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSelectAnswer = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswerIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswerIndex === null) return;
    const currentQ = quizQuestions[currentQuizIndex];
    if (currentQ.options[selectedAnswerIndex].isCorrect) {
      setScore(prev => prev + 1);
    }
    setIsAnswerSubmitted(true);
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIndex + 1 < quizQuestions.length) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswerIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Banner Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            
            {/* Title & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm font-bold text-lg">
                🇪🇸
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  <span>Categorías gramaticales</span>
                  <span className="text-slate-300 font-normal">|</span>
                  <span className="text-amber-700 font-medium text-lg sm:text-xl">Քերականական կարգեր</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Իսպաներենի խոսքի մասերի ինտերակտիվ ուղեցույց (կտտացրեք իսպաներենի վրա՝ հայերեն թարգմանությունը տեսնելու համար)
                </p>
              </div>
            </div>

            {/* Global Actions: Toggle reveal mode & Views */}
            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() => setGlobalRevealArmenian(!globalRevealArmenian)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                  globalRevealArmenian
                    ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 shadow-2xs'
                }`}
                title="Բոլոր հայերեն թարգմանությունները միանգամից ցուցադրել կամ թաքցնել"
              >
                {globalRevealArmenian ? (
                  <>
                    <Eye className="w-4 h-4 text-amber-700" />
                    <span>Բոլոր թարգմանությունները բացված են</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4 text-slate-500" />
                    <span>Ինտերակտիվ (կտտացրու բացելու համար)</span>
                  </>
                )}
              </button>

              <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs sm:text-sm font-medium">
                <button
                  onClick={() => setActiveTab('learn')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === 'learn'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Դասեր
                </button>
                <button
                  onClick={() => setActiveTab('cheatsheet')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === 'cheatsheet'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Հիշելու համար
                </button>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1 ${
                    activeTab === 'quiz'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Թեստ</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        
        {/* VIEW 1: LEARN (Default comprehensive view with explanations & interactive reveal) */}
        {activeTab === 'learn' && (
          <>
            {/* Introductory Concept Box: ¿Qué son las categorías gramaticales? */}
            <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-amber-100/50 to-transparent pointer-events-none rounded-full blur-2xl" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-1">
                    Ներածություն
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    ¿Qué son las categorías gramaticales?
                  </h2>
                  <h3 className="text-base sm:text-lg text-amber-700 font-medium">
                    Ի՞նչ են քերականական կարգերը (խոսքի մասերը)
                  </h3>
                </div>
                <button
                  onClick={() => speakSpanish("¿Qué son las categorías gramaticales? Las categorías gramaticales son grupos en los que clasificamos las palabras según su significado, su forma y la función que cumplen dentro de una oración.")}
                  className="self-start sm:self-auto inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-amber-800 hover:bg-amber-50 border border-slate-200 transition-colors"
                  title="Լսել իսպաներեն արտասանությունը"
                >
                  <Volume2 className={`w-4 h-4 ${speakingText?.startsWith("¿Qué son") ? 'text-amber-600 animate-pulse' : ''}`} />
                  <span>Լսել</span>
                </button>
              </div>

              {/* Sequential logic requested: 1. Spanish explanation, 2. Armenian translation, 3. Examples */}
              <div className="space-y-4">
                
                {/* 1. Spanish explanation */}
                <div
                  onClick={() => toggleReveal('intro-explanation')}
                  className="p-4 sm:p-5 rounded-xl bg-amber-50/60 border border-amber-200/80 cursor-pointer hover:bg-amber-50 transition-all group"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                      <span className="text-base">🇪🇸</span> Español (բացատրություն իսպաներենով)
                    </span>
                    <span className="text-xs text-amber-800/80 group-hover:text-amber-900 font-medium flex items-center gap-1">
                      {isRevealed('intro-explanation') ? 'Թաքցնել հայերենը' : 'Կտտացրեք՝ հայերենը տեսնելու համար'}
                      {isRevealed('intro-explanation') ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                  <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
                    Las <strong className="text-amber-950 font-bold">categorías gramaticales</strong> son grupos en los que clasificamos las palabras según su significado, su forma y la función que cumplen dentro de una oración.
                  </p>

                  {/* 2. Armenian explanation (revealed on click or global) */}
                  {isRevealed('intro-explanation') && (
                    <div className="mt-4 pt-4 border-t border-amber-200/70 text-slate-700 animate-fadeIn">
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-1.5">
                        <span className="text-base">🇦🇲</span> Հայերեն (բացատրություն)
                      </div>
                      <p className="text-sm sm:text-base leading-relaxed text-slate-800">
                        <strong className="text-slate-900 font-semibold">Քերականական կարգերը / խոսքի մասերը</strong> բառերի խմբեր են, որոնց մեջ բառերը դասակարգվում են ըստ իրենց իմաստի, ձևի և նախադասության մեջ կատարած դերի։
                      </p>
                    </div>
                  )}
                </div>

                {/* 3. Interactive Example Sentence Breakdown */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <span>Օրինակ նախադասություն</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-amber-700">Por ejemplo</span>
                    </h4>
                    <span className="text-xs text-slate-500">
                      Կտտացրեք ցանկացած բառի վրա՝ դերը տեսնելու համար
                    </span>
                  </div>

                  {/* Interactive Sentence Card */}
                  <div className="bg-slate-900 text-white rounded-xl p-5 shadow-inner">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-xs font-medium text-slate-400">
                        Նախադասություն / Oración:
                      </span>
                      <button
                        onClick={() => speakSpanish(introSentence.es)}
                        className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        Լսել
                      </button>
                    </div>

                    {/* Interactive clickable words */}
                    <div className="flex flex-wrap gap-2.5 items-center mb-4">
                      {introSentence.highlightWords?.map((item, idx) => {
                        const isSelected = selectedIntroWordIndex === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedIntroWordIndex(isSelected ? null : idx);
                              speakSpanish(item.word);
                            }}
                            className={`group relative px-3 py-2 rounded-lg font-medium text-base sm:text-lg transition-all border ${
                              isSelected
                                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md scale-105'
                                : 'bg-slate-800 text-white border-slate-700 hover:border-amber-400 hover:bg-slate-750'
                            }`}
                          >
                            <span>{item.word}</span>
                            <span className="block text-[10px] uppercase tracking-wider text-slate-400 group-hover:text-amber-200">
                              {item.categoryEs}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Full sentence Armenian translation toggle */}
                    <div
                      onClick={() => toggleReveal('intro-sentence-full')}
                      className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 cursor-pointer hover:bg-slate-800 transition-colors flex items-center justify-between gap-2"
                    >
                      <div className="text-sm">
                        <span className="text-amber-400 font-semibold mr-2">Հայերեն թարգմանություն՝</span>
                        {isRevealed('intro-sentence-full') ? (
                          <span className="text-slate-100 font-medium">{introSentence.am}</span>
                        ) : (
                          <span className="text-slate-400 italic">Կտտացրեք այստեղ՝ թարգմանությունը բացելու համար...</span>
                        )}
                      </div>
                      <span className="text-xs text-amber-400">
                        {isRevealed('intro-sentence-full') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </div>

                    {/* Word Detail Popout if a word is clicked */}
                    {selectedIntroWordIndex !== null && introSentence.highlightWords && (
                      <div className="mt-4 p-3.5 bg-amber-950/40 border border-amber-500/40 rounded-lg text-amber-100 text-sm flex items-center justify-between gap-3 animate-fadeIn">
                        <div>
                          <span className="font-bold text-amber-300 text-base">
                            {introSentence.highlightWords[selectedIntroWordIndex].word}
                          </span>
                          <span className="mx-2 text-amber-400">→</span>
                          <span>
                            🇪🇸 <strong className="text-white">{introSentence.highlightWords[selectedIntroWordIndex].categoryEs}</strong>
                          </span>
                          <span className="mx-2 text-amber-400">|</span>
                          <span>
                            🇦🇲 <strong className="text-amber-300">{introSentence.highlightWords[selectedIntroWordIndex].categoryAm}</strong>
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedIntroWordIndex(null)}
                          className="text-xs text-amber-400 hover:text-white"
                        >
                          Փակել
                        </button>
                      </div>
                    )}

                    {/* Full 6-word breakdown table */}
                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                      {introSentence.highlightWords?.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => toggleReveal(`word-${idx}`)}
                          className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700 text-center cursor-pointer hover:border-amber-400 transition-colors"
                        >
                          <div className="font-bold text-slate-200 text-sm">{item.word}</div>
                          <div className="text-slate-400 mt-0.5">{item.categoryEs}</div>
                          <div className="mt-1 text-amber-300 font-medium">
                            {isRevealed(`word-${idx}`) ? item.categoryAm : 'Կտտացրու 🇦🇲'}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* Category Filter & Search toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Փնտրել բառ, կարգ, օրինակ (իսպաներեն կամ հայերեն)..."
                    className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Մաքրել
                    </button>
                  )}
                </div>

                {/* Categories quick jump */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
                  <button
                    onClick={() => setSelectedCategorySlug('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                      selectedCategorySlug === 'all'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    Բոլոր 7 կարգերը
                  </button>
                  {categoriesData.map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategorySlug(cat.slug)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                        selectedCategorySlug === cat.slug
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat.number}. {cat.titleEs}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* List of 7 Categorías Gramaticales */}
            <div className="space-y-8">
              {filteredCategories.map(category => (
                <article
                  key={category.id}
                  id={category.slug}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:shadow-sm"
                >
                  {/* Category Header */}
                  <div className="p-5 sm:p-6 border-b border-slate-100 bg-linear-to-r from-slate-50 via-white to-amber-50/20">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-sm shadow-2xs">
                          {category.number}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                              {category.titleEs}
                            </h3>
                            <span className="text-slate-300 font-light text-xl">—</span>
                            <span className="text-lg sm:text-xl font-semibold text-amber-700">
                              {category.titleAm}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                            {category.quickSummaryEs} • {category.quickSummaryAm}
                          </p>
                        </div>
                      </div>

                      {/* Listen Category Name */}
                      <button
                        onClick={() => speakSpanish(`${category.titleEs}. ${category.explanationEs}`)}
                        className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-amber-50 hover:text-amber-800 transition-colors shadow-2xs"
                        title="Լսել բացատրությունը իսպաներենով"
                      >
                        <Volume2 className="w-4 h-4 text-amber-600" />
                        <span>Լսել իսպաներենով</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-5 sm:p-7 space-y-6">
                    
                    {/* STEP 1: EXPLICACIÓN (Spanish first, Armenian toggleable on click) */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <span>Explicación — Բացատրություն</span>
                        </h4>
                        <span className="text-[11px] text-amber-800">
                          (Կտտացրեք քարտին՝ հայերենը բացելու համար)
                        </span>
                      </div>

                      <div
                        onClick={() => toggleReveal(`exp-${category.id}`)}
                        className="p-4 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-amber-300 hover:bg-amber-50/30 cursor-pointer transition-all group"
                      >
                        {/* 🇪🇸 Spanish explanation */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                            <span>🇪🇸</span> Explicación:
                          </span>
                          <span className="text-xs text-amber-700 group-hover:text-amber-800 font-medium flex items-center gap-1">
                            {isRevealed(`exp-${category.id}`) ? 'Թաքցնել հայերենը' : 'Բացել հայերեն թարգմանությունը 🇦🇲'}
                            {isRevealed(`exp-${category.id}`) ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </span>
                        </div>
                        <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
                          {category.explanationEs}
                        </p>

                        {/* 🇦🇲 Armenian explanation */}
                        {isRevealed(`exp-${category.id}`) && (
                          <div className="mt-4 pt-4 border-t border-slate-200 text-slate-700 animate-fadeIn">
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1 mb-1.5">
                              <span>🇦🇲</span> Բացատրություն.
                            </span>
                            <p className="text-sm sm:text-base leading-relaxed text-slate-800 font-normal">
                              {category.explanationAm}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* STEP 2: EJEMPLOS / ՕՐԻՆԱԿՆԵՐ */}
                    {category.examples.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Ejemplos — Օրինակներ
                          </h4>
                          <span className="text-xs text-slate-400">
                            Կտտացրեք ցանկացած բառի վրա
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                          {category.examples.map(ex => {
                            const revealed = isRevealed(ex.id);
                            return (
                              <div
                                key={ex.id}
                                onClick={() => {
                                  toggleReveal(ex.id);
                                  speakSpanish(ex.es);
                                }}
                                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none group flex flex-col justify-between ${
                                  revealed
                                    ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                                    : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-xs'
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-1 mb-1">
                                    <span className="text-xs font-medium text-slate-400">🇪🇸</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        speakSpanish(ex.es);
                                      }}
                                      className="text-slate-400 hover:text-amber-600 transition-colors p-0.5"
                                      title="Արտասանել"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <div className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-amber-800 transition-colors">
                                    {ex.es}
                                  </div>
                                </div>

                                <div className="mt-2 pt-2 border-t border-slate-100">
                                  {revealed ? (
                                    <div className="text-xs font-semibold text-amber-800 animate-fadeIn">
                                      🇦🇲 {ex.am}
                                      {ex.note && (
                                        <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                                          ({ex.note})
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="text-[11px] text-slate-400 group-hover:text-amber-700 flex items-center justify-between">
                                      <span>Թարգմանել</span>
                                      <span className="text-amber-600">🇦🇲</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* SUB-CATEGORIES (e.g., Verbos: Acción / Estado; Adverbios: Lugar / Tiempo / Modo / Cantidad; Determinantes: Artículos, etc.) */}
                    {category.subCategories && category.subCategories.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Խմբեր և ենթատեսակներ / Tipos
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {category.subCategories.map(sub => (
                            <div
                              key={sub.id}
                              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                                    <span>{sub.nameEs}</span>
                                    <span className="text-slate-400">—</span>
                                    <span className="text-amber-700 font-semibold">{sub.nameAm}</span>
                                  </h5>
                                  {(sub.descEs || sub.descAm) && (
                                    <p className="text-xs text-slate-500 mt-0.5">
                                      {sub.descEs} • {sub.descAm}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {sub.items.map(item => {
                                  const revealed = isRevealed(item.id);
                                  return (
                                    <div
                                      key={item.id}
                                      onClick={() => {
                                        toggleReveal(item.id);
                                        speakSpanish(item.es);
                                      }}
                                      className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                                        revealed
                                          ? 'bg-amber-50 border-amber-300'
                                          : 'bg-white border-slate-200 hover:border-amber-300'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="font-bold text-slate-800 text-sm">{item.es}</span>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            speakSpanish(item.es);
                                          }}
                                          className="text-slate-400 hover:text-amber-600"
                                        >
                                          <Volume2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                      <div className="mt-1 pt-1 border-t border-slate-100">
                                        {revealed ? (
                                          <span className="font-semibold text-amber-900 animate-fadeIn">
                                            🇦🇲 {item.am}
                                          </span>
                                        ) : (
                                          <span className="text-slate-400 text-[11px]">
                                            Կտտացրեք թարգմանելու համար 🇦🇲
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* EXTRA ITEMS / CONCORDANCIA / TIPOS (e.g., niño alto, niña alta / Comunes, Propios, Concretos...) */}
                    {category.extraItems && category.extraItems.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            {category.extraSectionTitleEs} — {category.extraSectionTitleAm}
                          </h4>
                          <span className="text-xs text-slate-400">Կտտացրեք թարգմանությունը տեսնելու համար</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {category.extraItems.map((extra, idx) => {
                            const extraId = `extra-${category.id}-${idx}`;
                            const revealed = isRevealed(extraId);
                            return (
                              <div
                                key={idx}
                                onClick={() => {
                                  toggleReveal(extraId);
                                  speakSpanish(extra.es);
                                }}
                                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                                  revealed
                                    ? 'bg-amber-50/70 border-amber-300 shadow-2xs'
                                    : 'bg-white border-slate-200 hover:border-amber-300'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="font-bold text-slate-900 text-sm sm:text-base">
                                    {extra.es}
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      speakSpanish(extra.es);
                                    }}
                                    className="text-slate-400 hover:text-amber-600 p-1"
                                    title="Արտասանել"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <div className="mt-2 pt-2 border-t border-slate-100">
                                  {revealed ? (
                                    <div className="space-y-1 text-xs animate-fadeIn">
                                      <div className="font-bold text-amber-800">
                                        🇦🇲 {extra.am}
                                      </div>
                                      {extra.descAm && (
                                        <div className="text-slate-600 font-normal">
                                          {extra.descAm}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                                      <span>Կտտացրեք թարգմանության համար</span>
                                      <span className="text-amber-700 font-semibold">🇦🇲 Ցույց տալ</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* EXAMPLE SENTENCES WITH ANNOTATIONS */}
                    {category.sentences.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Նախադասություններ / Oraciones
                        </h4>
                        <div className="space-y-2.5">
                          {category.sentences.map(sent => {
                            const revealed = isRevealed(sent.id);
                            return (
                              <div
                                key={sent.id}
                                onClick={() => toggleReveal(sent.id)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                  revealed
                                    ? 'bg-amber-50/40 border-amber-300'
                                    : 'bg-slate-50/60 border-slate-200 hover:border-amber-300'
                                }`}
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-base font-bold text-slate-900">
                                      🇪🇸 {sent.es}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        speakSpanish(sent.es);
                                      }}
                                      className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-amber-700 p-1"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                      Լսել
                                    </button>
                                    <span className="text-xs text-amber-700 font-medium">
                                      {revealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </span>
                                  </div>
                                </div>

                                {/* Armenian translation & notes */}
                                {revealed && (
                                  <div className="mt-3 pt-3 border-t border-amber-200/60 text-sm space-y-1.5 animate-fadeIn">
                                    <div className="text-slate-800 font-semibold flex items-center gap-1.5">
                                      <span>🇦🇲</span>
                                      <span>{sent.am}</span>
                                    </div>
                                    {(sent.noteEs || sent.noteAm) && (
                                      <div className="text-xs text-slate-600 bg-white/80 p-2 rounded-md border border-slate-200/60">
                                        <span className="font-semibold text-slate-700">Բացատրություն: </span>
                                        {sent.noteAm || sent.noteEs}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>
                </article>
              ))}

              {filteredCategories.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                  <p className="text-slate-500 text-sm">
                    Ոչինչ չգտնվեց «{searchQuery}» հարցմամբ։ Փորձեք փոխել որոնման բառը։
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategorySlug('all'); }}
                    className="mt-3 px-4 py-2 rounded-lg bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600"
                  >
                    Մաքրել որոնումը
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* VIEW 2: CHEAT SHEET (Para recordar — Հիշելու համար) */}
        {activeTab === 'cheatsheet' && (
          <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
                  Արագ ամփոփում
                </div>
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <span>🧠 Para recordar</span>
                  <span className="text-slate-300 font-normal">|</span>
                  <span className="text-amber-700">Հիշելու համար</span>
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Կտտացրեք ցանկացած քարտի վրա՝ իսպաներեն արտասանությունը լսելու կամ հայերեն բացատրությունը դիտելու համար։
                </p>
              </div>

              <button
                onClick={() => setGlobalRevealArmenian(!globalRevealArmenian)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 self-start sm:self-auto border border-slate-200"
              >
                {globalRevealArmenian ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{globalRevealArmenian ? 'Ծածկել հայերենը (Ստուգիր քեզ)' : 'Ցույց տալ բոլոր հայերենը'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {summaryCheatSheet.map((item, idx) => {
                const cardId = `cheat-${idx}`;
                const revealed = isRevealed(cardId);
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      toggleReveal(cardId);
                      speakSpanish(`${item.esTerm}: ${item.esRole}`);
                    }}
                    className={`p-4 rounded-xl border border-l-4 transition-all cursor-pointer ${item.color} border-slate-200 hover:shadow-xs`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-lg">{item.esTerm}</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-slate-700 font-medium">{item.esRole}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakSpanish(`${item.esTerm}: ${item.esRole}`);
                        }}
                        className="text-slate-400 hover:text-amber-600 p-1"
                        title="Լսել արտասանությունը"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200/60">
                      {revealed ? (
                        <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm animate-fadeIn">
                          <span className="text-amber-800">{item.amTerm}</span>
                          <span className="text-slate-400">→</span>
                          <span className="text-slate-700">{item.amRole}</span>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400 flex items-center justify-between">
                          <span>Ի՞նչ է սա նշանակում հայերենում</span>
                          <span className="text-amber-700 font-medium">Կտտացրու 🇦🇲</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Practice Flashcards */}
            <div className="mt-8 p-5 bg-amber-50/50 rounded-xl border border-amber-200/80">
              <h3 className="font-bold text-slate-900 text-base mb-1">
                💡 Ինչպե՞ս հեշտ հիշել
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Յուրաքանչյուր խոսքի մաս ունի իր գլխավոր դերը նախադասության մեջ։ Փորձեք ծածկել հայերեն մասը (սեղմելով «Ծածկել հայերենը») և ինքնուրույն հիշել, թե որ կարգն ինչ գործառույթ է կատարում, ապա կտտացնելով ստուգել ճիշտ պատասխանը։
              </p>
            </div>
          </section>
        )}

        {/* VIEW 3: INTERACTIVE QUIZ (Թեստ / Ստուգում) */}
        {activeTab === 'quiz' && (
          <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 max-w-3xl mx-auto">
            {!quizFinished ? (
              <div className="space-y-6">
                
                {/* Quiz Header & Progress */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                      Քերականության թեստ
                    </span>
                    <h2 className="text-xl font-bold text-slate-900">
                      Հարց {currentQuizIndex + 1} / {quizQuestions.length}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500">Միավորներ՝</span>
                    <div className="font-bold text-amber-600 text-lg">
                      {score} / {quizQuestions.length}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${((currentQuizIndex) / quizQuestions.length) * 100}%` }}
                  />
                </div>

                {/* Question */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base sm:text-lg font-bold text-slate-900">
                        🇪🇸 {quizQuestions[currentQuizIndex].questionEs}
                      </p>
                      <p className="text-sm sm:text-base font-medium text-amber-800 mt-1">
                        🇦🇲 {quizQuestions[currentQuizIndex].questionAm}
                      </p>
                    </div>
                    {quizQuestions[currentQuizIndex].promptWord && (
                      <button
                        onClick={() => speakSpanish(quizQuestions[currentQuizIndex].promptWord!)}
                        className="text-slate-400 hover:text-amber-600 p-1.5 rounded-lg border border-slate-200 bg-white"
                        title="Լսել բառը"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {quizQuestions[currentQuizIndex].options.map((option, idx) => {
                    const isSelected = selectedAnswerIndex === idx;
                    let optionStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50';

                    if (isAnswerSubmitted) {
                      if (option.isCorrect) {
                        optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20';
                      } else if (isSelected && !option.isCorrect) {
                        optionStyle = 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-500/20';
                      } else {
                        optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-500/20';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(idx)}
                        disabled={isAnswerSubmitted}
                        className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                      >
                        <div>
                          <div className="font-bold text-base">🇪🇸 {option.textEs}</div>
                          <div className="text-xs sm:text-sm text-slate-600 mt-0.5">🇦🇲 {option.textAm}</div>
                        </div>

                        {isAnswerSubmitted && (
                          <div>
                            {option.isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                            {isSelected && !option.isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation after submitting */}
                {isAnswerSubmitted && (
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 animate-fadeIn space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                      Բացատրություն
                    </span>
                    <p className="text-sm text-slate-800 font-medium">
                      🇪🇸 {quizQuestions[currentQuizIndex].explanationEs}
                    </p>
                    <p className="text-xs sm:text-sm text-amber-900">
                      🇦🇲 {quizQuestions[currentQuizIndex].explanationAm}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 flex justify-end">
                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswerIndex === null}
                      className="px-6 py-2.5 rounded-xl bg-amber-600 text-white font-semibold text-sm hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Ստուգել պատասխանը
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuizQuestion}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all flex items-center gap-1.5"
                    >
                      <span>{currentQuizIndex + 1 < quizQuestions.length ? 'Հաջորդ հարցը' : 'Ավարտել թեստը'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            ) : (
              /* Quiz Result Screen */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  🎉
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Թեստն ավարտվեց:
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Ձեր արդյունքը՝ {score} / {quizQuestions.length}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-sm mx-auto">
                  <div className="text-3xl font-extrabold text-amber-600">
                    {Math.round((score / quizQuestions.length) * 100)}%
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    {score === quizQuestions.length
                      ? 'Գերազանց է։ Դուք հիանալի տիրապետում եք բոլոր կարգերին։'
                      : score >= quizQuestions.length / 2
                      ? 'Լավ արդյունք է։ Կարող եք կրկնել նյութը և նորից փորձել։'
                      : 'Խորհուրդ ենք տալիս վերընթերցել բացատրությունները և նորից փորձել։'}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleRestartQuiz}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 text-white font-semibold text-sm hover:bg-amber-700 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Կրկնել թեստը</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('learn')}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-semibold text-sm hover:bg-slate-200 transition-all"
                  >
                    Վերադառնալ դասերին
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">Categorías gramaticales</span> • Իսպաներենից հայերեն քերականական ուղեցույց
          </div>
          <div className="flex items-center gap-4">
            <span>Գոյական • Ածական • Բայ • Մակբայ • Դերանուն • Որոշիչ • Կապակցիչ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
