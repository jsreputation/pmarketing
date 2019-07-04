export class PrepareTableFilers {

  public static prepareTabsFilterConfig(data, counterObject: { [key: string]: number }): OptionConfig[] {
    const config: OptionConfig[] = [{
      title: 'All (' + data.length + ')',
      value: null
    }];
    Object.values(counterObject).forEach((key) => {
      config.push({
        title: key + ' (' + counterObject[key] + ')',
        value: key.toString()
      });
    });
    return config;
  }

  public static countFieldValue(array: object[], fieldName: string): { [key: string]: number } {
    const counterObject = {};
    array.forEach(item => {
      if (!(fieldName in item)) {
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
          if (item[key] as string) {
            return item[key].toLocaleLowerCase().includes(filters[key].toLocaleLowerCase());
          }
          if ('begin' in filters[key] && 'end' in filters[key]) {
            if (filters[key].begin) {
              const beginCurrent = item.begin.getTime();
              const beginFilter = new Date(filters[key].begin).getTime();
              if (beginCurrent < beginFilter) {
                return false;
              }
            }
            if (filters[key].end) {
              const endCurrent = item.end.getTime();
              const endFilter = new Date(filters[key].end).getTime();
              if (endCurrent > endFilter) {
                return false;
              }
            }
          }
          return true;
        });
    };
  }

}
