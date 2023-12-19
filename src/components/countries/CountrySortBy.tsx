import { CountrySort } from '@/libs/useCountry';
import { useAppStore } from '@/stores/useAppStore';
import { ImportExportOutlined } from '@mui/icons-material';
import { Button, ButtonProps, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

const CountrySortBy: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();
  const [countryFilter, setCountryFilter] = useAppStore((state) => [
    state.countryFilter,
    state.setCountryFilter,
  ]);

  const handleClick: ButtonProps['onClick'] = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleChangeSort = (sort: CountrySort) => {
    setCountryFilter({ ...countryFilter, sort });
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ImportExportOutlined />}
        onClick={handleClick}
        sx={{ textTransform: 'none' }}
        color={countryFilter.sort === 'none' ? 'inherit' : 'primary'}
      >
        Sort By: {countryFilter.sort.toUpperCase()}
      </Button>
      <Menu
        onClose={() => setAnchorEl(null)}
        open={!!anchorEl}
        anchorEl={anchorEl}
        slotProps={{ paper: { sx: { px: 1 } } }}
      >
        <MenuItem
          selected={countryFilter.sort === 'asc'}
          onClick={() => handleChangeSort('asc')}
        >
          ASC
        </MenuItem>
        <MenuItem
          selected={countryFilter.sort === 'desc'}
          onClick={() => handleChangeSort('desc')}
        >
          DESC
        </MenuItem>
        <MenuItem
          selected={countryFilter.sort === 'none'}
          onClick={() => handleChangeSort('none')}
        >
          NONE
        </MenuItem>
      </Menu>
    </>
  );
};

export default CountrySortBy;
