<template>
    <div class="relative min-h-screen w-full overflow-hidden">
        <video autoplay muted loop playsinline
            class="absolute inset-0 w-full h-full object-cover">
            <source src="/video/background.mp4" type="video/mp4" />
        </video>

        <div class="absolute inset-0 bg-dark/60" />

        <div class="relative z-10 flex flex-col items-center justify-between min-h-screen px-6 py-10">
            <div class="flex flex-col items-center gap-2">
                <NuxtImg src="/images/Logo-Sika.svg" alt="Logo Sika" width="46" height="40" />
                <div class="flex items-center gap-3">
                    <NuxtImg src="/images/Logo-Klaukol.svg" alt="Logo Klaukol" width="41" height="10" />
                    <NuxtImg src="/images/Logo-Revear.svg" alt="Logo Revear" width="49" height="10" />
                </div>
            </div>

            <div class="flex flex-col items-center gap-4 text-center">
                <h1 class="text-light text-4xl font-extrabold uppercase leading-tight">
                    Descubrí qué<br />
                    <span class="text-primary">arquetipo</span><br />
                    profesional sos
                </h1>
                <div class="bg-light/20 border border-light/30 rounded-full px-5 py-2">
                    <p class="text-light text-sm font-medium tracking-wide uppercase">
                        24 preguntas · 3 minutos
                    </p>
                </div>
            </div>

            <ButtonPrimary :to="ROUTE_NAMES.FORM" class="w-full text-center">
                Tocá para comenzar
            </ButtonPrimary>
        </div>
    </div>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'

definePageMeta({ layout: 'blank' })
</script>
