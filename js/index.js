(function($) {
  $('.header img').click((e) => {
    $('.action-sheet-modal').show()
    $('.action-sheet').addClass('up')
    e.stopPropagation()
  })

  $('.action-sheet').click((e) => {
    e.stopPropagation()
  })

  $(document).click(() => {
    $('.action-sheet-modal').hide()
    $('.action-sheet').removeClass('up')
  })
})(Zepto)

//# sourceMappingURL=../maps/index.js.map
