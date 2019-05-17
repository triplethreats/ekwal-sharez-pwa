export default class UserApi {
    static createUser(email: string, password: string): Promise<void>{
        let fetchData = {
            method: 'POST',
            body: JSON.stringify({email:email,password:password}),
            headers: new Headers()
        };
        return fetch(`/api/users/signup`, fetchData).then();
    }
    static connectUser(email: string, password: string): Promise<string>{
        let fetchData = {
            method: 'POST',
            body: JSON.stringify({email:email,password:password}),
            headers: new Headers()
        };
        return fetch(`/api/users/signin`, fetchData).then();
    }
}
