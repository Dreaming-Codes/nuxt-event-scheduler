export default defineNuxtRouteMiddleware((to) => {
    const { status, data } = useSession();

    if (!to.name) {
        return;
    }

    if (to.name === "index" || to.name === "admin") {
        return;
    }

    if (to.name === "schedule" && to.params && to.params.username) {
        return;
    }

    // @ts-ignore
    if (
        data?.value?.user.admin &&
        (to.name === "schedule-username" || to.name === "schedule")
    ) {
        return navigateTo("/");
    }
});
