declare interface IUserWithIncludes<T> {
    data: IUserApi;
    included: any;
    meta?: IMeta;
}
