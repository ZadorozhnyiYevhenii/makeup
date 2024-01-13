import { AdminTabTitles } from "./enumAdminTabs";

export namespace AdminTabs {
  export const add = [
    { name: 'Add product', value: AdminTabTitles.Add.ADD_PRODUCT, id: 1 },
    { name: 'Add brand', value: AdminTabTitles.Add.ADD_BRAND, id: 2 },
    { name: 'Add country', value: AdminTabTitles.Add.ADD_COUNTRY, id: 3 },
    { name: 'Add Image to Product', value: AdminTabTitles.Add.ADD_IMAGE, id: 4 },
    { name: 'Add product variation', value: AdminTabTitles.Add.ADD_PRODUCT_VARIATION, id: 5 },
    { name: 'Add variations details', value: AdminTabTitles.Add.ADD_VARIATION_DETAILS, id: 6 },
  ];
  
  export const change = [
    { name: 'Update product', value: AdminTabTitles.Change.CHANGE__PRODUCT, id: 1 },
    { name: 'Update product variation', value: AdminTabTitles.Change.CHANGE_PRODUCT_VARIATION, id: 2 }
  ];

  export const deleters = [
    { name: 'Delete product', value: AdminTabTitles.Delete.DELETE_PRODUCT, id: 1 },
    { name: 'Delete brand', value: AdminTabTitles.Delete.DELETE_BRAND, id: 2 },
    { name: 'Delete category', value: AdminTabTitles.Delete.DELETE_CATEGORY, id: 3 },
    { name: 'Delete country', value: AdminTabTitles.Delete.DELETE_COUNTRY, id: 4 },
    { name: 'Delete product variation', value: AdminTabTitles.Delete.DELETE_PRODUCTVARIATION, id: 5 },
    { name: 'Delete variations details', value: AdminTabTitles.Delete.DELETE_VARIATIONS_DETAILS, id: 6 },
  ]
}