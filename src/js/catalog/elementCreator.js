import { addAttributes, addClass } from '../utils'

const setChildren = (element, children = []) => {
  if (!children || (Array.isArray(children) && children.length === 0)) {
    return
  }

  if (typeof children === 'string' || typeof children === 'number') {
    element.textContent = children

    return
  }

  if (children instanceof Node) {
    element.append(children)

    return
  }

  if (Array.isArray(children) || children instanceof NodeList) {
    children.forEach((child) => {
      setChildren(element, child)
    })
  }
}

const elementCreator = ({
  tag,
  classNames = [],
  children = [],
  attributes = {},
}) => {
  const element = document.createElement(tag)

  addClass(element, [...classNames])

  addAttributes(element, attributes)

  setChildren(element, children)

  return element
}

export default elementCreator
