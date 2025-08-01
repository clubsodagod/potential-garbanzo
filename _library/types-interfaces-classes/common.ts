


export type ResponseStatus = {
    success?: boolean;
    error: boolean;
    message: string;
    data?: unknown;
}

export interface IResponseStatus<T> {
    success?: boolean;
    error: boolean;
    message: string;
    data?: T;
}

// /types/nav.ts

export interface NavItem {
    label: string;
    path: string;
    children?: NavItem[];
}
