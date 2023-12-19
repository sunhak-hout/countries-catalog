import { useBreakpoint } from '@/libs/useBreakpoint';
import { Country, useCountry } from '@/libs/useCountry';
import { useAppStore } from '@/stores/useAppStore';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import CountryCard from './CountryCard';
import CountryDialog from './CountryDialog';
import CountryPagination from './CountryPagination';
import CountrySearchBox from './CountrySearchBox';
import CountrySortBy from './CountrySortBy';

const CountryList: React.FC = () => {
  const [countryFilter] = useAppStore((state) => [state.countryFilter]);

  const [dialog, setDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const sm = useBreakpoint('sm');

  const { count, data, loading, error } = useCountry({
    search: countryFilter.search,
    limit: countryFilter.limit,
    offset: (countryFilter.page - 1) * countryFilter.limit,
    sort: countryFilter.sort,
  });

  const handleClickCountry = (country: Country) => {
    setDialog(true);
    setSelectedCountry(country);
  };

  const handleCloseDialog = () => {
    setDialog(false);
    setSelectedCountry(null);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          position: 'sticky',
          top: 56,
          zIndex: 10,
          pt: { xs: 3, sm: 4, md: 6 },
          pb: { xs: 2, sm: 4 },
          px: { xs: 0, sm: 2 },
        }}
      >
        <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 2, sm: 0 } }}>
          <CountrySearchBox />

          <Box display="flex" alignItems="center" py={{ xs: 2, md: 3 }}>
            <CountrySortBy />

            <Typography sx={{ ml: 'auto', mr: 1 }}>(Total: {count})</Typography>
            {sm && <CountryPagination itemCount={count} />}
          </Box>

          {!sm && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              pb={2}
            >
              <CountryPagination itemCount={count} />
            </Box>
          )}
        </Box>

        <Divider sx={{ maxWidth: 900, mx: 'auto' }} />
      </Box>

      <Box
        sx={{ mx: 'auto', width: '100%', maxWidth: 900, position: 'relative' }}
      >
        <Box sx={{ mt: 10 }}>
          {loading && data.length === 0 && (
            <Box py={10} textAlign="center">
              <CircularProgress />
            </Box>
          )}

          {!loading && data.length === 0 && (
            <Box py={10}>
              <Typography
                align="center"
                color={error ? 'error.main' : 'textSecondary'}
              >
                {error ? error.message : 'There is no data found!'}
              </Typography>
            </Box>
          )}

          {data?.map((country) => (
            <CountryCard
              country={country}
              key={country.cca2}
              onClick={handleClickCountry}
            />
          ))}

          {selectedCountry && (
            <CountryDialog
              open={dialog}
              onClose={handleCloseDialog}
              country={selectedCountry!}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default CountryList;
