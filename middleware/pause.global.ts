export default defineNuxtRouteMiddleware((to) => {
    if(to.name !== 'pause') {
        return navigateTo('/pause');
    }
});
