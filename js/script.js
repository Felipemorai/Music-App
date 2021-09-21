/* Let's select all required tags or elements */

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause");

let musicIndex = 1;

window.addEventListener("load", () => {
/* Calling load music function once window loaded */
    loadMusic(musicIndex);
})

/* Load music function */
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `img/${allMusic[indexNumb - 1].img}`;
    mainAudio.src = `music/${allMusic[indexNumb - 1].src}`;
}

/* Play or music button event */
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    /* If isMusicPaused is true them call pauseMusic else call playMusic */
    isMusicPaused ? pauseMusic() : playMusic();
});
