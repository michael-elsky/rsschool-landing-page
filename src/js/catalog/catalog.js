import { fetchData } from './fetchData'

import cardCreator from './cardCreator'
import { addClass, removeClass, toggleClass } from '../utils'

const Category = {
  COFFEE: 'coffee',
  DESSERT: 'dessert',
  TEA: 'tea',
}

const CARDS_LIMIT = 4

let cachedHTMLElements = null
let isDesktop = true

const getControlledElements = () => {
  if (!cachedHTMLElements) {
    cachedHTMLElements = {
      tabsList: document.querySelector('.catalog__tabs-list'),
      productGrid: document.querySelector('.catalog__products'),
      showMoreBtn: document.querySelector('.catalog__show-more'),
    }
  }

  return cachedHTMLElements
}

const renderContent = (products, category = Category.COFFEE) => {
  const { productGrid } = getControlledElements()

  const filteredCategoryProducts = filterProductsCategory(products, category)

  const cards = cardsRender(filteredCategoryProducts)

  productGrid.innerHTML = ''
  productGrid.append(...cards)

  updateVisibleCards()
}

const setActiveTab = (button) => {
  const { tabsList } = getControlledElements()

  const tabs = [...tabsList.children]

  tabs.forEach((tab) => {
    tab.firstChild.classList.remove('catalog__tab--active')
  })

  button.classList.add('catalog__tab--active')
}

const handleSwitchCategory = (e, products) => {
  const button = e.target.closest('.catalog__tab')
  const category = button.textContent.toLowerCase()

  setActiveTab(button)

  renderContent(products, category)
}

const filterProductsCategory = (products, category = Category.COFFEE) => {
  return products.filter((product) => product.category === category)
}

const updateVisibleCards = () => {
  const { productGrid } = getControlledElements()

  const cards = [...productGrid.children]

  cards.forEach((card, i) => {
    if (isDesktop || i < CARDS_LIMIT) {
      removeClass(card, 'catalog__product--hidden')
    } else {
      addClass(card, 'catalog__product--hidden')
    }
  })

  showMoreBtnDisplay()
}

const cardsRender = (filteredProducts) => {
  const cards = filteredProducts.map((product) => {
    return cardCreator({
      image: product.image,
      name: product.name,
      description: product.description,
      price: product.price,
    })
  })

  return cards
}

const handleShowMoreClick = () => {
  const { productGrid, showMoreBtn } = getControlledElements()

  const cards = [...productGrid.children]

  cards.forEach((card, i) => {
    if (i >= CARDS_LIMIT) {
      removeClass(card, 'catalog__product--hidden')
    }
  })

  addClass(showMoreBtn, 'catalog__show-more--hidden')
}

const showMoreBtnDisplay = (products) => {
  const { showMoreBtn, productGrid } = getControlledElements()

  const hasHidden = productGrid.querySelector('.catalog__product--hidden')

  if (hasHidden) {
    removeClass(showMoreBtn, 'catalog__show-more--hidden')
  } else {
    addClass(showMoreBtn, 'catalog__show-more--hidden')
  }
}

const screenChange = () => {
  const { showMoreBtn } = getControlledElements()

  const mediaQuery = window.matchMedia('(max-width: 768px)')

  const handleScreenChange = (e) => {
    isDesktop = !e.matches

    updateVisibleCards()
  }

  mediaQuery.addEventListener('change', handleScreenChange)

  handleScreenChange(mediaQuery)
}

const initCatalog = async () => {
  const { tabsList, showMoreBtn } = getControlledElements()

  const products = await fetchData('data/products.json')

  renderContent(products)

  screenChange()

  showMoreBtn.addEventListener('click', handleShowMoreClick)
  tabsList.addEventListener('click', (e) => handleSwitchCategory(e, products))
}

initCatalog()
