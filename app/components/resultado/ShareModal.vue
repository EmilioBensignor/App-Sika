<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center px-6">
        <div class="absolute inset-0 bg-dark/60" @click="$emit('close')" />
        <div class="relative z-10 w-full bg-light rounded-3xl p-6 flex flex-col gap-4">
            <div class="flex items-center justify-between">
                <h2 class="text-dark text-lg font-bold uppercase">Compartí tu resultado</h2>
                <button @click="$emit('close')" class="text-gray-dark">
                    <Icon name="material-symbols:close" class="w-6 h-6" />
                </button>
            </div>

            <!-- QR Placeholder -->
            <div class="w-full aspect-square bg-gray-200 rounded-2xl flex items-center justify-center">
                <Icon name="material-symbols:qr-code" class="w-16 h-16 text-gray-400" />
            </div>

            <p class="text-center text-sm text-gray-dark">Escaneá el QR o compartí por tus redes</p>

            <!-- Social buttons -->
            <div class="flex flex-col gap-3">
                <button @click="handleShare('whatsapp')"
                    class="w-full h-12 rounded-full flex items-center justify-center gap-2 font-semibold text-white text-sm"
                    style="background-color: #25D366;">
                    <Icon name="material-symbols:chat" class="w-5 h-5" />
                    WHATSAPP
                </button>
                <button @click="handleShare('instagram')"
                    class="w-full h-12 rounded-full flex items-center justify-center gap-2 font-semibold text-white text-sm"
                    style="background-color: #E1306C;">
                    <Icon name="material-symbols:photo-camera" class="w-5 h-5" />
                    INSTAGRAM
                </button>
                <button @click="handleShare('facebook')"
                    class="w-full h-12 rounded-full flex items-center justify-center gap-2 font-semibold text-white text-sm"
                    style="background-color: #1877F2;">
                    <Icon name="material-symbols:thumb-up" class="w-5 h-5" />
                    FACEBOOK
                </button>
                <button @click="handleDownload()"
                    class="w-full h-12 rounded-full border-2 border-primary flex items-center justify-center gap-2 font-semibold text-dark text-sm">
                    <Icon name="material-symbols:download" class="w-5 h-5" />
                    DESCARGAR
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    archetype: {
        type: Object,
        required: true
    }
})

defineEmits(['close'])

function handleShare(platform) {
    console.log('share:', platform, props.archetype.id)
}

function handleDownload() {
    console.log('download result')
}
</script>
