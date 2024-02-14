export enum UserTabTitles {
  CONTACTS = 'Your contacts',
  ADDRESS = 'Your shipping info',
  ORDERS = 'Your orders history'
} 

export const userTabs = [
  { name: 'Contacts information', value: UserTabTitles.CONTACTS },
  { name: 'Adress information', value: UserTabTitles.ADDRESS },
  { name: 'Orders history', value: UserTabTitles.ORDERS },
];

