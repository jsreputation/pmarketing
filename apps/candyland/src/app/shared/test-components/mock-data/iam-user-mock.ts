import { IAMUser } from '@cl-core/models/auth/IAMUser.interface';

export const IAMUserMock: IAMUser = {
  id: '1',
  type: 'users',
  links: 'http://api-dev1.uat.whistler.perxtech.io/users/1',
  urn: 'urn:perx:iam::777777777:user/Admin',
  created_at: '2019-12-10T12:42:37.374Z',
  update_at: '2019-12-10T12:42:37.374Z',
  username: 'Admin',
  api: true,
  console: true,
  time_zone: 'Asia/Singapore',
  properties: {},
  display_properties: {},
  jwt_payload_iss: '11111111',
  jwt_payload_sub: 'urn:perx:iam::777777777:user/Admin',
  attached_policies: { AdministratorAccess: 1 },
  relationships_groups_id: 1, email: 'admin@example.com'
};
