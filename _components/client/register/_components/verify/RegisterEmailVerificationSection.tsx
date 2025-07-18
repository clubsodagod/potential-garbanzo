"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Typography, CircularProgress } from "@mui/material";
import VerificationSuccessCard from "./VerificationSuccessCard";
import { IUser } from "@/_database/models/user.model";
import { verifyUserEmail } from "@/_utility/fetchers/user/verify-user-email.fetcher";


const verifyEmailToken = async (
    token: string,
): Promise<{ success: boolean; message: string, user?: IUser | null | undefined; }> => {
    return await verifyUserEmail({ token });
};


const RegisterEmailVerificationSection = () => {

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

        <div
            className="min-w-full min-h-full"
        >
            <div className="grow flex flex-col justify-center  text-center">
                {status === "pending" && <CircularProgress />}
                {status !== "pending" && (
                    <Typography
                        className={`text-lg font-medium ${status === "success" ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {message}
                    </Typography>
                )}
                {/* {status === "success" && user && (
                    <VerificationSuccessCard user={user} message={message} />
                )} */}
            </div>
        </div>


    );
};

export default RegisterEmailVerificationSection;
