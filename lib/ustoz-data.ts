export type Goal = {
  current: string
  target: string
  months: string
  daily: string
}

export type DiagnosticQuestion = {
  id: number
  skill: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: 1,
    skill: 'Grammar',
    question: 'Choose the correct sentence:',
    options: [
      'She have been studying English for three years.',
      'She has been studying English for three years.',
      'She having studied English for three years.',
      'She been studying English for three years.',
    ],
    correctIndex: 1,
    explanation:
      '"She" uchun Present Perfect Continuous zamonida "has been + V-ing" ishlatiladi.',
  },
  {
    id: 2,
    skill: 'Vocabulary',
    question: 'Which word is closest in meaning to "significant"?',
    options: ['tiny', 'important', 'boring', 'quiet'],
    correctIndex: 1,
    explanation: '"Significant" so\u2018zi "muhim, ahamiyatli" degan ma\u2019noni bildiradi.',
  },
  {
    id: 3,
    skill: 'Reading',
    question:
      'Read: "Despite the rain, the match continued." What does "despite" show?',
    options: ['a reason', 'a contrast', 'a result', 'a time'],
    correctIndex: 1,
    explanation:
      '"Despite" qarama-qarshilikni (contrast) bildiradi: yomg\u2018irga qaramay o\u2018yin davom etdi.',
  },
  {
    id: 4,
    skill: 'Grammar',
    question: 'If I ___ more time, I would learn another language.',
    options: ['have', 'had', 'will have', 'having'],
    correctIndex: 1,
    explanation:
      'Second Conditional: "If + past simple (had), ... would + V". Xayoliy hozirgi holat.',
  },
  {
    id: 5,
    skill: 'Writing',
    question: 'Which is the best academic linking phrase to add a point?',
    options: ['Also, and stuff', 'Furthermore,', 'By the way,', 'Anyways,'],
    correctIndex: 1,
    explanation:
      '"Furthermore" akademik yozuvda fikrni qo\u2018shish uchun ishlatiladigan rasmiy bog\u2018lovchi.',
  },
  {
    id: 6,
    skill: 'Listening',
    question:
      'In a lecture, "to sum up" usually signals that the speaker will...',
    options: [
      'start a new topic',
      'give a summary',
      'ask a question',
      'tell a joke',
    ],
    correctIndex: 1,
    explanation: '"To sum up" xulosa (summary) qilishdan oldin ishlatiladi.',
  },
]

export type RoadmapWeek = {
  week: number
  title: string
  focus: string
  band: string
  lessons: { title: string; skill: string; minutes: number }[]
}

export const roadmap: RoadmapWeek[] = [
  {
    week: 1,
    title: 'Poydevor va tashxis',
    focus: 'Grammatika asoslari + Reading strategiyalari',
    band: '5.5 \u2192 5.75',
    lessons: [
      { title: 'Zamonlarni takrorlash: Present & Past', skill: 'Grammar', minutes: 25 },
      { title: 'Skimming va Scanning texnikasi', skill: 'Reading', minutes: 20 },
      { title: 'Kundalik 15 ta akademik so\u2018z', skill: 'Vocabulary', minutes: 15 },
    ],
  },
  {
    week: 2,
    title: 'Listening & Speaking Part 1',
    focus: 'Tinglashda asosiy g\u2018oyani ilg\u2018ash',
    band: '5.75 \u2192 6.0',
    lessons: [
      { title: 'Section 1: raqamlar va ismlarni yozish', skill: 'Listening', minutes: 25 },
      { title: 'Speaking Part 1: o\u2018zi haqida gapirish', skill: 'Speaking', minutes: 20 },
      { title: 'Collocations: make / do / take', skill: 'Vocabulary', minutes: 15 },
    ],
  },
  {
    week: 3,
    title: 'Writing Task 1',
    focus: 'Grafik va diagrammalarni tavsiflash',
    band: '6.0 \u2192 6.25',
    lessons: [
      { title: 'Trend tili: rise, fall, fluctuate', skill: 'Writing', minutes: 30 },
      { title: 'Task 1 tuzilishi va paragraflar', skill: 'Writing', minutes: 25 },
      { title: 'Reading: True / False / Not Given', skill: 'Reading', minutes: 20 },
    ],
  },
  {
    week: 4,
    title: 'Writing Task 2 & Speaking Part 2',
    focus: 'Fikr bildirish va cue card',
    band: '6.25 \u2192 6.5',
    lessons: [
      { title: 'Essay tuzilishi: intro, body, conclusion', skill: 'Writing', minutes: 30 },
      { title: 'Speaking Part 2: 2 daqiqalik nutq', skill: 'Speaking', minutes: 25 },
      { title: 'Kompleks gaplar va bog\u2018lovchilar', skill: 'Grammar', minutes: 20 },
    ],
  },
  {
    week: 5,
    title: 'Mock testlar',
    focus: 'To\u2018liq test sharoitida mashq',
    band: '6.5 \u2192 6.75',
    lessons: [
      { title: 'To\u2018liq Reading mock (60 daqiqa)', skill: 'Reading', minutes: 60 },
      { title: 'To\u2018liq Listening mock', skill: 'Listening', minutes: 40 },
      { title: 'Xatolarni tahlil qilish', skill: 'Review', minutes: 25 },
    ],
  },
  {
    week: 6,
    title: 'Silliqlash va 7.0',
    focus: 'Zaif tomonlarni mustahkamlash',
    band: '6.75 \u2192 7.0',
    lessons: [
      { title: 'Band 7 uchun vocabulary boost', skill: 'Vocabulary', minutes: 25 },
      { title: 'Speaking Part 3: fikrni asoslash', skill: 'Speaking', minutes: 25 },
      { title: 'Yakuniy mock va strategiya', skill: 'Review', minutes: 45 },
    ],
  },
]

export const skillColors: Record<string, string> = {
  Grammar: 'bg-chart-1/15 text-chart-1',
  Vocabulary: 'bg-chart-3/20 text-warning-foreground',
  Reading: 'bg-chart-4/15 text-chart-4',
  Writing: 'bg-primary/15 text-primary',
  Listening: 'bg-chart-2/20 text-success',
  Speaking: 'bg-chart-5/15 text-chart-5',
  Review: 'bg-muted text-muted-foreground',
}
