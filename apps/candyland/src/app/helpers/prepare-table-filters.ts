import { OptionConfig } from '@perx/candyshop';

export class PrepareTableFilters {

  public static prepareTabsFilterConfig(counterObject: { [key: string]: number }, data: any[] = null): OptionConfig[] {

    const config: OptionConfig[] = [];

    if (data) {
      config.push({
        title: `All (${data.length})`,
        value: null
      });
    }

    Object.keys(counterObject).forEach((key) => {
      config.push({
        title: `${key} (${counterObject[key]})`,
        value: key
      });
    });
    return config;
  }

  public static prepareOptionsConfig(counterObject: { [key: string]: number }): OptionConfig[] {
    const config: OptionConfig[] = [{
      title: 'All',
      value: null
    }];
    Object.keys(counterObject).forEach((key) => {
      config.push({
        title: key,
        value: key
      });
    });
    return config;
  }

  public static countFieldValue(array: object[], fieldName: string): { [key: string]: number } {
    const counterObject = {};

    if (!array || !Array.isArray(array) || array.length === 0) {
      return counterObject;
    }

    array.forEach(item => {
      if (item === undefined || !(fieldName in item)) {
        return;
      }
      const value = item[fieldName];
      if (value in counterObject) {
        counterObject[value]++;
      } else {
        counterObject[value] = 1;
      }
    });

    return counterObject;
  }

  public static getClientSideFilterFunction(): (data: any, filter: string) => boolean {
    return (item, filterString): boolean => {
      const filters = JSON.parse(filterString);
      return Object.keys(filters)
        .filter((key) => !!filters[key])
        .every((key) => {
          if (item === undefined) {
            return false;
          }
          if (item[key] as string) {
            return item[key].toLocaleLowerCase().includes(filters[key].toLocaleLowerCase());
          }
          // if ('begin' in filters[key] && 'end' in filters[key]) {
          //   if (filters[key].begin) {
          //     const beginCurrent = item.begin.getTime();
          //     const beginFilter = new Date(filters[key].begin).getTime();
          //     if (beginCurrent < beginFilter) {
          //       return false;
          //     }
          //   }
          //   if (filters[key].end) {
          //     const endCurrent = item.end.getTime();
          //     const endFilter = new Date(filters[key].end).getTime();
          //     if (endCurrent > endFilter) {
          //       return false;
          //     }
          //   }
          // }
          return true;
        });
    };
  }

}
