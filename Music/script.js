/** @jsx dom */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase,ref,onValue,push,remove, set, get,child, update,orderByChild } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const firebaseConfig = {
  apiKey: "AIzaSyAnZfAzTBOdgBJ1jgEhhFT7w1fGU0mT5k8",
  authDomain: "data-web-63379.firebaseapp.com",
  databaseURL: "https://data-web-63379-default-rtdb.firebaseio.com",
  projectId: "data-web-63379",
  storageBucket: "data-web-63379.appspot.com",
  messagingSenderId: "119084695889",
  appId: "1:119084695889:web:749024cbc5166f6f621370",
  measurementId: "G-F3XFS41L9V"
};

let indexSong = 0;
let isLocked = false;
let songsLength = null;
let selectedSong = null;
let loadingProgress = 0;
let songIsPlayed = false;
let progress_elmnt = null;
let songName_elmnt = null;
let sliderImgs_elmnt = null;
let singerName_elmnt = null;
let progressBar_elmnt = null;
let playlistSongs_elmnt = [];
let loadingProgress_elmnt = null;
let musicPlayerInfo_elmnt = null;
let progressBarIsUpdating = false;
let broadcastGuarantor_elmnt = null;
let isRanDom = false;
let isRepeat = false;


let UserName = localStorage.getItem("Acc")
if(UserName == null) window.open('./index.html','_parent');

const root = querySelector("#root");

function App({ songs }) {
  function handleChangeMusic({ isPrev = false, playListIndex = null }) {
    if (isLocked || indexSong === playListIndex) console.log("lap lai");

    if (playListIndex || playListIndex === 0) {
      indexSong = playListIndex;
    } else {
      indexSong = isPrev ? indexSong -= 1 : indexSong += 1;
    }

    if (indexSong < 0) {
      indexSong = songsLength;
    } else if (indexSong > songsLength) {
      indexSong = 0;
    }

    selectedSong.pause();
    selectedSong.currentTime = 0;
    progressBarIsUpdating = false;
    selectedSong = playlistSongs_elmnt[indexSong];
    selectedSong.volume = 1
    document.querySelector(".music-player__broadcast-guarantor").classList.add("click")
    selectedSong.play();
    selectedSong.paused ? document.querySelector("canvas").style.display = "none" : document.querySelector("canvas").style.display = "block";
    setBodyBg(songs[indexSong].bg);
    setProperty(sliderImgs_elmnt, "--index", -indexSong);
    updateInfo(singerName_elmnt, songs[indexSong].songName);
    updateInfo(songName_elmnt, songs[indexSong].artist);
  }

  setBodyBg(songs[0].bg);

  return (
    dom("div", { class: "music-player flex-column" },
    dom("div", { class: "morecontrol" },
    dom("i",{ class: "fa-solid fa-repeat" ,
              onclick: function(){
                isRepeat == false? isRepeat = true:isRepeat =false;
                isRanDom = false
                document.querySelector(".fa-shuffle").classList.remove("active")
                document.querySelector(".fa-repeat").classList.toggle("active")
              }}),
    dom("i",{ class: "fa-solid fa-download" }),
    dom("i",{ class: "fa-solid fa-shuffle",          
              onclick: function(){
                isRanDom == false ? isRanDom = true:isRanDom =false;
                isRepeat = false
                document.querySelector(".fa-repeat").classList.remove("active")
      document.querySelector(".fa-shuffle").classList.toggle("active")
    } }),
    ),
    dom(Slider, { slides: songs, handleChangeMusic: handleChangeMusic }),
    dom(Playlist, { list: songs, handleChangeMusic: handleChangeMusic })));
    

}
function Slider({ slides, handleChangeMusic }) {
  function handleResizeSlider({ target }) {
    if (isLocked) {
      return;
    } else if (target.classList.contains("music-player__info")) {
      this.classList.add("resize");
      document.querySelector(".music-player").classList.add("doneSize");
      setProperty(this, "--controls-animate", "down running");
      return;
    } else if (target.classList.contains("music-player__playlist-button")) {
      this.classList.remove("resize");
      document.querySelector(".music-player").classList.remove("doneSize");
      setProperty(this, "--controls-animate", "up running");
      return;
    }
  }
  function handlePlayMusic() {
    if (selectedSong.currentTime == selectedSong.duration) {
      handleChangeMusic({ isPrev: false })
    }
    this.classList.toggle("click");
    songIsPlayed = !songIsPlayed;
    selectedSong.paused ? selectedSong.play() : selectedSong.pause();
    selectedSong.paused ? document.querySelector("canvas").style.display = "none" : document.querySelector("canvas").style.display = "block";
  }
  return (
    dom("div", { class: "slider center", onClick: handleResizeSlider },
    dom("div", { class: "slider__content center" },
    dom("button", { class: "music-player__playlist-button center button" },
    dom("i", { class: "icon-playlist" })),

    dom("button", {
      onClick: handlePlayMusic,
      class: "music-player__broadcast-guarantor center button" },

    dom("i", { class: "icon-play" }),
    dom("i", { class: "icon-pause" })),

    dom("div", { class: "slider__imgs flex-row" },
    slides.map(({ songName, files: { cover } }) =>
    dom("img", { src: cover, class: "img", alt: songName })))),



    dom("div", { class: "slider__controls center" },
    dom("button", {
      class: "slider__switch-button flex-row button",
      onClick: () => handleChangeMusic({ isPrev: true }) },

    dom("i", { class: "icon-back" })),

    dom("div", { class: "music-player__info text_trsf-cap" },
    dom("div", null,
    dom("div", { class: "music-player__singer-name" },
    dom("div", null, slides[0].songName))),


    dom("div", null,
    dom("div", { class: "music-player__subtitle" },
    dom("div", null, slides[0].artist)))),



    dom("button", {
      class: "slider__switch-button flex-row button",
      onClick: function(){
        if(isRepeat == true) return handleChangeMusic({});
        let indexNext = indexSong;
        while(indexNext <= indexSong){
          if(indexSong == songsLength){
            console.log("qua gioi han")
            indexNext = Math.floor(Math.random() * songsLength)
            break;
          }
          isRepeat == true? indexNext = indexSong:indexNext = Math.floor(Math.random() * songsLength+1);
        }
        if(isRanDom){
          console.log(indexNext)
          handleChangeMusic({ isPrev: false, playListIndex: indexNext });
          console.log("chuyen tiep ngau nhien")
        }
        else{
          selectedSong.paused ? document.querySelector("canvas").style.display = "none" : document.querySelector("canvas").style.display = "block";
          console.log("chuyen tiep khong ngau nhien")
          handleChangeMusic({}) 
        }
      } },

    dom("i", { class: "icon-next" })),

    dom("div", {
      class: "progress center",
      onPointerdown: e => {
        handleScrub(e);
        progressBarIsUpdating = true;
      } },

    dom("div", { class: "progress__wrapper" },
    dom("div", { class: "progress__bar center" }))))));





}

