export class AuthHttpAdapter {
    public static transformFromLogin(data: ILogin): IJsonApiItem<ILogin> {
        return {
            attributes: {
                account_id: data.account_id,
                username: data.username,
                password: data.password
            }
        };
    }
}
