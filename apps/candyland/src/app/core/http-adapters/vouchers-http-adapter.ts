import {
  IWVoucherStatsApi,
  IWVouchersApi,
  IJsonApiItemPayload,
  IJsonApiPostData,
} from '@perx/whistler';

import { SOURCE_TYPE } from '../../app.constants';

export class VouchersHttpAdapter {
  // tslint:disable
  public static transformCreateVoucher(data: IWVouchersApi): IJsonApiPostData<IWVouchersApi> {
    switch (data.code_type) {
      case 'single_code':
        return VouchersHttpAdapter.transformVoucherToApiSingleForm(data);
      case 'system_generated':
        return VouchersHttpAdapter.transformVoucherToApiSystemForm(data);
    }
  }

  public static transformVoucherToApiSingleForm(data: IWVouchersApi): IJsonApiPostData<IWVouchersApi> {
    return {
      type: 'batch',
      attributes: {
        amount: data.amount,
        start_date: data.start_date,
        source_type: SOURCE_TYPE,
        source_id: data.source_id,
        code_type: data.code_type,
        code: data.code
      },
    };
  }

  public static transformVoucherToApiSystemForm(data: IWVouchersApi): IJsonApiPostData<IWVouchersApi> {
    return {
      type: 'batch',
      attributes: {
        amount: data.amount,
        start_date: data.start_date,
        source_type: SOURCE_TYPE,
        source_id: data.source_id,
        code_type: data.code_type,
        prefix: data.prefix,
        length: data.length,
        format_type: data.format_type
      },
    };
  }

  public static transformToVoucherStatsObj(res: IWVoucherStatsApi): { [k: string]: number } {
    const { code, voucher } = res;
    const result = {};

    Object.keys(code)
      .filter(k => k !== 'issued')
      .forEach(k => {
        if (!result[k]) {
          result[k] = 0;
        }
        result[k] += code[k];
      });
    Object.keys(voucher)
      .forEach(k => {
        if (!result[k]) {
          result[k] = 0;
        }
        result[k] += voucher[k];
      });

    return result;
  }
}
