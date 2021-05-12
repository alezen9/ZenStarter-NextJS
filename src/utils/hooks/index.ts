import { DraggableListHooks } from "./draggableList"
import { ZenAppFlowHooks } from "./appFlow"
import { UtilsHooks } from "./utils"
import { AsyncSearchHooks } from './asyncSearch'

class ZenHooks {
   app: ZenAppFlowHooks
   draggable: DraggableListHooks
   asyncSearch: AsyncSearchHooks
   utils: UtilsHooks

   constructor () {
      this.app = new ZenAppFlowHooks()
      this.draggable = new DraggableListHooks()
      this.asyncSearch = new AsyncSearchHooks()
      this.utils = new UtilsHooks()
   }
}

const zenHooks = new ZenHooks()
export default zenHooks