function Playlist({ list, handleChangeMusic }) {
  function loadedAudio() {
    const duration = this.duration;
    const target = this.parentElement.querySelector(
    ".music-player__song-duration");


    let min = parseInt(duration / 60);
    if (min < 10) min = "0" + min;

    let sec = parseInt(duration % 60);
    if (sec < 10) sec = "0" + sec;

    target.appendChild(document.createTextNode(`${min}:${sec}`));
  }
  function updateTheProgressBar() {
    const duration =  this.duration;
    const currentTime = this.currentTime;
    // console.log(currentTime+"  "+duration )
    if (songIsPlayed && parseInt(currentTime) >= parseInt(duration-1)) console.log("het ba hat "+ currentTime)
    const progressBarWidth = currentTime / duration * 100;
    setProperty(progressBar_elmnt, "--width", `${progressBarWidth}%`);
    // unpdateVasualizer();
    if (songIsPlayed && currentTime == duration) {
      console.log("het bai");
      selectedSong.pause();
      if(indexSong == songsLength){
        console.log("het danh sach!!!")
        if(isRepeat) handleChangeMusic({ isPrev: false, playListIndex: indexSong });
        else handleChangeMusic({ isPrev: false, playListIndex: 0 })
        return;
      }
      if(isRepeat){
        console.log("lap lai bai hat")
        selectedSong.pause();
        handleChangeMusic({ isPrev: false, playListIndex: indexSong });
        return;
      }
      console.log("chuyen tiep bai hat");
      let indexNext = Math.floor(Math.random() * songsLength+1);
      while(indexNext == indexSong){
        indexNext = Math.floor(Math.random() * songsLength+1);
      }
      if(isRanDom){
        handleChangeMusic({ isPrev: false, playListIndex: indexNext });
        console.log("chuyen tiep ngau nhien")
      }
      else{
        selectedSong.paused ? document.querySelector("canvas").style.display = "none" : document.querySelector("canvas").style.display = "block";
        console.log("chuyen tiep khong ngau nhien")
        handleChangeMusic({}) 
      }
      
    }


  }

  return (
    dom("ul", { class: "music-player__playlist list" },
    list.map(({ songName, artist, files: { cover, song } }, index) => {
      return (
        dom("li", {
          class: "music-player__song",
          onClick: () =>
          handleChangeMusic({ isPrev: false, playListIndex: index }) },


        dom("div", { class: "flex-row _align_center" },
        dom("img", { src: cover, class: "img music-player__song-img" }),
        dom("div", { class: "music-player__playlist-info  text_trsf-cap" },
        dom("b", { class: "text_overflow" }, songName),
        dom("div", { class: "flex-row _justify_space-btwn" },
        dom("span", { class: "music-player__subtitle" }, artist),
        dom("span", { class: "music-player__song-duration" })))),



        dom("audio", {
          src: song,
          onLoadeddata: loadedAudio,
          onTimeupdate: updateTheProgressBar })));



    })));


}

