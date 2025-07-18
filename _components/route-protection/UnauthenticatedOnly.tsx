"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import InfinityLoadingLottie from "../client/layout/loading/InfinityLoadingLottie"; // Adjust path as needed

/**
 * `UnauthenticatedOnly` is a higher-order component (HOC) that restricts access
 * to components meant only for unauthenticated users (e.g., login/register).
 *
 * If the user is already authenticated, they are redirected to the homepage.
 * A 2-second delay is applied before checking authentication to allow for smoother loading UX.
 *
 * @template P - Props of the wrapped component
 * @param WrappedComponent - The component to restrict to unauthenticated users
 * @returns A wrapper component that performs authentication check and conditionally renders
 *
 * @example
 * ```tsx
 * const RegisterPage = () => <div>Sign up here</div>;
 * export default UnauthenticatedOnly(RegisterPage);
 * ```
 */
const UnauthenticatedOnly = <P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
    const LoginProtection: React.FC<P> = (props) => {
        const { status } = useSession();
        const [ready, setReady] = useState(false);

        useEffect(() => {
            const timeout = setTimeout(() => {
                if (status === "authenticated") {
                    redirect("/");
                } else if (status === "unauthenticated") {
                    setReady(true);
                }
            }, 500); // 2-second delay

            return () => clearTimeout(timeout);
        }, [status]);

        return !ready || status === "loading" ? (
            <InfinityLoadingLottie />
        ) : (
            <WrappedComponent {...props} />
        );
    };

    LoginProtection.displayName = `UnauthenticatedOnly(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return LoginProtection;
};

export default UnauthenticatedOnly;
