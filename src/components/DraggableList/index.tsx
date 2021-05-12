import React from 'react'
import { ZenPalette } from '@_MUITheme'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import DragHandleRoundedIcon from '@material-ui/icons/DragHandleRounded'
import { Grid, IconButton, makeStyles } from '@material-ui/core'
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded'

const useStyles = makeStyles(theme => ({
   list: {
      padding: '.3em',
      width: '100%',
      borderRadius: 5
   },
   item: {
      padding: (props: any) => props.withRemoveItem
         ? '.3em .7em'
         : '1em',
      borderRadius: 5,
      color: ZenPalette.typographyGrey
   },
   clear: {
      display: 'flex',
      marginLeft: '.5em',
      color: 'crimson'
   }
}))

export type DraggableObject = {
   id: string
   name: string
   value: any
   [field: string]: any
}

type Props = {
   _id: string,
   data: DraggableObject[]
   ListClassName?: string
   ItemClassName?: string
   onRemoveItem?: (idx: number) => VoidFunction
}

const DraggableList = (props: Props) => {
   const { _id, data = [], ListClassName = '', ItemClassName = '', onRemoveItem } = props
   const classes = useStyles({ withRemoveItem: !!onRemoveItem })
   return (
      <Droppable droppableId={_id}>
         {(provided, snapshot) => (
            <div
               ref={provided.innerRef}
               className={`${classes.list} ${ListClassName}`}>
               {data.map((item, index) => (
                  <Draggable
                     key={item.id}
                     draggableId={item.id}
                     index={index}>
                     {(provided, snapshot) => (
                        <div
                           ref={provided.innerRef}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}
                           className={`${classes.item} ${ItemClassName}`}
                           style={getItemStyle(snapshot.isDragging, provided.draggableProps.style, index === 0)}>
                           <Grid container spacing={3} justify='space-between' alignItems='center'>
                              <Grid item xs={8}>
                                 {item.name}
                              </Grid>
                              <Grid xs={4} item container alignItems='center' justify='flex-end'>
                                 <Grid item style={{ display: 'flex' }}>
                                    <DragHandleRoundedIcon />
                                 </Grid>
                                 {!!onRemoveItem && <Grid item className={classes.clear}>
                                    <IconButton onClick={onRemoveItem(index)}>
                                       <HighlightOffRoundedIcon />
                                    </IconButton>
                                 </Grid>}
                              </Grid>
                           </Grid>
                        </div>
                     )}
                  </Draggable>
               ))}
               {provided.placeholder}
            </div>
         )}
      </Droppable>
   )
}

export default React.memo(DraggableList)


const getItemStyle = (isDragging: boolean, draggableStyle, isFirst: boolean) => ({
   userSelect: 'none',
   ...!isFirst && {
      marginTop: '.3em'
   },
   backgroundColor: isDragging
      ? ZenPalette.draggableDraggingBackground
      : ZenPalette.draggableSteadyBackground,
   // styles we need to apply on draggables
   ...draggableStyle
})
