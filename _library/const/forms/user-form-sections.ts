import { UserFormSection } from "@/_library/types-interfaces-classes/user";



export const userFormSections: UserFormSection[] = [
    {
        title: "Personal Information",
        fields: [
            {
                name: "firstName",
                label: "First Name",
                type: "input",
                placeholder: "e.g., John",
                validation: {
                    required: "First name is required",
                },
            },
            {
                name: "lastName",
                label: "Last Name",
                type: "input",
                placeholder: "e.g., Doe",
                validation: {
                    required: "Last name is required",
                },
            },
        ],
    },
    {
        title: "Account Credentials",
        fields: [
            {
                name: "username",
                label: "Username",
                type: "input",
                placeholder: "e.g., johndoe_123",
                validation: {
                    required: "Username is required",
                    pattern: {
                        value: /^[a-zA-Z0-9_-]{3,16}$/,
                        message: "3–16 characters. Letters, numbers, dashes, underscores only",
                    },
                },
            },
            {
                name: "email",
                label: "Email",
                type: "input",
                placeholder: "you@example.com",
                validation: {
                    required: "Email is required",
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email address",
                    },
                },
            },
            {
                name: "confirmEmail",
                label: "Confirm Email",
                type: "input",
                placeholder: "Repeat your email",
                validation: {
                    required: "Please confirm your email address",
                },
            },
        ],
    },
    {
        title: "Security Setup",
        fields: [
            {
                name: "password",
                label: "Password",
                type: "password",
                placeholder: "Choose a strong password",
                validation: {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Must be at least 8 characters",
                    },
                },
            },
            {
                name: "confirmPassword",
                label: "Confirm Password",
                type: "password",
                placeholder: "Repeat your password",
                validation: {
                    required: "Please confirm your password",
                },
            },
        ],
    },
];
