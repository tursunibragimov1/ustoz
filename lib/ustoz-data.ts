// ============================================================================
// AI Ustoz — markaziy ma'lumotlar qatlami
// Bu fayl kelajakda Database + AI API ga ulanishga tayyor tuzilgan:
// har bir savol, dars va material metadata (level, skill, topic, difficulty)
// bilan belgilangan.
// ============================================================================

export type Level = "unknown" | "A1" | "A2" | "B1" | "B2" | "C1"
export type Skill =
  | "Vocabulary"
  | "Grammar"
  | "Reading"
  | "Writing"
  | "Speaking"
  | "Listening"

// ---------------------------------------------------------------------------
// Foydalanuvchi maqsadi
// ---------------------------------------------------------------------------
export type Goal = {
  current: Level
  target: string
  months: string
}

export const levelOptions: { value: Level; label: string }[] = [
  { value: "unknown", label: "Bilmayman" },
  { value: "A1", label: "A1" },
  { value: "A2", label: "A2" },
  { value: "B1", label: "B1" },
  { value: "B2", label: "B2" },
  { value: "C1", label: "C1" },
]

export const targetOptions = [
  "General English",
  "IELTS 5.5",
  "IELTS 6.0",
  "IELTS 6.5",
  "IELTS 7.0",
  "IELTS 7.5+",
]

export const durationOptions = ["1 oy", "3 oy", "6 oy", "12 oy"]

