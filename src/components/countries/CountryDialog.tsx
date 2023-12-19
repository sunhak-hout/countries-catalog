import { useBreakpoint } from '@/libs/useBreakpoint';
import { Country } from '@/libs/useCountry';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  country: Country;
}

const CountryDialog: React.FC<Props> = ({ open, onClose, country }) => {
  const xs = useBreakpoint('xs');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{country.name.official}</DialogTitle>
      <Divider />
      <DialogContent>
        <Box
          width="100%"
          height="auto"
          component="img"
          sx={{ aspectRatio: { xs: '5/3' }, objectFit: 'cover' }}
          src={country.flags.png}
          alt={country.name.official}
          mb={1}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption">Country Code:</Typography>
            <Typography>
              {country.cca2}, {country.cca3}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption">Calling Code:</Typography>
            <Typography
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace={xs ? 'nowrap' : 'unset'}
            >
              {(country.idd?.suffixes || [])
                .map((suffix) => `${country.idd?.root}${suffix}`)
                .join(', ') || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption">Capital:</Typography>
            <Typography>{country.capital?.join(', ')}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption">Region:</Typography>
            <Typography>{country.region}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption">Subregion:</Typography>
            <Typography>{country.subregion}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption">Languages:</Typography>
            <Typography>
              {Object.values(country.languages).join(', ')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption">Population:</Typography>
            <Typography>{country.population}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption">Area:</Typography>
            <Typography>{country.area} square kilometers</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption">Demonyms:</Typography>
            <Typography>
              Female: {country.demonyms?.eng?.f}, Male:{' '}
              {country.demonyms?.eng?.m}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption">Timezones:</Typography>
            <Typography>{country.timezones?.join(', ')}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption">Continents:</Typography>
            <Typography>{country.continents?.join(', ')}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CountryDialog;
