// Make sure the full work is shown.
if($('.work.navigation .chapter.entire').length>0){location = location.href.split('/chapters/')[0]+'?view_full_work=true';} else {
	var author = $('.byline').text().trim();
	var title = $('.title.heading').text().trim();
	$('#workskin .preface, #workskin .landmark').remove();
		if($('#download_text').length===0){
			jQuery('body').prepend('<textarea id="download_text"></textarea>');
		}
	$('#workskin .userstuff').each(function() {
		// Strip extra spaces, html tags, and extra line breaks.
		$('#download_text').val($('#download_text').val() + $(this).html().replace(/^\s+|\s+$/gm, "").replace(/<\/p>/g, '\n').replace().replace(/<[^>]*>?/gm, '').replace(/\n+/g, '\n\n').replace(/^ +/gm, ''));
	});

	download(jQuery('#download_text').val(),author+' - '+title,'text/plain');

	// Function to download data to a file
	// Code from Kanchu (https://stackoverflow.com/a/30832210)
	function download(data, filename, type) {
		var file = new Blob([data], {type: type});
		if (window.navigator.msSaveOrOpenBlob) // IE10+
			window.navigator.msSaveOrOpenBlob(file, filename);
		else { // Others
			var a = document.createElement("a"),
			url = URL.createObjectURL(file);
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			setTimeout(function() {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
			}, 0); 
		}
	}
}
