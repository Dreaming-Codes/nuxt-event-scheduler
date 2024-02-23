export default defineNuxtRouteMiddleware((to) => {
    const { status, data } = useSession();


    if (!to.name) {
        return;
    }

    if (to.name === "index" || to.name === "admin") {
        return;
    }

    // @ts-ignore
    if (data?.value?.user.admin) {
        return navigateTo("/");
    }
});
