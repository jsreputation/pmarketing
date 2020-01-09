import Utils from '@es-helpers/utils';
import { Observable } from 'rxjs';

export enum RequestType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  UNCHANGED = 'unchanged'
}

export interface RequestData<T extends { id: string }> {
  type: RequestType;
  data: T;
}

export type RequestFunctionResult<R> = Observable<R> | null | undefined;

export type RequestFunction<T, R> = (type: RequestType, data: T) =>  RequestFunctionResult<R>;

// tslint:disable
export class CRUDParser {
  public static buildRequestDataList<T extends { id: string } = any>(current: T[], updated: T[]): RequestData<T>[] {
    const result: RequestData<T>[]  = [];
    const updatedMap: {[id: string]: T} = {};
    updated.forEach((updatedItem: T) => {
      if (updatedItem.id) {
        updatedMap[updatedItem.id] = updatedItem;
      } else {
        result.push({type: RequestType.CREATE, data: updatedItem});
      }
    });
    current.forEach(currentItem => {
      if (!(currentItem.id in updatedMap)) {
        result.push({type: RequestType.DELETE, data: currentItem});
        return;
      }

      const updateItem = updatedMap[currentItem.id];

      if (!Utils.isEqual(updateItem, currentItem)) {
        result.push({type: RequestType.UPDATE, data: updateItem});
        return;
      }

      result.push({type: RequestType.UNCHANGED, data: updateItem});
    });

    return result;
  }

  public static buildRequestList<T extends { id: string } = any, R = any>(
    current: T[],
    updated: T[],
    callback: RequestFunction<T, R>): Observable<R>[] {
    const requestList = CRUDParser.buildRequestDataList<T>(current, updated);
    const result: Observable<R>[] = [];
    requestList.forEach(request => {
      const callbackResult: RequestFunctionResult<R> = callback(request.type, request.data);
      if(callbackResult && callbackResult instanceof Observable) {
        result.push(callbackResult)
      }
    });

    return result;
  }

}

