<template>
    <main class="flex flex-col items-center px-6 py-8 gap-6 min-h-screen">
        <p class="text-sm text-gray-dark">{{ quiz.state.value.userData?.nombre }}, sos un...</p>

        <div class="w-16 h-16 bg-primary20 rounded-2xl flex items-center justify-center">
            <Icon name="material-symbols:star" class="w-8 h-8 text-primary" />
        </div>

        <div class="flex flex-col items-center gap-2 text-center">
            <h1 class="text-3xl font-extrabold uppercase text-dark tracking-wide">
                {{ archetype.name }}
            </h1>
            <p class="text-primary text-sm font-semibold italic">
                "{{ archetype.claim }}"
            </p>
        </div>

        <p class="text-sm text-dark text-center leading-relaxed">
            {{ archetype.description }}
        </p>

        <div class="flex flex-col items-center gap-3 w-full">
            <p class="text-xs font-bold uppercase tracking-widest text-gray-dark">Tus fortalezas</p>
            <div class="flex flex-wrap justify-center gap-2">
                <span v-for="strength in archetype.strengths" :key="strength"
                    class="flex items-center gap-1.5 bg-primary20 border border-primary rounded-full px-4 py-1.5 text-sm font-medium text-dark">
                    <Icon name="material-symbols:check" class="w-4 h-4 text-primary" />
                    {{ strength }}
                </span>
            </div>
        </div>

        <div class="flex-1" />

        <div class="flex flex-col gap-3 w-full">
            <div class="flex gap-3">
                <button @click="handleDownload"
                    class="flex-1 h-12 rounded-full border-2 border-dark flex items-center justify-center gap-2 font-semibold text-sm text-dark">
                    <Icon name="material-symbols:download" class="w-5 h-5" />
                    Descargar
                </button>
                <button @click="showShareModal = true"
                    class="flex-1 h-12 rounded-full border-2 border-dark flex items-center justify-center gap-2 font-semibold text-sm text-dark">
                    <Icon name="material-symbols:share" class="w-5 h-5" />
                    Compartir
                </button>
            </div>

            <ButtonPrimary icon="redeem" class="w-full" @click="handlePremio">
                Retirá tu premio
            </ButtonPrimary>

            <button @click="handleReset"
                class="flex items-center justify-center gap-1.5 text-sm text-gray-dark font-medium py-2">
                <Icon name="material-symbols:refresh" class="w-4 h-4" />
                Volver a jugar
            </button>
        </div>
    </main>

    <ResultadoShareModal v-if="showShareModal" :archetype="archetype" @close="showShareModal = false" />
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'
import archetypesData from '~/data/archetypes.json'

definePageMeta({ middleware: 'result-guard' })

const quiz = useQuiz()
const client = useSupabaseClient()
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
