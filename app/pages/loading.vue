<template>
    <main class="flex flex-col items-center justify-center min-h-screen gap-6 px-6">
        <div class="relative w-20 h-20">
            <div class="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
            <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-primary rounded-full opacity-60" />
            <div class="absolute -top-2 -right-2 w-2 h-2 bg-primary rounded-full opacity-40" />
        </div>

        <p class="text-primary text-sm font-bold uppercase tracking-widest">
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
