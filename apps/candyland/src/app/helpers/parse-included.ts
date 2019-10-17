import Utils from '@cl-helpers/utils';
// tslint:disable
export class ParseIncluded {
  public static setInclude(source: any, target: any, fieldType: string, adapterFunction?: (data: any) => any): any {
    const mapIncludes = Utils.createMapIncludes(source.included, 'id', fieldType);
    if (!Utils.isEmptyObject(mapIncludes)) {
      if (Utils.isObject(source.data)) {
        // implement set includes to object
        if (source.relationships && Utils.isObject(source.relationships[fieldType].data)) {
          // handler as object for relations
          const relation = source.relationships[fieldType].data;
          ParseIncluded.setRelations(relation, target, fieldType, mapIncludes, adapterFunction);
        }

        if (source.relationships && Utils.isArray(source.relationships[fieldType].data)) {
          // handler for array for relations
          if (source.relationships[fieldType].data.lengh === 1) {
            // create relation sa object
            const relation = source.relationships[fieldType].data[0];
            ParseIncluded.setRelations(relation, target, fieldType, mapIncludes, adapterFunction);
            return;
          }

          source.relationships[fieldType].data.forEach((relationsData: any) => {
            if (relationsData.type === fieldType) {
              let include = mapIncludes[relationsData.id];
              include = ParseIncluded.setAdapter(include, adapterFunction);
              ParseIncluded.addRelationAsArray(target, fieldType, include, adapterFunction);
            }
          });
        }
      }

      if (Utils.isArray(source.data)) {
        source.data.forEach((item, i) => {
          if (item.relationships && Utils.isObject(item.relationships[fieldType].data)) {
            // handler as object for relations
            const relation = item.relationships[fieldType].data;
            ParseIncluded.setRelations(relation, target, fieldType, mapIncludes, adapterFunction, i);
          }
          if (item.relationships && Utils.isArray(item.relationships[fieldType].data)) {
            // handler as array for relations
            if (item.relationships[fieldType].data.lengh === 1) {
              // create relation sa object
              const relation = item.relationships[fieldType].data[0];
              ParseIncluded.setRelations(relation, target, fieldType, mapIncludes, adapterFunction, i);
              return;
            }
            item.relationships[fieldType].data.forEach((relationsData: any) => {
              if (relationsData.type === fieldType) {
                let include = mapIncludes[relationsData.id];
                ParseIncluded.addRelationAsArray(target, fieldType, include, adapterFunction, i);
              }
            });
          }
        });
      }
    }
    return target;
  }

  private static setRelations(relation: any, target: any, fieldType: string, mapIncludes: any, adapterFunction: (data: any) => any, i?: any): void {
    // check relation type matches or not
    if (relation.type === fieldType) {
      // get include from existing includes
      let include = mapIncludes[relation.id];
      if (include) {
        include = ParseIncluded.setAdapter(include, adapterFunction);
        if (i) {
          // add include to the target object
          target[i][fieldType] = include;
        }
        target[fieldType] = include;
      }
    }
  }

  private static setAdapter(include: any, adapterFunction: (data: any) => any): void {
    const isFunction = Utils.isFunction(adapterFunction);
    if (isFunction) {
      // transformation relation with transformer
      return adapterFunction(include);
    }
  }

  private static addRelationAsArray(target: any, fieldType: string, include: any, adapterFunction: (data: any) => any, i?: number): void {
    if (i) {
      if (target[i][fieldType] && include) {
        include = ParseIncluded.setAdapter(include, adapterFunction);
        target[i][fieldType].push(include);
      }
      if (!target[i][fieldType] && include) {
        include = ParseIncluded.setAdapter(include, adapterFunction);
        target[i][fieldType] = [include];
      }
      return;
    }
    if (target[fieldType] && include) {
      target[fieldType].push(include);
    }
    if (!target[fieldType] && include) {
      target[fieldType] = [include];
    }
  }
}
