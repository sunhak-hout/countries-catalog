import { useCountry } from '@/libs/useCountry';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Pagination,
  PaginationProps,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import CountryCard from './CountryCard';

const LIMIT = 25;
const CountryList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { count, data, loading, error } = useCountry({
    search,
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  });

  const pageCount = useMemo(() => {
    return Math.ceil(count / LIMIT);
  }, [count]);

  console.log({ loading, error });

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={3}
          >
            <Stack direction="row" alignItems="center">
              <Typography sx={{ mr: 1 }}>Sort By: </Typography>
              <ButtonGroup>
                <Button>ASC</Button>
                <Button>DESC</Button>
              </ButtonGroup>
            </Stack>

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
          {data?.map((country) => (
            <CountryCard country={country} key={country.cca2} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default CountryList;
