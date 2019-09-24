export class VouchersHttpAdapter {
    // tslint:disable
    public static transformCreateVoucher(data: any): IVouchersApi {
        switch (data.code_type) {
        case 'single_code':
          return VouchersHttpAdapter.transformVoucherToApiSingleForm(data);
        case 'system_generated':
          return VouchersHttpAdapter.transformVoucherToApiSystemForm(data);
      }
    }
  
    public static transformVoucherToApiSingleForm(data: any): IVouchersApi { 
      return {
        type: 'batch',
        attributes: {
          amount: data.amount,
          start_date: '2019-09-27T10:57:32.114Z',
          source_type: 'Ros::Reward::Entity',
          source_id: data.source_id,
          code_type: data.code_type,
          code: data.code
        },
      };
    }
  
    public static transformVoucherToApiSystemForm(data: any): IVouchersApi { 
      return {
        type: 'batch',
        attributes: {
          amount: data.amount,
          start_date: '2019-09-27T10:57:32.114Z',
          source_type: 'Ros::Reward::Entity',
          source_id: data.source_id,
          code_type: data.code_type,
          prefix: data.prefix,
          length: data.length,
          format_type: data.format_type
        },
      };
    }
}
