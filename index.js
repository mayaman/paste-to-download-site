"use strict";
/**
 * @author: Maya Man
 */

document.body.addEventListener("paste", handlePaste);

/*
 * Handle paste event
 */
function handlePaste(e) {
  let clipboardData, pastedData;

  // Stop data actually being pasted into div
  e.stopPropagation();
  e.preventDefault();

  // Get pasted data via clipboard API
  clipboardData = e.clipboardData || window.clipboardData;
  pastedData = clipboardData.getData("text/html");

  // Display pasted data and download
  document.getElementById("title").src = "/assets/downloaded.png";
  document.getElementById("sparkles").src = "/assets/sparkle_2.png";

  // Get images pasted
  let parser = new DOMParser();
  let dom = parser.parseFromString(pastedData, "text/html");
  let allImages = dom.getElementsByTagName('img');
  for (let i = 0; i < allImages.length; i++) {
    let img = allImages[i];
    let imageSource = img.src;
    downloadResource(imageSource, "download");
  }
}

/*
 * Force download with blob to avoid Chrome
 * download restrictions
 */
function forceDownload(blob, filename) {
  var a = document.createElement("a");
  a.download = filename;
  a.href = blob;
  a.click();
}

/*
 * Convert URL to blob then force download
 */
function downloadResource(url, filename) {
  if (!filename)
    filename = url
      .split("\\")
      .pop()
      .split("/")
      .pop();
  fetch(url, {
    headers: new Headers({
      Origin: location.origin
    }),
    mode: "cors"
  })
    .then(response => response.blob())
    .then(blob => {
      let blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, filename);
    })
    .catch(e => console.error(e));
}

function toggleView() {
  let infoContainer = document.getElementById('info-container');
  let homeContainer = document.getElementById('home-container');
  console.log('style: ', infoContainer.style.display);

  if (infoContainer.style.display == 'none' || infoContainer.style.display == '') {
    infoContainer.style.display = 'block';
    homeContainer.style.display = 'none';
  } else {
    infoContainer.style.display = 'none';
    homeContainer.style.display = 'block';
  }
}
