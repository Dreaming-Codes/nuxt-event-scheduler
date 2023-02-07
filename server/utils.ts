import {getServerSession} from "#auth";
import {H3Event, H3Response} from "h3";

export async function getSession(event: H3Event): Promise<Awaited<ReturnType<typeof import('#auth').getServerSession>>> {
    const session = await getServerSession(event)
    if (!session) {
        throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
    }
    return session;
}

export function checkParams(params: Record<string, string>, expectedParams: string[]){
    let missingParams = []
    if(!params) {
        missingParams = expectedParams
    }else{
        for (let param of expectedParams){
            if (!params[param]){
                missingParams.push(param)
            }
        }
    }
    if (missingParams.length > 0){
        throw createError({ statusMessage: `Missing parameters: ${missingParams.join(', ')}`, statusCode: 400 })
    }
}