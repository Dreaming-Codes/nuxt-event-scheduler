export default defineNuxtRouteMiddleware((to) => {
    const { status } = useSession();

    if (status.value === "authenticated") {
        if (to.name !== "index") {
            return navigateTo("/");
        }
    }
});
