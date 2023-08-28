import theme from '../theme';
import styled from 'styled-components';

declare module 'styled-components'{
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType { }
}
