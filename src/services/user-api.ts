export default class UserApi {
    static createUser(email: string, password: string): Promise<void>{
        console.log("create",email,password);
        let fetchData = {
            method: 'POST',
            body: JSON.stringify({email:email,password:password}),
            headers: new Headers()
        };
        return fetch(`/api/users/signup`, fetchData).then();
    }
    static connectUser(email: string, password: string): Promise<string>{
        console.log("connect",email,password);
        let fetchData = {
            method: 'POST',
            body: JSON.stringify({email:email,password:password}),
            headers: new Headers()
        };
        return fetch(`/api/users/signin`, fetchData).then();
    }
}
