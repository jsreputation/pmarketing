import Utils from '@es-helpers/utils';

export interface TypeConfig {
  fieldName?: string;
  adapterFunction?: (data: any) => any;
}

export interface TypeConfigMap {
  [type: string]: TypeConfig;
}

// tslint:disable
// eslint:disable
export class JsonApiParser {

  public static parseData(source: any, adapterFunction: (data: any) => any) {
    const sourceData = source.data;
    if (Utils.isObject(sourceData)) {
      return (adapterFunction && typeof adapterFunction === 'function') ? adapterFunction(sourceData) : sourceData;
    }

    if (Utils.isArray(sourceData)) {
      return sourceData.map(item =>  (adapterFunction && typeof adapterFunction === 'function') ? adapterFunction(item) : item);
    }
  }

  public static parseDataWithIncludes(source: any, adapterFunction: (data: any) => any, config: TypeConfigMap) {
    let result = JsonApiParser.parseData(source, adapterFunction);
    result = JsonApiParser.parseMultipleInclude(source, result, config);
    return result;
  }

  public static parseDataWithIncludesAndMeta(source: any, adapterFunction: (data: any) => any, config: TypeConfigMap) {
    const meta = source.meta;
    if (!meta) {
      console.warn('Error: data without meta.');
      return;
    }
    const result = JsonApiParser.parseDataWithIncludes(source, adapterFunction, config);
    return {data: result, meta};
  }

  public static parseSingleInclude(source: any, target: any, type: string, config: TypeConfig): any {
    const fieldName = config.fieldName;
    const adapterFunction = config.adapterFunction;
    const mapIncludes = JsonApiParser.getMapIncludes(source, type, adapterFunction);

    if (Utils.isEmptyObject(mapIncludes)) {
      return target;
    }

    const sourceData = source.data;
    if (Utils.isObject(sourceData)) {
      const result = JsonApiParser.findRelations(sourceData, type, mapIncludes);
      if (result) {
        return JsonApiParser.setResult(target, fieldName, result);
      }
    }

    if (Utils.isArray(sourceData)) {
      sourceData.forEach((sourceItem, i) => {
        const result = JsonApiParser.findRelations(sourceItem, type, mapIncludes);
        if (result) {
          target[i] = JsonApiParser.setResult(target[i], fieldName, result);
        }
      });
      return target;
    }
  }

  public static parseMultipleInclude(source: any, target: any, config: TypeConfigMap): any {
    let result = target;
    for (const type in config) {
      if (type in config) {
        result = JsonApiParser.parseSingleInclude(source, target, type, config[type]);
      }
    }
    return result;
  }

  public static parseMultipleIncludeV2(source: any, target: any, config: TypeConfigMap): any {
    const mapIncludes = JsonApiParser.getMapIncludesMultiple(source, config);

    if (Utils.isEmptyObject(mapIncludes)) {
      return target;
    }

    const sourceData = source.data;
    if (Utils.isObject(sourceData)) {
      for (const type in mapIncludes) {
        if (type in mapIncludes) {
          const result = JsonApiParser.findRelations(sourceData, type, mapIncludes);
          if (result) {
            const fieldName = mapIncludes[type].fieldName || null;
            target = JsonApiParser.setResult(target, fieldName, result);
          }
        }
      }
      return target;
    }

    if (Utils.isArray(sourceData)) {
      sourceData.forEach((sourceItem, i) => {
        for (const type in mapIncludes) {
          if (type in mapIncludes) {
            const result = JsonApiParser.findRelations(sourceItem, type, mapIncludes);
            if (result) {
              const fieldName = mapIncludes[type].fieldName || null;
              target[i] = JsonApiParser.setResult(target[i], fieldName, result);
            }
          }
        }
      });
      return target;
    }
  }

  public static getMapIncludes(source, type, adapterFunction?: (data: any) => any | undefined) {
    if (!('included' in source) || !source.included) {
      return {};
    }
    const mapIncludes = {};

    source.included.forEach(item => {
      if (item.type.includes(type)) {
        mapIncludes[item.id] = (adapterFunction && typeof adapterFunction === 'function') ? adapterFunction(item) : item;
      }
    });
    return mapIncludes;
  }

  public static getMapIncludesMultiple(source: any, config: TypeConfigMap) {
    const mapIncludes = {};
    source.included.forEach(item => {
      const typeConfig = Object.keys(config).find(type => item.type.includes(type));
      if (typeConfig) {
        const adapterFunction = config[typeConfig].adapterFunction;
        const setItem = (adapterFunction && typeof adapterFunction === 'function') ? adapterFunction(item) : item;
        if (!mapIncludes.hasOwnProperty('typeConfig')) {
          mapIncludes[typeConfig] = {};
        }
        mapIncludes[typeConfig][item.id] = setItem;
      }
    });
    return mapIncludes;
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
      const relationResult = JsonApiParser.matchRelation(relationData, type, mapIncludes);
      if (relationResult) {
        return relationResult;
      }
    }
  }


  public static matchRelation(relationData, type, mapIncludes) {
    if (Utils.isObject(relationData)) {
      if (!relationData.type.includes(type)) {
        return;
      }
      return mapIncludes[relationData.id];
    }


    if (Utils.isArray(relationData)) {
      const relationArrayResult = [];
      // handler as array for relations
      for (const relationDataItem of relationData) {
        if (relationDataItem.type.includes(type)) {
          return;
        }
        // @ts-ignore
        relationArrayResult.push(mapIncludes[relationDataItem.id]);
      }
      // relationData.forEach((relationDataItem: any) => {
      //   if (!relationDataItem.type.includes(type)) {
      //     console.log('back', type);
      //     return [];
      //   }
      //   console.log('relationDataItem', relationDataItem);
      //   relationArrayResult.push(mapIncludes[relationDataItem.id]);
      //   // console.log('setArray', relationArrayResult);
      // });
      if (relationArrayResult.length === 0) {
        return;
      }
      return relationArrayResult;
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

