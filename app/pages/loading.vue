<template>
    <main class="min-h-[90vh] flex flex-col justify-center items-center gap-6 px-5 md:px-8">
        <div class="w-20 h-20 relative">
            <div class="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
        </div>

        <p class="md:text-4xl text-primary font-bold uppercase">
            Analizando tus respuestas...
        </p>
    </main>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'

definePageMeta({ middleware: 'quiz-guard' })

onMounted(() => {
    setTimeout(() => navigateTo(ROUTE_NAMES.RESULTADO), 3500)
})
</script>
