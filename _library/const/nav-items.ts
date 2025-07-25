import { NavItem } from "../types-interfaces-classes/common";

export const navItems: NavItem[] = [
    {
        label: "Pearl Bar",
        path: "/pearl-bar",
        children: [
            {
                label:"The Lead Flow",
                path:"/the-lead-flow"
            }
        ]
    },
    {
        label: "About",
        path: "/about",
    },
    {
        label: "Contact",
        path: "/contact",
    },
];
