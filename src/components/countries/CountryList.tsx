import { CountrySort, useCountry } from '@/libs/useCountry';
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

const LIMIT = 25;
const CountryList: React.FC = () => {
  const [sort, setSort] = useState<CountrySort>('none');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { count, data, loading, error } = useCountry({
    search,
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
    sort,
  });

  const pageCount = useMemo(() => {
    return Math.ceil(count / LIMIT);
  }, [count]);

  console.log({ loading, error });

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

  return (
    <>
      <Container
        sx={{
          bgcolor: 'background.paper',
          position: 'sticky',
          top: 56,
          zIndex: 10,
          pt: 6,
          pb: 4,
        }}
      >
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          <TextField
            placeholder="Type to search..."
            fullWidth
            defaultValue={search}
            onChange={handleChangeSearchDebounce}
          />

          <Box display="flex" alignItems="center" py={3}>
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
        </Box>

        <Divider />
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
            <CountryCard country={country} key={country.cca2} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default CountryList;
