export default defineNuxtRouteMiddleware((to) => {
    return;
    const { status, data } = useSession();

    if (status.value !== "authenticated") {
        return;
    }
    // @ts-ignore
    if (data?.value?.user.interactiveDone) {
        return;
    }
    if (to.name === "interactive") {
        return;
    }

    return navigateTo("/interactive");
});
