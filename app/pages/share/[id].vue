<template>
    <div
        style="min-height: 100dvh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box; gap: 32px;">

        <div v-if="!archetype" style="color: #FEFEFE; text-align: center; font-family: 'Saira', sans-serif;">
            <p style="font-size: 20px; color: #8C8C8C;">Arquetipo no encontrado.</p>
            <NuxtLink to="/" style="color: #FCC500; margin-top: 16px; display: block; font-size: 16px;">
                Volver al inicio
            </NuxtLink>
        </div>

        <template v-else>
            <div
                :style="{ transform: `scale(${cardScale})`, transformOrigin: 'top center', marginBottom: `${-(1920 * (1 - cardScale))}px` }">
                <ResultadoResultCard :archetype="archetype" variant="minimal" />
            </div>

            <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 360px;">
                <button @click="handleShare" :disabled="isCapturing" style="
                        width: 100%;
                        height: 48px;
                        background-color: #FCC500;
                        color: #161616;
                        border: none;
                        border-radius: 9999px;
                        font-family: 'Saira', sans-serif;
                        font-size: 14px;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        opacity: 1;
                        transition: opacity 0.2s;
                    " :style="isCapturing ? 'opacity: 0.6; cursor: not-allowed;' : ''">
                    <svg v-if="!isCapturing" width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="#161616"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    {{ isCapturing ? 'Generando...' : 'Compartir resultado' }}
                </button>

                <button @click="handleDownload" :disabled="isCapturing" style="
                        width: 100%;
                        height: 48px;
                        background-color: transparent;
                        color: #FCC500;
                        border: 1.5px solid #FCC500;
                        border-radius: 9999px;
                        font-family: 'Saira', sans-serif;
                        font-size: 14px;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                    " :style="isCapturing ? 'opacity: 0.6; cursor: not-allowed;' : ''">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="#FCC500"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Descargar imagen
                </button>
            </div>
        </template>

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