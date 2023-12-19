import { useBreakpoint } from '@/libs/useBreakpoint';
import { Country, CountrySort, useCountry } from '@/libs/useCountry';
import { ImportExportOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Divider,
  Pagination,
  PaginationProps,
  TextField,
  TextFieldProps,
  Typography,
  debounce,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import CountryCard from './CountryCard';
import CountryDialog from './CountryDialog';

const LIMIT = 25;
const CountryList: React.FC = () => {
  const [dialog, setDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [sort, setSort] = useState<CountrySort>('none');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const md = useBreakpoint('md');
  const sm = useBreakpoint('sm');

  const { count, data, loading, error } = useCountry({
    search,
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
    sort,
  });

  const pageCount = useMemo(() => {
    return Math.ceil(count / LIMIT);
  }, [count]);

  const handleChangeSearch: TextFieldProps['onChange'] = (e) => {
    setPage(1);
    setSearch(e.target.value);
  };

  const handleChangeSearchDebounce = useCallback(
    debounce(handleChangeSearch, 400),
    [],
  );

  const handleToggleSort = () => {
    setSort((prev) =>
      prev === 'asc' ? 'desc' : prev === 'desc' ? 'none' : 'asc',
    );
  };

  const handleChangePage: PaginationProps['onChange'] = (e, newPage) => {
    setPage(newPage);
  };

  const handleClickCountry = (country: Country) => {
    console.log({ dialog, selectedCountry });
    setDialog(true);
    setSelectedCountry(country);
  };

  const handleCloseDialog = () => {
    setDialog(false);
    setSelectedCountry(null);
  };

  return (
    <>
      <Container
        sx={{
          bgcolor: 'background.paper',
          position: 'sticky',
          top: 56,
          zIndex: 10,
          pt: { xs: 3, sm: 4, md: 6 },
          pb: { xs: 2, md: 4 },
          px: { xs: 0, sm: 2 },
        }}
      >
        <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 2, sm: 0 } }}>
          <TextField
            size={md ? 'medium' : 'small'}
            placeholder="Type to search..."
            fullWidth
            defaultValue={search}
            onChange={handleChangeSearchDebounce}
          />

          <Box display="flex" alignItems="center" py={{ xs: 2, md: 3 }}>
            <Button
              variant="outlined"
              startIcon={<ImportExportOutlined />}
              onClick={handleToggleSort}
              sx={{ textTransform: 'none' }}
              color={sort === 'none' ? 'inherit' : 'primary'}
            >
              Sort By: {sort.toUpperCase()}
            </Button>

            <Typography sx={{ ml: 'auto', mr: 1 }}>(Total: {count})</Typography>
            {sm && (
              <Pagination
                onChange={handleChangePage}
                count={pageCount}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                shape="rounded"
                color="primary"
              />
            )}
          </Box>

          {!sm && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              pb={2}
            >
              <Pagination
                onChange={handleChangePage}
                count={pageCount}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                shape="rounded"
                color="primary"
              />
            </Box>
          )}
        </Box>

        {!sm && <Divider />}
      </Container>

      <Box
        sx={{ mx: 'auto', width: '100%', maxWidth: 900, position: 'relative' }}
      >
        <Box sx={{ mt: 10 }}>
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
