let nowPlaying = document.querySelector(".now-playing");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");
let trackArt = document.querySelector(".track-art");

let prevBtn = document.querySelector(".prev-track");
let nextBtn = document.querySelector(".next-track");
let playpauseBtn = document.querySelector(".playpause-track");

let seekSlider = document.querySelector(".seek-slider");
let volumeSlider = document.querySelector(".volume-slider");
let currentTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");
let randomeIcon = document.querySelector(".fa-shuffle");
let wave = document.getElementById("wave");

let currentTrack = document.createElement("audio");

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const musicList = [
    {
        name : "Faded",
        artist: "Alan Walker",
        music: "music/music_Faded.mp3",
        img:"images/faded.png"

    },
    {
        name : "Falling Down",
        artist: "Wid Cards",
        music: "music/music_fallingdown.mp3",
        img:"images/fallingdown.jpg"

    },
    {
        name : "Rather Be",
        artist: "Clean Bandlt",
        music: "music/music_Rather Be.mp3",
        img:"images/ratherbe.jpg"

    },
    {
        name : "Stay",
        artist: "Laro",
        music: "music/music_stay.mp3",
        img:"images/stay.png"

    }
];


loadTrack(trackIndex);

function loadTrack(trackIndex){

    clearInterval(updateTimer);
    rest();

    currentTrack.src= musicList[trackIndex].music;
    currentTrack.load();
    trackName.textContent = musicList[trackIndex].name;
    trackArtist.textContent = musicList[trackIndex].artist;
    trackArt.style.backgroundImage = "url(" + musicList[trackIndex].img + ")";
    nowPlaying.textContent="play " + (trackIndex+1) + " of " + musicList.length;

    updateTimer = setInterval(setUpdate,1000);
    currentTrack.addEventListener("ended",nextTrack);
    randomBgColor();
}


function randomBgColor(){
    let hex = ["1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
    let a;
    function populate(a){
        for(let i =0;i<6;i++){
            let x = Math.round(Math.random()*14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let color1 = populate("#");
    let color2 = populate("#");
    let angle = "to right"
    let gradiant = "linear-gradient(" + angle + "," + color1 + "," + color2 + ")";
    document.body.style.background=gradiant;
}
function rest(){
    currentTime.textContent="00:00";
    totalDuration.textContent="00:00";
    seekSlider.value="0";
};
function randomTrack(){
    isRandom? pauseRandom(): playRandom();
}
function playRandom(){
    isRandom=true;
    randomeIcon.classList.add("randomActive");
}

function pauseRandom(){
    isRandom=false;
    randomeIcon.classList.remove("randomActive");
}
function repeatTrack(){
    let currentIndex = trackIndex;
    loadTrack(currentIndex);
    playTrack();
}
function playpauseTrack(){
    isPlaying? pauseTrack():playTrack();
}
function playTrack(){
    currentTrack.play();
    isPlaying=true;
    trackArt.classList.add("rotate");
    wave.classList.add("loader");
    playpauseBtn.innerHTML = "<i class='fa-solid fa-circle-pause'></i>";
}
function pauseTrack(){
    currentTrack.pause();
    isPlaying=false;
    trackArt.classList.remove("rotate");
    wave.classList.remove("loader");
    playpauseBtn.innerHTML = "<i class='fa-solid fa-circle-play'></i>";
}
function nextTrack(){
    if(trackIndex < musicList.length-1 && isRandom === false){
        trackIndex+=1;
    }
    else if(trackIndex<musicList.length-1 && isRandom === true){
        let randomIndex = Number.parseInt(Math.random() * musicList.length);
        trackIndex = randomIndex;
    }
    else
        trackIndex = 0;

    loadTrack(trackIndex);
    playTrack();
}
function prevTrack(){
    if(trackIndex>0){
        trackIndex-=1;
    }
    else
        trackIndex = musicList.length-1;

    loadTrack(trackIndex);
    playTrack();
}

function seekTo(){
    let seekTo = currentTrack.duration * (seekSlider.value / 100);
    currentTrack.currentTime = seekTo;
}
function setVolume(){
    currentTrack.volume = volumeSlider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(currentTrack.duration)){
        seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(currentTrack.currentTime / 60);
        let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currentTrack.duration / 60);
        let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        currentTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
}




