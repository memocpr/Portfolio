// nav effects ====================================================================

let mainNavLinks = document.querySelectorAll("nav ul li a");
let mainSections = document.querySelectorAll("main section");

let lastId;
let cur = [];


window.addEventListener("scroll", event => {
    const fromTop = window.scrollY + 200;

    mainNavLinks.forEach(link => {
        if (!link.hash) {
            return;
        }

        const section = document.querySelector(link.hash);

        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add("current");
        } else {
            link.classList.remove("current");
        }
    });
});



// form sending ====================================================

var myForm = document.getElementsByTagName("form")[0];

form.addEventListener("submit", function(e) {
    e.preventDefault();
    sendData();
});

function sendData() {
    var request = new XMLHttpRequest();
    var data = "";
    var dataArr = [];

    dataArr.push(
        encodeURIComponent("name") + "=" + encodeURIComponent(myForm.querySelector("[name='name']").value)
    );

    dataArr.push(
        encodeURIComponent("email") +
        "=" +
        encodeURIComponent(myForm.querySelector("[name='email']").value)
    );

    dataArr.push(
        encodeURIComponent("comments") +
        "=" +
        encodeURIComponent(myForm.querySelector("[name='comments']").value)
    );

    dataArr.push(
        encodeURIComponent("send_to") +
        "=" +
        encodeURIComponent(myForm.querySelector("[name='send_to']").value)
    );


    // Combine the pairs into a single string and replace all %-encoded spaces to
    // the '+' character; matches the behaviour of browser form submissions.
    data = dataArr.join("&").replace(/%20/g, "+");

    // Define what happens on successful data submission
    request.addEventListener("load", function(event) {
        if (request.readyState === request.DONE) {
            if (request.status === 200) {
                alert("Your order has been received! Check your email.");
            } else {
                alert("Oh oh! We have a problem! " + request.responseText + ".");
            }
        }
    });

    // Define what happens in case of error
    request.addEventListener("error", function(event) {
        // This is normally a timeout or connection error.
        alert("Oops! Something went wrong.");
    });

    // Set up our request
    request.open(myForm.getAttribute("method"), myForm.getAttribute("action"));

    // Add the required HTTP header for form data POST requests
    request.setRequestHeader("Content-Type", "messageFromOnlinePortfolio");

    // Finally, send our data.
    request.send(data);
}