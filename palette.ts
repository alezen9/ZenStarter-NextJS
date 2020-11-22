export enum ThemeType {
  light = 'light',
  dark = 'dark'
}

type MaterialColor = {
   light: string
   main: string
   dark: string
   contrastText: string
}

type Config = {
   primary: Record<'dark'|'light', MaterialColor>
   secondary: Record<'dark'|'light', MaterialColor>
   error: Record<'dark'|'light', MaterialColor>
   typographyColor: Record<'dark'|'light', string>
}

const lightGreen = 'rgb(52,199,89)'
const darkGreen = 'rgb(42, 156, 71)'
const lightRed = 'rgb(255,59,48)'
const darkRed = 'rgb(255,69,58)'

export const configColors: Config = {
   primary: {
      dark: {
         light: lightGreen,
         main: darkGreen,
         dark: darkGreen,
         contrastText: '#fff'
      },
      light: {
         light: lightGreen,
         main: darkGreen,
         dark: darkGreen,
         contrastText: '#fff'
      }
   },
   secondary: {
      dark: {
         light: lightGreen,
         main: darkGreen,
         dark: darkGreen,
         contrastText: '#fff'
      },
      light: {
         light: lightGreen,
         main: darkGreen,
         dark: darkGreen,
         contrastText: '#fff'
      }
   },
   error: {
      dark: {
         light: lightRed,
         main: darkRed,
         dark: darkRed,
         contrastText: '#fff'
      },
      light: {
         light: lightRed,
         main: darkRed,
         dark: darkRed,
         contrastText: '#fff'
      }
   },
   typographyColor: {
      dark: '#b3b3b3',
      light: '#717171'
   }
}

class ColorPalette {
   private _primary: Record<'dark'|'light', MaterialColor>
   private _secondary: Record<'dark'|'light', MaterialColor>
   private _error: Record<'dark'|'light', MaterialColor>
   private _typographyColor: Record<'dark'|'light', string>
   themeType: ThemeType
   primary: MaterialColor
   secondary: MaterialColor
   error: string
   lightGreen: string
   darkGreen: string
   lightRed: string
   darkRed: string
   boxShadow: string
   userTableRowBackgroundColor: string
   backgroundColor: string
   paperBackgroundColor: string
   typographyGrey: string
   borderColor: string
   border: string
   borderWithOpacity: string
   successColor: string
   warningColor: string
   infoColor: string
   oddListStandOut: string
   evenListStandout: string
   dividerColor: string
   draggableSteadyBackground: string
   draggableDraggingBackground: string
   backgroundColorInverted: string
   backgroundColorStandOut: string
   tableCellBackground: string
   tableHeaderCellBackground: string


  constructor (themeType: ThemeType = ThemeType.light) {
    this.themeType = themeType
    this.lightGreen = 'rgb(52,199,89)'
    this.darkGreen = 'rgb(42, 156, 71)'
    this.lightRed = 'rgb(255,59,48)'
    this.darkRed = 'rgb(255,69,58)'
    this._primary = configColors.primary
    this._secondary = configColors.secondary
    this._error = configColors.error
    this._typographyColor = configColors.typographyColor
    this.updatePalette()
  }

  switchTheme (themeType: ThemeType = ThemeType.light) {
    this.themeType = themeType
    this.updatePalette()
  }
  updatePalette () {
    this.primary = this.themeType === ThemeType.dark
      ? this._primary.dark
      : this._primary.light
    this.secondary = this.themeType === ThemeType.dark
      ? this._secondary.dark
      : this._secondary.light
    this.error = this.themeType === ThemeType.dark
      ? this._error.dark.main
      : this._error.light.main
    this.backgroundColor = this.themeType === ThemeType.dark
      ? '#111'
      : '#fafafa'
    this.paperBackgroundColor = this.themeType === ThemeType.dark
      ? '#222'
      : '#fafafa'
    this.typographyGrey = this.themeType === ThemeType.dark
      ? this._typographyColor.dark
      : this._typographyColor.light
    this.borderColor = this.themeType === ThemeType.dark
      ? '#b3b3b3'
      : 'rgba(0, 0, 0, 0.23)'
    this.border = this.themeType === ThemeType.dark
      ? '1px solid #b3b3b3'
      : '1px solid rgba(0, 0, 0, 0.23)'
    this.boxShadow = this.themeType === ThemeType.dark
      ? '0 19px 38px rgba(0,0,0,0.15), 0 15px 12px rgba(0,0,0,0.22)'
      : '0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.03)'
   this.borderWithOpacity = this.themeType === ThemeType.dark
      ? '1px solid rgba(179, 179, 179, .3)'
      : '1px solid rgba(0, 0, 0, 0.1)'
    this.boxShadow = this.themeType === ThemeType.dark
      ? '0 19px 38px rgba(0,0,0,0.15), 0 15px 12px rgba(0,0,0,0.22)'
      : '0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.03)'
    this.userTableRowBackgroundColor = this.themeType === ThemeType.dark
      ? 'rgba(255,255,255,.02)'
      : 'rgba(0,0,0,.05)'
    this.tableCellBackground = this.themeType === ThemeType.dark
      ? '#111'
      : '#fafafa'
    this.tableHeaderCellBackground = this.themeType === ThemeType.dark
      ? '#383838'
      : '#BEBEBE'
    this.successColor = this.themeType === ThemeType.dark
      ? 'rgb(48, 209, 88)'
      : 'rgb(52, 199, 89)'
    this.backgroundColorStandOut = this.themeType === ThemeType.dark
      ? '#181818'
      : '#f2f2f2'
    this.oddListStandOut = this.themeType === ThemeType.dark
      ? 'rgba(255,255,255,.03)'
      : 'rgba(0,0,0,.03)'
    // TO DEFINE
    this.evenListStandout = this.themeType === ThemeType.dark
      ? 'orange'
      : 'orange'
    this.dividerColor = this.themeType === ThemeType.dark
      ? '#5E5E5E'
      : '#D5D5D5'
    this.draggableSteadyBackground = this.themeType === ThemeType.dark
      ? '#303030'
      : '#e3e3e3'
    this.draggableDraggingBackground = this.themeType === ThemeType.dark
      ? '#575757'
      : '#b5b5b5'
  }
}

export const ZenPalette: ColorPalette = new ColorPalette()
