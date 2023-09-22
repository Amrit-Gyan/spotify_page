console.log("Welcome to Spotify");

// Initialise the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songName: "Fearless", filePath: "songs/1.mp3", coverPath: "cover/1.jpg" },
    { songName: "One More Try", filePath: "songs/2.mp3", coverPath: "cover/2.jpg" },
    { songName: "Silsila ye chahat x Divine", filePath: "songs/3.mp3", coverPath: "cover/3.jpg" },
    { songName: "Maar Daala x Divine", filePath: "songs/4.mp3", coverPath: "cover/4.jpg" },
    { songName: "Fearless - II", filePath: "songs/5.mp3", coverPath: "cover/5.jpg" },
    { songName: "One More Try", filePath: "songs/6.mp3", coverPath: "cover/6.jpg" },
    { songName: "House Of Memories", filePath: "songs/7.mp3", coverPath: "cover/7.jpg" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

// Handle Play/Pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

// listen to events
audioElement.addEventListener('timeupdate', () => {
    //Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
        
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        if(audioElement.paused){
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }
        else{
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            // audioElement.src = `songs/${songIndex+1}.mp3`;
            // masterSongName.innerText = songs[songIndex].songName;
            // audioElement.currentTime = 0;
            audioElement.pause();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
        }
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex=0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
})