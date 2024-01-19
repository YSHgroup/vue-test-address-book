export interface Address {
  id: string;
  name: { first: string; last: string };
  email: string;
  phone: string;
}

export interface Meta {
  totalCount: number;
}
