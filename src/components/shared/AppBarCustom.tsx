import {
  AppBar,
  Box,
  Container,
  Grow,
  Toolbar,
  Typography,
} from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  leading?: ReactNode;
  trailing?: ReactNode;
  title?: ReactNode;
  subTitle?: ReactNode;
  children?: ReactNode;
  visible?: boolean;
}

const AppBarCustom: React.FC<Props> = (props) => {
  return (
    <AppBar
      color="transparent"
      sx={{ bgcolor: 'background.paper' }}
      elevation={2}
    >
      <Container sx={{ px: { xs: 0 } }}>
        <Toolbar>
          <Box sx={{ flex: 1, mr: 1 }}>{props.leading}</Box>
          <Box sx={{ flex: 3, textAlign: 'center' }}>
            <Grow in key={props.title?.toString()}>
              <Box>
                {props.title &&
                  (typeof props.title === 'string' ? (
                    <Typography
                      variant={'body1'}
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                      overflow="hidden"
                      sx={{ maxWidth: 200, mx: 'auto', fontSize: 18 }}
                      fontWeight={500}
                    >
                      {props.title}
                    </Typography>
                  ) : (
                    props.title
                  ))}
                {props.subTitle && (
                  <Typography variant="body2" color="textSecondary">
                    {props.subTitle}
                  </Typography>
                )}
              </Box>
            </Grow>
          </Box>
          <Box
            sx={{
              flex: 1,
              ml: 1,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            {props.trailing}
          </Box>
        </Toolbar>
        {props.children}
      </Container>
    </AppBar>
  );
};

export default AppBarCustom;
