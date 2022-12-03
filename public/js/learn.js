thumbClicked();

//This function assign a click event, an animation, to all of the thumb icon
function thumbClicked() {
    let thumb = document.querySelectorAll(".thumbUp");
    for (let i = 0; i < thumb.length; i++) {
        thumb[i].addEventListener("click", function () {
            thumb[i].classList.toggle("thumbclicked");
        });
    }
}
