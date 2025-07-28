"use client"

import { Button, Fab } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ReplyAllRoundedIcon from '@mui/icons-material/ReplyAllRounded';


const AppToDashboardPortal: React.FC = ({ }) => {

    return (
            <Button variant='outlined' LinkComponent={Link} href="/pearl-bar">
                <ReplyAllRoundedIcon />&nbsp; Pearl Bar
            </Button>
    )
}



export default AppToDashboardPortal;