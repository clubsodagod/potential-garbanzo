"use client";

import React, { useEffect, useRef } from "react";
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
    Stepper,
    Step,
    StepLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { IUserForm } from "@/_database/models/user.model";
import { userFormSections } from "@/_library/const/forms/user-form-sections";
import Link from "next/link";
import { registerAdminUser } from "@/_utility/fetchers/user/register-admin.fetcher";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "motion/react";

const RegisterForm: React.FC = () => {
    const [step, setStep] = React.useState<number>(0);
    const currentSection = userFormSections[step];
    const firstFieldRef = useRef<HTMLInputElement | null>(null);

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
        trigger,
        reset,
        getValues
    } = useForm<IUserForm>({
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            confirmEmail: "",
            password: "",
            confirmPassword: "",
            role:"partner",
        },
        mode: "onChange",
    });

    const watchEmail = watch("email");
    const watchPassword = watch("password");

    useEffect(() => {
        firstFieldRef.current?.focus();
    }, [step]);

    const onSubmit = async (): Promise<void> => {
        const data = getValues();
        if (step !== userFormSections.length - 1) {
            return handleNext(); // jump to next step instead
        }

        try {
            const response = await registerAdminUser(data);
            if (response.error) throw new Error(response.message);

            toast.success("✅ Account created successfully!");
            reset();
            setStep(0);
        } catch (error) {
            toast.error((error as Error).message || "Something went wrong");
        }
    };


    const handleNext = async (): Promise<void> => {
        const valid = await trigger(currentSection.fields.map(f => f.name as keyof IUserForm));
        if (valid) setStep((s) => s + 1);
    };

    const handleBack = (): void => setStep((s) => Math.max(0, s - 1));

    return (
        <Box maxWidth="480px" margin="auto" padding={4} bgcolor="whitesmoke" borderRadius={3} boxShadow={4}>
            <Typography variant="h5" gutterBottom>Register Account</Typography>

            <Stepper activeStep={step} alternativeLabel sx={{ marginBottom: 3 }}>
                {userFormSections.map((section, idx) => (
                    <Step key={idx}>
                        <StepLabel>{section.title}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Typography variant="subtitle1" gutterBottom>
                Step {step + 1} of {userFormSections.length}: {currentSection.title}
            </Typography>

            <form onSubmit={()=>onSubmit()} noValidate>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Stack spacing={3}>
                            {currentSection.fields.map((field, idx) => (
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
                                            type={field.type === "password" ? "password" : "text"}
                                            placeholder={field.placeholder}
                                            fullWidth
                                            inputRef={idx === 0 ? firstFieldRef : null}
                                            error={!!errors[field.name]}
                                            helperText={
                                                errors[field.name]?.message as string
                                            }
                                        />
                                    )}
                                />
                            ))}
                        </Stack>
                    </motion.div>
                </AnimatePresence>

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
                            onClick={()=>onSubmit()}
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </Button>
                    )}
                </Stack>
            </form>

            <Typography variant="body2" align="center" mt={3} className="text-sm text-gray-600">
                Already have an account?{" "}
                <Button variant="text" size="small" LinkComponent={Link} href="/login">
                    Log in
                </Button>
            </Typography>
        </Box>
    );
};

export default RegisterForm;
