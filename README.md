# downloaders
**[AO3 Mass Downloader](https://raw.githubusercontent.com/Ivavgunevhf/downloaders/master/downloader_ao3.js)** - AO3 already makes it easy to download the works from the work's page, but this tool makes the process even faster by running on: 

--> Tag pages

----> EX. https://archiveofourown.org/tags/Angst/works

--> User bookmark pages

--> Series pages

--> Collection pages (Still testing)

**[FanFiction.Net Downloader](https://raw.githubusercontent.com/Ivavgunevhf/downloaders/master/downloader_ffnet.js)** - Creates a textbox for the user to paste links into. It creates the html page and then downloads it when the download button is pressed.

How To Use:

- Open the broswer console. [Instructions](https://webmasters.stackexchange.com/a/77337)

- Copy and Paste the code into when on the correct page / website.

- Read the rest of the instructions on the page if and when the tool runs.

Known Issues: (Might never get around to fixing these.)

--> Using the tool too many times causes 429 Errors as you have made too many request in a short time using your IP.

---> Add a limit or cool down.

--> FFNet specific error regarding special symbols and other languages when downloading/constucting the fic. 

---> Doesnt like Russian at all and will corrupt characters. Also causes errors with things like checkmark symbols. 

```js
if (location.href.indexOf("archiveofourown.org")>=0) {
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "https://cdn.jsdelivr.net/gh/Ivavgunevhf/downloaders/downloader_ao3.js";
	$("head").append(s);
} else if (location.href.indexOf("fanfiction.net")>=0) {
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "https://cdn.jsdelivr.net/gh/Ivavgunevhf/downloaders/master/downloader_ffnet.js";
	$("head").append(s);
}
```
