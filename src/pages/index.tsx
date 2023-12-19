import CountryList from '@/components/countries/CountryList';
import AppBarCustom from '@/components/shared/AppBarCustom';
import DisplayModeMenu from '@/components/shared/DisplayModeMenu';
import { Avatar, Box } from '@mui/material';

const PageRoot: React.FC = () => {
  return (
    <>
      <AppBarCustom
        title="Countries Catalog"
        leading={<Avatar src="vite.svg" sx={{ width: 32, height: 32 }} />}
        trailing={<DisplayModeMenu />}
      />
      <Box sx={{ minHeight: '100vh', pb: 5 }}>
        <CountryList />
      </Box>
    </>
  );
};

export default PageRoot;
