export default defineNuxtRouteMiddleware(async (to) => {
  const { status, data } = useSession()

  if (status.value === 'authenticated') {
    // @ts-ignore
    if (data?.value?.user.interactiveDone) {
      return navigateTo('/')
    }
  }
})
