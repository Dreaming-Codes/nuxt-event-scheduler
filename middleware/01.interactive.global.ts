export default defineNuxtRouteMiddleware(async (to) => {
    const { status, data } = useSession();

    const config = useAppConfig();

    if (new Date() >= new Date(config.EVENT_DAY)) {
        return;
    }

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
