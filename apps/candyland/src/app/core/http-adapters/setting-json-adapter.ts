import { JsonApiModelConfig, JsonApiModel, Attribute, /* HasMany, BelongsTo*/ } from 'angular2-jsonapi';
// tslint:disable
@JsonApiModelConfig({
  type: 'tenants'
})
export class Tenants extends JsonApiModel {

  @Attribute()
  name: string;

  @Attribute({ serializedName: 'created_at' })
  createdAt: Date;

  @Attribute({ serializedName: 'created_at' })
  updatedAt: Date;
  @Attribute({ serializedName: 'account_id' })
  accountId: string;
  @Attribute({ serializedName: 'root_id' })
  rootId: string;

  @Attribute()
  properties: {
    "time_zone": string,
    "theme.color": string,
    "currency": any,
    "theme.style": string
  };
}

