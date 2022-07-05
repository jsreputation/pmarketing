import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor(private translateService: TranslateService) {
  }

  /*
  Generic error message - 0 ERRORS.GENERIC
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
      - 'Team is already completed'
  Unprocessable Error - 41
      - 'User was not invited'
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

  public getErrorMessageByErrorCode(errorCode: number, errMessage?: string, errorHttpStatus?: number): Observable<string> {
    let errorKey = '';
    if (! errorHttpStatus || errorHttpStatus === 400) {
      switch (errorCode) {
        case 4103:
          // API error: 'No rewards available for the specified user due to reward lifetime limit'
          errorKey = 'ERRORS.REWARDS_RUN_OUT';
          break;
        case 4121:
          // API error: 'No remaining unused moves'
          errorKey = 'ERRORS.NO_UNUSED_MOVES';
          break;
        case 40:
          // General API error
          if (errMessage && errMessage.match(/move/i)) {
            errorKey = 'ERRORS.NO_UNUSED_MOVES';
          } else if (errMessage && errMessage.match(/balance/i)) {
            errorKey = 'ERRORS.NOT_ENOUGH_POINTS';
          } else if (errMessage && errMessage.match(/Invalid invitation code/i)) {
            errorKey = 'ERRORS.INVALID_INVITE_CODE';
          } else if (errMessage && errMessage.match(/Team is already completed/i)) {
            errorKey = 'ERRORS.TEAM_FULL';
          }
          break;
        case 41:
          if (errMessage && errMessage.match(/invited/i)) {
            errorKey = 'ERRORS.NOT_INVITED';
          }
          break;
        case 13:
          if (errMessage && errMessage.match(/reservation expired/i)) {
            errorKey = 'ERRORS.RESERVATION_EXPIRED';
          }
          break;
        case 7:
          if (errMessage && errMessage.match(/transition/i)) {
            errorKey = 'ERRORS.STATE_TRANSITION_FAILED';
          }
          break;
        case 0:
        default:
          // Sorry, something went wrong
          errorKey = 'ERRORS.GENERIC';
          break;
      }
    }

    if (errorHttpStatus === 422) {
      if (errMessage?.match(/expire/i)) {
        errorKey = 'ERRORS.RESERVATION_EXPIRED';
      }
      switch (errorCode) {
        case 41:
          // Could not enrol campaign
          if (errMessage?.match(/enrol/i)) {
            errorKey = 'ERRORS.COULD_NOT_ENROL';
          } else if (errMessage?.match(/checkin/i)) {
            errorKey = 'ERRORS.CHECKIN_FAILED';
          }
          break;
        case 800:
          // captcha failed
          errorKey = 'ERRORS.CAPTCHA_INVALID';
          break;
      }
    }

    if (errorHttpStatus === 404) {
      switch (errorCode) {
        case 45:
          if (errMessage?.match(/promo_id/i))
          {
            // bdo promo_id does not exist
            errorKey = 'ERRORS.BDO_PROMO_ID_INVALID';
          }
          break;
        default:
          // Sorry, something went wrong
          errorKey = 'ERRORS.GENERIC';
          break;
      }
    }

    if (errorHttpStatus === 403 ) {
      switch (errorCode) {
        case 9:
          if (errMessage && errMessage.match(/rights to this object/i)) {
            errorKey = 'ERRORS.USER_NOT_ELIGIBLE';
          }
          break;
        default:
          // Sorry, something went wrong
          errorKey = 'ERRORS.GENERIC';
          break;
      }
    }
    return this.translateService.get(errorKey);
  }
}
