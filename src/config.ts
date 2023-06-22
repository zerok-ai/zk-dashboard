// types
import { DefaultConfigProps } from 'types/config';

// ==============================|| THEME CONSTANT  ||============================== //

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const APP_DEFAULT_PATH = '/services';
export const HORIZONTAL_MAX_ITEM = 6;
export const DRAWER_WIDTH = 260;

// ==============================|| THEME CONFIG  ||============================== //

const config: DefaultConfigProps = {
  fontFamily: `'Poppins', sans-serif`,
  i18n: 'en',
  menuOrientation: 'vertical',
  miniDrawer: false,
  container: true,
  mode: 'dark',
  presetColor: 'ZeroKTheme',
  themeDirection: 'ltr'
};

export default config;
