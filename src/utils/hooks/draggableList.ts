import { DraggableObject } from "@_components/DraggableList"
import produce from "immer"
import { get } from "lodash"
import { useCallback, useState } from "react"
import { DraggableLocation, DropResult } from "react-beautiful-dnd"

enum ListId {
   First = 'First',
   Second = 'Second'
}

type DraggableListConfig = {
  initialDataFirstList?: DraggableObject[]
  initialDataSecondList?: DraggableObject[]
}

export class DraggableListHooks {
   useDoubleDraggableList = (config: DraggableListConfig) => {
      const { initialDataFirstList = [], initialDataSecondList = [] } = config
      const [firstList, setFirstList] = useState<DraggableObject[]>(initialDataFirstList)
      const [secondList, setSecondList] = useState<DraggableObject[]>(initialDataSecondList)

      const reorder = useCallback((list: DraggableObject[], startIndex: number, endIndex: number) => {
         return produce(list, draft => {
            const [removed] = draft.splice(startIndex, 1)
            draft.splice(endIndex, 0, removed)
         })
      }, [])

      const move = useCallback((source: DraggableObject[], destination: DraggableObject[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
         const sourceClone = [...source]
         const destClone = [...destination]
         const [removed] = sourceClone.splice(droppableSource.index, 1)
         destClone.splice(droppableDestination.index, 0, removed)
         return {
            [droppableSource.droppableId]: sourceClone,
            [droppableDestination.droppableId]: destClone
         }
      }, [])

      const onDragEnd = useCallback((result: DropResult) => {
         const { source, destination } = result
         // dropped outside the list
         if (!destination) return

         const sourceList = source.droppableId === ListId.First ? firstList : secondList
         const destinationList = destination.droppableId === ListId.First ? firstList : secondList

         if (source.droppableId === destination.droppableId) { // same list
            const newOrder = reorder(sourceList, source.index, destination.index)
            if(source.droppableId === ListId.First) setFirstList(newOrder)
            else setSecondList(newOrder)
         } else { // different list
            const newLists = move(
                  sourceList,
                  destinationList,
                  source,
                  destination
            )
            setFirstList(state => get(newLists, ListId.First, null) || state)
            setSecondList(state => get(newLists, ListId.Second, null) || state)
         }
      }, [JSON.stringify(firstList), JSON.stringify(secondList), move, reorder])

      return {
         firstList,
         secondList,
         firstID: ListId.First,
         secondID: ListId.Second,
         onDragEnd,
         setFirstList,
         setSecondList
      }
   }
}