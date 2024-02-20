export default defineNuxtRouteMiddleware(async (to) => {
    const { status, data } = useSession();

    const config = useAppConfig();

    if (status.value !== "authenticated") {
        return;
    }

    // @ts-ignore
    if (data?.value?.user.admin) {
        return;
    }

    if (new Date() < new Date(config.EVENT_DAY)) {
        return;
    }

    if (to.name === "schedule") {
        return;
    }

    if (to.name !== "interactive") {
        return;
    }

    return navigateTo("/schedule");
});
