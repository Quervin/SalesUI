import { UserType } from "./user-type";

export interface Register {
    userName: string;
    firstName: string;
    lastName: string;
    document: string;
    phoneNumber: string;
    address: string;
    email: string;
    cityId: string;
    photo?: string;
    password: string;
    passwordConfirm: string;
    userType: UserType;
}
