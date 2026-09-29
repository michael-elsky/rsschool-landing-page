export const addClass = (element, ...classNames) => {
  classNames
    .flat()
    .filter((className) => {
      return typeof className === 'string' && className.trim() !== ''
    })
    .forEach((className) => {
      element.classList.add(className)
    })
}

export const removeClass = (element, ...classNames) => {
  classNames.forEach((className) => {
    element.classList.remove(className)
  })
}

export const toggleClass = (element, className) => {
  element.classList.toggle(className)
}

export const addAttributes = (element, attributes) => {
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}
