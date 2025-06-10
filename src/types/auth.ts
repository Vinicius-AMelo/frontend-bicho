export interface User {
    id: string;
    email: string;
    balance?: number;
    role: string;
}

export interface AuthLoginFormType {
    email: string;
    password: string;
}

export interface AuthRegisterFormType {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface DecodedJwtPayload {
    id: string;
    email: string;
    role: string;
    balance?: number;
    iat?: number;
    exp?: number;
}
