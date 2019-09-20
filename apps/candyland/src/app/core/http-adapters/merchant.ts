import { ApiConfig } from '@cl-core/api-config';
import {
  JsonApiModelConfig,
  JsonApiModel,
  Attribute,
  HasMany, BelongsTo
} from 'angular2-jsonapi';

// tslint:disable
@JsonApiModelConfig({
  type: 'orgs',
  baseUrl: `${ApiConfig.merchantsPath}`
})
export class Merchant extends JsonApiModel {

  @Attribute()
  id: string;

  @Attribute()
  type: string;

  @Attribute()
  name: string;

  @Attribute()
  description: string;

  @Attribute({serializedName: 'created_at'})
  createdAt: Date;

  @Attribute()
  properties: object;

  @HasMany()
  branches: MerchantBranch[];
}


@JsonApiModelConfig({
  type: 'branches',
  baseUrl: `${ApiConfig.merchantsPath}`
})
export class MerchantBranch extends JsonApiModel {

  @Attribute()
  id: string;

  @Attribute()
  type: string;

  @Attribute()
  name: string;

  @Attribute()
  properties: object;

  @BelongsTo()
  branches: Merchant;
}
