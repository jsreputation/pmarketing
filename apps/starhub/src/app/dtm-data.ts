export interface IdataLayerSH {
    pageName: string;
    channel?: string;
    pageType: string;
    siteSectionLevel1: string;
    siteSectionLevel2: string;
    siteSectionLevel3: string;
    hubID?: string;
    loginStatus: boolean;
}

export const analyticsVariables: { [key: string]: IdataLayerSH } = {
    'home/discover': {
        pageName: 'rewards:discover',
        pageType: 'landing page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:discover',
        siteSectionLevel3: 'rewards:discover',
        loginStatus: true
    },
    'home/vouchers': {
        pageName: 'rewards:vouchers',
        pageType: 'landing page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:vouchers',
        siteSectionLevel3: 'rewards:vouchers',
        loginStatus: true
    },
    category: {
        pageName: 'rewards:discover:<category_name>',
        pageType: 'section landing',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:discover',
        siteSectionLevel3: 'rewards:discover:<category_name>',
        loginStatus: true
    },
    reward: {
        pageName: 'rewards:discover:<category_name>:<reward_name>',
        pageType: 'detail page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:discover',
        siteSectionLevel3: 'rewards:discover:<category_name>',
        loginStatus: true
    },
    voucher: {
        pageName: 'rewards:vouchers:<category_name>:<voucher_name>',
        pageType: 'detail page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:vouchers',
        siteSectionLevel3: 'rewards:vouchers:<category_name>',
        loginStatus: true
    },
    locations: {
        pageName: 'rewards:discover:locations:<category_name>:<reward_name>',
        pageType: 'detail page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:reward',
        siteSectionLevel3: 'rewards:discover:locations',
        loginStatus: true
    },
    tnc: {
        pageName: 'rewards:vouchers:tnc:<category_name>:<reward_name>',
        pageType: 'detail page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:reward',
        siteSectionLevel3: 'rewards:vouchers:tnc',
        loginStatus: true
    },
    redemption: {
        pageName: 'rewards:vouchers:redemption:<category_name>:<reward_name>',
        pageType: 'detail page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:voucher',
        siteSectionLevel3: 'rewards:vouchers:redemption',
        loginStatus: true
    },
    game: {
        pageName: 'rewards:game',
        pageType: 'static',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:game',
        siteSectionLevel3: 'rewards:game',
        loginStatus: true
    },
    congrats: {
        pageName: 'rewards:game:congrats',
        pageType: 'static',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:game',
        siteSectionLevel3: 'rewards:game:congrats',
        loginStatus: true
    },
    popup: {
        pageName: '<current_page_name>:<popup_title>',
        pageType: 'overlay',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: '<current_page_site_section_level 2>',
        siteSectionLevel3: '<current_page_site_section_level_3>',
        loginStatus: true
    },
    error:
    {
        pageName: 'rewards:error',
        pageType: 'error page',
        siteSectionLevel1: 'rewards',
        siteSectionLevel2: 'rewards:error',
        siteSectionLevel3: 'rewards:error',
        loginStatus: true
    }
};
