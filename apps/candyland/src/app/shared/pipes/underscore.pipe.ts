import { Pipe, PipeTransform } from '@angular/core';

// also appends CAMPAIGN to the front
@Pipe({name: 'replaceSpaceWithScore'})
export class ReplaceSpaceScorePipe implements PipeTransform {
  public transform(value: string): string {
    return 'CAMPAIGN.GameFilters.' + (value ? value.replace(/ /g, '_') : value).toUpperCase();
  }
}
