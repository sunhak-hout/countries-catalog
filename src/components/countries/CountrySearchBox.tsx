import { useBreakpoint } from '@/libs/useBreakpoint';
import { useAppStore } from '@/stores/useAppStore';
import { SearchOutlined } from '@mui/icons-material';
import {
  InputAdornment,
  TextField,
  TextFieldProps,
  debounce,
} from '@mui/material';
import { useCallback } from 'react';

const CountrySearchBox: React.FC = () => {
  const [countryFilter, setCountryFilter] = useAppStore((state) => [
    state.countryFilter,
    state.setCountryFilter,
  ]);

  const md = useBreakpoint('md');

  const handleChangeSearch: TextFieldProps['onChange'] = (e) => {
    setCountryFilter({
      ...countryFilter,
      page: 1,
      search: e.target.value,
    });
  };

  const handleChangeSearchDebounce = useCallback(
    debounce(handleChangeSearch, 400),
    [countryFilter.sort],
  );

  return (
    <TextField
      size={md ? 'medium' : 'small'}
      placeholder="Type to fuzzy search..."
      fullWidth
      defaultValue={countryFilter.search}
      onChange={handleChangeSearchDebounce}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlined />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CountrySearchBox;
