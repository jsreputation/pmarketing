export interface ITenantAttributes {
  urn: string;
  created_at: string;
  updated_at: string;
  account_id: number;
  root_id: number;
  alias: string;
  name: string;
  display_properties: {
      account: {
          pages: [
              {
                  key: string;
                  title: string;
                  content_url: string;
              },
              {
                  key: string;
                  title: string;
                  content_url: string;
              }
          ]
      };
      currency: string;
      time_zone: number,
      'theme.logo': string;
      'theme.font': string;
      'theme.style': string;
      'theme.title': string;
      'theme.accent': string;
      'theme.primary': string;
      'campaign_base_url': string;
      'theme.header_color': string;
      'theme.button_text_color': {
          color: string;
          labelView: string;
      },
      'theme.button_background_color': string;
  };
}
