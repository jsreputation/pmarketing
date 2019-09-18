import { ApiConfig } from '@cl-core/api-config';
import {
  JsonApiModelConfig,
  JsonApiModel,
  Attribute,
  BelongsTo
} from 'angular2-jsonapi';

// tslint:disable
@JsonApiModelConfig({
  type: ApiConfig.merchantsPath
})
export class Merchant extends JsonApiModel {

  @Attribute()
  id: string;

  @Attribute()
  type: string;

  @Attribute()
  name: string;

  @Attribute({serializedName: 'created_at'})
  createdAt: Date;

  @Attribute()
  properties: object;

  @BelongsTo()
  branches: MerchantBranch;
}


@JsonApiModelConfig({
  type: 'branches'
})
export class MerchantBranch extends JsonApiModel {

  @Attribute()
  id: string;
}
