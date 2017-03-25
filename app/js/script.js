
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

    $('.step-card-header').click(function () {
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

        $('#loading').modal('show');

        var $form = $(this);

        // Group lead form information
        var lead = {
            'title': "Marketlab",
            'person_id': $form.find('input[name="name"]').val().toString(),
            '0f94af856946affa1bc35154710b168c74440b7f': $form.find('input[name="phone"]').val().toString(),
            '59c0a401c5cfd30d1ca8d865a83ce56617221102': $form.find('input[name="email"]').val().toString()
        }

        // Send a AJAX POST request to database
        $.ajax({
            type: 'POST',
            url: 'https://api.pipedrive.com/v1/deals?api_token=2dbe67833ce1eb6b5f496ec588dfac2f9463447b',
            data: lead,
            dataType: 'json',
            cache: false,
            beforeSend: function() {
              $('button').prop('disabled', true);
            }
        }).done(function() {
            $('#loading').modal('toggle');
            window.location.replace("/thanks.html");
            $('button').prop('disabled', false);
        }).fail(function() {
            $('#loading').modal('toggle');
            $("#error-modal").modal('show');
            $('button').prop('disabled', false);
        });
    });
})