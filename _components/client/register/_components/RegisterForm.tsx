"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { IUserForm } from "@/_database/models/user.model";
import { userFormSections } from "@/_library/const/forms/user-form-sections";
import Link from "next/link";

/**
 * RegisterForm Component
 *
 * A multi-step user registration form built with React Hook Form and MUI.
 * Includes validation for required fields and field matchers like confirmEmail/password.
 *
 * @component
 * @returns {JSX.Element}
 */
const RegisterForm: React.FC = () => {
    const [step, setStep] = useState<number>(0);
    const currentSection = userFormSections[step];

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<IUserForm>({
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            confirmEmail: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onTouched",
    });

    const watchEmail = watch("email");
    const watchPassword = watch("password");

    /**
     * Handle final form submission
     * @param data - IUserForm payload
     */
    const onSubmit = async (data: IUserForm): Promise<void> => {
        try {
            console.log("Submitting registration:", data);
            // await api.registerUser(data)
            reset();
            setStep(0);
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    const handleNext = (): void => setStep((s) => s + 1);
    const handleBack = (): void => setStep((s) => Math.max(0, s - 1));

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
                Register Account
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Step {step + 1} of {userFormSections.length}: {currentSection.title}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={3}>
                    {currentSection.fields.map((field) => (
                        <Controller<IUserForm>
                            key={field.name}
                            name={field.name as keyof IUserForm}
                            control={control}
                            rules={{
                                ...field.validation,
                                ...(field.name === "confirmEmail" && {
                                    validate: (val) =>
                                        val === watchEmail || "Emails do not match",
                                }),
                                ...(field.name === "confirmPassword" && {
                                    validate: (val) =>
                                        val === watchPassword || "Passwords do not match",
                                }),
                            }}
                            render={({ field: controllerField }) => (
                                <TextField
                                    {...controllerField}
                                    label={field.label}
                                    type={
                                        field.type === "password" ||
                                            field.name === "confirmPassword"
                                            ? "password"
                                            : "text"
                                    }
                                    placeholder={field.placeholder}
                                    fullWidth
                                    error={!!errors[field.name]}
                                    helperText={
                                        errors[field.name]
                                            ? String(errors[field.name]?.message)
                                            : ""
                                    }
                                />
                            )}
                        />
                    ))}
                </Stack>

                <Stack direction="row" justifyContent="space-between" mt={4}>
                    {step > 0 && (
                        <Button variant="outlined" onClick={handleBack}>
                            Back
                        </Button>
                    )}
                    {step < userFormSections.length - 1 ? (
                        <Button variant="contained" onClick={handleNext}>
                            Next
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </Button>
                    )}
                </Stack>
            </form>

            {/* Already have an account */}
            <Typography
                variant="body2"
                align="center"
                mt={3}
                className="text-sm text-gray-600"
            >
                Already have an account?{" "}
                <Button
                    variant="text"
                    size="small"
                    LinkComponent={Link}
                    href="/login"
                >
                    Log in
                </Button>
            </Typography>
        </Box>
    );
};

export default RegisterForm;
