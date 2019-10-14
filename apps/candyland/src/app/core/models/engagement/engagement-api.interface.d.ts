declare interface IEngagementApi {
  id?: string;
  type: string;
  links?: {
    self: string;
  };
  attributes: {
    urn?: string;
    created_at?: string;
    updated_at?: string;
    game_type?: string;
    title: string;
    description?: string;
    image_url?: string;
    properties?: {},
    display_properties: {
      title: string;
      sub_title: string;
      tree_img_url?: string;
      gift_box_img_url?: string;
      nb_hanged_gifts?: number;
      banner?: string;
      background_img_url?: string;
      card_background_img_url?: string;
      closed_pinata_img_url?: string;
      opened_pinata_img_url?: string;
      cracking_pinata_img_url?: string;
      pre_scratch_img_url?: string;
      post_scratch_success_img_url?: string;
      post_scratch_fail_img_url?: string;
      pre_stamp_img_url?: string;
      reward_pre_stamp_img_url?: string;
      post_stamp_img_url?: string;
      reward_post_stamp_img_url?: string;
      button?: string,
      lastButtonText?: string,
      fontName?: string;
      fontColor?: string;
      headerColor?: string;
      headerTitle?: string;
      headlineText?: string;
      mainShapeType?: string;
      backgroundColor?: string;
      headerLogoImage?: string;
      subHeadlineText?: string;
      callToActionText?: string;
      loadingHeadlineText?: string;
      loadingSubHeadlineText?: string;
      background?: string;
      cardBackground?: string;
      buttonText?: string;
      nb_of_slots?: number;
      slots?: number[];
    },
    type: string;
  };
  relationships?: {
    campaigns: {
      links: {
        self: string;
        related: string;
      }
    }
  };
}
