// Uses: jQuery
// For: fanfiction.net
// Date: May 25, 2021

// Get the things ready for the big show
$('body *').addClass('hidden_temp');
$('body').append('<style class="fanfiction_downloader">.hidden_temp{display:none;}.story_section{border:1px solid;padding:25px;}.fanfiction_downloader{margin: 25px;}.downloader_hidden{display:none;}#downloader_links{width:95%;height:250px}.story_section h2 {font-size:14px!important}</style>');
$('body').append('<div class="fanfiction_downloader"><h2>FanFiction Downloader by <a href="https://github.com/Ivavgunevhf/downloaders">Ivavgunevhf</a> | <span onclick="resetPage();" style="color:orange;text-decoration:underline;cursor:pointer;">Close</span></h2><p><strong>How To: </strong><br>- Paste the ffnet link into the textbox.<br>- For more than one, story return the line, and then paste the other link.<br>- If you get an error on download, its because the validation file check failed and chapters might be missing. Try again after a minute.<br>---> If the error doesnt go away, the code likely bugged out. (OOPS)<br>-----> Debug: $(\'.downloader_hidden\').show();<br>------> Dear LORD the TEXTAREAS!!!!</p><h3>Fic Links to Download:</h3><textarea id="downloader_links"></textarea> <button onclick="run()">RUN THE CODE</button> | <button onclick="$(\'.story_section button\').each(function(){$(this).click();})">DOWNLOAD ALL</button> (Wait a few before clicking!) | <button onclick="clearEntry();">Clear Downloads</button></div>');

var ficQueue = [];
var cached = [];

function resetPage() {
	$('body *').removeClass('hidden_temp');
	$('.fanfiction_downloader').remove();
}

function clearEntry() {
	$('#downloader_links').val('');
	$('.story_section').remove();
}

function createStorySection(id) {
	if ($('#'+id).length>0) {
		$('#'+id).remove();
	}
	$('body').append('<div class="fanfiction_downloader story_section" id="'+id+'"><h2>ID: '+id+'</h2><h3 class="downloader_hidden" >Start:</h3><textarea class="downloader_hidden" id="html_start'+id+'"></textarea><h3 class="downloader_hidden">Chapter Sections:</h3>');
}

function run() {
	var array_of_links = $('#downloader_links').val().split('\n');
	var uniqueIDs = [];
	$.each(array_of_links, function(i, el){
		if($.inArray(el, uniqueIDs) === -1) uniqueIDs.push(el);
	});

	for (var x in uniqueIDs) {
		var story_ID = getStoryId(uniqueIDs[x]);
		//console.log(uniqueIDs[x], story_ID);

		if (story_ID!=undefined) {
			createStorySection(story_ID);
			getStory('https://www.fanfiction.net/s/'+story_ID, story_ID);
		}
	}
	checkQueue();
}

function getStoryId(url) {
	if (url!=''&&url.indexOf('/s/')>=0&&url.indexOf('fanfiction.net')>=0) {
		return url.split('/s/')[1].split('/')[0];
	}
}

function queueFics(url) {
	if (ficQueue.indexOf(url)==-1) {ficQueue.push(url);}
}

function getStory(url, id){
	fetch(url)
	.then(function(response) {
		return response.text();
	})
	.then(function(html) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(html, "text/html");
		if (doc.querySelector('#profile_top button')!=null) { // Check that story still exists
			var numberOfChapters = doc.querySelectorAll('#chap_select option').length/2; // divison by 2; bc ffnet has two chapter selctors.
			
				if (numberOfChapters==0){numberOfChapters=1;}
			
			doc.querySelector('#profile_top button').remove(); // remove this then get the text.
			var storyInfo = doc.querySelector('#profile_top').textContent.replace(/ +/g,' ');
			var title = doc.querySelector('#profile_top b').textContent;
			var author = doc.querySelector('#profile_top a').textContent;
			var author_link = doc.querySelector('#profile_top a').href;
			var story_link = url+'/1/';
			var html_start = '<!DOCTYPE html>\n<html>\n<head>\n\t<title>'+title+' by '+author+'</title>\n\t<style>#origin_info{text-align:center;}#summary{border:1px solid;padding:15px;margin:15px;}.storytext{margin:35px}</style>\n</head>\n<body>\n\t<div id="origin_info">Orginally posted on FanFiction.Net at <a href="'+story_link+'">'+story_link+'</a> by <a href="'+author_link+'">'+author+'</a></div>\n\t';
			//console.log(html_start);
			$('#html_start'+id).val(html_start);
			$('#html_start'+id).val($('#html_start'+id).val()+'<div id="summary">'+storyInfo.replace(/\n/g,'<br>')+'</div>\n');
			// Update the header
			$('#'+id).find('h2').append(' - <span class="title">'+title+' by '+author.replace(/\./g,' ')+'</span> <button onclick="combiner('+id+');if(checkFile('+id+','+numberOfChapters+')){downloadFic('+id+');}else{alert(\''+title.replace(/'/g, '')+' - Not ready yet!\')}">Download</button>');
			for (var i=1;i<numberOfChapters+1;i++) { // BC this doesnt play nice make temp fields to hold the text before the great combining.
				//console.log(url+'/'+i);
				$('#'+id).append('<textarea id="Chapter_'+i+'_'+id+'" class="'+id+' downloader_hidden"></textarea>');
				queueFics(url+'/'+i);
			}
			$('#'+id).append('<h3 class="downloader_hidden">End:</h3><textarea class="downloader_hidden" id="html_end_'+id+'">\n</body>\n&lt;!-- Delete the following script tag and everything in it to remove the warning! --&gt;\n\t&lt;script&gt;var t = document.getElementById(&apos;summary&apos;).textContent;if (t.indexOf(&apos;Chapters: &apos;)&gt;=0){console.log(t.split(&apos;Chapters: &apos;)[1].split(&apos; -&apos;)[0]);if (t.split(&apos;Chapters: &apos;)[1].split(&apos; -&apos;)[0]!=document.querySelectorAll(&apos;.stor&apos;+&apos;ytext&apos;).length){alert(&apos;Error there might be missing! - To remove this warning edit the file and remove warning js.&apos;);}}else{if(document.querySelectorAll(&apos;.stor&apos;+&apos;ytext&apos;).length&lt;1){alert(&apos;Error there might be missing! - To remove this warning edit the file and remove warning js.&apos;);}}&lt;/script&gt;\n&lt;!-- Do not delete pass this point. --&gt;\n</html></textarea>');
		} else {
			// Doesn't exist.
			$('#'+id).find('h2').append(' - <a href="https://www.fanfiction.net/s/'+id+'/">This story</a> no longer exists!');
		}
	});
}

