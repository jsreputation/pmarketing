declare interface IEngagement {
  id: number;
  type: string;
  links: {
    self: string;
  };
  attributes: {
    urn: string;
    created_at: string;
    updated_at: string;
    game_type: string;
    title: string;
    description: string;
    image_url: string;
    properties: {},
    display_properties: {
      fontName: string;
      fontColor: string;
      headerColor: string;
      headerTitle: string;
      headlineText: string;
      mainShapeType: string;
      backgroundColor: string;
      headerLogoImage: string;
      subHeadlineText: string;
      callToActionText: string;
      loadingHeadlineText: string;
      loadingSubHeadlineText: string;
      background: string;
      cardBackground: string;
      buttonText?: string;
      nb_of_slots?: number;
      slots?: number[];
    },
    type: string;
  };
  relationships: {
    campaigns: {
      links: {
        self: string;
        related: string;
      }
    }
  };
}
