"use client"

import RegisterModule from '@/_components/client/register/RegisterModule';
import UnauthenticatedOnly from '@/_components/route-protection/UnauthenticatedOnly';
import React from 'react'


const RegisterPage = ({ }) => {

    return (
        <RegisterModule />
    )
}



export default UnauthenticatedOnly(RegisterPage); 