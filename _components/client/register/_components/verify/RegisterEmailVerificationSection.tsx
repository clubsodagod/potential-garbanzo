"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Typography, CircularProgress, Button, Card, CardContent } from "@mui/material";
import { IUser } from "@/_database/models/user.model";
import { verifyUserEmail } from "@/_utility/fetchers/user/verify-user-email.fetcher";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Link from "next/link";

/**
 * Calls the email verification API with a given token.
 *
 * @param {string} token - The token to validate.
 * @returns {Promise<{ success: boolean; message: string; user?: IUser | null }>}
 */
const verifyEmailToken = async (
    token: string
): Promise<{ success: boolean; message: string; user?: IUser | null }> => {
    return await verifyUserEmail({ token });
};

/**
 * RegisterEmailVerificationSection
 *
 * Component that handles token verification from query params and
 * renders a user-friendly success or error message.
 *
 * @component
 */
const RegisterEmailVerificationSection: React.FC = () => {
    const searchParams = useSearchParams();

    const token = searchParams.get("token") || "";
    const email = searchParams.get("email") || "";
    const username = searchParams.get("username") || "";
    const firstName = searchParams.get("firstName") || "";

    const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const verify = async () => {
            const res = await verifyEmailToken(token);
            setStatus(res.success ? "success" : "error");
            setMessage(res.message);
            setUser(res.user ?? null);
        };

        if (token && email) {
            verify();
        } else {
            setStatus("error");
            setMessage("Missing verification information.");
        }
    }, [token, email]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md text-center">
                {status === "pending" && (
                    <div className="flex flex-col items-center gap-4">
                        <CircularProgress />
                        <Typography variant="body1">Verifying your email...</Typography>
                    </div>
                )}

                {status === "success" && user && (
                    <Card className="shadow-lg border border-green-200">
                        <CardContent className="space-y-4">
                            <CheckCircleOutlineIcon color="success" fontSize="large" />
                            <Typography variant="h6" className="text-green-600">
                                {message}
                            </Typography>
                            <Typography variant="body2">
                                Welcome <strong>{firstName || user.firstName}</strong>! Your email has been successfully verified.
                            </Typography>
                            <Typography variant="body2" className="text-gray-700">
                                Your account has been submitted for review. Please look out for an approval email — be sure to check your spam folder just in case.
                            </Typography>

                            <Link href="/login">
                                <Button variant="contained" color="primary" fullWidth>
                                    Proceed to Login
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}

                {status === "error" && (
                    <Card className="shadow border border-red-200">
                        <CardContent className="space-y-4">
                            <ErrorOutlineIcon color="error" fontSize="large" />
                            <Typography variant="h6" className="text-red-600">
                                {message}
                            </Typography>
                            <Typography variant="body2" className="text-gray-600">
                                If you believe this is a mistake, please try the link again or contact support.
                            </Typography>
                            <Link href="/register">
                                <Button variant="outlined" color="secondary" fullWidth>
                                    Return to Registration
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default RegisterEmailVerificationSection;
