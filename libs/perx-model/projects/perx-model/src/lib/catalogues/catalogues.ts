export const enum PCatalogueState {
  active = 'active',
  approved = 'approved',
  inactive = 'inactive',
  ended = 'ended'
}

export interface IPCatalogues {
  data: IPCatalogItem[];
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

export interface IPPostCatalogue {
  timezone: string;
  begins_at: string;
}

export interface IPPostCatalogueReponse {
  data: {
    id: number;
    name: null;
    description: null;
    state: PCatalogueState;
    begins_at: string;
    ends_at: null;
    images: any[];
    ordering: number;
    activatable: boolean;
    deactivatable: boolean;
    terms_and_conditions: string;
    og_title: null;
    og_description: null;
    og_image: null;
    al_ios_url: null;
    al_android_url: null;
    og_url: null;
    categories: any[];
    timezone: string;
    custom_fields: any[];
    rewards: any[];
    labels: any[];
    name_en: null;
    name_th: null;
    name_zh: null;
    description_en: null;
    description_th: null;
    description_zh: null;
    terms_and_conditions_en: null;
    terms_and_conditions_th: null;
    terms_and_conditions_zh: null;
    tags: any[];
  };
}

export interface IPCatalogItem {
  id: number;
  name: null;
  description: null;
  state: PCatalogueState;
  begins_at: string;
  ends_at: null;
  images: any[];
  ordering: number;
  activatable: boolean;
  deactivatable: true;
  terms_and_conditions: string;
  og_title: null;
  og_description: null;
  og_image: null;
  al_ios_url: null;
  al_android_url: null;
  og_url: null;
  categories: any[];
  tags: any[];
}

export interface IPPutCatalog {
  id: number;
  name: null;
  description: null;
  state: PCatalogueState;
  begins_at: string;
  ends_at: null;
  images: any[];
  ordering: number;
  activatable: boolean;
  deactivatable: true;
  terms_and_conditions: string;
  og_title: null;
  og_description: null;
  og_image: null;
  al_ios_url: null;
  al_android_url: null;
  og_url: null;
  categories: any[];
  timezone: string;
  custom_fields: any[];
  rewards: any[];
  labels: any[];
  name_en: string;
  name_th: null;
  name_zh: null;
  description_en: null;
  description_th: null;
  description_zh: null;
  terms_and_conditions_en: string;
  terms_and_conditions_th: null;
  terms_and_conditions_zh: null;
  tags: any[];
}
