export interface IPReportDownload {
  report_type: string;
  report_name: string;
  report_action: string;
  report_description: string;
}

export interface IPRefactoredReportDownload extends IPReportDownload {
  filters: IPReportFilter[];
  data_sets: IPReportDataSet[];
}

export interface IPReportFilter {
  label: string;
  key: string;
  type: string;
  default_value: any[];
  example_value: number[];
}

export interface IPReportDataSet {
  label: string;
  key: string;
  included_fields: string[];
  default_value: boolean;
  example_value: boolean;
}

export interface IPBulkAction {
  file_type: string;
  file_name: string;
}

export interface IPTenantConfig {
  tenant: { name: string; };
  scheduled_reports: { report_types: any[]; };
  report_downloads: {
    report_types: IPReportDownload[];
  };
  refactored_report_downloads: IPRefactoredReportDownload[];
  bulk_actions: IPBulkAction[];
  available_locales: {
    locales: string[];
  };
  features: { inventory: boolean, audit_log: boolean };
  currency: string;
}
