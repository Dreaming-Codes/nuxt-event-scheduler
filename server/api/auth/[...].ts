import GoogleProvider from 'next-auth/providers/google'
import {NuxtAuthHandler} from "#auth";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({token, account, profile}) {
            if (account && profile && profile.email) {
                const user = await prisma.user.upsert({
                    where: {
                        email: profile.email
                    },
                    update: {},
                    create: {
                        name: profile.name,
                        email: profile.email,
                    }
                })

                token.id = user.id;
                token.interactiveDone = user.interactiveDone
            }

            return token;
        },

        async session({session, token}){
            // @ts-ignore
            session.user.id = token.id;
            // @ts-ignore
            session.user.interactiveDone = token.interactiveDone;

            return session;
        },

        async signIn({profile, user, email, account, credentials}){
            if(!process.env.EMAIL_DOMAIN){
                throw "EMAIL_DOMAIN ENVIRONMENT VARIABLE MISSING"
            }
            return Boolean(profile?.email?.endsWith(process.env.EMAIL_DOMAIN));
        }
    },
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GoogleProvider.default({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: "https://accounts.google.com/o/oauth2/auth?response_type=code&hd=" + process.env.EMAIL_DOMAIN
        })
    ]
})