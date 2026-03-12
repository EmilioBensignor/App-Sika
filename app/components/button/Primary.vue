<template>
    <NuxtLink v-if="to" :to="to"
        class="h-12 bg-primary rounded-full text-dark text-base font-semibold transition duration-300 py-3 px-12"
        :class="icon ? 'flex justify-center items-center gap-2' : ''">
        <Icon v-if="icon" :name="`material-symbols:${icon}`" class="w-6 h-6 flex-shrink-0" />
        <slot />
    </NuxtLink>
    <button v-else :type="type" :disabled="disabled"
        class="h-12 bg-primary rounded-full text-dark text-base font-semibold transition duration-300 py-3 px-12"
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