export const enum PMerchantState {
  active = 'active',
  inactive = 'inactive'
}

export interface IPMerchants {
  data: IPMerchantItem[];
  meta: {
    count: number;
    size: number;
    page: number;
    current_page: number;
    per_page: number;
    prev_page: null;
    next_page: null;
    total_pages: number;
    total_count: number;
  };
}

export interface IPPostMerchant {
  name_en: string;
  is_featured: boolean;
  keywords: any[];
  images: any[];
  tag_ids: any[];
  categories: any[];
  labels: any[];
  custom_fields: any[];
}

export interface IPPutMerchant {
  id: number;
  name: string;
  images: any[];
  state: PMerchantState;
  created_at: string;
  tags: any[];
  activatable: boolean;
  deactivatable: true;
  is_featured: boolean;
  categories: any[];
  keywords: any[];
  name_en: string;
  description_en: string;
  custom_fields: any[];
  labels: any[];
  tag_ids: any[];
}

export interface IPPostMerchantResponse {
  data: {
    id: number;
    name: string;
    images: any[];
    state: PMerchantState;
    created_at: string;
    tags: any[];
    activatable: boolean;
    deactivatable: boolean;
    is_featured: boolean;
    categories: any[];
    keywords: any[];
    name_en: string;
    name_th: null;
    name_zh: null;
    description_en: null | string;
    description_th: null;
    description_zh: null;
    url: null;
    ecommerce_only: null;
    custom_fields: any[];
    description: null;
    timezone: null;
    labels: any[];
  };
}

export interface IPMerchantItem {
  id: number;
  name: string;
  images: any[];
  state: PMerchantState;
  created_at: string;
  tags: any[];
  activatable: boolean;
  deactivatable: boolean;
  is_featured: boolean;
  categories: any[];
  keywords: any[];
  name_en: string;
  name_th: null;
  name_zh: null;
  description_en: null | string;
  description_th: null;
  description_zh: null;
}