// ---------------------------------------------------------------------------
// Diagnostika testi — 12 ta savol
// To'g'ri javoblar A/B/C/D bo'yicha teng taqsimlangan (har biri 3 marta).
// Osondan murakkabga qarab joylashtirilgan.
// ---------------------------------------------------------------------------
export type DiagnosticQuestion = {
  id: number
  skill: Extract<Skill, "Vocabulary" | "Grammar" | "Reading">
  difficulty: "easy" | "medium" | "hard"
  passage?: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: 1,
    skill: "Vocabulary",
    difficulty: "easy",
    question: 'Quyidagilardan qaysi biri "big" so\u2018ziga eng yaqin ma\u2019noli?',
    options: ["large", "narrow", "empty", "quiet"],
    correctIndex: 0,
    explanation: '"Big" = katta. Unga eng yaqin so\u2018z "large" (katta, keng).',
  },
  {
    id: 2,
    skill: "Grammar",
    difficulty: "easy",
    question: 'To\u2018ldiring: "There ___ many books on the table."',
    options: ["is", "was", "are", "be"],
    correctIndex: 2,
    explanation: '"Many books" ko\u2018plik, hozirgi zamon uchun "are" ishlatiladi.',
  },
  {
    id: 3,
    skill: "Vocabulary",
    difficulty: "easy",
    question: 'Quyidagilardan qaysi biri "difficult" so\u2018zining teskarisi?',
    options: ["strange", "easy", "heavy", "busy"],
    correctIndex: 1,
    explanation: '"Difficult" = qiyin. Uning teskarisi "easy" (oson).',
  },
  {
    id: 4,
    skill: "Grammar",
    difficulty: "easy",
    question: 'To\u2018ldiring: "She ___ to London last summer."',
    options: ["go", "goes", "has gone", "went"],
    correctIndex: 3,
    explanation: '"Last summer" o\u2018tgan vaqt \u2014 Past Simple "went" ishlatiladi.',
  },
  {
    id: 5,
    skill: "Reading",
    difficulty: "medium",
    passage:
      "Tom usually wakes up at 6 a.m. However, yesterday he woke up at 8 a.m. and missed his bus.",
    question: "Nega kechagi kun Tom uchun boshqacha bo\u2018ldi?",
    options: [
      "U odatdagidan erta uyg\u2018ondi",
      "U odatdagidan kech uyg\u2018ondi",
      "U avtobusiga ulgurdi",
      "U ishga bormadi",
    ],
    correctIndex: 1,
    explanation:
      "Matnda u soat 8 da uyg\u2018onib, avtobusini o\u2018tkazib yuborgani aytilgan \u2014 ya\u2019ni kech uyg\u2018ongan.",
  },
  {
    id: 6,
    skill: "Vocabulary",
    difficulty: "medium",
    question: 'Quyidagilardan qaysi biri "significant" so\u2018ziga eng yaqin ma\u2019noli?',
    options: ["important", "tiny", "boring", "cheap"],
    correctIndex: 0,
    explanation: '"Significant" = muhim, ahamiyatli. Unga "important" mos keladi.',
  },
  {
    id: 7,
    skill: "Grammar",
    difficulty: "medium",
    question: 'To\u2018ldiring: "If it ___ tomorrow, we will stay at home."',
    options: ["will rain", "would rain", "rained", "rains"],
    correctIndex: 3,
    explanation:
      "First Conditional: If + Present Simple (rains), ... will + V. Kelasi haqiqiy shart.",
  },
  {
    id: 8,
    skill: "Reading",
    difficulty: "medium",
    passage: "Despite the heavy traffic, she arrived at the meeting on time.",
    question: 'Bu gapda "despite" so\u2018zi nimani ko\u2018rsatadi?',
    options: ["sabab", "natija", "qarama-qarshilik", "vaqt"],
    correctIndex: 2,
    explanation:
      '"Despite" qarama-qarshilikni bildiradi: tirbandlikka qaramay, u o\u2018z vaqtida yetib keldi.',
  },
  {
    id: 9,
    skill: "Vocabulary",
    difficulty: "hard",
    question: 'Qaysi biri to\u2018g\u2018ri? "I need to ___ an important decision."',
    options: ["make", "do", "take", "get"],
    correctIndex: 0,
    explanation: '"Decision" bilan "make" collocation ishlatiladi: "make a decision".',
  },
  {
    id: 10,
    skill: "Grammar",
    difficulty: "hard",
    question: 'To\u2018g\u2018ri passive shaklni tanlang: "The letter ___ yesterday."',
    options: ["was write", "is written", "wrote", "was written"],
    correctIndex: 3,
    explanation: "Past Simple Passive: was/were + V3. \u201cwas written\u201d to\u2018g\u2018ri.",
  },
  {
    id: 11,
    skill: "Reading",
    difficulty: "hard",
    passage:
      "Although the film received poor reviews from critics, audiences loved it and it earned a fortune at the box office.",
    question: "Matndan qanday xulosa chiqarish mumkin?",
    options: [
      "Tanqidchilar va tomoshabinlar bir fikrda edi",
      "Tanqidchilarga yoqmadi, lekin u tijoriy jihatdan muvaffaqiyatli bo\u2018ldi",
      "Film pul yo\u2018qotdi",
      "Tomoshabinlarga film yoqmadi",
    ],
    correctIndex: 1,
    explanation:
      '"Poor reviews" (yomon baho) lekin "earned a fortune" (katta daromad) \u2014 tijoriy muvaffaqiyat.',
  },
  {
    id: 12,
    skill: "Vocabulary",
    difficulty: "hard",
    question:
      'To\u2018ldiring: "The discovery had a profound ___ on modern medicine."',
    options: ["affect", "effort", "effect", "offer"],
    correctIndex: 2,
    explanation:
      '"Effect" ot bo\u2018lib "ta\u2019sir" ma\u2019nosini beradi. "Affect" fe\u2019l, shuning uchun bu yerda "effect" to\u2018g\u2018ri.',
  },
]

// ---------------------------------------------------------------------------
// Daraja baholash (adaptive-ga tayyor)
// ---------------------------------------------------------------------------
export type SkillScore = { correct: number; total: number; percent: number }
export type DiagnosticResult = {
  correct: number
  total: number
  percent: number
  level: Exclude<Level, "unknown">
  skillScores: Record<"Vocabulary" | "Grammar" | "Reading", SkillScore>
  strengths: string[]
  weaknesses: string[]
}

const skillKeys = ["Vocabulary", "Grammar", "Reading"] as const

export function estimateLevel(percent: number): Exclude<Level, "unknown"> {
  if (percent < 30) return "A1"
  if (percent < 45) return "A2"
  if (percent < 62) return "B1"
  if (percent < 80) return "B2"
  return "C1"
}

