import {createTheming} from '@callstack/react-theme-provider';
import {defaultTheme} from './defaultTheme';

export const {ThemeProvider, withTheme, useTheme} = createTheming(defaultTheme);
