var inIframe = false;
var body = document.getElementById("main");
var nameHeader = document.getElementById("name");
var creatorHeader = document.getElementById("creator");
var coverText = document.getElementById("cover-text");

var cover = document.getElementById("iframe-cover");
var container = document.getElementById("iframe-container");
var iframe = document.getElementById("my-iframe");

var gameToPlayURL = "";

var sections = [];
let activeSectionIndex = 0;

// Set the initial active section
function loadSectionList()
{
  sections = document.getElementsByClassName('section');
  coverText.classList.remove("active");
}

// Event listener for keyboard inputs
document.addEventListener('keydown', (event) => {
  const keyCode = event.key;
  if (keyCode === "ArrowUp")
  {
    // Up arrow key
    handleDpadInput('up');
  }
  else if (keyCode === "ArrowDown")
  {
    // Down arrow key
    handleDpadInput('down');
  }
  else if (keyCode === "ArrowLeft")
  {
    // Left arrow key
    handleDpadInput('left');
  }
  else if (keyCode === "ArrowRight")
  {
    // Right arrow key
    handleDpadInput('right');
  }
  else if (inIframe && keyCode == "+")
  {
    applyCover();
  }
  else if (!inIframe && keyCode === ' ') {
    console.log("enter");
    event.preventDefault(); // Prevent default behavior if needed
    triggerLinkClick(document.getElementById(sections[activeSectionIndex].id));         // Trigger the link's onclick function
  }
});

function triggerLinkClick(link) {
  console.log(link);
  var clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });

  link.dispatchEvent(clickEvent);
}

// Handle D-pad input
function handleDpadInput(direction) {
  // Remove active class from current section
  sections[activeSectionIndex].classList.remove('active');

  // Update active section index based on the direction
  if (direction === 'up' && activeSectionIndex > 0 && activeSectionIndex < sections.length - 1)
  {
    activeSectionIndex--;
  }
  else if (direction === 'down' && activeSectionIndex < sections.length - 2)
  {
    activeSectionIndex++;
  }
  else if (gameToPlayURL != "" && direction === 'left' && activeSectionIndex != sections.length - 1)
  {
    activeSectionIndex = sections.length - 1;
  }
  else if (!inIframe && direction === 'right' && activeSectionIndex == sections.length - 1)
  {
    activeSectionIndex = 0;
  }

  // Add active class to the new section
  sections[activeSectionIndex].classList.add('active');
}

cover.addEventListener("click", function() {
  if(!inIframe && gameToPlayURL != "")
  {
    changeSrc(gameToPlayURL, true);
    inIframe = true;
    cover.style.zIndex = -1;
  }
});

function applyCover()
{
  console.log("unlock mouse");
  inIframe = false;
  iframe.src = "";
  cover.style.zIndex = 100;
}

// Lock the mouse position
function lockMouse()
{
  
}

// Unlock the mouse position
function unlockMouse()
{
  
}

function changeSrc(src, fromPlayClick = false, jsonURL = "")
{
  console.log("change source");
  // Set the src attribute to the new URL
  if(fromPlayClick)
  {
    iframe.src = src;
  }
  else
  {
    iframe.src = "";
    gameToPlayURL = src;
    handleDpadInput('left');

    var request = new XMLHttpRequest();

    request.open('GET', jsonURL);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        nameHeader.innerHTML = data.name;
        creatorHeader.innerHTML = data.creator;
        coverText.innerHTML = "Click Here to Play";
        console.log(data);
      } else {
        // We reached our target server, but it returned an error
        console.error('Error loading JSON file');
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.error('Error connecting to server');
    };
    
    request.send();

    applyCover();
  }
}
