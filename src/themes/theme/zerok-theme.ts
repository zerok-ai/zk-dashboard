// types
import { PaletteThemeProps } from 'types/theme';
import { PalettesProps } from '@ant-design/colors';
import { PaletteColorOptions } from '@mui/material/styles';
import { ThemeMode } from 'types/config';

// ==============================|| PRESET THEME - PURPLE THEME8 ||============================== //

const ZeroKTheme = (colors: PalettesProps, mode: ThemeMode): PaletteThemeProps => {
  const { grey } = colors;
  const greyColors: PaletteColorOptions = {
    0: '#121522',
    50: '#1F2B38',
    100: '#283747',
    200: '#3B5166',
    300: '#49637A',
    400: '#506D86',
    500: '#6887A3',
    600: '#819DB8',
    700: '#9BB4CC',
    800: '#BCD4EB',
    900: '#DCEDFD',
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16]
  };

//   const greyColors: PaletteColorOptions = {
//     900: '#171F29',
//     800: '#1F2B38',
//     700: '#283747',
//     600: '#3B5166',
//     500: '#49637A',
//     400: '#506D86',
//     300: '#6887A3',
//     200: '#819DB8',
//     100: '#9BB4CC',
//     50: '#BCD4EB',
//     0: '#FFFFFF',
//     A50: grey[15],
//     A100: grey[11],
//     A200: grey[12],
//     A400: grey[13],
//     A700: grey[14],
//     A800: grey[16]
//   };

  const contrastText = '#fff';

  let primaryColors = ['#C3F5E8', '#5BDCC6', '#038C8C', '#026E78', '#026E78'];
  let errorColors = ['#FDE8E7', '#FF9D83', '#FF7765', '#FF3932', '#FFC4AD'];
  let warningColors = ['#FEDF89', '#FEC84B', '#FDB022', '#F79009', '#DC6803'];
  let infoColors = ['#D5F2FD', '#C6E4F6', '#91C6EE', '#5494CD', '#29609B'];
  let successColors = ['#E0F5EA', '#26B56E', '#00A854', '#00A04D', '#008D3A'];

  return {
    primary: {
      lighter: primaryColors[0],
      100: primaryColors[0],
      200: primaryColors[1],
      light: primaryColors[1],
      400: primaryColors[2],
      main: primaryColors[2],
      dark: primaryColors[3],
      700: primaryColors[3],
      darker: primaryColors[3],
      900: primaryColors[3],
      contrastText
    },
    secondary: {
      lighter: greyColors[100],
      100: greyColors[100],
      200: greyColors[200],
      light: greyColors[300],
      400: greyColors[400],
      main: greyColors[500]!,
      600: greyColors[600],
      dark: greyColors[700],
      800: greyColors[800],
      darker: greyColors[900],
      A100: greyColors[0],
      A200: greyColors.A400,
      A300: greyColors.A700,
      contrastText: greyColors[0]
    },
    error: {
      lighter: errorColors[0],
      light: errorColors[1],
      main: errorColors[2],
      dark: errorColors[3],
      darker: errorColors[3],
      contrastText
    },
    warning: {
      lighter: warningColors[0],
      light: warningColors[1],
      main: warningColors[2],
      dark: warningColors[3],
      darker: warningColors[4],
      contrastText: greyColors[100]
    },
    info: {
      lighter: infoColors[0],
      light: infoColors[1],
      main: infoColors[2],
      dark: infoColors[3],
      darker: infoColors[4],
      contrastText
    },
    success: {
      lighter: successColors[0],
      light: successColors[1],
      main: successColors[2],
      dark: successColors[3],
      darker: successColors[4],
      contrastText
    },
    grey: greyColors
  };
};

export default ZeroKTheme;
