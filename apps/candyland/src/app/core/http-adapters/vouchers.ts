import { JsonApiModelConfig, JsonApiModel, Attribute } from 'angular2-jsonapi';
import { ApiConfig } from '@cl-core/api-config';
// tslint:disable
@JsonApiModelConfig({
  type: ApiConfig.voucherEntitiesPath
})
export class Vouchers extends JsonApiModel {

  @Attribute()
  id: string;
  @Attribute({ serializedName: 'created_at' })
  createdAt: Date;
  @Attribute({ serializedName: 'updated_at' })
  updatedAt: Date;
  @Attribute({ serializedName: 'batch_id' })
  batchId: number;
  @Attribute({ serializedName: 'code' })
  code: string;
  @Attribute({ serializedName: 'status' })
  status: Date;
  @Attribute({ serializedName: 'source_id' })
  sourceId: number;
  @Attribute({ serializedName: 'source_type' })
  sourceType: string;
  @Attribute({ serializedName: 'assigned_to_id' })
  assignedToId: number;
}

