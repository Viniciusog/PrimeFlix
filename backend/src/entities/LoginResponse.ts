import { UserRole } from "./UserBase";

class LoginResponse {
    private statusCode: number;
    private message: string;
    private token: string;
    private userRole: UserRole;

    constructor(statusCode: number, message: string, token: string, userRole: UserRole) {
        this.statusCode = statusCode;
        this.message = message;
        this.token = "Bearer " + token;
        this.userRole = userRole;
    }

    setStatusCode(statusCode: number): void {
        this.statusCode = statusCode;
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    setMessage(message: string): void {
        this.message = message;
    }

    getMessage(): string {
        return this.message;
    }

    setToken(token: string) {
        this.token = "Bearer " + token;
    }

    getToken(): string {
        return this.token;
    }

    setRole(role: UserRole) {
        this.userRole = role;
    }

    getRole(): UserRole {
        return this.userRole;
    }
}

export { LoginResponse }