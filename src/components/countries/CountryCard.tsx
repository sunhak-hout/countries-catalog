import { Country } from '@/libs/useCountry';
import { Box, Grid, Paper, Typography } from '@mui/material';

interface Props {
  country: Country;
}

const CountryCard: React.FC<Props> = ({ country }) => {
  return (
    <Paper sx={{ display: 'flex', mb: 2, p: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box
            width="100%"
            height="auto"
            component="img"
            sx={{ aspectRatio: '4/3', objectFit: 'cover' }}
            src={country.flags.png}
            alt={country.name.official}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box>
            <Typography variant="h6">{country.name.official}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="caption">Country Code</Typography>
                <Typography>
                  {country.cca2}, {country.cca3}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption">Calling Code:</Typography>
                <Typography
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {(country.idd.suffixes || [])
                    .map((suffix) => `${country.idd.root}${suffix}`)
                    .join(', ') || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption">Native Country Name:</Typography>
                <Typography
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {Object.values(country.name.nativeName || {})
                    .map(({ common }) => common)
                    .join(', ') || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption">
                  Alternative Country Name:
                </Typography>
                <Typography
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {country.altSpellings.join(', ')}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CountryCard;
