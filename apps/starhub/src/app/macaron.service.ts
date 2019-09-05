import { Injectable } from '@angular/core';
import { IReward } from '@perx/core';

interface IMacaron {
    label: string;
    class: string;
}

@Injectable({
    providedIn: 'root'
})
class MacaronService {
    public getMacaron(reward: IReward): IMacaron | null {
        const nowTime: number = (new Date()).getTime();
        if (reward.sellingFrom && reward.sellingFrom.getTime() < nowTime) {
            return {
                label: 'Coming Soon',
                class: 'coming-soon'
            };
        }
        const inventory: number = 1; /* todo replace with inventory level check */
        if (inventory === 0) {
            return {
                label: 'Fully redeemed',
                class: 'fully-redeemed'
            };
        }

        if (reward.validTo && reward.validTo.getTime() < nowTime) {
            return {
                label: 'Expired',
                class: 'expired'
            };
        }

        // Low inventory (<10%)
        if (inventory < 0.1) {
            return {
                label: 'Running Out',
                class: 'running-out'
            };
        }

        const thirtySixHours = 36 * 60 * 1000;
        if (reward.validTo && (reward.validTo.getTime() - nowTime) < thirtySixHours) {
            return {
                label: 'Expiring Soon',
                class: 'expiring'
            };
        }
        const seventyTwoHours = 72 * 60 * 1000;
        if (reward.sellingFrom && (seventyTwoHours - reward.sellingFrom.getTime())) {
            return {
                label: 'Just Added',
                class: 'just-added'
            };
        }
        return null;
    }
}
