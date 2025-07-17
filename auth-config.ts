// auth.config.ts
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { serializeUser } from "./_utility/helpers/user.serializer";
import credentialUserLogin from "./_utility/fetchers/user/credential-user-login";
import { Session } from "inspector";
import { AdapterUser } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions = {
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true,
            clientId: "",
            clientSecret: ""
        }),
        CredentialsProvider({
            credentials: {
                credential: { label: "Email or username", name: "credential" },
                secret: { label: "Password", type: "password", name: "secret" }
            },
            async authorize(credentials) {

                // define user 
                let user = null;

                console.log(credentials);

                // validate user credentials
                user = await credentialUserLogin(credentials?.secret as string, credentials?.credential as string)
                console.log(user);
                
                if (!user) {
                    throw new Error('Something went wrong with the login attempt. Please try again.')
                }

                return serializeUser(user)
            }
        })
    ],
    // adapter: MongoDBAdapter(dbClient),
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: AdapterUser }) {// Add the user properties to the token after signing in
            if (user) {
                token._id = user._id;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.username = user.username;
                token.email = user.email;
                token.verifiedEmail = user.verifiedEmail as boolean;
                token.avatar = user.avatar;

                // Role and account-related metadata
                token.role = user.role;

                // Only include verification-related data if needed for client-side handling
                // Example: Resending a verification email or prompting the user
                token.verificationToken = user.verificationToken;
                token.verificationTokenExpiration = user.verificationTokenExpiration;
            }

            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            // Create a user object with token properties
            const userObject = {
                _id: token._id,
                firstName: token.firstName,
                lastName: token.lastName,
                username: token.username,
                email: token.email as string,
                verifiedEmail: token.verifiedEmail as boolean,
                avatar: token.avatar,

                // Role and account-related metadata
                role: token.role,
                // Verification details (if relevant for the client-side logic)
                verificationToken: token.verificationToken,
                verificationTokenExpiration: token.verificationTokenExpiration,
            };


            // Add the user object to the session
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (session as any).user = userObject as unknown as AdapterUser;
            console.log(session);

            return session;
        },
    },
    session: {
        strategy: "jwt",
    }
};