// Foydalanuvchi javoblariga qarab REAL natija hisoblaydi.
export function scoreDiagnostic(answers: (number | null)[]): DiagnosticResult {
  const skillScores = {
    Vocabulary: { correct: 0, total: 0, percent: 0 },
    Grammar: { correct: 0, total: 0, percent: 0 },
    Reading: { correct: 0, total: 0, percent: 0 },
  } as DiagnosticResult["skillScores"]

  let correct = 0
  diagnosticQuestions.forEach((q, i) => {
    const s = skillScores[q.skill]
    s.total += 1
    if (answers[i] === q.correctIndex) {
      s.correct += 1
      correct += 1
    }
  })

  skillKeys.forEach((k) => {
    const s = skillScores[k]
    s.percent = s.total ? Math.round((s.correct / s.total) * 100) : 0
  })

  const total = diagnosticQuestions.length
  const percent = Math.round((correct / total) * 100)

  const ranked = [...skillKeys].sort(
    (a, b) => skillScores[b].percent - skillScores[a].percent,
  )
  const strengths = ranked.filter((k) => skillScores[k].percent >= 60)
  const weaknesses = ranked.filter((k) => skillScores[k].percent < 60).reverse()

  return {
    correct,
    total,
    percent,
    level: estimateLevel(percent),
    skillScores,
    strengths: strengths.length ? strengths : [ranked[0]],
    weaknesses: weaknesses.length ? weaknesses : [ranked[ranked.length - 1]],
  }
}

// ---------------------------------------------------------------------------
// Shaxsiy Roadmap generatori
// current level + target + duration + zaif tomonlarga qarab o'zgaradi.
// ---------------------------------------------------------------------------
export type RoadmapModule = {
  id: string
  order: number
  title: string
  description: string
  skill: Skill
  minutes: number
  lessonId: string | null // hozircha faqat bitta to'liq dars mavjud
}

const skillTitle: Record<Skill, string> = {
  Grammar: "Grammatika",
  Vocabulary: "Lug\u2018at",
  Reading: "O\u2018qish (Reading)",
  Writing: "Yozish (Writing)",
  Speaking: "Gapirish (Speaking)",
  Listening: "Tinglash (Listening)",
}

