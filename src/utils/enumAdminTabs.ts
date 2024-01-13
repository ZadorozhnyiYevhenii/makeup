export namespace AdminTabTitles {
   export enum Add {
    ADD_PRODUCT = 'addProduct',
    ADD_BRAND = 'addBrand',
    ADD_COUNTRY = 'addCountry',
    ADD_IMAGE = 'addImage',
    ADD_PRODUCT_VARIATION = 'addProductVariation',
    ADD_VARIATION_DETAILS = 'addVariationsDetails',
  };

  export enum Change {
    CHANGE__PRODUCT = 'changeProduct',
    CHANGE_PRODUCT_VARIATION = 'changeProductVariation'
  };

  export enum Delete {
    DELETE_PRODUCT = 'deleteProduct',
    DELETE_BRAND = 'deleteBrand',
    DELETE_CATEGORY = 'deleteCategory',
    DELETE_COUNTRY = 'deleteCountry',
    DELETE_PRODUCTVARIATION = 'deleteProductVariation',
    DELETE_VARIATIONS_DETAILS = 'deleteVariationsDetails'
  };
};