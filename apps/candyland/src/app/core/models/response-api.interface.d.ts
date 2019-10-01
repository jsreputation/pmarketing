declare interface IResponseApi<T> {
  data: T;
  meta?: IMeta;
}

declare interface ISendAPI<T> {
  data: T;
}
