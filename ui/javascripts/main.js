//Strict Mode 
(function($) {
  "use strict";

//Run on Document Ready
$(document).ready(function(){  

  //Side menu - Open
  $('.side-menu-open').mouseenter(function(){
    $('.side-menu').animate({'left': '0px'}, 600, 'easeOutCubic');
  });

  //Side menu - Close
  $('#side-menu-close').click(function(){
    var sideWidth = $('.side-menu').outerWidth();
    var sideWidthClose = '-' + sideWidth + 'px';
    $('.side-menu').animate({'left': sideWidthClose}, 600, 'easeOutCubic');
  });

  //Smooth Scroll on anchor links
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 700, 'easeInOutExpo');
        return false;
      }
    }
  });


  //Bootstrap Scroll Spy
  $('[data-spy="scroll"]').each(function () {
    var $spy = $(this).scrollspy('refresh');
  });

  //Contact Form Validator and Ajax Sender
  $("#contactForm").validate({
    submitHandler: function(form) {
        var formdata = new FormData($('#contactForm').get(0));
      $.ajax({
        type: "POST",
        url: "php/contact-form.php",
        data: formdata,
        success: function (data) {
          if (data.response == "success") {
            $("#contactSuccess").fadeIn(300);
            $("#contactError").addClass("hidden");

            $("#contactForm #name, #contactForm #email, #contactForm #subject, #contactForm #message")
              .val("")
              .blur()
              .closest(".control-group")
              .removeClass("success")
              .removeClass("error");              
            
          } else {
            $("#contactError").fadeIn(300);
            $("#contactSuccess").addClass("hidden");
          }
        },error: function(data){
            $("#contactError").fadeIn(300);
            $("#contactSuccess").addClass("hidden");
        }

      });
    }
  });
  
    $.ajax({
        type: "GET",
        url: "http://satyabhushan.imad.hasura-app.io/trackUserAction/aboutme",
        data: formdata,
        success: function (data) {            
            console.log(data)
        },error: function(data){
            console.log(data)
        }
    })

  //Modal for Contact Form
  $('.modal-wrap').click(function(){
    $('.modal-wrap').fadeOut(300);
  });      

  //Background Height fix for vertical progress
  $( ".full-height" ).each(function() {
    var $stretch = $(this);
    $stretch.css({ height: $stretch.closest('.line').find('.content-wrap').height() });
  }); 

});

})(jQuery);
