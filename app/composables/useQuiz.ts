import { computed } from 'vue'
import archetypesData from '~/data/archetypes.json'

type TraitKey = 'creativity' | 'precision' | 'management' | 'innovation' | 'strategy' | 'client'

interface UserData {
  nombre: string
  correo: string
  profesion: string
  ciudad: string
}

interface QuizState {
  userData: UserData | null
  userId: string | null
  currentQuestion: number
  scores: Record<TraitKey, number>
  archetype: string | null
}

const defaultScores = (): Record<TraitKey, number> => ({
  creativity: 0,
  precision: 0,
  management: 0,
  innovation: 0,
  strategy: 0,
  client: 0,
})

const defaultState = (): QuizState => ({
  userData: null,
  userId: null,
  currentQuestion: 0,
  scores: defaultScores(),
  archetype: null,
})

export function useQuiz() {
  const state = useState<QuizState>('quiz', defaultState)

  const hasUserData = computed(() => state.value.userData !== null && state.value.userId !== null)
  const hasResult = computed(() => state.value.archetype !== null)

  function setUserData(data: UserData, id: string) {
    state.value = {
      userData: data,
      userId: id,
      currentQuestion: 0,
      scores: defaultScores(),
      archetype: null,
    }
  }

  function answerQuestion(optionScores: Record<string, number>) {
    const newScores = { ...state.value.scores }
    for (const [trait, points] of Object.entries(optionScores)) {
      if (trait in newScores) {
        newScores[trait as TraitKey] += points
      }
    }
    state.value = {
      ...state.value,
      scores: newScores,
      currentQuestion: state.value.currentQuestion + 1,
    }
  }

  function computeArchetype() {
    const scores = state.value.scores
    const sorted = (Object.entries(scores) as [TraitKey, number][])
      .sort(([, a], [, b]) => b - a)
    const top = sorted[0]![0]
    const second = sorted[1]![0]

    let archetype: string

    if (top === 'innovation' && second === 'precision') {
      archetype = 'ingeniero-audaz'
    } else if (top === 'strategy' && second === 'management') {
      archetype = 'arquitecto-estrategico'
    } else if (top === 'management' && (second === 'precision' || second === 'strategy')) {
      archetype = 'constructor-metodico'
    } else if (top === 'creativity' && (second === 'innovation' || second === 'strategy')) {
      archetype = 'visionario-urbano'
    } else {
      // Dot-product fallback
      const traits: TraitKey[] = ['creativity', 'precision', 'management', 'innovation', 'strategy', 'client']
      const maxScore = Math.max(...Object.values(scores))
      const normalized = Object.fromEntries(
        traits.map(t => [t, maxScore > 0 ? scores[t] / maxScore : 0])
      ) as Record<TraitKey, number>

      let bestId = archetypesData[0]!.id
      let bestScore = -1

      for (const a of archetypesData) {
        const vec = a.traitVector as Record<TraitKey, number>
        const dot = traits.reduce((sum, t) => sum + normalized[t] * vec[t], 0)
        if (dot > bestScore) {
          bestScore = dot
          bestId = a.id
        }
      }
      archetype = bestId
    }

    state.value = { ...state.value, archetype }
  }

  function reset() {
    state.value = defaultState()
  }

  return {
    state: computed(() => state.value),
    hasUserData,
    hasResult,
    setUserData,
    answerQuestion,
    computeArchetype,
    reset,
  }
}
