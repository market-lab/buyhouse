
/* Menu Controls */

$( document ).ready(function(){
    $('.menu-icon').click( function(){
        $('.sidenav').width('90%');
        $('#menu-effect').fadeIn(800);
    });

    $('.closebtn, #mySidenav a').click( function(){
        $('.sidenav').width('0');
        $('#menu-effect').fadeOut(100);
    });

    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').focus()
    })

    $('.step-card-1').click(function () {
      $('.step-card-1').toggleClass("step-hover");
      $('.step-card-2').removeClass("step-hover");
      $('.step-card-3').removeClass("step-hover");
    });

    $('.step-card-2').click(function () {
      $('.step-card-2').toggleClass("step-hover");
      $('.step-card-1').removeClass("step-hover");
      $('.step-card-3').removeClass("step-hover");
    });

    $('.step-card-3').click(function () {
      $('.step-card-3').toggleClass("step-hover");
      $('.step-card-1').removeClass("step-hover");
      $('.step-card-2').removeClass("step-hover");
    });

    /* Smooth Scroll */
    $(function() {
       $('.smooth-scroll').click(function() {
         if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
           var target = $(this.hash);
           target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html, body').animate({
               scrollTop: target.offset().top - $('nav').height()
             }, 1200);
             return false;
           }
         }
       });
     });

    $('form').on('submit', function() {
        event.preventDefault();
        var $form = $(this);

        // Group lead form information
        var lead = {
            'title': "Marketlab",
            'person_id': $form.find('input[name="name"]').val().toString(),
            'f15b83bc3c4fc9a1cb7a9822a1bfc868ec5455a2': $form.find('input[name="phone"]').val().toString(),
            '49ab34054a1744140276442017c55eabd90fbe87': $form.find('input[name="email"]').val().toString()
        }

        // Send a AJAX POST request to database
        $.ajax({
            type: 'POST',
            url: 'https://api.pipedrive.com/v1/deals?api_token=566e4ed8f9e50b101a4f2525a349cf8c47f9041c',
            data: lead,
            dataType: 'json',
            cache: false,
            beforeSend: function() {
                $('button').prop('disabled', true);
            }
        }).done(function() {
            $('#sent-data').modal('show');
            document.getElementById($form.attr('id')).reset();
            $('button').prop('disabled', false);
        }).fail(function() {
            alert("Ops, some problem happened with your contact. Please, try again.");
            $('button').prop('disabled', false);
        });
    });
})