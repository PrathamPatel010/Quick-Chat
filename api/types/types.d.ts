import { Request as ExpressRequest } from 'express';

// Define the User interface
export interface User {
    id: string;
    email: string;
    username: string;
    iat?: string;
    pic?: string,
    isAdmin?: boolean,
    isVerified?: boolean

}

// Merge the User interface with the ExpressRequest interface
declare module "express" {
    export interface Request extends ExpressRequest {
        user?: User; // Add the user property to the Request interface
    }
}
