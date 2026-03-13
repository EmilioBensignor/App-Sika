<template>
    <button
        class="w-full flex items-center gap-3 border rounded-xl text-left py-3 md:py-4 px-4 md:px-5 transition-all duration-200 active:scale-95"
        :class="selected ? 'border-dark bg-primary' : 'border-primary bg-primary20'" @click="$emit('select')">
        <span
            class="w-6 md:w-7 h-6 md:h-7 flex items-center justify-center flex-shrink-0 rounded-full text-xs md:text-base font-semibold transition-all duration-200"
            :class="selected ? 'bg-dark text-primary' : 'bg-primary text-dark'">
            {{ label }}
        </span>
        <span class="text-sm md:text-xl">{{ text }}</span>
    </button>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    selected: {
        type: Boolean,
        default: false
    }
})

defineEmits(['select'])
</script>
