export class PrepareTableFilers {

  public static prepareTabsFilterConfig(data, counterObject: { [key: string]: number }): OptionConfig[] {
    const config: OptionConfig[] = [{
      title: 'All (' + data.length + ')',
      value: null
    }];
    for (const key in counterObject) {
      config.push({
        title: key + ' (' + counterObject[key] + ')',
        value: key
      });
    }
    return config;
  }

  public static countFieldValue(array: Object[], fieldName: string): { [key: string]: number } {
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
            const beginCurrent = item.begin.getTime() || 0;
            const beginFilter = new Date(filters[key].begin).getTime() || 0;
            const endCurrent = item.end.getTime() || 0;
            const endFilter = new Date(filters[key].end).getTime() || 0;
            return beginCurrent >= beginFilter && endCurrent <= endFilter;
          }
          return true;
        });
    };
  }

}
