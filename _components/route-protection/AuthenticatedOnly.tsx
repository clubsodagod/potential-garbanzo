"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import InfinityLoadingLottie from "../client/layout/loading/InfinityLoadingLottie";

/**
 * `AuthenticatedOnly` is a higher-order component (HOC) that restricts access
 * to a given component based on authentication and role.
 *
 * It delays the authorization check by 2 seconds to allow for smoother transitions or loading states.
 * If the user is unauthenticated, they are redirected to the registration page.
 * If authenticated but lacking a valid role (`admin` or `employee`), they are redirected to the homepage.
 *
 * @template P - The props of the wrapped component
 * @param WrappedComponent - The component to protect with authentication
 * @returns A component that checks authentication and either renders the protected component or redirects
 *
 * @example
 * ```tsx
 * const DashboardPage = () => <div>Protected Content</div>;
 * export default AuthenticatedOnly(DashboardPage);
 * ```
 */
const AuthenticatedOnly = <P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
    const LoginProtection: React.FC<P> = (props) => {
        const { status, data: session } = useSession();
        const [ready, setReady] = useState(false);

        useEffect(() => {
            const timeout = setTimeout(() => {
                if (status === "loading") return;

                if (status === "unauthenticated") {
                    redirect("/register");
                } else {
                    const role = session?.user?.role;
                    if (role === "employee" || role === "admin") {
                        setReady(true);
                    } else {
                        redirect("/");
                    }
                }
            }, 500); // Delay authentication check by 2 seconds

            return () => clearTimeout(timeout);
        }, [status, session]);

        return !ready || status === "loading" ? (
            <InfinityLoadingLottie />
        ) : (
            <WrappedComponent {...props} />
        );
    };

    LoginProtection.displayName = `AuthenticatedOnly(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return LoginProtection;
};

export default AuthenticatedOnly;
