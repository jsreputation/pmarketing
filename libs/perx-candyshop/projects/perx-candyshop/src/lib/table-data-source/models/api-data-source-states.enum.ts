// enum of states for manage view in pages where used data source
export enum ApiDataSourceStates {
  firstLoading = 0, // between init dataSource to get first response from data service (use for showing page preloader)
  hasDataApi = 1, // get response from data service with data (use for showing table/grid card)
  noDataApi = 2, // get first response from data service without data (use for showing no data)
  errorApi = 3 // get first response from data service with error (use for showing error)
}
