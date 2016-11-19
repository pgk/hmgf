// Utilities

// Extend a with the rest
export const extend = (a, b, ...rest) => {
  let extendTwo = (a, b) => {
    Object.keys(b).forEach(k => {
      a[k] = b[k]
    })
    return a
  }

  if (rest.length === 0) {
    return extendTwo(a, b)
  }
  let c = rest.shift()
  return extendTwo(a, extendTwo(b, c, rest))
}
