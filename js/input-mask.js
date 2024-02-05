import IMask from 'imask';

const setDateMask = (selector) => {
  IMask(
    document.querySelector(selector),
    {
      mask: Date,
      lazy: false,
      autofix: true,
      blocks: {
        d: { mask: IMask.MaskedRange, placeholderChar: '#', from: 1, to: 31, maxLength: 2 },
        m: { mask: IMask.MaskedRange, placeholderChar: '#', from: 1, to: 12, maxLength: 2 },
        Y: { mask: IMask.MaskedRange, placeholderChar: '#', from: 1000, to: 2030, maxLength: 4 }
      }
    }
  )
}

const setPeopleMask = (selector) => {
  IMask(
    document.querySelector(selector),
    {
      lazy: false,
      mask: 'num человек(а)',
      blocks: {
        num: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 9,
          autofix: 'pad',
          signed: true,
          placeholderChar: '#'
        }
      }
    }
  )
}

export { setDateMask, setPeopleMask };