function Loading() {
  return (
    dom("div", { class: "loading flex-row" },
    dom("span", { class: "loading__progress" }, "0"),
    dom("span", null, "%")));


}

function dom(tag, props, ...children) {
  if (typeof tag === "function") return tag(props, ...children);

  function addChild(parent, child) {
    if (Array.isArray(child)) {
      child.forEach(nestedChild => addChild(parent, nestedChild));
    } else {
      parent.appendChild(
      child.nodeType ? child : document.createTextNode(child.toString()));

    }
  }

  const element = document.createElement(tag);

  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.startsWith("on") && name.toLowerCase() in window) {
      element[name.toLowerCase()] = value;
    } else if (name === "style") {
      Object.entries(value).forEach(([styleProp, styleValue]) => {
        element.style[styleProp] = styleValue;
      });
    } else {
      element.setAttribute(name, value.toString());
    }
  });

  children.forEach(child => {
    addChild(element, child);
  });

  return element;
}
let testdata;
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase(app);
get(ref(db, `Songs/${UserName}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log("tim thay 1 du lieu")
    testdata = [];
    // test= snapshot;
    snapshot.forEach(element => {
      let value = JSON.stringify(element)
      testdata.push(JSON.parse(value))
    });
    songs = testdata;
    function downloadTheFiles(media, input) {
      return Promise.all(
      input.map(song => {
        const promise = new Promise(resolve => {
          const url = song.files[media];
          const req = new XMLHttpRequest();
          req.open("GET", url, true);
          req.responseType = "blob";
          req.send();
          req.onreadystatechange = () => {
            if (req.readyState === 4) {
              if (req.status === 200) {
                const blob = req.response;
                const file = URL.createObjectURL(blob);
                song.files[media] = file;
                resolve(song);
              }
              if (req.status === 410){
                console.log("Phiên Nhạc Hết!!!")
                
              }
            }
          };
        });
  
        promise.then(() => {
          loadingProgress++;
          const progress = Math.round(
          loadingProgress / (songs.length * 2) * 100);
  
          loadingProgress_elmnt.innerHTML = progress;
        });
  
        return promise;
      }));
  
    }
    function downloadTheFilesMu(media, input) {
      return Promise.all(
      input.map(song => {
        console.log(song)
        const promise = new Promise(resolve => {
          const url = song.files[media];
          const req = new XMLHttpRequest();
          req.open("GET", url, true);
          req.responseType = "blob";
          req.send();
          req.onreadystatechange = () => {
            if (req.readyState === 4) {
              if (req.status === 200) {
                const blob = req.response;
                const file = URL.createObjectURL(blob);
                song.files[media] = file;
                resolve(song);
              }
              if (req.status === 410){
                console.log("Phiên Nhạc Hết, Thực hiện Phục Hồi!!!")
                fetch(`https://api.spotifydown.com/download/${song.files.idbackup}`).then(e=>{
                  req.open("GET", url, true);
                  req.responseType = "blob";
                  req.send();
                  const blob = req.response;
                  const file = URL.createObjectURL(blob);
                  song.files[media] = file;
                  resolve(song);
                })
              }
            }
          };
        });
  
        promise.then(() => {
          loadingProgress++;
          const progress = Math.round(
          loadingProgress / (songs.length * 2) * 100);
  
          loadingProgress_elmnt.innerHTML = progress;
        });
  
        return promise;
      }));
  
    }
  
    root.appendChild(dom(Loading, null));
    loadingProgress_elmnt = querySelector(".loading__progress");
  
    downloadTheFilesMu("cover", songs).then(respone => {
      downloadTheFiles("song", respone).then(data => {
        root.removeChild(querySelector(".loading"));
        root.appendChild(dom(App, { songs: data }));
  
        songsLength = data.length - 1;
        progress_elmnt = querySelector(".progress");
        playlistSongs_elmnt = querySelectorAll("audio");
        sliderImgs_elmnt = querySelector(".slider__imgs");
        songName_elmnt = querySelector(".music-player__subtitle");
        musicPlayerInfo_elmnt = querySelector(".music-player__info");
        singerName_elmnt = querySelector(".music-player__singer-name");
        selectedSong = playlistSongs_elmnt[indexSong];
        progressBar_elmnt = querySelector(".progress__bar");
        broadcastGuarantor_elmnt = querySelector(
        ".music-player__broadcast-guarantor");
  
        
        controlSubtitleAnimation(musicPlayerInfo_elmnt, singerName_elmnt);
        controlSubtitleAnimation(musicPlayerInfo_elmnt, songName_elmnt);
      });
    });
  } else {
    console.log("No data available");
    document.querySelector("#root").innerHTML = `
    <h1>Không Có Bài Hát Khả Dụng, Vui Lòng Thêm Bài Hát Vào Dang Sách Bằng Link Bên Dưới</h1>
    <a id="AddOn">Thêm Bài Hát Vào Thư Viện</a>
     `
     + document.querySelector("#root").innerHTML
     document.querySelector("#AddOn").addEventListener("click",function(){
      return window.open('./UploadMusic/index.html','_parent');
     })
  }
}).catch((error) => {
  console.error(error);
});

