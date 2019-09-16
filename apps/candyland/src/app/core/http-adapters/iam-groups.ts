import { JsonApiModelConfig, JsonApiModel, Attribute, /* HasMany,*/ BelongsTo } from 'angular2-jsonapi';
// tslint:disable
@JsonApiModelConfig({
  type: 'groups'
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
