export class AuthHttpAdapter {
    // tslint:disable
    public static transformFromLogin(data: any): ILogin {
        return {
            attributes: {
                tenant_id: data.tenant_id,
                username: data.username,
                password: data.password
            }
        };
    }
}
