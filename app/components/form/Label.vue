<template>
    <label :for="htmlFor" :class="[labelClasses, labelClass]"><slot /></label>
</template>

<script setup>
const props = defineProps({
    for: { type: String, default: '' },
    labelClass: { type: String, default: '' },
    forceMobileLayout: { type: Boolean, default: false },
})

const htmlFor = computed(() => props.for)

const labelClasses = computed(() => {
    if (props.forceMobileLayout) {
        return 'font-bold text-sm text-secondary'
    }
    return 'font-bold text-sm md:text-base text-secondary'
})
</script>