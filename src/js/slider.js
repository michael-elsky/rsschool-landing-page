let cachedHTMLElements = null
let currentIndex = 1
let transition = 0.4
let isAnimating = false

const getControlledElements = () => {
  if (!cachedHTMLElements) {
    cachedHTMLElements = {
      btnLeft: document.querySelector('.favorite-coffee__btn-left'),
      btnRight: document.querySelector('.favorite-coffee__btn-right'),
      viewport: document.querySelector('.favorite-coffee__viewport'),
      sliderTrack: document.querySelector('.favorite-coffee__slider-track'),
      sliderItems: [
        ...document.querySelectorAll('.favorite-coffee__slider-item'),
      ],
      slidesMarker: [
        ...document.querySelectorAll('.favorite-coffee__control-item'),
      ],
    }
  }

  return cachedHTMLElements
}

const setupClones = () => {
  const { sliderTrack, sliderItems } = getControlledElements()

  sliderTrack.append(sliderItems[0].cloneNode(true))
  sliderTrack.prepend(sliderItems.at(-1).cloneNode(true))
}

const handleTrackTransitionEnd = (e) => {
  if (e.propertyName !== 'transform') {
    return
  }

  const { sliderItems } = getControlledElements()

  const realItemsLength = sliderItems.length

  if (currentIndex === realItemsLength + 1) {
    currentIndex = 1

    moveSliderTrack(currentIndex, false)
  }

  if (currentIndex === 0) {
    currentIndex = realItemsLength

    moveSliderTrack(currentIndex, false)
  }

  isAnimating = false
}

const moveSliderTrack = (currentIndex, animate = true) => {
  const { sliderTrack, viewport } = getControlledElements()

  const sliderItemWidth = viewport.clientWidth

  sliderTrack.style.transition = animate
    ? `transform ${transition}s ease`
    : 'none'

  sliderTrack.style.transform = `translateX(-${currentIndex * sliderItemWidth}px)`
}

const moveSliderMarker = (currentIndex) => {
  const { slidesMarker, sliderItems } = getControlledElements()

  const realSlidesCount = sliderItems.length

  const markerIndex = (currentIndex - 1 + realSlidesCount) % realSlidesCount

  slidesMarker.forEach((slideMarker, i) => {
    slideMarker.classList.toggle(
      'favorite-coffee__control-item--active',
      markerIndex === i
    )
  })
}

const handleSlideLeft = () => {
  if (isAnimating) {
    return
  }

  isAnimating = true

  currentIndex--

  moveSliderTrack(currentIndex)
  moveSliderMarker(currentIndex)
}

const handleSlideRight = () => {
  if (isAnimating) {
    return
  }

  isAnimating = true

  currentIndex++

  moveSliderTrack(currentIndex)
  moveSliderMarker(currentIndex)
}

let startX = 0

const syncSlideMetrics = () => {
  const { sliderTrack, viewport } = getControlledElements()

  const step = viewport.clientWidth
  const total = sliderTrack.children.length

  sliderTrack.style.width = `${step * total}px`

  sliderTrack
    .querySelectorAll('.favorite-coffee__slider-item')
    .forEach((item) => {
      item.style.width = `${step}px`
    })

  moveSliderTrack(currentIndex, false)
}

const initSlider = () => {
  const { btnLeft, btnRight, sliderTrack } = getControlledElements()

  setupClones()
  syncSlideMetrics()

  sliderTrack.addEventListener('transitionend', handleTrackTransitionEnd)
  btnLeft.addEventListener('click', handleSlideLeft)
  btnRight.addEventListener('click', handleSlideRight)

  sliderTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX
  })

  sliderTrack.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX
    const diff = startX - endX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleSlideRight()
      } else {
        handleSlideLeft()
      }
    }
  })

  window.addEventListener('resize', () => {
    syncSlideMetrics()

    isAnimating = false
  })
}

initSlider()
