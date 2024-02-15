export default defineNuxtRouteMiddleware((to) => {
    const { status, data } = useSession();

    if (to.name === "interactive") {
        return;
    }

    // @ts-ignore
    if (data?.value?.user.admin) return;
    if (
        (status.value === "authenticated" && to.path !== "/schedule") ||
        (to.path !== "/schedule" && to.fullPath.startsWith("/schedule"))
    ) {
        return navigateTo("/schedule");
    }
});
