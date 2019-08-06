import { IProfile, ILoyalty } from '@perx/core';

export const mockProfile: IProfile = {
    id: 952,
    state: 'active',
    firstName: 'Lucas',
    lastName: 'Xavier',
    middleName: 'Catherine',
    phone: '1111111111',
    email: 'lucas@perxtech.com',
    birthDate: '',
    gender: 'male',
    joinedDate: '2018-10-31T00:00:00.000Z',
    passwordExpiryDate: '2019-09-01T08:35:13.801Z',
    customProperties: {
        mi: 'A',
        city: 'PASIG CITY',
        home: '',
        work: '',
        addr1: 'Blk 1A street 13',
        gender: 'Female',
        company: '',
        barangay: 'CHRISTINE VILL',
        birthday: '19900317',
        lastname: 'Xavier',
        mobileno: '1111111111',
        firstname: 'ARTEMIO',
        spouse_mi: '',
        cardnumber: '123123123123',
        last_visit: '20181031',
        branch_code: '11008',
        branch_name: 'CAINTA 1',
        customer_id: '8010111109440',
        total_visit: '2',
        civil_status: 'SINGLE',
        company_code: '2',
        spouse_first: '',
        email_address: '',
        spouse_lastname: '',
        application_date: '20181031',
        digital_cardnumber: '8720561141910783'
    }
};

export const mockLoyalty: ILoyalty = {
    id: 1,
    name: 'Abenson PLUS Card Program Demo',
    description: 'test',
    beginDate: '2018-11-16T11:24:51.000Z',
    endDate: '',
    membershipTierName: 'Y',
    membershipIdentifier: '1',
    pointsBalance: 91000772,
    currencyBalance: 910007720,
    currency: 'PHP',
    expiringPoints: [
        {
            expireDate: '',
            points: 0
        }
    ]
};
