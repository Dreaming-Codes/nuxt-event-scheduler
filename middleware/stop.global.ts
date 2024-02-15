// export default defineNuxtRouteMiddleware((to) => {
//     const { status } = useSession();
//
//     if (status.value !== "authenticated") {
//         return;
//     }
//     if (to.name !== "interactive") {
//         return;
//     }
//
//     return navigateTo("/");
// });
