

// utils/generateVerificationLink.ts
const generateVerificationLink = (verificationToken: string, configUrl: string, username: string, firstName:string, email:string) => {
    const params = new URLSearchParams({
        token: verificationToken,
        email, firstName, username,
    });

    return `${configUrl}/register/verify/email-verification?${params.toString()}`;
};

export default generateVerificationLink;
