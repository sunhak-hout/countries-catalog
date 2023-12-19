import useAxios from 'axios-hooks';
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
    url: search
      ? `https://restcountries.com/v3.1/name/${search}?fullText=true`
      : `https://restcountries.com/v3.1/all`,
  });

  const data = useMemo(() => {
    const resultData = result.data || [];
    return [...resultData].slice(offset, offset + limit);
  }, [limit, offset, result.data]);

  return {
    count: result.data?.length || 0,
    data,
    loading: result.loading,
    error: result.error,
  };
};
