import Utils from '@cl-helpers/utils';

export interface TypeConfig {
  fieldName?: string;
  adapterFunction?: (data: any) => any;
}

export interface RequestListItem {
  [type: string]: TypeConfig;
}

// tslint:disable
export class CRUDParser {
  public static buildRequestList<T extends { id: string }>(current: T[], updated: T[]): { method: string, data: T }[] {
    const result = [];
    const updatedMap = {};
    updated.forEach(updatedItem => {
      console.log('updatedItem', updatedItem);
      if (updatedItem.id) {
        updatedMap[updatedItem.id] = updatedItem;
      } else {
        result.push({method: 'create', data: updatedItem});
      }
    });
    current.forEach(currentItem => {
      if (!(currentItem.id in updatedMap)) {
        result.push({method: 'delete', data: currentItem});
        return;
      }

      const updateItem = updatedMap[currentItem.id];

      if (!Utils.isEqual(updateItem, currentItem)) {
        result.push({method: 'update', data: updateItem});
        return;
      }

      result.push({method: 'unchanged', data: updateItem});
    });

    console.log('result: ', current, updated, result);
    return result;
  }

  sendRequestList<T>(
    requestList: { method: string, data: any }[],
    methods: { create?: Function, update?: Function, delete?: Function, unchanged?: Function },
    additionalArguments: any[]) {
    const result: T[] = [];
    requestList.forEach(request => {
        if (request.method in methods && methods[request.method] === 'function') {
          const method = methods[request.method];
          switch (request.method) {
            case 'create':
              result.push(method(request.data, ...additionalArguments));
              return;
            case 'update':
              result.push(method(request.data.id, request.data, ...additionalArguments));
              return;
            case 'delete':
              result.push(method(request.data.id));
              return;
            case 'unchanged':
              result.push(method(request.data, ...additionalArguments));
              return;
          }
        }
      }
    );
    return result;
  }

}

