import { Country } from '@/libs/useCountry';
import { Box, Grid, Paper, Typography } from '@mui/material';

interface Props {
  country: Country;
  onClick: (country: Country) => void;
}

const CountryCard: React.FC<Props> = ({ country, onClick }) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        mb: 3,
        p: 2,
        borderRadius: { xs: 0, md: 1 },
        cursor: 'pointer',
      }}
      onClick={() => onClick(country)}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Box
            width="100%"
            height="auto"
            component="img"
            sx={{ aspectRatio: { xs: '5/3', sm: '4/3' }, objectFit: 'cover' }}
            src={country.flags.png}
            alt={country.name.official}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box>
            <Typography variant="h6">{country.name.official}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption">Country Code</Typography>
                <Typography>
                  {country.cca2}, {country.cca3}
                </Typography>
              </Grid>
              <Grid item xs={6}>
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
