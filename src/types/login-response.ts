import {User} from "./user.ts";

export interface LoginResponse {
    message: string;
    token: string;
    user: User;
}