export function generateRoadmap(
  goal: Goal,
  result: DiagnosticResult | null,
): RoadmapModule[] {
  const level =
    goal.current !== "unknown" ? goal.current : result?.level ?? "B1"
  const isIelts = goal.target.startsWith("IELTS")

  // Muddatga qarab modul davomiyligini moslashtirish.
  const short = goal.months === "1 oy"
  const base = short ? 15 : 25

  // Zaif tomonlar ustuvor — ular birinchi bo'lib qo'yiladi.
  const weak = result?.weaknesses ?? ["Reading", "Vocabulary"]
  const weakness = weak[0] ?? "Reading"

  const modules: Omit<RoadmapModule, "order">[] = [
    {
      id: "m-grammar",
      title: `${level} Grammatika poydevori`,
      description:
        "Present Perfect va asosiy zamonlar bilan mustahkam poydevor.",
      skill: "Grammar",
      minutes: base,
      lessonId: "present-perfect",
    },
    {
      id: "m-vocab",
      title: isIelts ? "Akademik lug\u2018at" : "Kundalik lug\u2018at",
      description: isIelts
        ? "IELTS uchun kerakli akademik so\u2018zlar va collocations."
        : "Kundalik muloqot uchun eng foydali so\u2018zlar.",
      skill: "Vocabulary",
      minutes: base,
      lessonId: null,
    },
    {
      id: "m-reading",
      title: "O\u2018qish ko\u2018nikmalari",
      description: "Skimming, scanning va asosiy g\u2018oyani topish.",
      skill: "Reading",
      minutes: base + 5,
      lessonId: null,
    },
  ]

  if (isIelts) {
    modules.push(
      {
        id: "m-writing",
        title: "Writing Task 2",
        description: "Esse tuzilishi, fikr bildirish va bog\u2018lovchilar.",
        skill: "Writing",
        minutes: base + 10,
        lessonId: null,
      },
      {
        id: "m-speaking1",
        title: "Speaking Part 1",
        description: "O\u2018zingiz haqingizda ravon gapirish.",
        skill: "Speaking",
        minutes: base,
        lessonId: null,
      },
      {
        id: "m-speaking2",
        title: "Speaking Part 2 (Cue card)",
        description: "2 daqiqalik nutqni tuzish strategiyasi.",
        skill: "Speaking",
        minutes: base,
        lessonId: null,
      },
      {
        id: "m-listening",
        title: "Tinglash ko\u2018nikmalari",
        description: "Section 1\u20134 uchun tinglash texnikalari.",
        skill: "Listening",
        minutes: base,
        lessonId: null,
      },
      {
        id: "m-strategy",
        title: "IELTS strategiyalari",
        description: "Vaqtni boshqarish va test taktikasi.",
        skill: "Reading",
        minutes: base,
        lessonId: null,
      },
    )
  } else {
    modules.push(
      {
        id: "m-speaking1",
        title: "Kundalik muloqot",
        description: "Real vaziyatlarda ishonchli gapirish.",
        skill: "Speaking",
        minutes: base,
        lessonId: null,
      },
      {
        id: "m-listening",
        title: "Tinglash ko\u2018nikmalari",
        description: "Suhbat va e\u2019lonlarni tushunish.",
        skill: "Listening",
        minutes: base,
        lessonId: null,
      },
    )
  }

  // Zaif tomonni mustahkamlash moduli — natijaga qarab moslashadi.
  modules.push({
    id: "m-weakness",
    title: `Zaif tomon: ${skillTitle[weakness as Skill] ?? weakness}`,
    description: "Diagnostika natijangizga ko\u2018ra eng zaif ko\u2018nikma ustida ishlash.",
    skill: (weakness as Skill) ?? "Reading",
    minutes: base + 5,
    lessonId: null,
  })

  modules.push({
    id: "m-mock",
    title: isIelts ? "Mock test" : "Yakuniy takrorlash",
    description: isIelts
      ? "To\u2018liq test sharoitida o\u2018zingizni sinang."
      : "O\u2018rganganlaringizni mustahkamlovchi takror.",
    skill: "Reading",
    minutes: 45,
    lessonId: null,
  })

  // Zaif tomonga oid modullarni yuqoriroq ko'tarish (adaptive tartib).
  const weakSet = new Set(weak)
  const ordered = [...modules].sort((a, b) => {
    const aw = weakSet.has(a.skill) ? 0 : 1
    const bw = weakSet.has(b.skill) ? 0 : 1
    return aw - bw
  })
  // Grammatika poydevori (yagona to'liq dars) doim birinchi bo'lsin.
  ordered.sort((a, b) => (a.id === "m-grammar" ? -1 : b.id === "m-grammar" ? 1 : 0))

  return ordered.map((m, i) => ({ ...m, order: i + 1 }))
}

// ---------------------------------------------------------------------------
// DARS: to'liq interaktiv demo dars (Present Perfect)
// Kelajakda Knowledge Base dan yuklanadigan struktura.
// ---------------------------------------------------------------------------
export type Exercise =
  | {
      id: string
      type: "mcq"
      prompt: string
      options: string[]
      answer: string
      explanation: string
    }
  | {
      id: string
      type: "fill"
      prompt: string
      answer: string // qabul qilinadigan javob (normalize qilinadi)
      accept?: string[] // qo'shimcha to'g'ri variantlar
      explanation: string
    }

export type Lesson = {
  id: string
  title: string
  level: Level
  skill: Skill
  topic: string
  objective: string
  explanation: string
  examples: string[]
  vocabulary: { word: string; meaning: string }[]
  grammarNote: string
  exercises: Exercise[]
}

