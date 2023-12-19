import CountryList from '@/components/countries/CountryList';
import AppBarCustom from '@/components/shared/AppBarCustom';
import DisplayModeMenu from '@/components/shared/DisplayModeMenu';
import { MenuOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

const PageRoot: React.FC = () => {
  return (
    <>
      <AppBarCustom
        title="Vite PWA React MUI"
        leading={
          <IconButton color="inherit">
            <MenuOutlined />
          </IconButton>
        }
        trailing={<DisplayModeMenu />}
      />
      <Box sx={{ minHeight: '100vh' }}>
        <CountryList />
      </Box>
    </>
  );
};

export default PageRoot;
