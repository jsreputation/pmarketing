export class PrepareTableFilers {

  public static prepareTabsFilterConfig(data, counterObject: { [key: string]: number }): OptionConfig[] {
    const config: OptionConfig[] = [{
      title: 'All(' + data.length + ')',
      value: null
    }];
    for (const key in counterObject) {
      config.push({
        title: key + '(' + counterObject[key] + ')',
        value: key
      })
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
        counterObject[value]++
      } else {
        counterObject[value] = 1;
      }
    });
    return counterObject;
  }

  public static getClientSideFilterFunction(): (data: any, filter: string) => boolean {
    return (data, filter): boolean => {
      const searchTerms = JSON.parse(filter);
      for (const key in searchTerms) {
        if (key in searchTerms &&
          searchTerms[key] !== null &&
          key in data &&
          !data[key].toLowerCase().includes(searchTerms[key].toLowerCase())
        ) {
          return false;
        }
      }
      return true;
    };
  }

}
