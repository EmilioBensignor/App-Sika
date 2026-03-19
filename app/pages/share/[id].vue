<template>
    <main v-if="!archetype" class="flex flex-col justify-center items-center gap-4 px-5 py-8 min-h-dvh">
        <p class="text-xs md:text-2xl text-gray-dark">Arquetipo no encontrado.</p>
        <NuxtLink to="/" class="text-primary text-sm md:text-xl font-semibold">
            Volver al inicio
        </NuxtLink>
    </main>

    <main v-else class="flex flex-col justify-between items-center gap-6 md:gap-12 px-5 md:px-8 py-8 md:py-12">
        <div class="main flex flex-col items-center gap-8 md:gap-12">
            <p class="text-xs md:text-2xl text-gray-dark">Descubrí tu arquetipo...</p>
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
                    <ButtonPrimary @click="handleDownload" :disabled="isCapturing"
                        class="w-1/2 flex justify-center items-center gap-2 md:gap-3 bg-transparent border border-primary text-xs uppercase px-5">
                        <Icon name="material-symbols:download" class="w-4 md:w-6 h-4 md:h-6 flex-shrink-0" />
                        {{ isCapturing ? '...' : 'Descargar' }}
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
                        @click="handleQuiz">
                        Descubrí tu arquetipo
                        <div class="w-7 md:w-12 h-7 md:h-12 flex justify-center items-center bg-primary rounded-full">
                            <Icon name="material-symbols:play-arrow-rounded"
                                class="w-4 md:w-8 h-4 md:h-8 flex-shrink-0" />
                        </div>
                    </ButtonPrimary>
                </div>
            </div>
        </div>
        <button @click="handleQuiz"
            class="footer flex justify-center items-center gap-2 text-sm md:text-[2rem] text-gray-dark font-semibold uppercase">
            <Icon name="material-symbols:play-arrow-rounded" class="w-5 md:w-7 h-5 md:h-7" />
            Hacer el quiz
        </button>
    </main>

    <ResultadoShareModal
        v-if="showShareModal"
        :archetype="archetype"
        :capture-card="captureFullCard"
        @close="showShareModal = false"
    />

    <div
        ref="captureContainerRef"
        style="position: absolute; left: -9999px; top: 0; pointer-events: none;"
        aria-hidden="true"
    >
        <ResultadoResultCard
            v-if="archetype"
            :archetype="archetype"
            variant="full"
        />
    </div>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'
import archetypesData from '~/data/archetypes.json'

definePageMeta({ layout: 'blank' })

const route = useRoute()
const { captureElement, shareImage } = useImageCapture()
const showShareModal = ref(false)
const isCapturing = ref(false)
const captureContainerRef = ref(null)

const archetype = computed(() =>
    archetypesData.find(a => a.id === route.params.id) ?? null
)

async function captureFullCard() {
    const cardEl = captureContainerRef.value?.firstElementChild
    if (!cardEl) throw new Error('Card element not found')
    return captureElement(cardEl, 1080, 1920)
}

async function handleDownload() {
    isCapturing.value = true
    try {
        const blob = await captureFullCard()
        await shareImage(blob, `arquetipo-${archetype.value.id}.png`)
    } catch (e) {
        console.error('Download error:', e)
    } finally {
        isCapturing.value = false
    }
}

async function handleQuiz() {
    await navigateTo(ROUTE_NAMES.HOME)
}
</script>
