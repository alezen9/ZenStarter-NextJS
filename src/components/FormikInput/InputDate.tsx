import React from 'react'
import DateFnsUtils from '@date-io/dayjs'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { get } from 'lodash'
import { FormHelperText, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { ThemeType, ZenPalette } from '@_MUITheme'
import dayjs, { Dayjs } from 'dayjs'

const useStyles = makeStyles(theme => ({
   textField: {
      width: '100%',
      '& fieldset': {
         borderColor: (props: any) => props.error
            ? '#ff443a'
            : ZenPalette.borderColor
      },
      '& label': {
         color: (props: any) => props.error
            ? '#ff443a'
            : ZenPalette.typographyGrey
      }
   },
   popover: theme.type === ThemeType.dark
      ? {
         '& .MuiPickersBasePicker-pickerView *:not(.MuiPickersYear-yearSelected)': {
            color: ZenPalette.typographyGrey,
            '& .MuiPickersDay-daySelected *': {
               color: '#fff'
            }
         },
         '& .MuiPickersBasePicker-pickerView *': {
            '& .MuiPickersCalendarHeader-switchHeader button': {
               backgroundColor: ZenPalette.paperBackgroundColor
            }
         }
      }
      : {}
}))


type Props = {
   id: string
   label: string
   onChange: (e: any) => void
   values: any
   name: string
   disabled?: boolean
   errors: any
   minDate?: Dayjs
   maxDate?: Dayjs
}

const InputDate: React.FC<Props> = props => {
   const { id, label, onChange, values, name, disabled = false, errors, minDate, maxDate } = props
   const classes = useStyles({ error: !!get(errors, name, null) })
   const theme = useTheme()
   const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

   return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
         <>
            <KeyboardDatePicker
               DialogProps={{
                  className: classes.popover
               }}
               disabled={disabled}
               margin='normal'
               label={label}
               clearable
               animateYearScrolling
               inputVariant='outlined'
               format="DD/MM/YYYY"
               orientation={isSmallScreen ? 'portrait' : 'landscape'}
               autoOk
               value={get(values, name, null) && dayjs(get(values, name, null))}
               onChange={onChange}
               {...minDate && { minDate }}
               {...maxDate && { maxDate }}
               invalidDateMessage=''
               KeyboardButtonProps={{
                  'aria-label': 'change date',
               }}
               className={classes.textField}
            />
            {get(errors, name, false) && <FormHelperText margin='dense' id={`${id}_error`}>{get(errors, name, '')}</FormHelperText>}
         </>
      </MuiPickersUtilsProvider>
   )
}

export default React.memo(InputDate)
