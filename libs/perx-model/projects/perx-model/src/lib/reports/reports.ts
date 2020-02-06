export const enum PReportType {
  rewards = 'rewards',
  vouchers = 'vouchers',
  vouchersSummary = 'vouchers-summary',
  rfRewards = 'rf-rewards'
}

export interface IPReportDownloadDetails {
  report_type: string;
  report_name: string;
  report_action: string;
  report_description: string;
}

export interface IPReportDownload {
  id: number;
  state: string;
  report_type: PReportType;
  report_details: IPReportDownloadDetails[];
  parameters: {
    end: string;
    type: PReportType;
    start: string;
    timezone: string;
    label_ids: any[];
    reward_ids: any[];
    catalog_ids: any[];
    campaign_ids: any[];
    category_ids: any[];
    merchant_ids: any[];
  };
  created_at: string;
  updated_at: string;
}

export interface IPReportDownloads {
  data: IPReportDownload[];
  meta: {
    size: number;
    total_pages: number;
    page: number;
    total_count: number;
  };
}

export interface IPReportScheduleds {
  data: any[];
  meta: {
    count: number;
    size: number;
    page: number;
    current_page: number;
    per_page: number;
    prev_page: null,
    next_page: null,
    total_pages: number;
    total_count: number;
  };
}
