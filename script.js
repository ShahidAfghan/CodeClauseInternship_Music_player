console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/12.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let bottom = document.getElementById('bottomId')
let masterSongName = document.getElementById('masterSongName');

let songItems = Array.from(document.getElementsByClassName('songItem'));

let cardItem = Array.from(document.getElementsByClassName('card'));

let songs = [
    {songName: "BEAUZ  Heleen  Alone Lyrics", filePath: "songs/1.mp3", coverPath: "covers/Alone_heelne.jpg"},
    {songName: "Clarx Zaug SlidV One Of Us NCS Release", filePath: "songs/2.mp3", coverPath: "covers/OneOFus.jpg"},
    {songName: "Daniel Levi  Honey NCS Release", filePath: "songs/3.mp3", coverPath: "covers/honeyi.jpg"},
    {songName: "Heuse  Zeus x Crona  Pill feat Emma Sameth NCS Release", filePath: "songs/4.mp3", coverPath: "covers/crona.jpg"},
    {songName: "JJD  Division One  Somebody Like Me feat Halvorsen NCS Release", filePath: "songs/5.mp3", coverPath: "covers/someBodyLikeMe.jpg"},
    {songName: "OSKI  Stay The Night NCS Lyrics", filePath: "songs/6.mp3", coverPath: "covers/staytTheNight.jpg"},
    {songName: "Tobu  Back To You NCS Release", filePath: "songs/7.mp3", coverPath: "covers/Tobe_backToYou.jpg"},
    {songName: "Vaskan  Walk Away Arcade Release", filePath: "songs/8.mp3", coverPath: "covers/Vakan_WalKAway.jpg"},
    
]



// Function to toggle the background between animation and black for bottom
const toggleBackground = () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      // Music is paused or at the beginning, set the background to black
      bottom.style.backgroundImage = 'none';
      bottom.style.backgroundColor = 'black';
    } else {
      // Music is playing, set the animation background
      bottom.style.backgroundImage = 'url("/animation/AnimationB.webp")';
    }
  };
  

cardItem.forEach((element, i)=>{ 
         element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
        
     })
     

// songItems.forEach((element, i)=>{ 
//     element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
//     element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
// })
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        toggleBackground();
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        toggleBackground();
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
    toggleBackground();
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
         element.classList.remove('play-icon');
    })
}

// Function to update the play/pause icon and apply the play-icon animation
const updatePlayIcon = (playIconElement) => {
    makeAllPlays(); // Remove the play-icon from all elements
    playIconElement.classList.remove('fa-play-circle');
    playIconElement.classList.add('fa-pause-circle');
    playIconElement.classList.add('play-icon'); // Apply the play-icon animation
  };


// Event listener for play/pause clicks
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
      const playIcon = e.target;
      const clickedIndex = parseInt(playIcon.id);
      
      if (audioElement.paused || audioElement.currentTime <= 0) {
        // If audio is paused or at the beginning, play the clicked audio
        audioElement.src = `songs/${clickedIndex + 1}.mp3`;
        masterSongName.innerText = songs[clickedIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        toggleBackground();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        updatePlayIcon(playIcon);
      } else if (clickedIndex !== songIndex) {
        // If a different audio is clicked while another is playing, switch to the new audio
        songIndex = clickedIndex;
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        toggleBackground();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        updatePlayIcon(playIcon);
      } else {
        // If the same audio is clicked again, pause it
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        playIcon.classList.remove('fa-pause-circle');
        playIcon.classList.add('fa-play-circle');
        playIcon.classList.remove('play-icon');
        gif.style.opacity = 0;
        toggleBackground();
      }
    });
  });

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=12){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})