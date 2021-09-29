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
    loadMusic(musicIndex);
    playingNow();
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
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

/* Previous music function */
function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

/* Play or music button event */
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
});

/* Next music button event */
nextBtn.addEventListener("click", () => {
    nextMusic(); 
});

/* Prev music button event */
prevBtn.addEventListener("click", () => {
    prevMusic(); 
});

/* Update progress bar width according to music current time */
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime; 
    const duration = e.target.duration; 
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current"),
        musicDuration = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", () => {
        /* Update song total duration */
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10) { 
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
    let progressWidthval = progressArea.clientWidth; 
    let clickedOffSetX = e.offsetX; 
    let songDuration = mainAudio.duration; 

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
});

/* it work on repeat, shuffle song according to the icon */
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText; 
    switch(getText) {
        case "repeat": 
        repeatBtn.innerText = "repeat_one";
        repeatBtn.setAttribute("title", "Song looped");
        break;
        case "repeat_one": 
        repeatBtn.innerText = "shuffle";
        repeatBtn.setAttribute("title", "Playback shuffle");
        break;
        case "shuffle": 
        repeatBtn.innerText = "repeat";
        repeatBtn.setAttribute("title", "Playlist looped");
        break; 
    }
});

/* After the song ended */
mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText; 
    switch(getText) {
        case "repeat": 
            nextMusic();
            break;
        case "repeat_one": 
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } 
            while(musicIndex == randIndex); 
            musicIndex = randIndex; 
            loadMusic(musicIndex); 
            playMusic(); 
            playingNow();
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
for (let i = 0 ; i < allMusic.length; i++) {
    let liTag = `<li li-index="${0}">
                  <div class="row">
                    <span>${allMusic[0].name}</span>
                    <p>${allMusic[0].artist}</p>
                  </div>
                  <audio class="${allMusic[0].src}" src="music/${allMusic[0].src}"></audio>
                  <span id="${allMusic[0].src}" class="audio-duration">3:40<span>
                 </li>
                 <li li-index="${1}"> 
                  <div class="row">
                    <span>${allMusic[1].name}</span>
                    <p>${allMusic[1].artist}</p>
                  </div>
                  <audio class="${allMusic[1].src}" src="music/${allMusic[1].src}"></audio>
                  <span id="${allMusic[0].src}" class="audio-duration">2:59<span>
                 </li>
                 <li li-index="${2}">
                  <div class="row">
                    <span>${allMusic[2].name}</span>
                    <p>${allMusic[2].artist}</p>
                  </div>
                  <audio class="${allMusic[2].src}" src="music/${allMusic[2].src}"></audio>
                  <span id="${allMusic[0].src}" class="audio-duration">3:23<span>
                 </li>
                 <li li-index="${3}">
                  <div class="row">
                    <span>${allMusic[3].name}</span>
                    <p>${allMusic[3].artist}</p>
                  </div>
                  <audio class="${allMusic[3].src}" src="music/${allMusic[3].src}"></audio>
                  <span id="${allMusic[0].src}" class="audio-duration">1:32<span>
                 </li>
                 <li li-index="${4}">
                  <div class="row">
                    <span>${allMusic[4].name}</span>
                    <p>${allMusic[4].artist}</p>
                  </div>
                  <audio class="${allMusic[4].src}" src="music/${allMusic[4].src}"></audio>
                  <span id="${allMusic[0].src}" class="audio-duration">3:01<span>
                 </li> 
                 `;
    ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

  liAudioTag.addEventListener("loadeddata", () => {
    // update audio song duration
    let audioDuration = liAudioTag.duration
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    liAudioDuration.innerHTML = `${totalMin}:${totalSec}`;
    liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

const allLiTags = ulTag.querySelectorAll("li");
function playingNow () {
    for (let j = 0; j < allLiTags.length; j++) {
        let audioTag = allLiTags[j].querySelector(".audio-duration");
        if(allLiTags[j].classList.contains("playing")){
            allLiTags[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }

        if(allLiTags[j].getAttribute("li-index") == musicIndex) {
            allLiTags[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }

        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}