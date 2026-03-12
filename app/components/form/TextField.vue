<template>
    <div :class="containerClasses">
        <FormLabel v-if="showLabel" :for="id" :label-class="labelClass" :force-mobile-layout="forceMobileLayout">{{ label }}</FormLabel>
        <label v-else :for="id" class="sr-only">{{ label }}</label>

        <div class="relative">
            <Icon v-if="icon" :name="icon" :class="iconClasses" />
            <NuxtImg v-if="personalizedIcon" :src="personalizedIcon" alt="" :class="personalizedIconClasses" />
            <input :id="id" :type="type" :value="modelValue" :class="inputClasses"
                @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder"
                :autocomplete="autocomplete" @blur="$emit('blur')" :required="required" :disabled="disabled" />
        </div>

        <div v-if="!hideError" class="w-full min-h-4">
            <FormError v-if="error">
                {{ error }}
            </FormError>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    error: {
        type: String,
        default: null
    },
    label: {
        type: String,
        default: ''
    },
    showLabel: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    icon: {
        type: String,
    },
    personalizedIcon: {
        type: String,
        default: null
    },
    autocomplete: {
        type: String,
        default: 'off'
    },
    required: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    hideError: {
        type: Boolean,
        default: false
    },
    forceMobileLayout: {
        type: Boolean,
        default: false
    },
    labelClass: {
        type: String,
        default: ''
    },
    rounded: {
        type: String,
        default: 'rounded-lg'
    },
    iconClass: {
        type: String,
        default: ''
    }
})

defineEmits(['update:modelValue', 'blur'])

const containerClasses = computed(() => {
    if (props.forceMobileLayout) {
        return 'flex flex-col gap-2'
    }
    return 'flex flex-col gap-2'
})

const iconClasses = computed(() => {
    const base = 'w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2'
    const color = props.iconClass || 'text-gray-dark'
    return `${base} ${color}`
})

const personalizedIconClasses = computed(() => {
    if (props.forceMobileLayout) {
        return 'w-3 h-3 absolute left-3 top-1/2 transform -translate-y-1/2'
    }
    return 'w-3 md:w-4 h-3 md:h-4 absolute left-3 top-1/2 transform -translate-y-1/2'
})

const isFilled = computed(() => !!props.modelValue)

const borderClass = computed(() => {
    if (props.error) return 'border-error'
    if (isFilled.value) return 'border-primary'
    return 'border-secondary'
})

const inputClasses = computed(() => {
    const baseClasses = `w-full h-12 bg-light border ${borderClass.value} ${props.rounded} text-black font-medium py-3 px-4 focus:outline-none focus:none`
    const paddingClasses = props.icon || props.personalizedIcon ? 'pl-12' : 'pl-3'

    const textClasses = props.forceMobileLayout
        ? 'text-xs placeholder:text-black placeholder:text-xs placeholder:font-medium'
        : 'text-xs md:text-sm placeholder:text-black placeholder:text-xs md:placeholder:text-sm placeholder:font-medium'

    return `${baseClasses} ${paddingClasses} ${textClasses}`
})
</script>