export default defineNuxtRouteMiddleware((to) => {
    const { status, data } = useSession();

    // @ts-ignore
    if (data?.value?.user.admin) return;
    if (
        status.value == "authenticated" &&
        !to.fullPath.startsWith("/schedule")
    ) {
        return navigateTo("/schedule");
    }
});
