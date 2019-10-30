import { IVoucherStatsApi, IVouchersApi } from '@perx/whistler';

export class VouchersHttpAdapter {
  // tslint:disable
  public static transformCreateVoucher(data: any): IJsonApiItem<IVouchersApi> {
    switch (data.code_type) {
      case 'single_code':
        return VouchersHttpAdapter.transformVoucherToApiSingleForm(data);
      case 'system_generated':
        return VouchersHttpAdapter.transformVoucherToApiSystemForm(data);
    }
  }

  public static transformVoucherToApiSingleForm(data: IVouchersApi): IJsonApiItem<IVouchersApi> {
    return {
      type: 'batch',
      attributes: {
        amount: data.amount,
        start_date: data.start_date,
        source_type: 'Ros::Reward::Entity',
        source_id: data.source_id,
        code_type: data.code_type,
        code: data.code
      },
    };
  }

  public static transformVoucherToApiSystemForm(data: IVouchersApi): IJsonApiItem<IVouchersApi> {
    return {
      type: 'batch',
      attributes: {
        amount: data.amount,
        start_date: data.start_date,
        source_type: 'Ros::Reward::Entity',
        source_id: data.source_id,
        code_type: data.code_type,
        prefix: data.prefix,
        length: data.length,
        format_type: data.format_type
      },
    };
  }

  public static transformToVoucherStatsObj(res: IJsonApiPayload<IVoucherStatsApi>): { [k: string]: number } {
    const { code, voucher } = res.data.attributes;
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
