export class TokenHolder {
    static setToken(token: string) {
        localStorage.setItem("token", token);
    }
    static getToken(): string | null {
        return localStorage.getItem("token");
    }
}