// #########################################################


// onValue(ref(db,"Songs"), (snapshot) =>{
//   // const datapush = snapshot.value;
//   console.log("tim thay 1 du lieu")
//   testdata = [];
//   // test= snapshot;
//   snapshot.forEach(element => {
//     let value = JSON.stringify(element)
//     testdata.push(JSON.parse(value))
//   });
//   songs = testdata;
//   function downloadTheFiles(media, input) {
//     return Promise.all(
//     input.map(song => {
//       const promise = new Promise(resolve => {
//         const url = song.files[media];
//         const req = new XMLHttpRequest();
//         req.open("GET", url, true);
//         req.responseType = "blob";
//         req.send();
//         req.onreadystatechange = () => {
//           if (req.readyState === 4) {
//             if (req.status === 200) {
//               const blob = req.response;
//               const file = URL.createObjectURL(blob);
//               song.files[media] = file;
//               resolve(song);
//             }
//           }
//         };
//       });

//       promise.then(() => {
//         loadingProgress++;
//         const progress = Math.round(
//         loadingProgress / (songs.length * 2) * 100);

//         loadingProgress_elmnt.innerHTML = progress;
//       });

//       return promise;
//     }));

//   }

//   root.appendChild(dom(Loading, null));
//   loadingProgress_elmnt = querySelector(".loading__progress");

//   downloadTheFiles("cover", songs).then(respone => {
//     downloadTheFiles("song", respone).then(data => {
//       root.removeChild(querySelector(".loading"));
//       root.appendChild(dom(App, { songs: data }));

