export interface Address {
  id: string;
  name: { first: string; last: string };
  email: string;
  phone: string;
}

export interface Meta {
  totalCount: number;
}

export interface AddressState {
  searchStr: string;
  addressList: Address[];
}

export interface ParamsType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}