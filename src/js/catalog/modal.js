import { addClass, removeClass } from '../utils'

let cachedHTMLElements = null

const getControlledElements = () => {
  if (!cachedHTMLElements) {
    cachedHTMLElements = {
      body: document.body,
      modal: document.querySelector('.modal'),
      modalWrapper: document.querySelector('.modal__wrapper'),
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
      price: {
        sizes: 0,
        additives: 0,
      },
      closeBtn: document.querySelector('.modal__info-btn'),
    }
  }

  return cachedHTMLElements
}

const handleSwitchProperty = (e, type, product) => {
  const { propertyList, totalPrice, price } = getControlledElements()

  const btn = e.target.closest('.modal__info-property-btn')

  if (!btn) {
    return
  }

  const list = type === 'size' ? propertyList[0] : propertyList[1]

  if (type === 'size') {
    const activeBtns = list.querySelectorAll(
      '.modal__info-property-btn--active'
    )

    const icon = btn
      .querySelector('.modal__info-property-icon')
      .textContent.toLowerCase()

    activeBtns.forEach((activeBtn) => {
      removeClass(activeBtn, 'modal__info-property-btn--active')
    })

    addClass(btn, 'modal__info-property-btn--active')

    price.sizes = +product['sizes'][icon]['add-price']
  }

  if (type === 'additives') {
    const activeBtns = list.querySelectorAll(
      '.modal__info-property-btn--active'
    )

    const icon =
      +btn
        .querySelector('.modal__info-property-icon')
        .textContent.toLowerCase() - 1

    activeBtns.forEach((activeBtn) => {
      removeClass(activeBtn, 'modal__info-property-btn--active')
    })

    addClass(btn, 'modal__info-property-btn--active')

    price.additives = +product['additives'][icon]['add-price']
  }

  const p = price.sizes + price.additives + +product.price

  totalPrice.textContent = `$${p.toFixed(2)}`
}

const closeModal = (e) => {
  const { body, propertyList, modal } = getControlledElements()

  propertyList[0]
    .querySelectorAll('.modal__info-property-btn')
    .forEach((item, i) => {
      if (i === 0) {
        addClass(item, 'modal__info-property-btn--active')
      } else {
        removeClass(item, 'modal__info-property-btn--active')
      }
    })

  propertyList[1]
    .querySelectorAll('.modal__info-property-btn')
    .forEach((item, i) => {
      removeClass(item, 'modal__info-property-btn--active')
    })

  removeClass(modal, 'modal--open')
  removeClass(body, 'body-overflow')
}

const renderModal = (product) => {
  const {
    body,
    modal,
    modalWrapper,
    img,
    heading,
    description,
    propertyHeading,
    propertyList,
    propertyBtns,
    totalPrice,
    closeBtn,
  } = getControlledElements()

  addClass(body, 'body-overflow')
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

  propertyList[0].addEventListener('click', (e) =>
    handleSwitchProperty(e, 'size', product)
  )
  propertyList[1].addEventListener('click', (e) =>
    handleSwitchProperty(e, 'additives', product)
  )

  closeBtn.addEventListener('click', closeModal)
  modal.addEventListener('click', closeModal)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--open')) {
      closeModal(e)
    }
  })

  modalWrapper.addEventListener('click', (e) => e.stopPropagation())
}

export default renderModal
