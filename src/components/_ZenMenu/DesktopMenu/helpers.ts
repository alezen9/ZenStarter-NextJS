import { cleanPathname } from "@_utils/helpers"
import { compact, take } from "lodash"

export const buildSubPath = (mainPath: string, subPath: string): string => {
   const subPaths = compact(subPath.split('/'))
   return mainPath
      .split('/')
      .map(el => el.startsWith(':') ? take(subPaths) : el)
      .join('/')
}

export const checkActivePage = (currentPath: string, itemPath: string): boolean => {
   if (currentPath === '/') return itemPath === '/'
   // first character is the slash / so we ignore it
   const [_, ...str] = cleanPathname(itemPath)
   const exp = `^\\/${str.length ? '+' : '+dashboard'}${str.join('')}`
   const testPath = new RegExp(exp)
   return testPath.test(currentPath)
}