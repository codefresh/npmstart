$(function () {

	$('a').click(function (evt) {

		console.log(evt);
		console.log(evt.currentTarget.attributes['id']);
		var id = evt.currentTarget.attributes['id'].value;
		var url = "/samples/" + id;
		var intevalHandle;

		$.get(url, function (data) {

			console.log(data);
			window.open(data.url);
			clearInterval(intevalHandle);
			progress(0);
		});

		var value = 0.0;
		var el = $("#progress");
		var counter = 0;
		intevalHandle = setInterval(function () {
			value = value + 0.05;
			if (value > 1)
				value = 0;
			progress(value);
			counter++;
			//$(el).find('strong').html('<i>elapsed :</i>' + parseInt(counter) + '<i>sec</i>');
		}, 50)

		function progress(val) {

			$('#progress').circleProgress({
				size: 40,
				startAngle: -Math.PI / 4 * 3,
				value: val,
				animation: false,
				fill: {gradient: ['#ff1e41', '#ff5f43']}
			}).on('circle-animation-progress', function (event, progress) {
				$(this).find('strong').html(parseInt(100 * progress) + '<i>%</i>');
			});

		}

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
