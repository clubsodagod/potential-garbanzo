"use client"

import LoginModule from '@/_components/client/login/LoginModule'
import React from 'react'
import UnauthenticatedOnly from '@/_components/route-protection/UnauthenticatedOnly'

const LoginPage = () => {
    return (
        <LoginModule />
    )
}

export default UnauthenticatedOnly(LoginPage); 