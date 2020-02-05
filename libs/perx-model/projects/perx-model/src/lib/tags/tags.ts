export interface IPTags {
  data: IPTag[];
  meta: {
    total_count: number;
    size: number;
    total_pages: number;
    page: number;
  };
}

export interface IPPostTag {
  name: string;
  description: string;
}

export interface IPPostTagResponse {
  data: { id: number; };
}

export interface IPTag {
  id: number;
  name: string;
  state: string;
  description: string;
}
