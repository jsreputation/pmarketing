import { Pipe, PipeTransform } from '@angular/core';
import { LoyaltyJoinMethodMap } from '@cl-core/models/loyalty/loyalty-joing-method-map';

@Pipe({
  name: 'JoinMethod'
})
export class JoinMethodPipePipe implements PipeTransform {

  public transform(JoinMethods: any): string {
    console.log('joinMethod', JoinMethods);
    const result: string[] = [];
    Object.keys(JoinMethods).forEach(
      (key) => {
        const titleTemplate = LoyaltyJoinMethodMap[key].titleTemplate;
        switch (typeof (titleTemplate)) {
          case 'string':
            result.push(titleTemplate);
            break;
          case 'function':
            const resCallback = titleTemplate(JoinMethods[key]);
            result.push(resCallback);
            break;
        }
      }
    );
    return result.join('\n');
  }

}
