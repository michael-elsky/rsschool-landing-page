const THEME_KEY = 'theme'
const THEME_DARK_CLASS = 'dark'

const getButtons = () => {
  const btnLight = document.querySelector('.header__actions-theme__btn-light')
  const btnDark = document.querySelector('.header__actions-theme__btn-dark')

  return {
    btnLight,
    btnDark,
  }
}

const updateButtons = (theme) => {
  const { btnLight, btnDark } = getButtons()
  const isDark = theme === THEME_DARK_CLASS

  btnLight?.classList.toggle(
    'header__actions-theme__btn-light--active',
    !isDark
  )
  btnDark?.classList.toggle('header__actions-theme__btn-dark--active', isDark)

  btnLight?.setAttribute('aria-pressed', !isDark)
  btnDark?.setAttribute('aria-pressed', isDark)
}

const applyTheme = (theme) => {
  const isDark = theme === THEME_DARK_CLASS

  const { btnLight, btnDark } = getButtons()

  document.documentElement.classList.toggle(THEME_DARK_CLASS, isDark)

  localStorage.setItem(THEME_KEY, theme)

  updateButtons(theme)
}

const initTheme = () => {
  const isDark = document.documentElement.classList.contains(THEME_DARK_CLASS)
  updateButtons(isDark ? 'dark' : 'light')

  const { btnLight, btnDark } = getButtons()

  btnLight.addEventListener('click', () => applyTheme('light'))
  btnDark.addEventListener('click', () => applyTheme(THEME_DARK_CLASS))
}

export default initTheme
