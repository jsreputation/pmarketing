import Utils from '@cl-helpers/utils';
// tslint:disable
export class ParseIncluded {
  public static setInclude(source: any, target: any, type: string, fieldName: string | null = null, adapterFunction?: (data: any) => any): any {
    const mapIncludes = Utils.createMapIncludes(source.included, 'id', type);
    type = type.slice(0, -1);
    if (!Utils.isEmptyObject(mapIncludes)) {
      if (Utils.isObject(source.data)) {
        // implement set includes to object
        if (source.relationships && Utils.isObject(source.relationships[type].data)) {
          // handler as object for relations
          const relation = source.relationships[type].data;
          ParseIncluded.setRelations(relation, target, mapIncludes, adapterFunction, fieldName, null);
        }

        if (source.relationships && Utils.isArray(source.relationships[type].data)) {
          // handler for array for relations
          if (source.relationships[type].data.lengh === 1) {
            // create relation sa object
            const relation = source.relationships[type].data[0];
            ParseIncluded.setRelations(relation, target, mapIncludes, adapterFunction, fieldName, null);
            return;
          }

          source.relationships[type].data.forEach((relationsData: any) => {
            // if (relationsData.type === type) {
              let included = mapIncludes[relationsData.id];
              included = ParseIncluded.setAdapter(included, adapterFunction);
              ParseIncluded.addRelationAsArray(target, included, adapterFunction, fieldName);
            // }
          });
        }
      }

      if (Utils.isArray(source.data)) {
        source.data.forEach((item, i) => {
          if (item.relationships && Utils.isObject(item.relationships[type].data)) {
            // handler as object for relations
            const relation = item.relationships[type].data;
            ParseIncluded.setRelations(relation, target, mapIncludes, adapterFunction, fieldName, i);
          }
          if (item.relationships && Utils.isArray(item.relationships[type].data)) {
            // handler as array for relations
            if (item.relationships[type].data.lengh === 1) {
              // create relation sa object
              const relation = item.relationships[type].data[0];
              ParseIncluded.setRelations(relation, target, mapIncludes, adapterFunction, fieldName, i);
              return;
            }
            item.relationships[type].data.forEach((relationsData: any) => {
              if (relationsData.type === type) {
                let included = mapIncludes[relationsData.id];
                ParseIncluded.addRelationAsArray(target, included, adapterFunction, fieldName, i);
              }
            });
          }
        });
      }
    }
    return target;
  }

  private static setRelations(relation: any, target: any, mapIncludes: any, adapterFunction: (data: any) => any, fieldName, i?: any): void {
    // check relation type matches or not
    // if (relation.type === type) {
      // get included from existing includeds
      let included = mapIncludes[relation.id];
      if (included) {
        included = ParseIncluded.setAdapter(included, adapterFunction);
        if (i) {
          // add included to the target object
          if (!fieldName) {
            return console.error('Array have to have field Name');
          }
          target[i][fieldName] = included;
        }
        if (!fieldName) {
          target = {
            ...target,
            ...included
          };
        } else {
          target[fieldName] = included;
        }
      }
    // }
  }

  private static setAdapter(included: any, adapterFunction: (data: any) => any): void {
    const isFunction = Utils.isFunction(adapterFunction);
    if (isFunction) {
      // transformation relation with transformer
      return adapterFunction(included);
    }
  }

  private static addRelationAsArray(target: any, included: any, adapterFunction: (data: any) => any, fieldName, i?: number): void {
    if (!fieldName) {
      return console.error('Array have to have field Name');
    }
    if (i) {
      if (target[i][fieldName] && included) {
        included = ParseIncluded.setAdapter(included, adapterFunction);
        target[i][fieldName].push(included);
      }
      if (!target[i][fieldName] && included) {
        included = ParseIncluded.setAdapter(included, adapterFunction);
        target[i][fieldName] = [included];
      }
      return;
    }
    if (target[fieldName] && included) {
      target[fieldName].push(included);
    }
    if (!target[fieldName] && included) {
      target[fieldName] = [included];
    }
  }
}
