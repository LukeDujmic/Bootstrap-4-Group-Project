"use strict"

function phoneRings() {
    document.getElementById("phone").src = "images/contactGif.gif"
}
function phoneStops() {
    document.getElementById("phone").src = "images/contact.png"
}

function coolImageFunction() {
    document.getElementById("image1").src = "images/gif1.gif";
}
function coolImageLeaving1() {
    document.getElementById("image1").src = "images/image1.png"
}

function coolImageFunction2() {
    document.getElementById("image2").src = "images/gif2.gif";
    
}
function coolImageLeaving2() {
    document.getElementById("image2").src = "images/image2.png"
}

/* contact function for user submission */
function userMessage()
{
    alert("Your message has been sent to the creators of this site. Expect a response soon!")
}