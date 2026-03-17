<template>
    <main class="min-h-[90vh] flex flex-col justify-between items-center gap-6 md:gap-12 px-5 md:px-8 py-8 md:py-12">
        <div class="flex flex-col items-center gap-8 md:gap-12">
            <p class="text-xs md:text-2xl text-gray-dark">{{ quiz.state.value.userData?.nombre }}, sos un...</p>
            <div class="flex flex-col items-center text-center gap-4">
                <p class="text-[2.5rem]">{{ archetype.emoji }}</p>

                <h1 class="text-2xl md:text-4xl font-extrabold uppercase text-primary">
                    {{ archetype.name }}
                </h1>
                <p class="text-primary text-xs md:text-2xl font-semibold">
                    "{{ archetype.claim }}"
                </p>

                <p class="text-xs md:text-xl text-dark text-center">
                    {{ archetype.description }}
                </p>
            </div>
            <div class="w-full flex flex-col items-center gap-4 md:gap-6">
                <p class="text-xs md:text-xl text-gray-dark font-bold uppercase">Tus fortalezas</p>
                <div class="flex flex-wrap justify-center gap-2">
                    <span v-for="strength in archetype.strengths" :key="strength"
                        class="flex items-center gap-2 bg-secondary20 rounded-full text-xs md:text-xl font-medium p-1 md:p-2 pr-2 md:pr-4">
                        <div class="w-4 md:w-8 h-4 md:h-8 flex justify-center items-center bg-primary rounded-full">
                            <Icon name="material-symbols:check" class="w-3 md:w-6 h-3 md:h-6" />
                        </div>
                        {{ strength }}
                    </span>
                </div>
            </div>

            <div class="w-full flex flex-col gap-6 md:gap-8">
                <div class="w-full flex items-center gap-3">
                    <ButtonPrimary @click="handleDownload"
                        class="w-1/2 flex justify-center items-center gap-2 md:gap-3 bg-transparent border border-primary text-xs uppercase px-5">
                        <Icon name="material-symbols:download" class="w-4 md:w-6 h-4 md:h-6 flex-shrink-0" />
                        Descargar
                    </ButtonPrimary>
                    <ButtonPrimary @click="showShareModal = true"
                        class="w-1/2 flex justify-center items-center gap-2 md:gap-3 bg-transparent border border-primary text-xs uppercase px-5">
                        <Icon name="material-symbols:share-outline" class="w-4 md:w-6 h-4 md:h-6" />
                        Compartir
                    </ButtonPrimary>
                </div>

                <div class="flex flex-col gap-3 md:gap-8">
                    <ButtonPrimary
                        class="w-full h-9 flex justify-between items-center bg-gradient-primary !rounded-full uppercase !p-1 md:!p-3 !pl-3 md:!pl-8"
                        @click="handlePremio">
                        Retirá tu premio
                        <div class="w-7 md:w-12 h-7 md:h-12 flex justify-center items-center bg-primary rounded-full">
                            <Icon name="material-symbols:featured-seasonal-and-gifts-rounded"
                                class="w-4 md:w-8 h-4 md:h-8 flex-shrink-0" />
                        </div>
                    </ButtonPrimary>
                </div>
            </div>
        </div>
        <button @click="handleReset"
            class="flex justify-center items-center gap-2 text-sm md:text-[2rem] text-gray-dark font-semibold uppercase">
            <Icon name="material-symbols:refresh-rounded" class="w-5 md:w-7 h-5 md:h-7" />
            Volver a jugar
        </button>
    </main>
    <ResultadoShareModal v-if="showShareModal" :archetype="archetype" @close="showShareModal = false" />
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'
import archetypesData from '~/data/archetypes.json'

definePageMeta({ middleware: 'result-guard' })

const quiz = useQuiz()
const client = useSupabaseClient()
const { playSound } = useSound()
const showShareModal = ref(false)

const archetype = computed(() => {
    return archetypesData.find(a => a.id === quiz.state.value.archetype) ?? archetypesData[0]
})

onMounted(async () => {
    if (quiz.state.value.userId && quiz.state.value.archetype) {
        await client
            .from('usuarios')
            .update({ resultado: quiz.state.value.archetype })
            .eq('id', quiz.state.value.userId)
    }
    playSound('resultado')
})

function handleDownload() {
    console.log('download result')
}

function handlePremio() {
    console.log('retira premio')
}

async function handleReset() {
    quiz.reset()
    await navigateTo(ROUTE_NAMES.HOME)
}
</script>
