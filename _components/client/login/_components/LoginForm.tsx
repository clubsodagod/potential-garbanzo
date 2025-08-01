"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Credentials } from "@/_library/types-interfaces-classes/user";

/**
 * LoginForm Component
 *
 * A single-step login form built with React Hook Form and MUI.
 * Validates credentials and supports next-auth login with feedback messaging.
 *
 * @component
 * @returns {JSX.Element}
 */
const LoginForm: React.FC = () => {
    const {
        control,
        handleSubmit,
        reset
    } = useForm<Credentials>({
        defaultValues: {
            credential: "",
            secret: "",
        },
        mode: "onTouched",
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [fieldValidation, setFieldValidation] = useState<Record<string, true | false | null>>({});

    const validateFields = (data: Credentials): boolean => {
        const validationState: Record<string, true | false> = {
            credential: !!data.credential.trim(),
            secret: !!data.secret.trim(),
        };

        setFieldValidation(validationState);
        return Object.values(validationState).every(Boolean);
    };

    const onSubmit = async (data: Credentials): Promise<void> => {
        setResponseMessage(null);

        const isValid = validateFields(data);
        if (!isValid) {
            setResponseMessage("Please complete the required fields.");
            return;
        }

        setLoading(true);

        try {
            const res = await signIn("credentials", {
                redirect: false,
                credential: data.credential,
                secret: data.secret,
            });

            console.log("Login response:", res);
            

            setLoading(false);

            if (res?.error) {
                setResponseMessage("Invalid login credentials. Please try again.");
            } else {
                reset();
            }
        } catch (error) {
            setLoading(false);
            console.error("Login error:", error);
            setResponseMessage("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <Box
            maxWidth="480px"
            margin="auto"
            padding={4}
            bgcolor="whitesmoke"
            borderRadius={3}
            boxShadow={4}
        >
            <Typography variant="h5" gutterBottom>
                Welcome Back
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Please log in to your account
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={3}>
                    <Controller
                        name="credential"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email or Username"
                                placeholder="Enter your email or username"
                                fullWidth
                                error={fieldValidation.credential === false}
                            />
                        )}
                    />

                    <Controller
                        name="secret"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                fullWidth
                                error={fieldValidation.secret === false}
                            />
                        )}
                    />

                    {responseMessage && (
                        <Typography variant="body2" color="error">
                            {responseMessage}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                    </Button>
                </Stack>
            </form>

            {/* Don't have an account link */}
            <Typography variant="body2" align="center" mt={3} className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Button
                    variant="text"
                    size="small"
                    href="/register"
                    LinkComponent={Link}
                >
                    Register
                </Button>
            </Typography>
        </Box>
    );
};

export default LoginForm;
