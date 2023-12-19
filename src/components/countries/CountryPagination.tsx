import { useAppStore } from '@/stores/useAppStore';
import { Pagination, PaginationProps } from '@mui/material';
import { useMemo } from 'react';

interface Props {
  itemCount: number;
}

const CountryPagination: React.FC<Props> = ({ itemCount }) => {
  const [countryFilter, setCountryFilter] = useAppStore((state) => [
    state.countryFilter,
    state.setCountryFilter,
  ]);

  const pageCount = useMemo(() => {
    return Math.ceil(itemCount / countryFilter.limit);
  }, [itemCount, countryFilter.limit]);

  const handleChangePage: PaginationProps['onChange'] = (e, newPage) => {
    setCountryFilter({ ...countryFilter, page: newPage });
  };

  return (
    <Pagination
      onChange={handleChangePage}
      count={pageCount}
      page={countryFilter.page}
      siblingCount={1}
      boundaryCount={1}
      shape="rounded"
      color="primary"
    />
  );
};

export default CountryPagination;
