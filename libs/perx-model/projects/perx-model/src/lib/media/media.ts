export interface IPCustomImageRatio {
  id: number;
  ratio_description: string;
  image_width: null;
  image_height: null;
  image_section: string;
}

export interface IPCustomImageRatios {
  data: IPCustomImageRatio[];
}

export interface IPCustomImageRatioPutResponse {
  data: { id: number; };
}
