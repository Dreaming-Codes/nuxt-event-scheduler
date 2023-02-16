export default defineNuxtRouteMiddleware((to) => {
  // Ignoring the countdown page
  if (to.name === 'countdown') {
    return;
  }

  const { status, data } = useSession();

  if (status.value === 'authenticated') {
    // @ts-ignore
    if (!data?.value?.user.interactiveDone && to.name !== 'interactive') {
      return navigateTo('/interactive');
    }
  }
});
