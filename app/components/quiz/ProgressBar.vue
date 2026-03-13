<template>
    <div class="w-full flex flex-col gap-1">
        <div class="w-full bg-gray-dark rounded-full h-1.5 md:h-2">
            <div class="bg-primary h-1.5 md:h-2 rounded-full transition-all duration-300"
                :style="{ width: `${((current + 1) / total) * 100}%` }" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    current: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})
</script>
