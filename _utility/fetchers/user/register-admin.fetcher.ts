"use server";

import connectToDB from "@/_database/connect-to-db.database";
import UserModel, { IUserForm, IUser } from "@/_database/models/user.model";
import { ResponseStatus } from "@/_library/types-interfaces-classes/common";
import UserRegistrationEmailVerification from "@/app/emails/UserRegistrationEmailVerification";
import bcrypt from "bcryptjs";
import xss from "xss";
import { Resend } from "resend";
import dotenv from "dotenv";
import { generateVerificationToken } from "@/_utility/helpers/verification-token-generator";
import generateVerificationLink from "@/_utility/helpers/generate-verification-link";
import { getBaseUrl } from "@/_utility/helpers/get-base-url";

dotenv.config();

const EMAIL_FROM = "self@maliek-davis.com";
const EMAIL_SUBJECT = "Verify your email with Maliek Davis";

/**
 * Registers a new admin user and sends a verification email.
 *
 * @param {IUserForm} data - Form data for registration
 * @returns {Promise<ResponseStatus>} - Result status of registration process
 */
export async function registerAdminUser(data: IUserForm): Promise<ResponseStatus> {
    try {
        await connectToDB();

        const {
            firstName,
            lastName,
            username,
            email,
            confirmEmail,
            avatar,
            password,
            confirmPassword,
            role,
        } = data;

        if (role !== "admin") {
            return { error: true, message: "Unauthorized role. Only admins can be registered here." };
        }

        if (
            !firstName ||
            !lastName ||
            !username ||
            !email ||
            !confirmEmail ||
            !password ||
            !confirmPassword
        ) {
            return { error: true, message: "All required fields must be provided." };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { error: true, message: "Invalid email format." };
        }

        if (email !== confirmEmail) {
            return { error: true, message: "Emails do not match." };
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return {
                error: true,
                message: "Password must be at least 8 characters, include a number and an uppercase letter.",
            };
        }

        if (password !== confirmPassword) {
            return { error: true, message: "Passwords do not match." };
        }

        const sanitizedData = {
            firstName: xss(firstName.trim()),
            lastName: xss(lastName.trim()),
            username: xss(username.trim().toLowerCase()),
            email: xss(email.trim().toLowerCase()),
            avatar: xss(avatar?.trim() || ""),
            role,
        };

        const existingUser: IUser | null = await UserModel.findOne({
            $or: [{ email: sanitizedData.email }, { username: sanitizedData.username }],
        });

        if (existingUser) {
            return { error: true, message: "A user with that email or username already exists." };
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = generateVerificationToken();
        const verificationUrl = generateVerificationLink(
            verificationToken,
            getBaseUrl()!,
            sanitizedData.email,
            sanitizedData.firstName,
            sanitizedData.lastName
        );

        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 24);

        const newUser = new UserModel({
            ...sanitizedData,
            password: hashedPassword,
            emailVerified: false,
            verificationToken,
            verificationTokenExpiration: expirationDate,
        });

        await newUser.save();

        const emailResponse = await sendVerificationEmail(
            sanitizedData.firstName,
            sanitizedData.email,
            verificationUrl
        );

        if (emailResponse.error) {
            return { error: true, message: emailResponse.message };
        }

        return {
            error: false,
            message: "Registration successful! Please check your email to verify your account.",
        };
    } catch (err) {
        console.error("Registration error:", err);
        return { error: true, message: "Internal server error. Please try again later." };
    }
}

/**
 * Sends a verification email to the user using Resend.
 *
 * @param {string} firstName - User's first name
 * @param {string} email - Email address to send to
 * @param {string} verificationUrl - Unique verification link
 * @returns {Promise<ResponseStatus>} - Email delivery result
 */
export async function sendVerificationEmail(
    firstName: string,
    email: string,
    verificationUrl: string
): Promise<ResponseStatus> {
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    try {
        const emailComponent = UserRegistrationEmailVerification({
            name: firstName,
            verificationUrl,
        });

        const response = await resend.emails.send({
            from: EMAIL_FROM,
            to: [email],
            subject: EMAIL_SUBJECT,
            react: emailComponent as React.ReactElement,
        });

        if (response.error) {
            return {
                error: true,
                message: `Failed to send email: ${response.error.message}`,
            };
        }

        return {
            error: false,
            message: "Verification email sent successfully.",
            data: response,
        };
    } catch (error) {
        console.error("Email verification error:", error);
        return {
            error: true,
            message: "An unexpected error occurred while sending the email.",
        };
    }
}
