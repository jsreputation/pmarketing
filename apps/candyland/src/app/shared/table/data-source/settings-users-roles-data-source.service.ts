import { Injectable } from '@angular/core';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsUsersRolesDataSourceService<T> extends CustomDataSource<T> {

  constructor(public dataService: ITableService, public pageSize = 5) {
    super(dataService, pageSize);
    this.included = 'groups';
  }
}
