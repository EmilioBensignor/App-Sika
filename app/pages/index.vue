<template>
    <div class="w-full min-h-screen relative overflow-hidden">
        <video autoplay muted loop playsinline class="w-full h-full absolute inset-0 object-cover">
            <source src="/video/background.mp4" type="video/mp4" />
        </video>

        <div class="absolute inset-0 bg-dark/60" />

        <div class="min-h-screen flex flex-col items-center justify-between relative z-10 px-5 md:px-8 py-8 md:py-12">
            <div class="header flex flex-col items-center gap-2 md:gap-3">
                <NuxtImg src="/images/Logo-Sika.svg" alt="Logo Sika" width="46" height="40"
                    class="md:w-24 md:h-20 flex-shrink-0" />
                <div class="flex items-center gap-3">
                    <NuxtImg src="/images/Logo-Klaukol.svg" alt="Logo Klaukol" width="41" height="10" class="md:w-20 md:h-5 object-contain" />
                    <NuxtImg src="/images/Logo-Revear.svg" alt="Logo Revear" width="49" height="10" class="md:w-24 md:h-5 object-contain" />
                </div>
            </div>

            <div class="main flex flex-col items-center gap-3 text-center">
                <h1 class="text-light text-[1.75rem] md:text-5xl font-extrabold uppercase leading-[3rem] md:leading-[4.5rem]">
                    Descubrí qué<br />
                    <span class="text-primary">arquetipo</span><br />
                    profesional sos
                </h1>
                <div class="bg-light rounded-full text-dark py-0.5 md:py-2 px-3 md:px-6">
                    <p class="text-xs md:text-base font-medium uppercase">
                        24 preguntas - 3 minutos
                    </p>
                </div>
            </div>

            <ButtonPrimary :to="ROUTE_NAMES.FORM" class="footer">
                TOCÁ PARA COMENZAR
            </ButtonPrimary>
        </div>
    </div>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'

definePageMeta({ layout: 'blank' })
</script>
