/* select all required tags or elements */

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
showMoreBtn = wrapper.querySelector("#more-music"),
hideMusicBtn = musicList.querySelector("#close");

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
    /* Here will just increment of index by 1 */
    musicIndex++;
    /* If musicIndex is greater than array length then musicIndex will be 1, so the first song will play*/
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

/* Previous music function */
function prevMusic() {
    /* Here will just decrement of index by -1 */
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

    let musicCurrentTime = wrapper.querySelector(".current"),
        musicDuration = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", () => {
        /* Update song total duration */
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10) { /* Adding 0 if sec is less than 10 */
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`; 
    });

     /* Update playing song current time */
     let currentMin = Math.floor(currentTime / 60);
     let currentSec = Math.floor(currentTime % 60);
     if(currentSec < 10) {
         currentSec = `0${currentSec}`;
     }
     musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

/* This update playing song current time according to the progress bar width */
progressArea.addEventListener("click", (e) => {
    let progressWidthval = progressArea.clientWidth; /* Getting width of progress bar */
    let clickedOffSetX = e.offsetX; /* Getting offset x value */
    let songDuration = mainAudio.duration; /* Getting song total duration */

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
});

/* it work on repeat, shuffle song according to the icon */
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    /* First getting the innerText of the icon then will change accordingly */
    let getText = repeatBtn.innerText; /* Getting innerText of icon */
    /* this function do different changes on different icon click using switch */
    switch(getText) {
        case "repeat": /* If this icon is repeat then change it to repeat_one */
        repeatBtn.innerText = "repeat_one";
        repeatBtn.setAttribute("title", "Song looped");
        break;
        case "repeat_one": /* If this icon is repeat_one then change it to shuffle*/
        repeatBtn.innerText = "shuffle";
        repeatBtn.setAttribute("title", "Playback shuffle");
        break;
        case "shuffle": /* If this icon is shuffle then change it to repeat */
        repeatBtn.innerText = "repeat";
        repeatBtn.setAttribute("title", "Playlist looped");
        break; 
    }
});

/* After the song ended */
mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText; /* Getting innerText of icon */
    switch(getText) {
        case "repeat": /* If this icon is repeat then simply will call the nextMusic function so the next song will play */
            nextMusic();
            break;
        case "repeat_one": /* If icon is repeat_one then will change the current playing song current time to 0 */
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            /* Generating random index between the max range of array length */
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } 
            while(musicIndex == randIndex); /* This loop run 'til the next random number won't be the same of current music index */
            musicIndex = randIndex; /* Passing randomIndex to musicIndex so the random song will play*/
            loadMusic(musicIndex); 
            playMusic(); 
            break;
    }
});

showMoreBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", () => {
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector("ul");

/* Creating li according to the array length */
for (let i = 0; i < allMusic.length; i++) {
    /* Will pass the song name, artist from the array to li*/
    let liTag = `<li>
                  <div class="row">
                    <span>Doja Cat - Streets</span>
                    <p>Doja Cat</p>
                  </div>
                  <span class="audio-duration">3:40<span>
                 </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);
}