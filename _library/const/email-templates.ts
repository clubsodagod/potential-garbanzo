// email-templates.ts
"use client"
export interface EmailTemplate {
    label: string;
    template: string;
}

const preforeclosureEmailTemplates: EmailTemplate[] = [
    {
        label: "Day 1 – Introduction & Value Offer",
        template: `
Hi [First Name],

I hope this message finds you well. I recently came across a public notice regarding your property at [Property Address] that may be going into foreclosure. I know how overwhelming and stressful this kind of situation can feel.

I work with homeowners facing similar challenges — helping them either avoid foreclosure or sell quickly and walk away with cash, while preserving their credit as much as possible.

There’s no pressure at all, but if you’re still exploring your options and want to talk through what’s possible, I’d be happy to help — no cost, no obligations.

Let me know if you’d be open to a short call or email reply. I’m here for you.

Warmly,  
Maliek Davis  
[Phone Number]  
[Email Address]  
[Optional Website]
    `,
    },
    {
        label: "Day 3 – Empathy & Soft Follow-Up",
        template: `
Hi [First Name],

Just wanted to follow up on my last message. I completely understand if you’re not ready to talk yet — this is a sensitive situation, and everyone moves at their own pace.

That said, if you are still in a tough spot with the foreclosure process, I want you to know that there are options — including ones that can help protect your credit, give you more time, or even help you walk away with some cash in hand.

I’ve helped other homeowners in similar positions, and I’d be happy to share what might be available in your case — again, no pressure and no obligation.

If now isn’t the right time, feel free to save my contact info in case things change.

Take care,  
Maliek Davis
    `,
    },
    {
        label: "Day 5 – Final Touch + Urgency",
        template: `
Hi [First Name],

Foreclosure timelines can move faster than expected, and I didn’t want you to miss out on the chance to take control of your situation.

Even if you're behind on payments or unsure what to do, you may still have options — whether it’s selling before the auction, stopping the process altogether, or even staying in the home under new terms.

If you’re open to hearing about what might be possible in your specific case, I can break it down quickly and clearly — no pressure, just real information.

Let me know. I’m here to help.

Best,  
Maliek Davis
    `,
    },
];


export default preforeclosureEmailTemplates