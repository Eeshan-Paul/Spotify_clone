console.log("Working")

let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById("masterplay")
let myprogressBar=document.getElementById("myprogressBar")
let gif=document.getElementById("gif")
let songItems=Array.from(document.getElementsByClassName("songItem"))
let songnumber=1;

let songs=[
    {songName:"Le Aaunga",filePath:"songs/1.mp3", coverpath:"covers/1.jpg"},
    {songName:"Gujju Pataka",filePath:"songs/2.mp3", coverpath:"covers/2.jpg"},
    {songName:"Naseeb se",filePath:"songs/3.mp3", coverpath:"covers/3.jpg"},
    {songName:"Aaj ke baad",filePath:"songs/4.mp3", coverpath:"covers/4.jpg"},
    {songName:"Pasoori Nu",filePath:"songs/5.mp3", coverpath:"covers/5.jpg"},
    {songName:"Sun Sajni",filePath:"songs/6.mp3", coverpath:"covers/6.jpg"},
    {songName:"Pasoori Nu(Originals)",filePath:"songs/7.mp3", coverpath:"covers/7.jpg"}
]


songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

masterPlay.addEventListener("click",()=>{
    song=document.getElementById(songnumber.toString());
    document.getElementsByClassName("songplayingname")[0].innerText=songs[songnumber-1].songName;
    if (audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play()
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        song.classList.remove("fa-play-circle");
        song.classList.add("fa-pause-circle");
        gif.style.opacity=1;
    }
    else 
    {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        song.classList.remove("fa-pause-circle");
        song.classList.add("fa-play-circle");
        gif.style.opacity=0;
    }
});

var myfunction=function(x){
    mins=parseInt(x/60);
    secs=parseInt(x%60);
    // console.log(`0${mins}:0${secs}`);
    if (mins>=0 && mins<10){
        if (secs>=0 && secs<10){
            return (`0${mins}:0${secs}`);
        }
        else return(`0${mins}:${secs}`);
    }
    else {
        if (secs>=0 && secs<10){
            return (`0${mins}:0${secs}`);
        }
        else return(`${mins}:${secs}`);  
    }
}

audioElement.addEventListener("timeupdate",()=>{
    progress=parseFloat((audioElement.currentTime/audioElement.duration) * 100)
    // console.log(audioElement.duration);
    time=audioElement.duration-audioElement.currentTime;
    myprogressBar.value=progress;
    // myfunction(audioElement.currentTime);
    var ctime=myfunction(audioElement.currentTime);
    var time=myfunction(audioElement.duration);
    console.log(time);
    console.log(ctime);
    var currentcontent=document.getElementById("currenttime").innerHTML;
    var content=document.getElementById("totaltime").innerHTML;
    content=time;
    currentcontent=ctime;
    // console.log(ctime);
    document.getElementById("currenttime").innerHTML=currentcontent;
    document.getElementById("totaltime").innerHTML=content;
    // document.getElementById("totaltime").innerText=<p>${myfunction(audioElement.duration)}</p>;
})

myprogressBar.addEventListener("change",()=>{
    audioElement.currentTime=(myprogressBar.value * audioElement.duration) /100;
})

const makeAllPlays =()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        // gif.style.opacity=0;
    })
};



Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        makeAllPlays();
        index=parseInt(e.target.id);
        document.getElementsByClassName("songplayingname")[0].innerText=songs[index-1].songName;
        document.getElementById(e.target.id).style.opacity=0.7;
        if (audioElement.currentTime<=0 || index!=songnumber){
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
            audioElement.src=`songs/${index}.mp3`;
            console.log(audioElement.src)
            audioElement.currentTime=0;
            audioElement.play();
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            gif.style.opacity=1;
            songnumber=index;
        }
        else if (audioElement.currentTime>0)
        {
            if (index==songnumber)
            {
                if (audioElement.paused)
                {
                    element.classList.remove('fa-play-circle');
                    element.classList.add('fa-pause-circle');
                    audioElement.play();
                    masterPlay.classList.remove("fa-play-circle");
                    masterPlay.classList.add("fa-pause-circle");
                    gif.style.opacity=1;
                }
                else 
                {
                    element.classList.remove('fa-pause-circle');
                    element.classList.add('fa-play-circle');
                    audioElement.pause();
                    masterPlay.classList.remove("fa-pause-circle");
                    masterPlay.classList.add("fa-play-circle");
                    gif.style.opacity=1;
                }
            }
        }
    })
});

document.getElementById("previous").addEventListener("click",()=>{
        if (songnumber>1)
        {
            songnumber-=1;
        }
        else {
            songnumber=7;
        }
        document.getElementsByClassName("songplayingname")[0].innerText=songs[songnumber-1].songName;
        makeAllPlays();
        song=document.getElementById(songnumber.toString());
        if (audioElement.pause || audioElement.currentTime<=0){
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
        }
        audioElement.src=`songs/${songnumber}.mp3`
        audioElement.currentTime=0;
        audioElement.play();
        song.classList.remove("fa-play-circle");
        song.classList.add("fa-pause-circle");
        gif.style.opacity=1;
})

document.getElementById("next").addEventListener("click",()=>{
    if (songnumber<7)
    {
        songnumber+=1;
    }
    else {
        songnumber=1;
    }
    document.getElementsByClassName("songplayingname")[0].innerText=songs[songnumber-1].songName;
    makeAllPlays();
    song=document.getElementById(songnumber.toString());
    if (audioElement.pause || audioElement.currentTime<=0){
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    }
    audioElement.src=`songs/${songnumber}.mp3`
    audioElement.currentTime=0;
    audioElement.play();
    song.classList.remove("fa-play-circle");
    song.classList.add("fa-pause-circle");
    gif.style.opacity=1;
})

