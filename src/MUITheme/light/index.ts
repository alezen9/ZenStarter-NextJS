import { createMuiTheme } from '@material-ui/core/styles'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import { configColors, ThemeType } from '../palette'

const breakpoints = createBreakpoints({})

const subtitleGrey = '#686868'
const lightGrey = '#c1c1c1'
const backgroundColor = '#fafafa'
const borderColor = 'rgba(0, 0, 0, 0.23)'
const borderRadius = 5

const LightTheme = createMuiTheme({
  // @ts-ignore
  type: ThemeType.light,
  palette: {
    primary: configColors.primary.light,
    secondary: configColors.secondary.light,
    error: configColors.error.light
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      padding: 0,
      fontSize: '25pt',
      color: configColors.typographyColor.light
    },
    h2: {
      padding: 0,
      fontSize: '23pt',
      color: configColors.typographyColor.light
    },
    h3: {
      padding: 0,
      fontSize: '21pt',
      color: configColors.typographyColor.light
    },
    h4: {
      padding: 0,
      fontSize: '15pt',
      color: configColors.typographyColor.light,
      fontWeight: 500
    },
    h5: {
      padding: 0,
      fontSize: '13pt',
      color: configColors.typographyColor.light
    },
    h6: {
      padding: 0,
      fontSize: '13pt',
      fontWeight: 'bold',
      color: configColors.typographyColor.light
    },
    body1: {
      padding: 0,
      fontSize: '12pt',
      color: configColors.typographyColor.light
    },
    body2: {
      padding: 0,
      fontSize: '12pt',
      fontWeight: 500,
      color: configColors.typographyColor.light
    },
    caption: {
      padding: 0,
      fontSize: '10pt',
      color: configColors.typographyColor.light
    }

  },
  overrides: {
    MuiGrid: {
      root: {
        wordBreak: 'break-word'
      }
    },
    MuiCard: {
      root: {
        borderRadius
      }
    },
    MuiPaper: {
      root: {
        borderRadius,
        backgroundColor
      },
      elevation1: {
        boxShadow: '0 7px 20px rgba(0,0,0,.1)'
      }
    },
    MuiInputBase: {
      root: {
        color: configColors.typographyColor.light,
        '&$disabled': {
          color: lightGrey,
          opacity: 0.7
        }
      },
      input: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        '&selected': {
          backgroundColor: 'transparent'
        },
        '&$disabled': {
          color: lightGrey,
          opacity: 0.7
        }
      }
    },
    MuiInput: {
      root: {
        color: configColors.typographyColor.light,
        '&$disabled': {
          color: lightGrey
        }
      },
      inputMultiline: {
        boxSizing: 'border-box',
        borderRadius: 0,
        border: `1px solid ${configColors.primary.light.main}`,
        background: 'transparent',
        backgroundColor: 'transparent',
        height: 'auto',
        padding: '.5em',
        overflowY: 'scroll',
        whiteSpace: 'normal',
        '&:hover': {
          background: 'transparent',
          backgroundColor: 'transparent'
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        '&$disabled $notchedOutline': {
          borderColor: 'rgba(0,0,0,.15)'
        }
      },
      input: {
        fontSize: '.9em'
      }
    },
    MuiInputLabel: {
      root: {
        color: configColors.typographyColor.light,
        opacity: '.6'
      }
    },
    MuiButton: {
      root: {
        fontWeight: 300,
        minWidth: 120,
        textTransform: 'none',
        boxShadow: 'none !important',
        fontSize: '17px !important',
        '@media (max-width: 600px)': {
          fontSize: 'inherit'
        }
      },
      contained: {
        color: '#fff',
        borderRadius,
        fontSize: 14,
        '&:hover': {
          color: '#fff'
        }
      },
      outlined: {
        color: configColors.typographyColor.light,
        borderRadius,
        fontSize: 14,
        borderColor
      }
    },
    MuiAvatar: {
      root: {
        backgroundColor: `${configColors.primary.light.main} !important`
      }
    },
    MuiBackdrop: {
      root: {
        backdropFilter: 'blur(12px)'
      }
    },
    MuiIconButton: {
      root: {
        color: configColors.primary.light.main
      }
    },
    MuiFormHelperText: {
      root: {
        color: 'red'
      }
    },
    MuiDialog: {
      root: {
        boxShadow: '0 18px 38px 0 #e1eafc'
      },
      paper: {
        borderRadius: 7,
        [breakpoints.down('xs')]: {
          margin: 0
        }
      },
      paperFullScreen: {
        width: '95%',
        height: '95%',
        borderRadius: 7
      },
      paperFullWidth: {
        [breakpoints.down('xs')]: {
          width: 'calc(100% - 32px)'
        }
      }
    },
    MuiDialogTitle: {
      root: {
        color: subtitleGrey,
        textAlign: 'center',
        fontSize: 20
      }
    },
    MuiSelect: {
      selectMenu: {
        height: 'none'
      }
    },
    MuiListItem: {
      root: {
        '&:hover': {
          backgroundColor: 'rgba(0,0,0, .03) !important'
        }
      }
    },
    MuiListItemIcon: {
      root: {
        color: 'unset',
        transition: 'color .3s ease'
      }
    },
    MuiTableHead: {
      root: {
        backgroundColor: 'rgba(0,0,0,.1)'
      }
    },
    MuiTableRow: {
      root: {
        borderBottom: '1px solid rgba(0,0,0,.1)',
        '&:last-of-type': {
          borderBottom: 'none'
        }
      }
    },
    MuiTableCell: {
      head: {
        fontWeight: 500,
        borderBottom: 'none',
        minWidth: 100
      },
      body: {
        paddingTop: 12,
        paddingBottom: 12,
        fontSize: '.9em',
        fontWeight: 300,
        borderBottom: 'none'
      }
    },
    MuiTab: {
      textColorInherit: {
        '&$disabled': {
          opacity: 0.3,
          background: `repeating-linear-gradient(
            -55deg,
            #DFDFE5,
            #DFDFE5 10px,
            #EFEFF2 10px,
            #EFEFF2 20px
          )`
        }
      }
    },
    MuiMenuItem: {
      root: {
        padding: '.5em 1em',
        minWidth: 150,
        display: 'flex',
        '&:not(:last-of-type):before': {
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          content: '""',
          width: '80%',
          height: '100%',
          borderBottom: '1px solid rgba(0,0,0,.1)'
        },
        '&$selected': {
          '&>p': {
            color: configColors.primary.light.main
          }
        }
      }
    }
  }
})

export default LightTheme
