/* Let's select all required tags or elements */

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist");

let musicIndex = 2;

window.addEventListener("load", () => {
    /* Calling load music function once window loaded */
    loadMusic(musicIndex);
})

/* Load music function */
function loadMusic() {

}