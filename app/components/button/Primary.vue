<template>
    <NuxtLink v-if="to" :to="to"
        class="w-full h-12 md:h-16 flex justify-center items-center bg-primary rounded-lg text-center text-dark text-base md:text-2xl font-semibold transition duration-300 py-3 px-12"
        :class="icon ? 'flex justify-center items-center gap-2' : ''">
        <Icon v-if="icon" :name="`material-symbols:${icon}`" class="w-6 h-6 flex-shrink-0" />
        <slot />
    </NuxtLink>
    <button v-else :type="type" :disabled="disabled"
        class="w-full h-12 md:h-16 flex justify-center items-center bg-primary rounded-lg text-center text-dark text-base md:text-2xl font-semibold transition duration-300 py-3 px-12"
        :class="[disabled ? 'opacity-50 cursor-not-allowed' : '', icon ? 'flex justify-center items-center gap-2' : '']">
        <Icon v-if="icon" :name="`material-symbols:${icon}`" class="w-6 h-6 flex-shrink-0" />
        <slot />
    </button>
</template>

<script setup>
defineProps({
    to: {
        type: [String, Object],
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: 'button'
    }
})
</script>