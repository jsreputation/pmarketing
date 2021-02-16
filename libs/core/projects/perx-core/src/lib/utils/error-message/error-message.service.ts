import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorMessageService {

    constructor(private translateService: TranslateService) { }

    /*
    InvalidTransaction -  4121
        - 'No remaining unused moves'
    GeneralError - 40
        - 'Campaign is not active.'
        - 'Invalid Campaign Dates.'
        - 'Invalid Campaign Type.'
        - 'User is not enrolled to the campaign'
        - 'User Account is not in audience'
        - 'User does not have membership for this loyalty program'
        - 'User remaining point is already 0'
        - 'You do not have enough points to redeem'
        - 'Direct issuing of System Reward'
        - 'Automation Outcome issuing non-system Reward'
        - 'Reward price is not a part of the reward'
        - 'User is not a enrolled loyalty member'
        - 'User does not have enough points balance'
        - 'Merchant location is not a part of the reward'
    UserMembershipExpired - 53
        - 'Points cannot be issued or deducted as user membership has expired'
    AccessForbidden - 44
        - 'Please contact your administrator.'
    LoyaltyNoValueError - 522
        - 'No points value given'
    NoMoreRewards - 412
        - 'No more rewards'
    UserNotFound - 1
        - 'user-id was not found in our database'
    InactiveUser - 4220
        - 'User is inactive.'
    InvalidRewardId - 12
        - 'Reward ID is invalid'
    RewardNotActive - 20
        'Reward is not active'
    RewardOutsideDates - 21
        - 'Reward selling_from is future dated'
    InvalidTransactionExpiresAt - 31
        - 'The reward transaction expiration is invalid'
    UserForbidden - 9
        - 'User does not have rights to this object'
    NoRewardsAvailable - 4103
        - 'No rewards available for the specified user due to reward lifetime limit'
    NoVoucherCodeAvailable - 5001
        - 'A voucher code could not be assigned for this transaction'
    */

    public getErrorMessageByErrorCode(errorCode: number): Observable<string> {
        let errorKey = '';
        switch (errorCode) {
            case 4103:
                // API error: 'No rewards available for the specified user due to reward lifetime limit'
                errorKey = 'ERRORS.REWARDS_RUN_OUT';
                break;
            case 4121:
                // API error: 'No remaining unused moves'
                errorKey = 'ERRORS.NO_UNUSED_MOVES';
                break;
            default:
                // Sorry, something went wrong
                errorKey = 'ERRORS.GENERIC';
                break;
        }
        return this.translateService.get(errorKey);
    }
}
