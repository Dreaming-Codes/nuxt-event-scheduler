import {getServerSession} from "#auth";
import {H3Event} from "h3";

export async function getSession(event: H3Event): Promise<Awaited<ReturnType<typeof import('#auth').getServerSession>>> {
    const session = await getServerSession(event)
    if (!session) {
        throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
    }
    return session;
}