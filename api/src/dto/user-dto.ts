export interface CreateUserDto {
    email: string;
    username: string;
    password: string;
    pic?: string;
    isVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface LoginUserDto {
    email: string,
    password: string,
}
