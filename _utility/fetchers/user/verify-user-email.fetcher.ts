import connectToDB from "@/_database/connect-to-db.database";
import UserModel, { IUser } from "@/_database/models/user.model";
import { Resend } from "resend";
import UserAccountApprovalRequestEmail from "@/app/emails/UserAccountApprovalRequestEmail";
import { TaskModel } from "@/_database/models/task.model";
import { ITask } from "@/_library/types-interfaces-classes/task";
import { fetchAllAdmins } from "./fetch-all-admin-users.fetcher";

/**
 * Input required for email verification.
 */
interface VerifyEmailInput {
    token: string;
}

/**
 * Response structure for verification result.
 */
interface VerifyEmailResponse {
    success: boolean;
    message: string;
    user?: IUser | null;
}

/**
 * Verifies a user's email using a provided verification token.
 * If successful, sends an approval request email to admin(s),
 * creates a new admin task, and assigns that task to all admins.
 *
 * @param {VerifyEmailInput} input - Object containing the verification token.
 * @returns {Promise<VerifyEmailResponse>} - Status, message, and optionally the user object.
 */
export async function verifyUserEmail({
    token,
}: VerifyEmailInput): Promise<VerifyEmailResponse> {
    try {
        if (!token) {
            return { success: false, message: "Verification token is required." };
        }

        await connectToDB();
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
        user.verificationToken = "";
        user.verificationTokenExpiration = new Date(0);
        await user.save();

        // 1️⃣ Send approval email to admin
        const publicUserData = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            createdAt: user.createdAt,
            emailVerified: user.emailVerified,
        };

        const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
        const approvalEmail = UserAccountApprovalRequestEmail({ user: publicUserData });

        await resend.emails.send({
            from: "no-reply@maliek-davis.com",
            to: ["self@maliek-davis.com"],
            subject: "New Account Awaiting Approval",
            react: approvalEmail as React.ReactElement,
        });

        // 2️⃣ Create AdminVerification task
        const newTask = await TaskModel.create<ITask>({
            type: "AdminVerification",
            status: "pending",
            createdBy: user._id,
            userToVerifyId: user._id,
            userEmail: user.email,
            verificationToken: token,
            comments: "Verify and approve user account request.",
            metadata: {
                registeredAt: user.createdAt,
                userName: user.username,
                firstName:user.firstName,
                lastName:user.lastName
            },
        });

        // 3️⃣ Assign task to all admins
        const adminResponse = await fetchAllAdmins();

        if (adminResponse.success && adminResponse.data) {
            const adminUsers = adminResponse.data;

            await Promise.all(
                adminUsers.map(async (admin) => {
                    admin.tasks.push(newTask._id);
                    await admin.save();
                })
            );
        }

        return {
            success: true,
            message: "Email verified successfully.",
            user,
        };
    } catch (error) {
        console.error("verifyUserEmail error:", error);
        return {
            success: false,
            message: "An unexpected error occurred during email verification.",
        };
    }
}
