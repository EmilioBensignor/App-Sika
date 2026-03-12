<template>
    <main class="flex flex-col px-6 py-4 gap-6 min-h-screen">
        <div class="flex items-center justify-between text-xs text-gray-dark">
            <span>Pregunta {{ currentIndex + 1 }} de {{ questions.length }}</span>
            <div class="flex items-center gap-1">
                <Icon name="material-symbols:category-outline" class="w-4 h-4" />
                <span>{{ currentQuestion.category }}</span>
            </div>
        </div>

        <QuizProgressBar :current="currentIndex" :total="questions.length" />

        <h2 class="text-base font-extrabold uppercase text-dark leading-tight">
            {{ currentQuestion.text }}
        </h2>

        <div class="flex flex-col gap-3">
            <QuizAnswerOption v-for="option in currentQuestion.options" :key="option.label" :label="option.label"
                :text="option.text" :selected="selectedOption === option.label"
                @select="selectedOption = option.label" />
        </div>

        <div class="flex-1" />

        <ButtonPrimary :disabled="!selectedOption" class="w-full mb-4" @click="handleNext">
            {{ isLastQuestion ? 'Ver resultado' : 'Siguiente' }}
        </ButtonPrimary>
    </main>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'
import questionsData from '~/data/questions.json'

definePageMeta({ middleware: 'quiz-guard' })

const quiz = useQuiz()
const questions = questionsData
const currentIndex = computed(() => quiz.state.currentQuestion)
const currentQuestion = computed(() => questions[currentIndex.value])
const isLastQuestion = computed(() => currentIndex.value === questions.length - 1)
const selectedOption = ref(null)

async function handleNext() {
    if (!selectedOption.value) return

    const option = currentQuestion.value.options.find(o => o.label === selectedOption.value)
    const wasLast = isLastQuestion.value

    quiz.answerQuestion(option.scores)
    selectedOption.value = null

    if (wasLast) {
        quiz.computeArchetype()
        await navigateTo(ROUTE_NAMES.LOADING)
    }
}
</script>
