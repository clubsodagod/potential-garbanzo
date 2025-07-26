"use client"

import React from 'react'
import HomeHeroSection from './components/HomeHeroSection';
import HomeValuePropositionSection from './components/HomeValuePropositionSection';
import PearlBoxHomeScene from './components/3d/PearlBoxHomeScene';
import AutomationAISection from './components/AutomationAISection';


const HomePageModule: React.FC = ({ }) => {

    return (
        <div
            className=''
        >
            <div
                className='fixed h-screen w-full z-0 '
            >
                <PearlBoxHomeScene />
            </div>
            <HomeHeroSection />
            <HomeValuePropositionSection />
            <AutomationAISection />
        </div>

    )
}



export default HomePageModule;