$(document).ready(function(){$(".menu-icon").click(function(){$(".sidenav").width("90%"),$("#menu-effect").fadeIn(800)}),$(".closebtn, #mySidenav a").click(function(){$(".sidenav").width("0"),$("#menu-effect").fadeOut(100)}),$("#myModal").on("shown.bs.modal",function(){$("#myInput").focus()}),$(".trigger-hover").click(function(){$(".step-card-1").toggleClass("step-hover"),$(".step-card-2").removeClass("step-hover"),$(".step-card-3").removeClass("step-hover")}),$(".step-card-2").click(function(){$(".step-card-2").toggleClass("step-hover"),$(".step-card-1").removeClass("step-hover"),$(".step-card-3").removeClass("step-hover")}),$(".step-card-3").click(function(){$(".step-card-3").toggleClass("step-hover"),$(".step-card-1").removeClass("step-hover"),$(".step-card-2").removeClass("step-hover")}),$(function(){$(".smooth-scroll").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=$(this.hash);if(e=e.length?e:$("[name="+this.hash.slice(1)+"]"),e.length)return $("html, body").animate({scrollTop:e.offset().top-$("nav").height()},1200),!1}})}),$("form").on("submit",function(){event.preventDefault(),$("#loading").modal("show");var e=$(this),t={title:"Marketlab",person_id:e.find('input[name="name"]').val().toString(),"0f94af856946affa1bc35154710b168c74440b7f":e.find('input[name="phone"]').val().toString(),"59c0a401c5cfd30d1ca8d865a83ce56617221102":e.find('input[name="email"]').val().toString()};$.ajax({type:"POST",url:"https://api.pipedrive.com/v1/deals?api_token=2dbe67833ce1eb6b5f496ec588dfac2f9463447b",data:t,dataType:"json",cache:!1,beforeSend:function(){$("button").prop("disabled",!0)}}).done(function(){$("#loading").modal("toggle"),window.location.replace("/thanks.html"),$("button").prop("disabled",!1)}).fail(function(){$("#loading").modal("toggle"),$("#error-modal").modal("show"),$("button").prop("disabled",!1)})})});