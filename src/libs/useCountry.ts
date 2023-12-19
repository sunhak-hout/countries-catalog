import useAxios from 'axios-hooks';
import Fuse from 'fuse.js';
import { useMemo } from 'react';

export interface Country {
  name: {
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  cca3: string;
  altSpellings: string[];
  idd: {
    root: string;
    suffixes?: string[];
  };
  flags: {
    png: string;
    svg: string;
  };
}

interface Props {
  search?: string;
  limit?: number;
  offset?: number;
}

export const useCountry = (props: Props) => {
  const { search = '', limit = 25, offset = 0 } = props;

  const [result] = useAxios<Country[]>({
    url: `https://restcountries.com/v3.1/all`,
  });

  const countryData = result.data || [];

  const fuzzyCountryData = useMemo(
    () => new Fuse(countryData, { keys: ['name.official'] }),
    [countryData],
  );

  const searchCountries = useMemo(() => {
    return search
      ? fuzzyCountryData.search(search).map((fuzzy) => fuzzy.item)
      : countryData;
  }, [search, fuzzyCountryData]);

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
