<template>
    <div
        style="width: 100%;min-height: 100dvh; display: flex; flex-direction: column; align-items: center; justify-content: center; box-sizing: border-box; gap: 32px;">

        <div v-if="!archetype" style="color: #FEFEFE; text-align: center; font-family: 'Saira', sans-serif;">
            <p style="font-size: 20px; color: #8C8C8C;">Arquetipo no encontrado.</p>
            <NuxtLink to="/" style="color: #FCC500; margin-top: 16px; display: block; font-size: 16px;">
                Volver al inicio
            </NuxtLink>
        </div>

        <ResultadoResultCard v-else :archetype="archetype" variant="minimal" />

        <div v-if="archetype" ref="captureTarget"
            style="position: absolute; left: -9999px; top: 0; pointer-events: none;" aria-hidden="true">
            <ResultadoResultCard :archetype="archetype" variant="minimal" />
        </div>
    </div>
</template>

<script setup>
import archetypesData from '~/data/archetypes.json'

definePageMeta({ layout: 'blank' })

const route = useRoute()
const { captureElement, downloadImage, shareImage } = useImageCapture()

const archetype = computed(() =>
    archetypesData.find(a => a.id === route.params.id) ?? null
)

const cardScale = ref(1)
const captureTarget = ref(null)
const isCapturing = ref(false)

onMounted(() => {
    const updateScale = () => {
        cardScale.value = Math.min(1, (window.innerWidth - 32) / 1080)
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    onUnmounted(() => window.removeEventListener('resize', updateScale))
})

async function getBlob() {
    if (!captureTarget.value || !archetype.value) return null
    isCapturing.value = true
    try {
        const cardEl = captureTarget.value.firstElementChild
        return await captureElement(cardEl, 1080, 1920)
    } catch (e) {
        console.error('Capture error:', e)
        return null
    } finally {
        isCapturing.value = false
    }
}

async function handleShare() {
    const blob = await getBlob()
    if (blob) await shareImage(blob, `arquetipo-${archetype.value.id}.png`)
}

async function handleDownload() {
    const blob = await getBlob()
    if (blob) downloadImage(blob, `arquetipo-${archetype.value.id}.png`)
}
</script>
