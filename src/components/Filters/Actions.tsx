import { Button, Divider, Grid, IconButton } from '@material-ui/core'
import { get, uniqueId } from 'lodash'
import React, { ReactNode } from 'react'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined'

export type Action = {
    type?: 'button'|'iconButton'
    icon?: ReactNode
    title?: string
    variant?: 'contained'|'outlined'
    iconPlacement?: 'start'|'end'
    onClick: VoidFunction
    color?: string
    materialColor?: 'primary'|'secondary'
}

type Props = {
    actions: Action[]
    showDivider?: boolean
}

const Actions = (props: Props) => {
    const { actions = [], showDivider = true } = props
    return (
        <>
            {actions.map(action => <Action key={uniqueId('action-')} action={action} />)}
            {actions.length && showDivider && <Divider style={{ marginLeft: '1em' }} orientation="vertical" flexItem />}
        </>
    )
}

type ActionProps = {
    action: Action
}

const Action = React.memo((props: ActionProps) => {
    const { 
        type = 'button',
        icon,
        title = '',
        variant = 'outlined',
        iconPlacement = 'start',
        onClick
    } = get(props, 'action', {} as Action)
    return (
        <Grid item>
            {type === 'button'
                ? <Button variant={variant} onClick={onClick}>
                    {iconPlacement === 'start' && icon ? icon : <></>}
                    {title}
                    {iconPlacement === 'end' && icon ? icon : <></>}
                </Button>
                : <IconButton onClick={onClick}>
                    {icon || <HelpOutlineOutlinedIcon />}
                </IconButton>}
        </Grid>
    )
})

export default React.memo(Actions)
