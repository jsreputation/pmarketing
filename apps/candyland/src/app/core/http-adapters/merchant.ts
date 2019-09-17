import {
  JsonApiModelConfig,
  JsonApiModel,
  Attribute, /* HasMany,*/
  BelongsTo
} from 'angular2-jsonapi';

// tslint:disable
@JsonApiModelConfig({
  type: ''
})
export class Merchant extends JsonApiModel {

  // id: string;
  // logo: string;
  // phone?: string;
  // dateCreated?: string;

  @Attribute()
  id: string;

  @Attribute()
  type: string;

  @Attribute()
  name: string;

  @Attribute({serializedName: 'created_at'})
  createdAt: Date;

  @Attribute({serializedName: 'created_at'})
  updatedAt: Date;

  @Attribute()
  properties: object;

  @BelongsTo()
  branches: Branch;

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
@JsonApiModelConfig({
  type: 'branches'
})
export class Branch extends JsonApiModel {

  @Attribute()
  id: string;
}
