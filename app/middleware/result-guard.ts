export default defineNuxtRouteMiddleware(() => {
    const { hasResult } = useQuiz()
    if (!hasResult.value) {
        return navigateTo('/')
    }
})