//       songsLength = data.length - 1;
//       progress_elmnt = querySelector(".progress");
//       playlistSongs_elmnt = querySelectorAll("audio");
//       sliderImgs_elmnt = querySelector(".slider__imgs");
//       songName_elmnt = querySelector(".music-player__subtitle");
//       musicPlayerInfo_elmnt = querySelector(".music-player__info");
//       singerName_elmnt = querySelector(".music-player__singer-name");
//       selectedSong = playlistSongs_elmnt[indexSong];
//       progressBar_elmnt = querySelector(".progress__bar");
//       broadcastGuarantor_elmnt = querySelector(
//       ".music-player__broadcast-guarantor");


//       controlSubtitleAnimation(musicPlayerInfo_elmnt, songName_elmnt);
//       controlSubtitleAnimation(musicPlayerInfo_elmnt, singerName_elmnt);
//     });
//   });
// })

// ###3###########################################
let songs;
// fetch(
// // "https://gist.githubusercontent.com/abxlfazl/37404417d17230a629683eb3f2f0a88a/raw/366ad64df645e94592847283a306fe2276de458e/music-info.json").
// "https://gist.githubusercontent.com/abxlfazl/37404417d17230a629683eb3f2f0a88a/raw/366ad64df645e94592847283a306fe2276de458e/music-info.json").

// then(respone => respone).
// then(data => data.json()).
// then(result => {
//   songs = result.songs;
//   function downloadTheFiles(media, input) {
//     return Promise.all(
//     input.map(song => {
//       const promise = new Promise(resolve => {
//         const url = song.files[media];
//         const req = new XMLHttpRequest();
//         req.open("GET", url, true);
//         req.responseType = "blob";
//         req.send();
//         req.onreadystatechange = () => {
//           if (req.readyState === 4) {
//             if (req.status === 200) {
//               const blob = req.response;
//               const file = URL.createObjectURL(blob);
//               song.files[media] = file;
//               resolve(song);
//             }
//           }
//         };
//       });

//       promise.then(() => {
//         loadingProgress++;
//         const progress = Math.round(
//         loadingProgress / (songs.length * 2) * 100);

//         loadingProgress_elmnt.innerHTML = progress;
//       });

//       return promise;
//     }));

//   }

//   root.appendChild(dom(Loading, null));
//   loadingProgress_elmnt = querySelector(".loading__progress");

//   downloadTheFiles("cover", songs).then(respone => {
//     downloadTheFiles("song", respone).then(data => {
//       root.removeChild(querySelector(".loading"));
//       root.appendChild(dom(App, { songs: data }));

//       songsLength = data.length - 1;
//       progress_elmnt = querySelector(".progress");
//       playlistSongs_elmnt = querySelectorAll("audio");
//       sliderImgs_elmnt = querySelector(".slider__imgs");
//       songName_elmnt = querySelector(".music-player__subtitle");
//       musicPlayerInfo_elmnt = querySelector(".music-player__info");
//       singerName_elmnt = querySelector(".music-player__singer-name");
//       selectedSong = playlistSongs_elmnt[indexSong];
//       progressBar_elmnt = querySelector(".progress__bar");
//       broadcastGuarantor_elmnt = querySelector(
//       ".music-player__broadcast-guarantor");


//       controlSubtitleAnimation(musicPlayerInfo_elmnt, songName_elmnt);
//       controlSubtitleAnimation(musicPlayerInfo_elmnt, singerName_elmnt);
//     });
//   });
// });

function controlSubtitleAnimation(parent, child) {
  if (child.classList.contains("animate")) return;

  const element = child.firstChild;

  if (child.clientWidth > parent.clientWidth) {
    child.appendChild(element.cloneNode(true));
    child.classList.add("animate");
  }

  setProperty(child.parentElement, "width", `${element.clientWidth}px`);
}
function handleResize() {
  const vH = window.innerHeight * 0.01;
  setProperty(document.documentElement, "--vH", `${vH}px`);
}
function querySelector(target) {
  return document.querySelector(target);
}
function querySelectorAll(target) {
  return document.querySelectorAll(target);
}
function setProperty(target, prop, value = "") {
  target.style.setProperty(prop, value);
}
function setBodyBg(color) {
  setProperty(document.body, "--body-bg", color);
}
function updateInfo(target, value) {
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }

  const targetChild_elmnt = document.createElement("div");
  targetChild_elmnt.appendChild(document.createTextNode(value));
  target.appendChild(targetChild_elmnt);
  target.classList.remove("animate");
  controlSubtitleAnimation(musicPlayerInfo_elmnt, target);
}
function handleScrub(e) {
  const progressOffsetLeft = progress_elmnt.getBoundingClientRect().left;
  const progressWidth = progress_elmnt.offsetWidth;
  const duration = selectedSong.duration;
  const currentTime = (e.clientX - progressOffsetLeft) / progressWidth;

  selectedSong.currentTime = currentTime * duration;
}

