<template>
    <main class="h-[90vh] flex flex-col justify-between gap-6 px-6 md:px-8 py-4 md:py-12">
        <div class="flex flex-col gap-5 md:gap-7">
            <div class="flex flex-col gap-1 md:gap-2">
                <QuizProgressBar :current="currentIndex" :total="questions.length" />
                <div class="flex items-center justify-between gap-2 text-xs md:text-xl text-gray-dark">
                    <span class="flex-shrink-0">Pregunta {{ currentIndex + 1 }} de {{ questions.length }}</span>
                    <div class="flex items-center gap-1">
                        <Icon name="material-symbols:category-outline" class="w-4 md:w-5 h-4 md:h-5" />
                        <span>{{ currentQuestion.category }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-3 md:gap-8">
                <h2 class="text-center md:text-4xl text-dark font-extrabold uppercase leading-tight">
                    {{ currentQuestion.text }}
                </h2>

                <div class="flex flex-col gap-2 md:gap-5">
                    <QuizAnswerOption v-for="option in currentQuestion.options" :key="option.label"
                        :label="option.label" :text="option.text" :selected="selectedOption === option.label"
                        @select="selectedOption = option.label" />
                </div>
            </div>
        </div>

        <ButtonPrimary :disabled="!selectedOption" class="w-full uppercase" @click="handleNext">
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
const currentIndex = computed(() => quiz.state.value.currentQuestion)

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
