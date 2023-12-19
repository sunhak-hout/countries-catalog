import useAxios from 'axios-hooks';
import Fuse from 'fuse.js';
import _orderBy from 'lodash/orderBy';
import { useMemo } from 'react';

export type CountrySort = 'asc' | 'desc' | 'none';

interface Props {
  search?: string;
  limit?: number;
  offset?: number;
  sort?: CountrySort;
}

export const COUNTRY_DEFAULT_LIMIT = 25;

export const useCountry = ({
  search = '',
  limit = COUNTRY_DEFAULT_LIMIT,
  offset = 0,
  sort = 'asc',
}: Props) => {
  const [result] = useAxios<Country[]>({
    url: `https://restcountries.com/v3.1/all`,
  });

  const countryData = result.data || [];

  const fuzzyCountryData = useMemo(
    () => new Fuse(countryData, { keys: ['name.official'] }),
    [countryData],
  );

  const searchCountries = useMemo(() => {
    const countries = search
      ? fuzzyCountryData.search(search).map((fuzzy) => fuzzy.item)
      : countryData;
    return sort === 'none'
      ? countries
      : _orderBy(countries, 'name.official', sort);
  }, [sort, search, fuzzyCountryData]);

  const data = useMemo(() => {
    return searchCountries.slice(offset, offset + limit);
  }, [limit, offset, searchCountries]);

  return {
    count: searchCountries.length || 0,
    data,
    loading: result.loading,
    error: result.error,
  };
};

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      eng: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    AUD: {
      name: string;
      symbol: string;
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
    eng: string;
  };
  translations: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms: {
    eng: {
      f: string;
      m: string;
    };
  };
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: number[];
  };
  postalCode: {
    format: string;
    regex: string;
  };
}
