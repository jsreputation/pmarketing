import { IProfile, ILoyalty, ITransaction } from '@perx/core';

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

export const mockTransactions: ITransaction[] = [
    {
        id: 92213,
        name: null,
        earnedDate: '2019-05-30T10:24:01.738Z',
        points: 10,
        pointsBalance: 10,
        currencyBalance: 100,
        properties: {}
    },
    {
        id: 92188,
        name: null,
        earnedDate: '2019-04-24T07:53:28.310Z',
        points: 100000000,
        pointsBalance: 100000000,
        currencyBalance: 1000000000,
        properties: {}
    },
    {
        id: 92187,
        name: null,
        earnedDate: '2019-04-24T07:53:18.047Z',
        points: 1000,
        pointsBalance: 1000,
        currencyBalance: 10000,
        properties: {}
    },
    {
        id: 92186,
        name: null,
        earnedDate: '2019-04-22T10:43:44.642Z',
        points: 260,
        pointsBalance: 260,
        currencyBalance: 2600,
        properties: {}
    },
    {
        id: 92185,
        name: null,
        earnedDate: '2019-04-22T10:43:07.455Z',
        points: 200,
        pointsBalance: 200,
        currencyBalance: 2000,
        properties: {}
    },
    {
        id: 92184,
        name: null,
        earnedDate: '2019-04-22T10:42:43.539Z',
        points: 100,
        pointsBalance: 100,
        currencyBalance: 1000,
        properties: {}
    }
];
