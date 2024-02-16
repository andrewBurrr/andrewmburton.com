import {createTheme, responsiveFontSizes} from "@mui/material";

export interface AppTheme {
    bg: {
        main: string,
        light: string,
    },
    text: {
        main: string,
        light: string,
    }
}

// @ts-ignore
let theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: '#18293E',
            light: '#264163',
        },
        secondary: {
            main: '#FA8072',
        }
    },
    shape: {
        borderRadius: 0,
    },
    typography: {
        fontFamily: "Aboreto",
        body1: {
            fontFamily: "Montserrat",
        },
        body2: {
            fontFamily: "Montserrat",
        },
    },
    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: {
                    color: "red"
                }
            }
        }
    }
});

theme = responsiveFontSizes(theme);

export { theme };