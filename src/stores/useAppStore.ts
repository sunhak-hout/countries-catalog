import { create } from 'zustand';

interface CountryFilter {
  search: string;
  sort: 'asc' | 'desc' | 'none';
  limit: number;
  page: number;
}

interface AppState {
  displayMode: 'system' | 'dark' | 'light';
  setDisplayMode: (mode: 'system' | 'dark' | 'light') => void;

  countryFilter: CountryFilter;
  setCountryFilter: (countryFilter: CountryFilter) => void;
}

export const useAppStore = create<AppState>((set) => ({
  displayMode: (localStorage.getItem('displayMode') as any) || 'system',
  setDisplayMode: (mode) => set({ displayMode: mode }),

  countryFilter: {
    search: '',
    sort: 'none',
    page: 1,
    limit: 25,
  },
  setCountryFilter: (countryFilter) => set({ countryFilter }),
}));
