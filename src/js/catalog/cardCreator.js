import elementCreator from './elementCreator'

const cardCreator = ({ image, name, description, price }) => {
  const img = elementCreator({
    tag: 'img',
    attributes: { src: image, alt: name },
  })

  const headingElement = elementCreator({
    tag: 'h2',
    classNames: ['catalog__product-heading'],
    children: name,
  })
  const textElement = elementCreator({
    tag: 'div',
    classNames: ['catalog__product-text'],
    children: description,
  })
  const priceElement = elementCreator({
    tag: 'div',
    classNames: ['catalog__product-price'],
    children: price,
  })

  const imgWrapper = elementCreator({
    tag: 'div',
    classNames: ['catalog__product-img'],
    children: [img],
  })

  const infoBlock = elementCreator({
    tag: 'div',
    classNames: ['catalog__product-info'],
    children: [headingElement, textElement, priceElement],
  })

  const article = elementCreator({
    tag: 'article',
    classNames: ['catalog__product'],
    children: [imgWrapper, infoBlock],
  })

  return article
}

export default cardCreator
