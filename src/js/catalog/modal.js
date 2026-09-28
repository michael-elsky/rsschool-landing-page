import { addClass } from '../utils'

let cachedHTMLElements = null

const getControlledElements = () => {
  if (!cachedHTMLElements) {
    cachedHTMLElements = {
      modal: document.querySelector('.modal'),
      img: document.querySelector('.modal__img img'),
      heading: document.querySelector('.modal__info-name'),
      description: document.querySelector('.modal__info-description'),
      propertyHeading: document.querySelectorAll(
        '.modal__info-property-heading'
      ),
      propertyList: document.querySelectorAll('.modal__info-property-list'),
      propertyBtns: [
        ...document.querySelectorAll('.modal__info-property-item'),
      ],
      totalPrice: document.querySelector('.modal__info-total-price'),
    }
  }

  return cachedHTMLElements
}

const handleSwitchProperty = (e, type, product) => {
  const btn = e.target.closest('.modal__info-property-btn')
}

const renderModal = (product) => {
  const {
    modal,
    img,
    heading,
    description,
    propertyHeading,
    propertyList,
    propertyBtns,
    totalPrice,
  } = getControlledElements()

  addClass(modal, 'modal--open')

  img.src = product.image
  img.alt = product.name
  heading.textContent = product.name
  description.textContent = product.description
  propertyHeading[0].textContent = 'Size'
  propertyHeading[1].textContent = 'Additives'

  Object.entries(product.sizes).forEach(([key, value], i) => {
    propertyBtns[i].querySelector('.modal__info-property-icon').textContent =
      key.toUpperCase()
    propertyBtns[i].querySelector('.modal__info-property-text').textContent =
      value.size
  })

  totalPrice.textContent = `$${product.price}`

  propertyList[0].addEventListener('click', () =>
    handleSwitchProperty(e, 'size', product)
  )
  propertyList[1].addEventListener('click', () =>
    handleSwitchProperty(e, 'additives', product)
  )
}

export default renderModal
