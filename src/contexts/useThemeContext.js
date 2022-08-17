import { createContext, useState } from 'react'

//Here are declared the colors to be used in the frontend
const themes = {
  light: {
    colorPrimary: '#22E38F',
    colorWhite: "#FFFFFF",
    colorBlue: "#2a66bc",
    colorSecundary: '#7F1FD4',
    grayCard: "#FFFFFF26",
    grayGoogle: "#EEEEEE40",
    colorItemMenu: "#3A0E60",
    colorDivider: "#7865893F",
    colorSubItem: "#7865897F",
    grayInput: '#979797',
    graylight1: '#FFFFFF59',
    colorError: "#c62828",
    colorWarning: "#ff9800",
    colorVoucher: "#786589",
    colorSearch: "#7865891A"
    
  },
  dark: {},
}

const ThemeContext = createContext(themes.light)

function ThemeProvider(props) {
  const [theme, setTheme] = useState(themes.light)

  const { children } = props

  const value = { theme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export { ThemeContext, ThemeProvider }
