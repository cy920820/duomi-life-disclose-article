(function($) {
  $('.header img').click((e) => {
    $('.action-sheet-modal').show()
    $('.action-sheet').addClass('up')
    e.stopPropagation()
  })

  $('.action-sheet').click((e) => {
    e.stopPropagation()
  })

  $('div').parents().click(() => {
    $('.action-sheet-modal').hide()
    $('.action-sheet').removeClass('up')
  })
})(Zepto)
