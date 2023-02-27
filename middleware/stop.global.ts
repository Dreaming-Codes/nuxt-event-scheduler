export default defineNuxtRouteMiddleware((to) => {
    const { status, data } = useSession();

    if (status.value === "authenticated") {
        // @ts-ignore
        if (to.name !== "") {
            return navigateTo("/");
        }
    }
});
