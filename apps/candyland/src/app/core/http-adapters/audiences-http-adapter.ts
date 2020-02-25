import {
  IWAssignedAttributes,
  IWAssignRequestAttributes,
  IWProfileAttributes,
  IWCustomProperties,
  IWAudiences,
  IJsonApiItem,
  IJsonApiPatchData,
  IJsonApiItemPayload,
  IJsonApiPostData,
  IJsonApiListPayload,
  relationshipsDataToArray,
} from '@perx/whistler';

import { SOURCE_TYPE } from '../../app.constants';
import { IAudience, IPools } from '@cl-core/models/audiences/audiences';
import { oc } from 'ts-optchain';
import { ManageListPopupComponentOutput } from 'src/app/audience/containers/manage-list-popup/manage-list-popup.component';
import { IAudiencesUserForm } from '@cl-core/models/audiences/user.interface';
import { ITableData } from '@cl-core/models/data-list.interface';
import { IAudienceVoucher } from '@cl-core/models/vouchers/audience-voucher.interface';

export class AudiencesHttpAdapter {

  public static transformFromUserForm(data: IAudiencesUserForm): IJsonApiPostData<IWProfileAttributes> {
    const optionalPool = data.audienceList ? { relationships: { pools: { data: data.audienceList } } } : {};
    const mainUserApiObject = {
      type: 'users',
      attributes: {
        title: `${data.firstName} ${data.lastName}`,
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phone,
        email_address: data.email,
        properties: AudiencesHttpAdapter.transformCustomProps(data),
      }
    };
    return Object.assign(mainUserApiObject, optionalPool);
  }

  public static transformUpdateUserPools(data: ManageListPopupComponentOutput): IJsonApiPatchData<IWProfileAttributes> {
    return {
      type: 'users',
      id: data.id,
      attributes: {},
      relationships: {
        pools: {
          data: data.pools
        }
      }
    };
  }

  public static transformUserWithPools(data: IJsonApiItemPayload<IWProfileAttributes, IWAudiences>): IAudiencesUserForm {
    const poolMap = AudiencesHttpAdapter.createPoolMap(data.included);
    const userData = AudiencesHttpAdapter.transformUser(data.data);
    userData.audienceList = relationshipsDataToArray(data.data.relationships.pools.data)
      .map((item: IJsonApiItem<IWAudiences>) => poolMap[item.id]);
    return userData;
  }

  public static transformUsersWithPools(data: IJsonApiListPayload<IWProfileAttributes, IWAudiences>): ITableData<IAudiencesUserForm> {
    const poolMap = AudiencesHttpAdapter.createPoolMap(data.included);
    const usersData = data.data.map((item: IJsonApiItem<IWProfileAttributes>) => {
      const formattedUser: IAudiencesUserForm = AudiencesHttpAdapter.transformUser(item);
      formattedUser.audienceList = relationshipsDataToArray(item.relationships.pools.data)
        .map((pool: IJsonApiItem<IWAudiences>) => poolMap[pool.id])
        .filter((v?: string) => v !== undefined)
        .sort();
      return formattedUser;
    });
    return {
      data: usersData,
      meta: data.meta
    };
  }

  public static transformAudiencesTableData(data: IJsonApiListPayload<IWAudiences>): ITableData<IAudience> {
    return {
      data: data.data
        .filter(item => !item.attributes.system_generated) // hide system generated pools
        .map(item => AudiencesHttpAdapter.transformAudiences(item)),
      meta: data.meta
    };
  }

  public static transformAudiencesVoucher(data: IJsonApiItem<IWAssignedAttributes>): Partial<IAudienceVoucher> {
    return {
      id: data.id,
      endDate: data.attributes.valid_to,
      rewardId: data.attributes.source_id.toString(),
      issuedDate: AudiencesHttpAdapter.stringToDate(data.attributes.valid_from),
      expiryDate: AudiencesHttpAdapter.stringToDate(data.attributes.valid_to), status: data.attributes.status
    };
  }

  public static transformVoucherAssignedToApi(source: string, assigned: string): IJsonApiPostData<IWAssignRequestAttributes> {
    return {
      type: 'vouchers',
      attributes: {
        source_id: source,
        source_type: SOURCE_TYPE,
        assigned_to_id: assigned
      }
    };
  }

  public static transformVoucherPatchToApi(id: string, endData: string): IJsonApiPatchData<IWAssignedAttributes> {
    return {
      id,
      type: 'vouchers',
      attributes: {
        valid_to: endData
      }
    };
  }

  private static transformUser(data: IJsonApiItem<IWProfileAttributes>): IAudiencesUserForm {
    return {
      id: data.id,
      firstName: data.attributes.first_name,
      lastName: data.attributes.last_name,
      email: data.attributes.email_address,
      phone: data.attributes.phone_number,
      gender: data.attributes.gender,
      birthday: data.attributes.birthday ? new Date(data.attributes.birthday) : null,
      race: oc(data).attributes.properties.race(),
      country: oc(data).attributes.properties.country(),
      nationality: oc(data).attributes.properties.country(),
      city: oc(data).attributes.properties.city(),
      state: oc(data).attributes.properties.state(),
      audienceList: [],
      file: '',
      pi: data.attributes.primary_identifier
    };
  }

  private static createPoolMap(data?: IJsonApiItem<IWAudiences>[]): IPools {
    const mapPool: IPools = {};
    if (data) {
      data.filter((element: IJsonApiItem<IWAudiences>) => !element.attributes.system_generated)
        .forEach((element: IJsonApiItem<IWAudiences>) => {
          mapPool[element.id] = element.attributes.name;
        });
    }
    return mapPool;
  }

  // Audiences List
  private static transformAudiences(data: IJsonApiItem<IWAudiences>): IAudience {
    return {
      id: data.id,
      updated_at: data.attributes.updated_at,
      name: data.attributes.name,
      users_count: data.attributes.user_count
    };
  }

  private static transformCustomProps(formData: IAudiencesUserForm | null): IWCustomProperties | null {
    if (!formData) {
      return null;
    }

    return {
      gender: formData.gender || null,
      birthday: formData.birthday ? formData.birthday.toString() : null,
      race: formData.race || null,
      country: formData.country || null,
      nationality: formData.nationality || null,
      city: formData.city || null,
      state: formData.state || null,
    };
  }

  // private static transformProps(attributes: IWProfileAttributes | null): IWCustomProperties | null {
  //   if (!attributes) {
  //     return null;
  //   }

  //   const { properties } = attributes;
  //   if (!properties) {
  //     return null;
  //   }

  //   return {
  //     gender: properties.gender || null,
  //     birthday: properties.birthday || null,
  //     race: properties.race || null,
  //     country: properties.country || null,
  //     nationality: properties.nationality || null,
  //     city: properties.city || null,
  //     state: properties.state || null,
  //   };
  // }

  private static stringToDate(stringDate: string | null): Date | null {
    return stringDate ? new Date(stringDate) : null;
  }
}