function runQueue() {
	var timer = setInterval(function(){
		if(ficQueue.length>0){
			stepQueue();
		}
	}, 500);
}

function checkQueue() {
	var i=0;
	var timer = setInterval(function(){
		console.log('Checking queue');
		if(ficQueue.length>0){
			console.log('>>> Queue has items');
			runQueue();
		} else {
			console.log('>>> Queue is empty');
			i++;
		}
		if(i==10) {
			clearInterval(timer);
			console.log('Queue has been empty for too long. Stopping call.');
		}
	}, 3000);
}

function stepQueue() {
	var theChapterUrl = ficQueue.pop();
	var id = getStoryId(theChapterUrl);
	var chapterNumber = theChapterUrl.split(id+'/')[1];
	//console.log(theChapterUrl,'Chapter_'+chapterNumber+'_'+id);
	getChapter(theChapterUrl,'Chapter_'+chapterNumber+'_'+id);
}

// Fetch chapter text
function getChapter(url,el) {
	fetch(url)
	.then(function(response) {
		// When the page is loaded convert it to text
		if(response.ok) {
			// Mark it off.
			cached.push(url);
		} else {
			throw new Error('Network response was not ok');
		}
		return response.text();
	})
	.then(function(html) {
		// Initialize the DOM parser & Parse the text
		var parser = new DOMParser();
		var doc = parser.parseFromString(html, "text/html");
		var chapter_text = doc.querySelector('.storytext').innerHTML.replace('\n','');
		if (doc.querySelectorAll('#chap_select option[selected]').length>0) {
			var chapter_name = doc.querySelectorAll('#chap_select option[selected]')[0].text.replace(/^(\d+.\s)/,'');
			//console.log(chapter_name);
			//console.log(chapter_text);
			//console.log('<div class="storytext"><h2>'+chapter_name+'</h2>'+chapter_text+'</div>');
			$('#'+el).val('\t<div class="storytext" id="'+el+'"><h2>'+chapter_name+'</h2>'+chapter_text+'</div>\n');
		} else {
			//console.log(el);
			$('#'+el).val('\t<div class="storytext" id="'+el+'">'+chapter_text+'</div>\n');
			//console.log(chapter_text);
		}
	}).catch(error => {
		console.error('There has been a problem with your fetch operation:', error);
	});
}

function combiner(id) {
	var t = '';
	if (!$('#combined_'+id).length>0) {
		t = '<h3 class="downloader_hidden">Combined: </h3><textarea class="downloader_hidden" id="combined_'+id+'"></textarea>';
	}
	$('#'+id).append(t);
	$('#combined_'+id).val('');
	$('#'+id+' textarea').each(function (){
		if ($(this).is('#combined_'+id)!=true) {// skip the combined form or you get it twice.
			//console.log($(this).val());
			$('#combined_'+id).val($('#combined_'+id).val()+$(this).val());
		}
	});
}

function checkFile(id,ch) {
	if ((($('#combined_'+id).val().match(/storytext/g) || []).length-1)!=ch){ // Minus one bc of the css. BC of the way i wrote the check things might break.
		return false;
	} else {
		return true;
	}
}

function downloadFic(id) {
	download($('#combined_'+id).val(),$('#'+id+' span').text()+'.html','text/html');
}

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
