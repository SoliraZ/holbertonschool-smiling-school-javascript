$(document).ready(function () {
  initQuotesCarousel();
});


function initQuotesCarousel() {
  var $quotesSection = $('.quotes.section');
  if ($quotesSection.length === 0) {
    return;
  }

  var $loader = $('#quotes-loader');
  var $carousel = $('#quotes-carousel');
  var $carouselInner = $carousel.find('.carousel-inner');

  $loader.show();
  $carousel.addClass('d-none');

  $.ajax({
    url: 'https://smileschool-api.hbtn.info/quotes',
    method: 'GET',
    dataType: 'json',
  })
    .done(function (quotes) {
      $carouselInner.empty();

      $.each(quotes, function (index, quote) {
        var $item = $('<div>').addClass('carousel-item');
        if (index === 0) {
          $item.addClass('active');
        }

        var $row = $('<div>')
          .addClass('row mx-auto align-items-center')
          .appendTo($item);

        var $imgCol = $('<div>')
          .addClass('col-12 col-sm-2 col-lg-2 offset-lg-1 text-center')
          .appendTo($row);

        $('<img>')
          .addClass('d-block align-self-center quote-avatar')
          .attr('src', quote.pic_url || '')
          .attr('alt', quote.name || 'Quote profile')
          .appendTo($imgCol);

        var $textCol = $('<div>')
          .addClass('col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0')
          .appendTo($row);

        var $quoteText = $('<div>').addClass('quote-text').appendTo($textCol);

        $('<p>')
          .addClass('text-white quote-text-content')
          .text('« ' + (quote.text || '') + ' »')
          .appendTo($quoteText);

        $('<h4>')
          .addClass('text-white font-weight-bold quote-author')
          .text(quote.name || '')
          .appendTo($quoteText);

        $('<span>')
          .addClass('text-white quote-title')
          .text(quote.title || '')
          .appendTo($quoteText);

        $carouselInner.append($item);
      });

      if (quotes && quotes.length > 0) {
        $loader.hide();
        $carousel.removeClass('d-none');
      }
    })
    .fail(function () {
      $loader.hide();
    });
}

