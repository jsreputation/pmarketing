import Utils from '@cl-helpers/utils';

// tslint:disable
export class ParseIncluded {
  public static setInclude(source: any, target: any, type: string, fieldName: string | null = null, adapterFunction?: (data: any) => any): any {
    const mapIncludes = ParseIncluded.getMapIncludes(source, type, adapterFunction);

    if (Utils.isEmptyObject(mapIncludes)) {
      return target;
    }

    const sourceData = source.data;
    if (Utils.isObject(sourceData)) {
      const result = ParseIncluded.findRelations(sourceData, type, mapIncludes);
      if (result) {
        return  ParseIncluded.setResult(target, fieldName, result);
      }
    }

    if (Utils.isArray(sourceData)) {
      sourceData.forEach((sourceItem, i) => {
        const result = ParseIncluded.findRelations(sourceItem, type, mapIncludes);
        if (result) {
          target[i] = ParseIncluded.setResult(target[i], fieldName, result);
        }
      });
      return  target;
    }
  }

  public static getMapIncludes(source, type, adapterFunction?: (data: any) => any){
    const mapIncludes = {};
    source.included.forEach(item => {
      if (item.type.includes(type)) {
        mapIncludes[item.id] = (adapterFunction && typeof adapterFunction === 'function') ? adapterFunction(item) : item;
      }
    });
    return mapIncludes;
  }

  public static getRelationResult(relationData, type, mapIncludes) {
    if (Utils.isObject(relationData)) {
      if (!relationData.type.includes(type)) {
        return;
      }
      return mapIncludes[relationData.id];
    }

    if (Utils.isArray(relationData)) {
      const relationArrayResult = [];
      // handler as array for relations
      relationData.forEach((relationDataItem: any) => {
        if (!relationDataItem.includes(type)) {
          return;
        }
        relationArrayResult.push(mapIncludes[relationDataItem.id]);
      });
      if (relationArrayResult.length === 0) {
        return;
      }
      return relationArrayResult;
    }
  }

  public static findRelations(sourceItem, type, mapIncludes) {
    if (!sourceItem.relationships) {
      return;
    }

    for (const subType in sourceItem.relationships) {
      if (!sourceItem.relationships.hasOwnProperty(subType)) {
        continue;
      }

      if (!sourceItem.relationships[subType].hasOwnProperty('data') || !sourceItem.relationships[subType].data) {
        continue;
      }

      const relationData = sourceItem.relationships[subType].data;
      const relationResult = ParseIncluded.getRelationResult(relationData, type, mapIncludes);
      if (relationResult) {
        return relationResult;
      }
    }
  }

  public static setResult(target, fieldName, relationResult) {
    if (fieldName) {
      target[fieldName] = relationResult;
      return target;
    }

    if (Utils.isObject(relationResult)) {
      target = {...target, ...relationResult};
      return target;
    }

    console.warn('Wrong config: set field in arguments or relation can by only object');
    return target;
  }

}

