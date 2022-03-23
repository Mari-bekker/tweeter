$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let textLength = $(this).val().length;
    //console.log(textLength); 
    $(".counter").text (140 - textLength);
    if (textLength > 140 ) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
})