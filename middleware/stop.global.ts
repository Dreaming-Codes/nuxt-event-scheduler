export default defineNuxtRouteMiddleware((to) => {
    const { status, data } = useSession();

    if (status.value === "authenticated") {
        // @ts-ignore
        if (!data?.value?.user.admin && to.name !== "pause") {
            return navigateTo("/pause");
        }
    }
});
