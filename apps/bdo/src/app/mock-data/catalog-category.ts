import { CategoryModel } from "../models/category.model";

export const LIST_CATALOG_CATEGORIES: CategoryModel[]= [
    {
        id:1,
        code:"bdoRewards",
        title:"BDO REWARDS",
        subCategories:[
            {
                code:"emerald",
                label:"Emerald",
                linkImage:"assets/images/emerald-default.svg",
                linkImageSelected:"assets/images/emerald-selected.svg",
            },
            {
                code:"sapphire",
                label:"Sapphire",
                linkImage:"assets/images/sapphire-default.svg",
                linkImageSelected:"assets/images/sapphire-selected.svg",
            },
            {
                code:"diamond",
                label:"Diamond",
                linkImage:"assets/images/diamond-default.svg",
                linkImageSelected:"assets/images/diamond-selected.svg"
            }
        ]
    },
    {
        id:2,
        code:"debitCard",
        title:"DEBIT CARD",
        subCategories:[
            {
                code:"cardExclusives",
                label:"Card Exclusives",
                linkImage:"assets/images/creditcards-enclosed-outline-fullcolor.svg",
                linkImageSelected:"assets/images/creditcards-enclosed-filled-fullcolor.svg",
                cardType: [
                    {
                        code:"master",
                        label:"Mastercard",
                        linkImage:"assets/images/mc-default.svg",
                        linkImageSelected:"assets/images/mc-selected.svg",
                    },
                    {
                        code:"visa",
                        label:"Visa",
                        linkImage:"assets/images/visa-default.png",
                        linkImageSelected:"assets/images/visa-selected.png",
                    },
                ]
            },
            {
                code:"essentials",
                label:"Essentials",
                linkImage:"assets/images/grocery-enclosed-outline-fullcolor.svg",
                linkImageSelected:"assets/images/grocery-enclosed-filled-fullcolor.svg"
            },
            {
                code:"shop",
                label:"Shop",
                linkImage:"assets/images/shop-enclosed-outline-fullcolor.svg",
                linkImageSelected:"assets/images/shop-enclosed-filled-fullcolor.svg"
            },
            
            {
                code:"dine",
                label:"Dine",
                linkImage:"assets/images/food-enclosed-outline-fullcolor.svg",
                linkImageSelected:"assets/images/food-enclosed-filled-fullcolor.svg"
            },
            {
                code:"payBills",
                label:"Pay Bills",
                linkImage:"assets/images/pay_bills-enclosed-outline-fullcolor.svg",
                linkImageSelected:"assets/images/pay_bills-enclosed-filled-fullcolor.svg"
            },
            {
                code:"healthWellness",
                label:"Health & Wellness",
                linkImage:"assets/images/health-Wellness-enclosed-outline-fullcolor.svg",
                linkImageSelected:"assets/images/health-Wellness-enclosed-filled-fullcolor.svg"
            },
            {
                code:"travelEntertaiment",
                label:"Travel & Entertaiment",
                linkImage:"assets/images/entertainment-enclosed-outline-fullcolor.svg",
                linkImageSelected:"assets/images/entertainment-enclosed-filled-fullcolor.svg"
            },
        ]
    },
    {
        id:3,
        code:"creditCard",
        title:"CREDIT CARD",
        subCategories:[
            {
                code:"cardExclusives",
                label:"Card Exclusives",
                linkImage:"assets/images/creditcards-enclosed-outline-fullcolor.svg",
                linkImageSelected:"assets/images/creditcards-enclosed-filled-fullcolor.svg",
                cardType: [
                    {
                        code:"master",
                        label:"Mastercard",
                        linkImage:"assets/images/mc-default.svg",
                        linkImageSelected:"assets/images/mc-selected.svg",
                    },
                    {
                        code:"visa",
                        label:"Visa",
                        linkImage:"assets/images/visa-default.png",
                        linkImageSelected:"assets/images/visa-selected.png",
                    },
                    {
                        code:"americanExpress",
                        label:"American Express",
                        linkImage:"assets/images/amex-default.png",
                        linkImageSelected:"assets/images/amex-selected.png",
                    },
                    {
                        code:"jcb",
                        label:"JCB",
                        linkImage:"assets/images/jcb-default.png",
                        linkImageSelected:"assets/images/jcb-selected.png",
                    },
                    {
                        code:"unionPay",
                        label:"Union Pay",
                        linkImage:"assets/images/unionpay-default.svg",
                        linkImageSelected:"assets/images/unionpay-selected.svg",
                    },
                    {
                        code:"dinersClub",
                        label:"Diners Club",
                        linkImage:"assets/images/dinersclub-default.svg",
                        linkImageSelected:"assets/images/dinersclub-selected.svg",
                    },
                ]
            },
            {
                code:"essentials",
                label:"Essentials",
                linkImage:"assets/images/grocery-enclosed-outline-fullcolor.svg",
                linkImageSelected:"assets/images/grocery-enclosed-filled-fullcolor.svg"
            },
            {
                code:"installment",
                label:"Installment",
                linkImage:"assets/images/installment-enclosed-outline-fullcolor.svg",
                linkImageSelected:"assets/images/installment-enclosed-filled-fullcolor.svg"
            },
            {
                code:"shop",
                label:"Shop",
                linkImage:"assets/images/shop-enclosed-outline-fullcolor.svg",
                linkImageSelected:"assets/images/shop-enclosed-filled-fullcolor.svg"
            },
            {
                code:"dine",
                label:"Dine",
                linkImage:"assets/images/food-enclosed-outline-fullcolor.svg",
                linkImageSelected:"assets/images/food-enclosed-filled-fullcolor.svg"
            },
            {
                code:"payBills",
                label:"Pay Bills",
                linkImage:"assets/images/pay_bills-enclosed-outline-fullcolor.svg",
                linkImageSelected:"assets/images/pay_bills-enclosed-filled-fullcolor.svg"
            },
            {
                code:"healthWellness",
                label:"Health & Wellness",
                linkImage:"assets/images/health-Wellness-enclosed-outline-fullcolor.svg",
                linkImageSelected:"assets/images/health-Wellness-enclosed-filled-fullcolor.svg"
            },
            {
                code:"travelEntertaiment",
                label:"Travel & Entertaiment",
                linkImage:"assets/images/entertainment-enclosed-outline-fullcolor.svg",
                linkImageSelected:"assets/images/entertainment-enclosed-filled-fullcolor.svg"
            },
        ]
    },
]