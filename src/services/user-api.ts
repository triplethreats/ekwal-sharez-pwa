export default class UserApi {
    static createUser(email: string, password: string): Promise<void>{
        let fetchData = {
            method: 'POST',
            body: JSON.stringify({email:email,password:password}),
            headers: new Headers()
        };
        fetchData.headers.set("Content-Type", "application/json");
        return fetch(`/api/users/signup`, fetchData).then();
    }
    static connectUser(email: string, password: string): Promise<string>{
        let fetchData = {
            method: 'POST',
            body: JSON.stringify({email:email,password:password}),
            headers: new Headers()
        };
        fetchData.headers.set("Content-Type", "application/json");
        return fetch(`/api/users/signin`, fetchData).then(response => {
            return response.body.getReader().read().then(value => {
                return new TextDecoder("utf-8").decode(value.value);
            });
        });
    }
}
