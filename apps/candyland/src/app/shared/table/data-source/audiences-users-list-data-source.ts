import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';

export class AudiencesUsersListDataSource<T> extends CustomDataSource<T> {

  constructor(public dataService: ITableService, public pageSize = 5) {
    super(dataService, pageSize);
  }
}