handleResize();

window.addEventListener("resize", handleResize);
window.addEventListener("orientationchange", handleResize);
window.addEventListener("transitionstart", ({ target }) => {
  if (target === sliderImgs_elmnt) {
    isLocked = true;
    setProperty(sliderImgs_elmnt, "will-change", "transform");
  }
});
window.addEventListener("transitionend", ({ target, propertyName }) => {
  if (target === sliderImgs_elmnt) {
    isLocked = false;
    setProperty(sliderImgs_elmnt, "will-change", "auto");
  }
  if (target.classList.contains("slider") && propertyName === "height") {
    controlSubtitleAnimation(musicPlayerInfo_elmnt, songName_elmnt);
    controlSubtitleAnimation(musicPlayerInfo_elmnt, singerName_elmnt);
  }
});
window.addEventListener("pointerup", () => {
  if (progressBarIsUpdating) {
    selectedSong.muted = false;
    progressBarIsUpdating = false;
  }
});
window.addEventListener("pointermove", e => {
  if (progressBarIsUpdating) {
    handleScrub(e, this);
    // selectedSong.muted = true;
  }
});
function removeAnimation(){
  document.querySelector('.nam').classList.remove("nhoy")
  document.querySelector('.nu').classList.remove("nhoy")
  document.querySelector('.nam').classList.remove("tungtung")
  document.querySelector('.nu').classList.remove("tungtung")
  document.querySelector('.nam').classList.remove("quaycuong")
  document.querySelector('.nu').classList.remove("quaycuong")
  document.querySelector('.sticker').classList.remove("rechay")
  document.querySelector('.sticker').classList.remove("chay")
  document.querySelector('.nam').classList.remove("latnguoc");
  document.querySelector('.nu').classList.remove("latnguoc");
  // document.querySelector('.sticker').classList.remove("latnguoc")

  console.log("da xoa thanh cong")
}
function addAnimation(){
  document.querySelector('.sticker').classList.add("chay")
  console.log("da them thanh cong")
}
function addAnimation1(){
  removeAnimation();
  document.querySelector('.nam').classList.add("tungtung")
  document.querySelector('.nu').classList.add("tungtung")
  // document.querySelector('.sticker').classList.add("chay")
  console.log("da them thanh cong")
}
function reset_animation() {
  var el = document.querySelector(".sticker");
  el.style.animation = 'none';
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null; 
}
function hideClicker(){
  document.querySelector(".clicker").style.display = "none";
  setTimeout(() => {
    document.querySelector(".clicker").style.display = "block";
  }, 3000);

}
let dem = 0;
const clicker = document.querySelector(".clicker")
clicker.addEventListener("click", function(){
  document.querySelector('.sticker').style.display = "block";
  hideClicker();
  reset_animation();
  if(dem%2==0) 
    document.querySelector('.sticker').classList.add("chay");
  else{
    document.querySelector('.sticker').classList.add("rechay");
    document.querySelector('.nam').classList.add("latnguoc");
    document.querySelector('.nu').classList.add("latnguoc");

  }
  if(dem<2){
  document.querySelector('.nam').classList.add("nhoy")
  document.querySelector('.nu').classList.add("nhoy")
    // addAnimation();
    dem++;
  }
  else if(dem<4){
    document.querySelector('.nam').classList.add("tungtung")
    document.querySelector('.nu').classList.add("tungtung")
      // addAnimation();
      dem++;
    }
  else if(dem<=6){
      document.querySelector('.nam').classList.add("quaycuong")
      document.querySelector('.nu').classList.add("quaycuong")
        // addAnimation();
        dem++;
      }
      if(dem==6) dem=0;
  setTimeout(() => {
    removeAnimation();
    document.querySelector('.sticker').style.display = "none";
  }, 3000);
})
document.querySelector("#addMusic").addEventListener("click",function(){

  window.open('./UploadMusic/index.html','_parent');
})