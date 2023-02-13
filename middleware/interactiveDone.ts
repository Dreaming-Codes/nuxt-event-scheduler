export default defineNuxtRouteMiddleware(async (to) => {
    const { status, signIn, data } = useSession()

    if (status.value === 'authenticated') {
        // @ts-ignore
        if(data?.value?.user.interactiveDone){
            return navigateTo("/")
        }
        return
    }

    return
})
