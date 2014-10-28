$(function(){

$('a').click(function(evt){

  console.log(evt);
  console.log(evt.currentTarget.attributes['id']);
  var id = evt.currentTarget.attributes['id'].value;
  var url = "/samples/" + id;


$.get( url, function( data ) {

   console.log(data);
   window.open(data.url);
});
/*
$.ajax({
    url: url,
    type: "GET",
    cache: false,
    success: function() {
        // Success message
        $('#success').html("<div class='alert alert-success'>");
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
        $('#success > .alert-success')
            .append("<strong>Code it </strong>");
        $('#success > .alert-success')
            .append('</div>');

        //clear all fields
        $('#contactForm').trigger("reset");
    },
    error: function() {
        // Fail message
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
        $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
        $('#success > .alert-danger').append('</div>');
        //clear all fields
        $('#contactForm').trigger("reset");
    },
})*/
})
})
