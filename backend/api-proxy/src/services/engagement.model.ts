export interface IEngagement {
  urn: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  image_url: string;
  properties: {};
  display_properties: any;
}

export interface IUpdateEngagement {
  title: string;
  description: string;
  image_url: string;
  properties: {};
  display_properties: any;
}
