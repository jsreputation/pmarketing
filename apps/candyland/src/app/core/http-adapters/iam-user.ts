import { JsonApiModelConfig, JsonApiModel, Attribute, /* HasMany, BelongsTo*/ } from 'angular2-jsonapi';
import { ApiConfig } from '@cl-core/api-config';
// tslint:disable
@JsonApiModelConfig({
  type: ApiConfig.IAMUsersPath
})
export class IamUser extends JsonApiModel {

  @Attribute()
  id: string;

  @Attribute()
  type: string;

  @Attribute()
  username: string;

  @Attribute()
  api: string;

  @Attribute({ serializedName: 'time_zone' })
  timeZone: string;

  @Attribute({ serializedName: 'created_at' })
  createdAt: Date;

  @Attribute({ serializedName: 'created_at' })
  updatedAt: Date;

  // @BelongsTo()
  //  user: User;

  // @HasMany()
  // comments: Comment[];
}

//
// @JsonApiModelConfig({
//   type: 'comments'
// })
// export class Comment extends JsonApiModel {
//
//   @Attribute()
//   title: string;
//
//   @Attribute()
//   created_at: Date;
//
//   @BelongsTo()
//   post: Post;
//
//   @BelongsTo()
//   user: User;
// }
//
// @JsonApiModelConfig({
//   type: 'users'
// })
// export class User extends JsonApiModel {
//
//   @Attribute()
//   name: string;
// }
