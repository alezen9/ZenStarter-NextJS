import { createMuiTheme } from '@material-ui/core/styles'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import { configColors, ThemeType } from '../palette'

const subtitleGrey = '#686868'
const lightGrey = '#c1c1c1'
const borderColor = '#b3b3b3'
const borderRadius = 5

const breakpoints = createBreakpoints({})

const DarkTheme = createMuiTheme({
  // @ts-ignore
  type: ThemeType.dark,
  palette: {
    primary: configColors.primary.dark,
    secondary: configColors.secondary.dark,
    error: configColors.error.dark
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      padding: 0,
      fontSize: '25pt',
      color: configColors.typographyColor.dark
    },
    h2: {
      padding: 0,
      fontSize: '23pt',
      color: configColors.typographyColor.dark
    },
    h3: {
      padding: 0,
      fontSize: '21pt',
      color: configColors.typographyColor.dark
    },
    h4: {
      padding: 0,
      fontSize: '15pt',
      color: configColors.typographyColor.dark,
      fontWeight: 500
    },
    h5: {
      padding: 0,
      fontSize: '13pt',
      color: configColors.typographyColor.dark
    },
    h6: {
      padding: 0,
      fontSize: '13pt',
      fontWeight: 'bold',
      color: configColors.typographyColor.dark
    },
    body1: {
      padding: 0,
      fontSize: '12pt',
      color: configColors.typographyColor.dark
    },
    body2: {
      padding: 0,
      fontSize: '12pt',
      fontWeight: 500,
      color: configColors.typographyColor.dark
    },
    caption: {
      padding: 0,
      fontSize: '10pt',
      color: configColors.typographyColor.dark
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
        backgroundColor: '#222'
      },
      elevation1: {
        boxShadow: '0 7px 20px black'
      }
    },
    MuiInputBase: {
      root: {
        color: configColors.typographyColor.dark,
        '&$disabled': {
          color: lightGrey
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
          color: 'rgba(255,255,255,.4)'
        }
      }
    },
    MuiInput: {
      root: {
        color: configColors.typographyColor.dark,
        '&$disabled': {
          color: lightGrey
        }
      },
      inputMultiline: {
        boxSizing: 'border-box',
        borderRadius: 0,
        border: `1px solid ${configColors.primary.dark.main}`,
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
        '&:hover $notchedOutline': {
          borderColor: 'rgba(255,255,255,.7)'
        },
        '&$disabled $notchedOutline': {
          borderColor: 'rgba(255,255,255,.2)'
        }
      },
      input: {
        fontSize: '.9em'
      },
      notchedOutline: {
        borderColor,
        '&:hover': {
          borderColor: 'rgba(255,255,255,.7)'
        }
      }
    },
    MuiInputLabel: {
      root: {
        color: configColors.typographyColor.dark,
        opacity: '.6',
        '&$disabled': {
          color: 'rgba(255,255,255,.3)'
        }
      }
    },
    MuiStepper: {
      root: {
        background: 'transparent'
      }
    },
    MuiStepIcon: {
      root: {
        color: 'rgba(255,255,255,.1)'
      },
      active: {
        color: 'currentColor'
      }
    },
    MuiStepLabel: {
      root: {
        '&$disabled': {
          opacity: 0.3
        }
      }
    },
    MuiMobileStepper: {
      dotActive: {
        backgroundColor: configColors.primary.dark.dark
      },
      dot: {
        backgroundColor: 'rgba(255,255,255,.2)'
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: 'rgba(255,255,255,.3)'
      }
    },
    MuiBackdrop: {
      root: {
        backdropFilter: 'blur(12px)'
      }
    },
    MuiFormControlLabel: {
      label: {
        '&$disabled': {
          color: 'rgba(255,255,255,.2)'
        }
      }
    },
    MuiFormHelperText: {
      root: {
        color: 'red'
      }
    },
    MuiFab: {
      root: {
        '&$disabled': {
          backgroundColor: 'rgba(255,255,255,.2)'
        }
      }
    },
    MuiButtonBase: {
      root: {
        '&$disabled': {
          backgroundColor: 'rgba(255,255,255,.2)',
          color: 'rgba(255,255,255,.05)'
        }
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
        },
        '&$disabled': {
          backgroundColor: 'rgba(255,255,255,.2)',
          color: 'rgba(255,255,255,.05)'
        }
      },
      contained: {
        color: '#fff',
        borderRadius,
        fontSize: 14,
        '&:hover': {
          color: '#fff'
        },
        '&$disabled': {
          backgroundColor: 'rgba(255,255,255,.2)',
          color: 'rgba(255,255,255,.05)'
        }
      },
      outlined: {
        color: configColors.typographyColor.dark,
        borderRadius,
        fontSize: 14,
        borderColor: borderColor,
        '&$disabled': {
          backgroundColor: 'transparent',
          borderColor: 'rgba(255,255,255,.1)',
          color: 'rgba(255,255,255,.1)'
        }
      },
      text: {
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,.05)'
        }
      }
    },
    MuiCheckbox: {
      colorPrimary: {
        '&$disabled': {
          color: 'rgba(255,255,255,.15)'
        }
      }
    },
    MuiAvatar: {
      root: {
        backgroundColor: `${configColors.primary.dark.main} !important`
      }
    },
    MuiIconButton: {
      root: {
        color: configColors.primary.dark.main,
        '&$disabled': {
          color: 'rgba(255,255,255,.07)'
        },
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,.05)'
        }
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
    // @ts-ignore
    MuiPaginationItem: {
      root: {
        color: configColors.typographyColor.dark,
        '&$disabled': {
          color: configColors.typographyColor.dark
        }
      },
      outlined: {
        border: '1px solid rgba(255,255,255,.1)'
      }
    },
    MuiDialogTitle: {
      root: {
        color: subtitleGrey,
        textAlign: 'center',
        fontSize: 20
      }
    },
    MuiListItem: {
      root: {
        '&:hover': {
          backgroundColor: 'rgba(255,255,255, .03) !important'
        }
      }
    },
    MuiListItemIcon: {
      root: {
        color: 'unset',
        transition: 'color .3s ease'
      }
    },
    MuiSelect: {
      selectMenu: {
        height: 'none'
      },
      iconOutlined: {
        color: configColors.typographyColor.dark
      }
    },
    MuiTab: {
      textColorInherit: {
        '&$disabled': {
          color: '#fafafa',
          opacity: 0.2,
          background: `repeating-linear-gradient(
            -55deg,
            #222,
            #222 10px,
            #333 10px,
            #333 20px
          )`
        }
      }
    },
    MuiTable: {
      root: {
        backgroundColor: '#111'
      }
    },
    MuiTableHead: {
      root: {
        backgroundColor: '#222'
      }
    },
    MuiTableRow: {
      root: {
        borderBottom: '1px solid rgba(255,255,255,.15)',
        '&:last-of-type': {
          borderBottom: 'none'
        }
      }
    },
    MuiTableCell: {
      head: {
        fontWeight: 500,
        color: configColors.typographyColor.dark,
        borderBottom: 'none',
        minWidth: 100
      },
      body: {
        paddingTop: 12,
        paddingBottom: 12,
        fontSize: '.9em',
        fontWeight: 300,
        color: 'rgba(255,255,255,.5)',
        borderBottom: 'none'
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
          borderBottom: '1px solid rgba(255,255,255,.2)'
        },
        '&:hover': {
          backgroundColor: '#444'
        },
        '&$selected': {
          backgroundColor: 'unset',
          '&:hover': {
            backgroundColor: '#444'
          },
          '&>p': {
            color: configColors.primary.dark.main
          }
        }
      }
    }
  }
})

export default DarkTheme
