import { JsonApiModelConfig, JsonApiModel, Attribute, /* HasMany,*/ BelongsTo } from 'angular2-jsonapi';
import { ApiConfig } from '@cl-core/api-config';
// tslint:disable
@JsonApiModelConfig({
  type: ApiConfig.IAMGroupsPath
})
export class Groups extends JsonApiModel {

  @Attribute()
  id: string;

  @Attribute()
  type: string;

  @Attribute()
  name: string;

  @Attribute({ serializedName: 'created_at' })
  createdAt: Date;

  @Attribute({ serializedName: 'created_at' })
  updatedAt: Date;

  @BelongsTo()
   user: User;
}

@JsonApiModelConfig({
  type: 'users'
})
export class User extends JsonApiModel {

  @Attribute()
  name: string;
}
