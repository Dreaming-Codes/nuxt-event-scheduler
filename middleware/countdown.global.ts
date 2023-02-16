export default defineNuxtRouteMiddleware((to) => {
  if (new Date('2023-02-20T00:00:00+0100').getTime() < Date.now()) {
    if (to.name === 'countdown') { return navigateTo('/') }
    return
  }

  if (to.name !== 'countdown') { return navigateTo('/countdown') }
})
