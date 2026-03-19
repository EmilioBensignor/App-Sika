<template>
    <main class="flex flex-col justify-between items-center gap-4 px-6 md:px-8 py-8 md:py-12">
        <div class="w-full main flex flex-col items-center gap-4">
            <div class="flex flex-col items-center md:gap-1 text-center">
                <h1 class="text-xl md:text-4xl font-bold uppercase">¡Hola! 👋</h1>
                <p class="text-xs md:text-xl font-medium">Contanos un poco sobre vos</p>
            </div>

            <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-4">
                <FormTextField id="nombre" v-model="form.nombre" placeholder="Nombre completo"
                    icon="material-symbols:person-outline" :error="errors.nombre" />

                <FormTextField id="correo" v-model="form.correo" placeholder="Correo electrónico" type="email"
                    icon="material-symbols:mail-outline" :error="errors.correo" />

                <FormTextField id="profesion" v-model="form.profesion" placeholder="Profesión"
                    icon="material-symbols:work-outline" :error="errors.profesion" />

                <FormTextField id="ciudad" v-model="form.ciudad" placeholder="Ciudad"
                    icon="material-symbols:location-on-outline" :error="errors.ciudad" />

                <p class="text-xs md:text-base text-gray-dark text-center">
                    Tus datos serán utilizados únicamente para la experiencia del evento.
                </p>
            </form>
        </div>

        <ButtonPrimary :disabled="loading" class="w-full uppercase footer" @click="handleSubmit">
            {{ loading ? 'Cargando...' : 'Continuar' }}
        </ButtonPrimary>

        <p v-if="submitError" class="text-error text-xs md:text-base text-center">{{ submitError }}</p>
    </main>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'

const quiz = useQuiz()
const client = useSupabaseClient()

const form = reactive({
    nombre: '',
    correo: '',
    profesion: '',
    ciudad: '',
})

const errors = reactive({
    nombre: '',
    correo: '',
    profesion: '',
    ciudad: '',
})

const loading = ref(false)
const submitError = ref('')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate() {
    let valid = true
    errors.nombre = ''
    errors.correo = ''
    errors.profesion = ''
    errors.ciudad = ''

    if (!form.nombre.trim()) {
        errors.nombre = 'Este campo es requerido'
        valid = false
    } else if (form.nombre.trim().length < 2) {
        errors.nombre = 'Mínimo 2 caracteres'
        valid = false
    } else if (form.nombre.trim().length > 30) {
        errors.nombre = 'Máximo 30 caracteres'
        valid = false
    }

    if (!form.correo.trim()) {
        errors.correo = 'Este campo es requerido'
        valid = false
    } else if (!emailRegex.test(form.correo.trim())) {
        errors.correo = 'Ingresá un correo electrónico válido'
        valid = false
    }

    if (!form.profesion.trim()) {
        errors.profesion = 'Este campo es requerido'
        valid = false
    } else if (form.profesion.trim().length < 2) {
        errors.profesion = 'Mínimo 2 caracteres'
        valid = false
    } else if (form.profesion.trim().length > 30) {
        errors.profesion = 'Máximo 30 caracteres'
        valid = false
    }

    if (!form.ciudad.trim()) {
        errors.ciudad = 'Este campo es requerido'
        valid = false
    } else if (form.ciudad.trim().length < 2) {
        errors.ciudad = 'Mínimo 2 caracteres'
        valid = false
    } else if (form.ciudad.trim().length > 30) {
        errors.ciudad = 'Máximo 30 caracteres'
        valid = false
    }

    return valid
}

async function handleSubmit() {
    if (!validate()) return

    loading.value = true
    submitError.value = ''

    const { data, error } = await client
        .from('usuarios')
        .insert({
            nombre: form.nombre.trim(),
            correo: form.correo.trim(),
            profesion: form.profesion.trim(),
            ciudad: form.ciudad.trim(),
            resultado: null,
        })
        .select('id')
        .single()

    if (error) {
        submitError.value = 'Ocurrió un error. Por favor intentá de nuevo.'
        loading.value = false
        return
    }

    quiz.setUserData({
        nombre: form.nombre.trim(),
        correo: form.correo.trim(),
        profesion: form.profesion.trim(),
        ciudad: form.ciudad.trim(),
    }, data.id)

    await navigateTo(ROUTE_NAMES.QUIZ)
}
</script>
