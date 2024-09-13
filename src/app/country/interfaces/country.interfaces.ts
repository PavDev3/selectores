export interface Country {
  name: Name;
  status: Status;
  unMember: boolean;
  capital: string[];
  altSpellings: string[];
  region: string;
  languages: { [key: string]: string };
  translations: { [key: string]: Translation };
  latlng: number[];
  landlocked: boolean;
  borders?: string[];
  area: number;
  flag: string;
  gini?: { [key: string]: number };
  continents: string[];
  flags: Flags;
  capitalInfo: CapitalInfo;
}

export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}

export interface SmallCountry {
  name: string;
  cca3: string;
  borders: string[];
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Eng {
  f: string;
  m: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: Translation };
}

export interface Translation {
  official: string;
  common: string;
}

export enum Status {
  OfficiallyAssigned = 'officially-assigned',
  UserAssigned = 'user-assigned',
}
