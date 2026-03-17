<template>
    <div class="flex items-center justify-center fixed inset-0 z-50 px-5 md:p-16">
        <div class="absolute inset-0 bg-dark/60" @click="$emit('close')" />
        <div
            class="w-full flex flex-col gap-4 md:gap-6 relative z-10 bg-light border border-primary rounded-3xl py-5 px-3 md:p-8">
            <div class="flex items-center justify-between">
                <h2 class="md:text-[2rem] font-semibold uppercase">Compartí tu resultado</h2>
                <button @click="$emit('close')" class="text-primary">
                    <Icon name="material-symbols:close" class="w-5 md:w-6 h-5 md:h-6" />
                </button>
            </div>

            <!-- QR code -->
            <div
                class="w-44 md:w-[22.5rem] h-44 md:h-[22.5rem] flex items-center justify-center self-center bg-white rounded-2xl overflow-hidden">
                <img
                    v-if="qrDataUrl"
                    :src="qrDataUrl"
                    alt="QR para compartir"
                    class="w-full h-full object-contain"
                />
                <Icon
                    v-else
                    name="material-symbols:qr-code"
                    class="w-16 md:w-24 h-16 md:h-24 text-gray-400"
                />
            </div>

            <p class="text-center text-xs md:text-xl text-gray-dark">Escaneá el QR o compartí por tus redes</p>

            <div class="flex flex-col gap-1 md:gap-2">
                <ButtonPrimary @click="handleShare('whatsapp')" :disabled="isCapturing"
                    class="md:!h-14 flex justify-center items-center gap-3 !bg-whatsapp border border-gray-dark text-sm md:text-xl font-semibold">
                    <NuxtImg src="/images/redes/Logo-Whatsapp.svg" alt="Logo Whatsapp"
                        class="w-4 md:w-6 h-4 md:h-6 flex-shrink-0" />
                    WHATSAPP
                </ButtonPrimary>
                <ButtonPrimary @click="handleShare('instagram')" :disabled="isCapturing"
                    class="md:!h-14 flex justify-center items-center gap-3 !bg-instagram border border-gray-dark text-sm md:text-xl font-semibold">
                    <NuxtImg src="/images/redes/Logo-Instagram.svg" alt="Logo Instagram"
                        class="w-4 md:w-6 h-4 md:h-6 flex-shrink-0" />
                    INSTAGRAM
                </ButtonPrimary>
                <ButtonPrimary @click="handleShare('facebook')" :disabled="isCapturing"
                    class="md:!h-14 flex justify-center items-center gap-3 !bg-facebook border border-gray-dark text-sm md:text-xl font-semibold">
                    <NuxtImg src="/images/redes/Logo-Facebook.svg" alt="Logo Facebook"
                        class="w-4 md:w-6 h-4 md:h-6 flex-shrink-0" />
                    FACEBOOK
                </ButtonPrimary>
            </div>

            <ButtonPrimary @click="handleDownload" :disabled="isCapturing"
                class="flex justify-center items-center gap-2 bg-transparent border border-primary text-sm">
                <Icon name="material-symbols:download" class="w-5 md:w-6 h-5 md:h-6" />
                {{ isCapturing ? 'GENERANDO...' : 'DESCARGAR' }}
            </ButtonPrimary>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Archetype {
    id: string
    emoji: string
    name: string
    claim: string
    description: string
    strengths: string[]
}

const props = defineProps<{
    archetype: Archetype
    captureCard: () => Promise<Blob>
}>()

defineEmits(['close'])

const { downloadImage, shareImage } = useImageCapture()

const qrDataUrl = ref<string | null>(null)
const isCapturing = ref(false)

onMounted(async () => {
    const QRCode = (await import('qrcode')).default
    const shareUrl = `${window.location.origin}/share/${props.archetype.id}`
    qrDataUrl.value = await QRCode.toDataURL(shareUrl, {
        width: 360,
        margin: 2,
        color: { dark: '#161616', light: '#FFFFFF' },
    })
})

async function getBlob(): Promise<Blob | null> {
    isCapturing.value = true
    try {
        return await props.captureCard()
    } catch (e) {
        console.error('Capture error:', e)
        return null
    } finally {
        isCapturing.value = false
    }
}

async function handleDownload() {
    const blob = await getBlob()
    if (blob) downloadImage(blob, `arquetipo-${props.archetype.id}.png`)
}

async function handleShare(_platform: string) {
    const blob = await getBlob()
    if (blob) await shareImage(blob, `arquetipo-${props.archetype.id}.png`)
}
</script>
