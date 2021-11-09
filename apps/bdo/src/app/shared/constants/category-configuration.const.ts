import { ItemModel } from '../models/item.model';

export const CATEGORY_CONFIGURATIONS: ItemModel[] = [
  {
    key:"bdo-rewards",
    name:"BDO REWARDS",
    children:[
      {
        key: "emerald",
        name:"Emerald",
        imageLink:"assets/images/emerald-default.svg",
        imageLinkSelected:"assets/images/emerald-selected.svg",
      },
      {
        key:"sapphire",
        name:"Sapphire",
        imageLink:"assets/images/sapphire-default.svg",
        imageLinkSelected:"assets/images/sapphire-selected.svg",
      },
      {
        key:"diamond",
        name:"Diamond",
        imageLink:"assets/images/diamond-default.svg",
        imageLinkSelected:"assets/images/diamond-selected.svg"
      }
    ]
  },
  {
    key:"debit-card",
    name:"DEBIT CARD",
    children:[
      {
        key:"card-exclusives",
        name:"Card Exclusives",
        imageLink:"assets/images/creditcards-enclosed-outline-fullcolor.svg",
        imageLinkSelected:"assets/images/creditcards-enclosed-filled-fullcolor.svg",
        children: [
          {
            key:"master",
            name:"Mastercard",
            imageLink:"assets/images/mc-default.svg",
            imageLinkSelected:"assets/images/mc-selected.svg",
          },
          {
            key:"visa",
            name:"Visa",
            imageLink:"assets/images/visa-default.png",
            imageLinkSelected:"assets/images/visa-selected.png",
          },
        ]
      },
      {
        key:"essentials",
        name:"Essentials",
        imageLink:"assets/images/grocery-enclosed-outline-fullcolor.svg",
        imageLinkSelected:"assets/images/grocery-enclosed-filled-fullcolor.svg"
      },
      {
        key:"shop",
        name:"Shop",
        imageLink:"assets/images/shop-enclosed-outline-fullcolor.svg",
        imageLinkSelected:"assets/images/shop-enclosed-filled-fullcolor.svg"
      },

      {
        key:"dine",
        name:"Dine",
        imageLink:"assets/images/food-enclosed-outline-fullcolor.svg",
        imageLinkSelected:"assets/images/food-enclosed-filled-fullcolor.svg"
      },
      {
        key:"pay-bills",
        name:"Pay Bills",
        imageLink:"assets/images/pay_bills-enclosed-outline-fullcolor.svg",
        imageLinkSelected:"assets/images/pay_bills-enclosed-filled-fullcolor.svg"
      },
      {
        key:"health-wellness",
        name:"Health & Wellness",
        imageLink:"assets/images/health-Wellness-enclosed-outline-fullcolor.svg",
        imageLinkSelected:"assets/images/health-Wellness-enclosed-filled-fullcolor.svg"
      },
      {
        key:"travel-entertaiment",
        name:"Travel & Entertaiment",
        imageLink:"assets/images/entertainment-enclosed-outline-fullcolor.svg",
        imageLinkSelected:"assets/images/entertainment-enclosed-filled-fullcolor.svg"
      },
    ]
  },
  {
    key:"credit-card",
    name:"CREDIT CARD",
    children:[
      {
        key:"card-exclusives",
        name:"Card Exclusives",
        imageLink:"assets/images/creditcards-enclosed-outline-fullcolor.svg",
        imageLinkSelected:"assets/images/creditcards-enclosed-filled-fullcolor.svg",
        children: [
          {
            key:"master",
            name:"Mastercard",
            imageLink:"assets/images/mc-default.svg",
            imageLinkSelected:"assets/images/mc-selected.svg",
          },
          {
            key:"visa",
            name:"Visa",
            imageLink:"assets/images/visa-default.png",
            imageLinkSelected:"assets/images/visa-selected.png",
          },
          {
            key:"american-express",
            name:"American Express",
            imageLink:"assets/images/amex-default.png",
            imageLinkSelected:"assets/images/amex-selected.png",
          },
          {
            key:"jcb",
            name:"JCB",
            imageLink:"assets/images/jcb-default.png",
            imageLinkSelected:"assets/images/jcb-selected.png",
          },
          {
            key:"union-pay",
            name:"Union Pay",
            imageLink:"assets/images/unionpay-default.svg",
            imageLinkSelected:"assets/images/unionpay-selected.svg",
          },
          {
            key:"diners-club",
            name:"Diners Club",
            imageLink:"assets/images/dinersclub-default.svg",
            imageLinkSelected:"assets/images/dinersclub-selected.svg",
          },
        ]
      },
      {
        key:"essentials",
        name:"Essentials",
        imageLink:"assets/images/grocery-enclosed-outline-fullcolor.svg",
        imageLinkSelected:"assets/images/grocery-enclosed-filled-fullcolor.svg"
      },
      {
        key:"installment",
        name:"Installment",
        imageLink:"assets/images/installment-enclosed-outline-fullcolor.svg",
        imageLinkSelected:"assets/images/installment-enclosed-filled-fullcolor.svg"
      },
      {
        key:"shop",
        name:"Shop",
        imageLink:"assets/images/shop-enclosed-outline-fullcolor.svg",
        imageLinkSelected:"assets/images/shop-enclosed-filled-fullcolor.svg"
      },
      {
        key:"dine",
        name:"Dine",
        imageLink:"assets/images/food-enclosed-outline-fullcolor.svg",
        imageLinkSelected:"assets/images/food-enclosed-filled-fullcolor.svg"
      },
      {
        key:"pay-bills",
        name:"Pay Bills",
        imageLink:"assets/images/pay_bills-enclosed-outline-fullcolor.svg",
        imageLinkSelected:"assets/images/pay_bills-enclosed-filled-fullcolor.svg"
      },
      {
        key:"health-wellness",
        name:"Health & Wellness",
        imageLink:"assets/images/health-Wellness-enclosed-outline-fullcolor.svg",
        imageLinkSelected:"assets/images/health-Wellness-enclosed-filled-fullcolor.svg"
      },
      {
        key:"travel-entertaiment",
        name:"Travel & Entertaiment",
        imageLink:"assets/images/entertainment-enclosed-outline-fullcolor.svg",
        imageLinkSelected:"assets/images/entertainment-enclosed-filled-fullcolor.svg"
      },
    ]
  },
  {
    key:"online-exclusives",
    name:"Online Exclusives",
    children:[
    ]
  },
  {
    key:"spend-anywhere",
    name:"Spend Anywhere",
    children:[
    ]
  },
  {
    key:"shop-choose-redeem",
    name:"Shop. Choose. Redeem",
    children:[
    ]
  }
]
