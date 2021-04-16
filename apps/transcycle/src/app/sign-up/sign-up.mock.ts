import { ISignUpData } from '@perxtech/core';

export const transcycleSignUpDataMock: ISignUpData = {
  lastName: 'Doe',
  birthDay: '2021-04-06T00:00:00+08:00', // ISO date
  identifier: '1',
  phone: '22',
  password: 'pass',
  passwordConfirmation: 'pass',
  customProperties: {
    engine_number: '1ENG'
  }
};