export const lessons: Record<string, Lesson> = {
  "present-perfect": {
    id: "present-perfect",
    title: "Present Perfect",
    level: "B1",
    skill: "Grammar",
    topic: "Tenses",
    objective:
      "Present Perfect zamonini qachon va qanday ishlatishni o\u2018rganasiz.",
    explanation:
      "Present Perfect o\u2018tmishda sodir bo\u2018lgan, lekin hozir bilan bog\u2018liq harakatlar uchun ishlatiladi. Tuzilishi: have/has + V3 (uchinchi shakl). Aniq vaqt aytilmaganda yoki natija hozir muhim bo\u2018lganda qo\u2018llanadi.",
    examples: [
      "I have finished my homework. (Hozir uy vazifam tayyor.)",
      "She has lived in London for five years. (Hali ham u yerda yashaydi.)",
      "They have never been to Japan. (Hayotida hech qachon.)",
      "Have you ever eaten sushi? (Tajriba haqida savol.)",
    ],
    vocabulary: [
      { word: "already", meaning: "allaqachon" },
      { word: "yet", meaning: "hali (savol/inkorda)" },
      { word: "ever", meaning: "hech qachon / biror marta" },
      { word: "since", meaning: "\u2026 dan beri (aniq nuqta)" },
      { word: "for", meaning: "\u2026 davomida (muddat)" },
    ],
    grammarNote:
      "since + aniq vaqt nuqtasi (since 2010), for + davomiylik (for five years). Muntazam fe\u2019llarda V3 = fe\u2019l + -ed; noto\u2018g\u2018ri fe\u2019llar alohida yodlanadi (go\u2013gone, be\u2013been, write\u2013written).",
    exercises: [
      {
        id: "e1",
        type: "mcq",
        prompt: 'To\u2018g\u2018ri shaklni tanlang: "I ___ never ___ to Japan."',
        options: ["have / been", "has / been", "have / being", "am / been"],
        answer: "have / been",
        explanation: '"I" bilan "have" + V3 "been" ishlatiladi.',
      },
      {
        id: "e2",
        type: "fill",
        prompt:
          'Bo\u2018sh joyni to\u2018ldiring (V3): "She has ___ her homework." (finish)',
        answer: "finished",
        explanation: '"finish" muntazam fe\u2019l, V3 = "finished".',
      },
      {
        id: "e3",
        type: "mcq",
        prompt: 'To\u2018ldiring: "We have lived here ___ 2015."',
        options: ["for", "since", "from", "during"],
        answer: "since",
        explanation: "2015 \u2014 aniq nuqta, shuning uchun \u201csince\u201d.",
      },
      {
        id: "e4",
        type: "fill",
        prompt:
          'Bo\u2018sh joyni to\u2018ldiring (V3): "They have ___ the new film." (see)',
        answer: "seen",
        accept: ["seen"],
        explanation: '"see" noto\u2018g\u2018ri fe\u2019l: see \u2013 saw \u2013 seen.',
      },
      {
        id: "e5",
        type: "mcq",
        prompt: "Qaysi gap grammatik jihatdan TO\u2018G\u2018RI?",
        options: [
          "He have lived here for five years.",
          "He has lived here for five years.",
          "He has live here since five years.",
          "He is lived here for five years.",
        ],
        answer: "He has lived here for five years.",
        explanation:
          '"He" bilan "has" + V3 "lived", muddat uchun "for" ishlatiladi.',
      },
    ],
  },
}

// ---------------------------------------------------------------------------
// Knowledge Base — kelajakdagi markaziy bilim bazasi arxitekturasi.
// Hozircha namunaviy metadata; keyinchalik database ga ulanadi.
// ---------------------------------------------------------------------------
export type KnowledgeItem = {
  id: string
  level: Level
  skill: Skill
  topic: string
  difficulty: "easy" | "medium" | "hard"
  ieltsRelevance: boolean
  lessonId: string | null
}

export const knowledgeBase: KnowledgeItem[] = [
  {
    id: "kb-present-perfect",
    level: "B1",
    skill: "Grammar",
    topic: "Present Perfect",
    difficulty: "medium",
    ieltsRelevance: true,
    lessonId: "present-perfect",
  },
  {
    id: "kb-travel-vocab",
    level: "B1",
    skill: "Vocabulary",
    topic: "Travel",
    difficulty: "medium",
    ieltsRelevance: true,
    lessonId: null,
  },
]

// ---------------------------------------------------------------------------
export const skillColors: Record<string, string> = {
  Grammar: "bg-chart-1/15 text-chart-1",
  Vocabulary: "bg-chart-3/20 text-warning-foreground",
  Reading: "bg-chart-4/15 text-chart-4",
  Writing: "bg-primary/15 text-primary",
  Listening: "bg-chart-2/20 text-success",
  Speaking: "bg-chart-5/15 text-chart-5",
  Review: "bg-muted text-muted-foreground",
}

// Fill javoblarini solishtirish uchun normalizatsiya.
export function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.!?]+$/, "")
}
