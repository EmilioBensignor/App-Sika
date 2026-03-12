<template>
    <button
        class="w-full text-left rounded-2xl border-2 px-4 py-3 flex items-center gap-3 transition-all duration-200 active:scale-95"
        :class="selected ? 'border-primary bg-primary20' : 'border-primary20 bg-primary20/30'"
        @click="$emit('select')">
        <span
            class="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200"
            :class="selected ? 'bg-dark text-primary' : 'bg-primary text-dark'">
            {{ label }}
        </span>
        <span class="text-sm font-medium text-dark">{{ text }}</span>
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
