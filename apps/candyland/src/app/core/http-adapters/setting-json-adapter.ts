import { JsonApiModelConfig, JsonApiModel, Attribute, /* HasMany, BelongsTo*/ } from 'angular2-jsonapi';
import { ApiConfig } from '@cl-core/api-config';

interface AccountPageObject {
  title: string;
  content_url: string;
  key: string;
}
interface PagesObject {
  pages: AccountPageObject[];
}
// tslint:disable
@JsonApiModelConfig({
  type: 'tenants',
  baseUrl: ApiConfig.baseAPIPath
})
export class Tenants extends JsonApiModel {

  @Attribute()
  name: string;

  @Attribute({ serializedName: 'created_at' })
  createdAt: Date;

  @Attribute({ serializedName: 'updated_at' })
  updatedAt: Date;
  @Attribute({ serializedName: 'account_id' })
  accountId: string;
  @Attribute({ serializedName: 'root_id' })
  rootId: string;

  @Attribute()
  display_properties: {
    "time_zone": string,
    "theme.color": string,
    "currency": string,
    "theme.style": string,
    "theme.accent": string,
    "theme.button_text_color": string,
    "theme.button_background_color": string,
    "theme.font": string,
    "theme.header_color": string,
    "theme.logo": string,
    "theme.primary": string,
    "theme.title": string,
    "account": PagesObject,
    campaign_base_url: string,
  };
}

