const Classes = {
  menuBtnActive: 'header__action-burger--active',
  menuListActive: 'header__menu-list--active',
  menuListAnimate: 'header__menu-list--animate',
  bodyOverflow: 'body-overflow',
}

let cachedHTMLElements = null

const getControlledElements = () => {
  if (!cachedHTMLElements) {
    cachedHTMLElements = {
      burgerMenuBtn: document.querySelector('.header__action-burger'),
      burgerMenuList: document.querySelector('.header__menu-list'),
      menuLinks: [...document.querySelectorAll('.header__menu-link')],
      body: document.body,
    }
  }

  return cachedHTMLElements
}

const addClass = (element, ...classNames) => {
  classNames.forEach((className) => {
    element.classList.add(className)
  })
}

const removeClass = (element, ...classNames) => {
  classNames.forEach((className) => {
    element.classList.remove(className)
  })
}

const addAttributes = (element, attributes) => {
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

const openBurgerMenu = () => {
  const { burgerMenuBtn, burgerMenuList, body } = getControlledElements()

  addClass(burgerMenuBtn, Classes.menuBtnActive)
  addClass(burgerMenuList, Classes.menuListActive)
  addClass(body, Classes.bodyOverflow)

  addClass(burgerMenuList, Classes.menuListAnimate)

  addAttributes(burgerMenuBtn, { 'aria-expanded': true })
}

const closeBurgerMenu = (animate = true) => {
  const { burgerMenuBtn, burgerMenuList, body } = getControlledElements()

  if (!burgerMenuList.classList.contains(Classes.menuListActive)) {
    return
  }

  removeClass(burgerMenuBtn, Classes.menuBtnActive)
  removeClass(burgerMenuList, Classes.menuListActive)
  removeClass(body, Classes.bodyOverflow)

  if (animate) {
    addClass(burgerMenuList, Classes.menuListAnimate)
  }

  addAttributes(burgerMenuBtn, { 'aria-expanded': false })
}

const toggleBurgerMenu = () => {
  const { burgerMenuBtn, burgerMenuList } = getControlledElements()

  if (burgerMenuList.classList.contains(Classes.menuListActive)) {
    closeBurgerMenu()
  } else {
    openBurgerMenu()
  }
}

const handleEndOfAnimation = (e) => {
  const { burgerMenuList, menuLinks } = getControlledElements()

  if (e.target === burgerMenuList && e.propertyName === 'transform') {
    removeClass(burgerMenuList, Classes.menuListAnimate)
  }


  if (burgerMenuList.classList.contains(Classes.menuListActive)) {
    menuLinks[0]?.focus()
  }
}

const handleWindowResize = () => {
  const { burgerMenuBtn, burgerMenuList, body } = getControlledElements()

  if (
    window.innerWidth > 768 &&
    burgerMenuList.classList.contains(Classes.menuListActive)
  ) {
    closeBurgerMenu(false)
  }
}

const handleClickMenuLink = (e) => {
  const menuLink = e.target.closest('.header__menu-link')

  if (menuLink) {
    closeBurgerMenu()
  }
}

const handleKeyBoardActions = (e) => {
  const { burgerMenuBtn, burgerMenuList, menuLinks } = getControlledElements()

  const firstMenuLink = menuLinks[0]
  const lastMenuLink = menuLinks.at(-1)

  const isMenuOpen = burgerMenuList.classList.contains(Classes.menuListActive)

  if (!isMenuOpen) {
    return
  }

  if (e.key === 'Escape') {
    closeBurgerMenu()

    return
  }

  if (e.key !== 'Tab') {
    return
  }

  if (e.shiftKey && document.activeElement === firstMenuLink) {
    e.preventDefault()

    lastMenuLink.focus()
  }

  if (!e.shiftKey && document.activeElement === lastMenuLink) {
    e.preventDefault()

    firstMenuLink.focus()
  }
}

const initBurgerMenu = () => {
  const { burgerMenuBtn, burgerMenuList, body } = getControlledElements()

  burgerMenuBtn.addEventListener('click', toggleBurgerMenu)

  burgerMenuList.addEventListener('transitionend', handleEndOfAnimation)

  burgerMenuList.addEventListener('click', handleClickMenuLink)

  window.addEventListener('resize', handleWindowResize)

  window.addEventListener('keydown', handleKeyBoardActions)
}

export default initBurgerMenu
