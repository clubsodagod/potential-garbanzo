"use client"
import React from 'react'
import PearlBarCTA from './_components/PearlBarCTA'
import PearlBarFeatureCategories from './_components/PearlBarFeatureCategories'
import PearlBarHero from './_components/PearlBarHero'
import PearlBarPainPoints from './_components/PearlBarPainPoints'
import { Box } from '@mui/material'

const PearlBarPage = () => {
    return (
        <Box
            className=""
        >
            <PearlBarHero />
            {/* <PearlBarPainPoints /> */}
            <PearlBarFeatureCategories />
            <PearlBarCTA />
        </Box>
    )
}

export default PearlBarPage