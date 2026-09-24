const Classes = {
  menuBtnActive: 'header__action-burger--active',
  menuListActive: 'header__menu-list--active',
  menuListAnimate: 'header__menu-list--animate',
  bodyOverflow: 'body-overflow',
}

const getControlledElements = () => {
  const burgerMenuBtn = document.querySelector('.header__action-burger')
  const burgerMenuList = document.querySelector('.header__menu-list')
  const body = document.body

  return {
    burgerMenuBtn,
    burgerMenuList,
    body,
  }
}

const toggleClass = (element, className) => {
  element.classList.toggle(className)
}

const addClass = (element, className) => {
  element.classList.add(className)
}

const removeClass = (element, className) => {
  element.classList.remove(className)
}

const closeBurgerMenu = () => {
  const { burgerMenuBtn, burgerMenuList, body } = getControlledElements()

  removeClass(burgerMenuBtn, Classes.menuBtnActive)
  removeClass(burgerMenuList, Classes.menuListActive)
  removeClass(body, Classes.bodyOverflow)

  addClass(burgerMenuList, Classes.menuListAnimate)
}

const handleClickMenuLink = (e) => {
  const menuLink = e.target.closest('.header__menu-link')

  if (menuLink) {
    closeBurgerMenu()
  }
}

const initBurgerMenu = () => {
  const { burgerMenuBtn, burgerMenuList, body } = getControlledElements()

  burgerMenuBtn.addEventListener('click', () => {
    toggleClass(burgerMenuBtn, Classes.menuBtnActive)
    toggleClass(burgerMenuList, Classes.menuListActive)

    addClass(burgerMenuList, Classes.menuListAnimate)
    addClass(body, Classes.bodyOverflow)
  })

  burgerMenuList.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'transform') {
      removeClass(burgerMenuList, Classes.menuListAnimate)
    }
  })
  burgerMenuList.addEventListener('click', handleClickMenuLink)

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      removeClass(burgerMenuBtn, Classes.menuBtnActive)
      removeClass(burgerMenuList, Classes.menuListActive)

      removeClass(body, Classes.bodyOverflow)
    }
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.activeElement === burgerMenuBtn) {
      closeBurgerMenu()

      burgerMenuBtn.blur()
    }
  })
}

export default initBurgerMenu
