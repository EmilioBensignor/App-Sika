<template>
    <header class="header flex flex-col items-center gap-2 mt-4">
        <NuxtLink :to="ROUTE_NAMES.HOME">
            <NuxtImg src="/images/Logo-Sika.svg" alt="Logo Sika" width="46" height="40"
                class="md:w-24 md:h-20 object-contain" />
        </NuxtLink>
        <div class="flex items-center gap-3">
            <NuxtImg src="/images/Logo-Klaukol.svg" alt="Logo Klaukol" width="41" height="10"
                class="md:w-20 md:h-5 object-contain" />
            <NuxtImg src="/images/Logo-Revear.svg" alt="Logo Revear" width="49" height="10"
                class="md:w-24 md:h-5 object-contain" />
        </div>
    </header>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';
</script>