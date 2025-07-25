"use client"

import LeadFlowHomeModule from "@/_components/client/the-lead-flow/LeadFlowHomeModule";
import AuthenticatedOnly from "@/_components/route-protection/AuthenticatedOnly";




function Home() {
    return (
        <LeadFlowHomeModule />
    );
}


export default AuthenticatedOnly(Home)