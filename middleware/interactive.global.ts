export default defineNuxtRouteMiddleware((to) => {
  const { status, data } = useSession();

  if (status.value === 'authenticated') {
    // @ts-ignore
    if (!data?.value?.user.interactiveDone && to.name !== 'interactive') {
      return navigateTo('/interactive');
    }
  }
});
