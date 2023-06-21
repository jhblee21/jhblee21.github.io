/* FADE IN AND OUT TILES FOR ABOUT ME & PROJECTS */
let elementsArray = document.querySelectorAll(".tile");
console.log(elementsArray);
window.addEventListener('scroll', fadeIn ); 

function fadeIn() {
    for (var i = 0; i < elementsArray.length; i++) {
        var elem = elementsArray[i]
        var distInView = elem.getBoundingClientRect().top - window.innerHeight -20;
        if (distInView < 0) {
            elem.classList.add("inView");
        } else {
            elem.classList.remove("inView");
        }
    }
}
fadeIn();

/* DEVICE PREVIEWS SIMULTANEOUS SCROLLING */
// ret our screens
const screens = Array.from(document.getElementsByClassName('device-screen'))
 
screens.forEach(screen => { 
  // Add scroll function when controlling a device
  screen.addEventListener('mouseover', function(e) {
    screen.addEventListener('scroll', scrollAll)
  })
  screen.addEventListener("touchstart", function(e) {
    screen.addEventListener("scroll", scrollAll);
  });
  // Remove them when we leave the device
  screen.addEventListener('mouseleave', function(e) {
    screen.removeEventListener('scroll', scrollAll)
  })
  screen.addEventListener("touchend", function(e) {
    screen.removeEventListener("scroll", scrollAll);
  });
})
  
const scrollAll = e => {
  // Calculate the size and scroll position of the device we're controlling
  const screenHeight = e.target.clientHeight;
  const scrollPoint = e.target.scrollHeight;
  const scroll = e.target.scrollTop;
  // Work out the percentage scrolled on this device
  const scrollPercentage = scroll / (scrollPoint - screenHeight);

  // Scroll the other devices to the same relevant position on the page
  screens.forEach(screen => {
    if (screen !== e.target) {
      // Work out the visible height of this screen and multiply it by the percentage of the parent screen
      screen.scrollTo(
        0,
        (screen.scrollHeight - screen.clientHeight) * scrollPercentage
      );
    }
  });
};