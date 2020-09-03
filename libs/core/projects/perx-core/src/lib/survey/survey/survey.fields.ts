import { FormlyFieldConfig } from '@ngx-formly/core';

// testing mock
export const fields: FormlyFieldConfig[] = [
  {
    type: 'stepper',
    fieldGroup: [ // entire thing hwere is what i seek to replace
      {
        templateOptions: {
          // set key here for nested objt
          label: 'First Cluster',
          description: 'paabbaa',
          required: true,
        },
        fieldGroup: [ // allows to add multiple question then will set the overflow container stuff, looks like one page one qn atm
          {
            key: 'pic-survey-select',
            type: 'pic-survey-select',
            templateOptions: {
              type: 'array',
              // color: 'primary',
              required: true,
              // multiple: true, // read this to toggle radio or check
              options: [
                {
                  label: 'https://cdn.perxtech.io/model_image/source/363/test2-72567a44-056d-43fd-bbeb-e1e316ed9842.jpg',
                  value: 'dog'
                },
                {
                  label: 'https://cdn.perxtech.io/model_image/source/363/test2-72567a44-056d-43fd-bbeb-e1e316ed9842.jpg',
                  value: 'cat'
                },
                {
                  label: 'https://cdn.perxtech.io/model_image/source/363/test2-72567a44-056d-43fd-bbeb-e1e316ed9842.jpg',
                  value: 'docsddg'
                }
              ]
            }
          },
        ]
      },
      {
        templateOptions: { label: 'Second Cluster'},
        fieldGroup: [
          {
            key: 'input',
            type: 'input',
            templateOptions: {
              label: 'Input 2',
              placeholder: 'Input placeholder',
              required: true,
            }
          },
        ]
      },
      {
        templateOptions: {
          label: 'Third Cluster',
          description: 'paabbaa',
          required: true,
        },
        fieldGroup: [ // allows to add multiple question then will set the overflow container stuff, looks like one page one qn atm
          {
            key: 'select',
            type: 'survey-select',
            templateOptions: {
              type: 'array',
              label: 'Input',
              color: 'primary',
              placeholder: 'Input placeholder',
              required: true,
              options: [
                {
                  label: 'TEST1',
                  value: 'dog'
                },
                {
                  label: 'TEST2',
                  value: 'cat'
                },
                {
                  label: 'TEST3',
                  value: 'fish'
                }
              ]
            }
          },
        ]
      },
    ]
  }
];
