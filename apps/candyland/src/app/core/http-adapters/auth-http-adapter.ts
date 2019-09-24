export class AuthHttpAdapter {
    // tslint:disable
    public static transformFromLogin(data: any): ILogin {
        return {
            attributes: {
                account_id: data.account_id,
                username: data.username,
                password: data.password
            }
        };
    }
}
