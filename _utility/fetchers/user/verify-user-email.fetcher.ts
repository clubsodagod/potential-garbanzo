import connectToDB from "@/_database/connect-to-db.database";
import UserModel, { IUser } from "@/_database/models/user.model";

interface VerifyEmailInput {
    token: string;
}

export async function verifyUserEmail({ token }: VerifyEmailInput): Promise<{ success: boolean; message: string; user?: IUser | null | undefined }> {
    try {
        console.log(token);

        if (!token) {
            return { success: false, message: "Verification token is required." };
        }

        await connectToDB()

        const user = await UserModel.findOne({ verificationToken: token });

        if (!user) {
            return { success: false, message: "Invalid verification token." };
        }

        if (user.emailVerified) {
            return { success: false, message: "Email is already verified." };
        }

        if (user.verificationTokenExpiration < new Date()) {
            return { success: false, message: "Verification token has expired." };
        }

        user.emailVerified = true;
        // user.verificationToken = "";
        // user.verificationTokenExpiration = new Date(0); // Optional: invalidate the token explicitly
        await user.save();

        return { success: true, message: "Email verified successfully.", user };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error verifying email:", error);
        return { success: false, message: "An unexpected error occurred during email verification." };
    }
}