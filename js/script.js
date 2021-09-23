/* Let's select all required tags or elements */

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressBar = wrapper.querySelector(".progress-bar");

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

/* Play music function */
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

/* Pause music function */
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

/* Next music function */
function nextMusic() {
    /* Here we'll just increment of index by 1 */
    musicIndex++;
    /* If musicIndex is greater than array length then musicIndex will be 1, so the first song will play*/
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

/* Previous music function */
function prevMusic() {
    /* Here we'll just decrement of index by -1 */
    musicIndex--;
    /* If musicIndex is less than 1 then musicIndex will be array length, so the last song will play */
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

/* Play or music button event */
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    /* If isMusicPaused is true them call pauseMusic else call playMusic */
    isMusicPaused ? pauseMusic() : playMusic();
});

/* Next music button event */
nextBtn.addEventListener("click", () => {
    nextMusic(); /* Callin' next music function */
});

/* Prev music button event */
prevBtn.addEventListener("click", () => {
    prevMusic(); /* Callin' previous music function */
});

/* Update progress bar width according to music current time */
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime; /* Gettin' current time of song */
    const duration = e.target.duration; /* Gettin' total duration of song */
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    mainAudio.addEventListener("loadeddata", () => {
        let musicCurrentTime = wrapper.querySelector(".current"),
        musicDuration = wrapper.querySelector(".duration");

        /* Update song total duration */
        let audioDuration = mainAudio.duration;
        musicDuration.innerText = audioDuration;
    });
});