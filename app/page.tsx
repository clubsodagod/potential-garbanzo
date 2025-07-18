"use client"

import LeadFlowHomeModule from "@/_components/client/home/LeadFlowHomeModule";
import AuthenticatedOnly from "@/_components/route-protection/AuthenticatedOnly";




function Home() {
  return (
    <LeadFlowHomeModule />
  );
}


export default AuthenticatedOnly(Home)