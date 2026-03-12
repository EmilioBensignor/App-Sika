export default defineNuxtRouteMiddleware(() => {
    const { hasUserData } = useQuiz()
    if (!hasUserData.value) {
        return navigateTo('/')
    }
})
