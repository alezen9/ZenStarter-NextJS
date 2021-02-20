import { isUndefined, keys, has, get, entries, isObjectLike, isEqual } from 'lodash'

const deepDiff = (fromObject: Object, toObject: Object) => {
  const changes = {}

  const buildPath = (path: string, obj: Object, key: string) => isUndefined(path) ? key : `${path}.${key}`

  const walk = (fromObject: Object, toObject: Object, path?: string) => {
    for (const key of keys(fromObject)) {
      const currentPath = buildPath(path, fromObject, key)
      if (!has(toObject, key)) {
        changes[currentPath] = { from: get(fromObject, key) }
      }
    }

    for (const [key, to] of entries(toObject)) {
      const currentPath = buildPath(path, toObject, key)
      if (!has(fromObject, key)) {
        changes[currentPath] = { to }
      } else {
        const from = get(fromObject, key)
        if (!isEqual(from, to)) {
          if (isObjectLike(to) && isObjectLike(from)) {
            walk(from, to, currentPath)
          } else {
            changes[currentPath] = { from, to }
          }
        }
      }
    }
  }

  walk(fromObject, toObject)

  return changes
}
