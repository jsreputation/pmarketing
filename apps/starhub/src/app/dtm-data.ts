export const analyticsVariables: any = [
    {
        screen: 'home/discover',
        pageName: 'rewards:discover',
        pageType: 'landing page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:discover',
        siteSectionLevel3: 'rewards:discover',
        loginStatus: 'true'
    },
    {
        screen: 'home/vouchers',
        pageName: 'rewards:vouchers',
        pageType: 'landing page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:vouchers',
        siteSectionLevel3: 'rewards:vouchers',
        loginStatus: 'true'
    },
    {
        screen: 'category',
        pageName: 'rewards:discover:<category_name>',
        pageType: 'section landing',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:discover',
        siteSectionLevel3: 'rewards:discover:<category_name>',
        loginStatus: 'true'
    },
    {
        screen: 'reward',
        pageName: 'rewards:discover:<category_name>:<reward_name>',
        pageType: 'detail page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:discover',
        siteSectionLevel3: 'rewards:discover:<category_name>',
        loginStatus: 'true'
    },
    {
        screen: 'voucher',
        pageName: 'rewards:vouchers:<category_name>:<voucher_name>',
        pageType: 'detail page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:vouchers',
        siteSectionLevel3: 'rewards:vouchers:<category_name>',
        loginStatus: 'true'
    },
    {
        screen: 'locations',
        pageName: 'rewards:discover:locations:<category_name>:<reward_name>',
        pageType: 'detail page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:reward',
        siteSectionLevel3: 'rewards:discover:locations',
        loginStatus: 'true'
    },
    {
        screen: 'tnc',
        pageName: 'rewards:vouchers:tnc:<category_name>:<reward_name>',
        pageType: 'detail page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:reward',
        siteSectionLevel3: 'rewards:vouchers:tnc',
        loginStatus: 'true'
    },
    {
        screen: 'redemption',
        pageName: 'rewards:vouchers:redemption:<category_name>:<reward_name>',
        pageType: 'detail page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:voucher',
        siteSectionLevel3: 'rewards:vouchers:redemption',
        loginStatus: 'true'
    },
    {
        screen: 'game',
        pageName: 'rewards:game',
        pageType: 'static',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:game',
        siteSectionLevel3: 'rewards:game',
        loginStatus: 'true'
    },
    {
        screen: 'congrats',
        pageName: 'rewards:game:congrats',
        pageType: 'static',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:game',
        siteSectionLevel3: 'rewards:game:congrats',
        loginStatus: 'true'
    },
    {
        screen: 'popup',
        pageName: '<current_page_name>:<popup_title>',
        pageType: 'overlay',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: '<current_page_site_section_level 2>',
        siteSectionLevel3: '<current_page_site_section_level_3>',
        loginStatus: 'true'
    },
    {
        screen: 'error',
        pageName: 'rewards:error',
        pageType: 'error page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:error',
        siteSectionLevel3: 'rewards:error',
        loginStatus: 'true'
    }
];
