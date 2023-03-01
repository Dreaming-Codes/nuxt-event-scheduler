export default defineNuxtRouteMiddleware((to) => {
    const { status } = useSession();

    if (
        status.value == "authenticated" &&
        !to.fullPath.startsWith("/schedule")
    ) {
        return navigateTo("/schedule");
    }
});
