import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'distance' })
export class DistancePipe implements PipeTransform {
    public transform(value: number): string {
        if (value < 1000) {
            return `${Math.floor(value / 10) * 10} m`;
        }
        if (value < 5000) {
            return `${Math.floor(value / 100) / 10} km`;
        }
        return `${Math.floor(value / 1000)} km`;
    }
}
