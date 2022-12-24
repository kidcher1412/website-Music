  // Import the functions you need from the SDKs you need
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
    appId: "1:119084695889:web:40cd360eae68cc95621370",
    measurementId: "G-4MPH9YQRGR"
  };
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  let UserName = localStorage.getItem("Acc")
  if(UserName == null) window.open('./index.html','_parent');


//   CODE
  const form = document.getElementById('form');
  const nameInput = document.getElementById('name');
  const linkInput = document.getElementById('link');
  const artistInput = document.getElementById('artist');
  const color = document.getElementById('color');
  const image = document.getElementById('image');

  let songs = [];
  let songsTest = [];
//   onValue(ref(db,"Songs"), (snapshot) => {
//     snapshot.forEach(element => {
//         let datapush
//         element.forEach(element => {
//             const keyOf = element.key ;
//             const val = element.val() ;
//             datapush.keyOf = val;
//         });
//         songs.push(datapush)
//     });
//   });
    onValue(ref(db,`Songs/${UserName}`), (snapshot) =>{
        console.log("tim thay 1 du lieu")
        songs = [];
        songsTest = [];
        let test;
        // test= snapshot;
        snapshot.forEach(element => {
          test= element;
          let value = JSON.stringify(test)
          songsTest.push(JSON.parse(value))
          songs.push(JSON.parse(value))
        });
        console.log("danh sach data tra ve "+ songs)
    })

    //lang nghe sự kiện thay đổi Link Ảnh
document.querySelector("#image").addEventListener("input",function(){
  let IMAGE = document.querySelector("#image").value;
  const req = new XMLHttpRequest();
  req.open("GET",IMAGE);
  req.responseType = "blob";
  const blob = req.response;
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      if (req.status === 200) {
        const blob = req.response;
        const file = URL.createObjectURL(blob);
        document.querySelector(".image").innerHTML = `<img id="imageUploader" src="${file}" alt="">`;
        // img.setAttribute('src', file)
        const img = document.querySelector("#imageUploader") 
        console.log(img)
        
        const canvas = document.getElementById('imageUploader');

        img.onload = function() {
          var vibrant = new Vibrant(img);
          var swatches = vibrant.swatches()
          // console.log(vibrant.swatches().DarkMuted.getHex())
          // console.log(vibrant.swatches().DarkVibrant.getHex())
          let color = vibrant.swatches().DarkMuted.getHex()
          let redHex = color.substring(1, 3);
          let greenHex = color.substring(2, 4);
          let blueHex = color.substring(4, 6);
          let valueR = 0;    //94
          let valueG = 0;   //101
          let valueB = 0;    //85
          let redDec = parseInt(redHex, 16);
          let greenDec = parseInt(greenHex, 16);
          let blueDec = parseInt(blueHex, 16);
          redDec += valueR;
          greenDec += valueG;
          blueDec += valueB;
          if (redDec > 255) {
            redDec = 255;
          }
          if (greenDec > 255) {
            greenDec = 255;
          }
          if (blueDec > 255) {
            blueDec = 255;
          }
          let newRedHex = redDec.toString(16).padStart(2, "0");
          let newGreenHex = greenDec.toString(16).padStart(2, "0");
          let newBlueHex = blueDec.toString(16).padStart(2, "0");
          let newColor = "#" + newRedHex + newGreenHex + newBlueHex;
          // document.querySelector(".hint").style.backgroundColor = vibrant.swatches().DarkVibrant.getHex()
          document.getElementById("color").value = newColor;
          // console.log(vibrant.swatches().Vibrant.getHex())
        }
      }
    }
  };
})
  // Xử lý sự kiện submit của form

form.addEventListener('submit', (event) => {
    event.preventDefault();
  // console.log(songs[1][0].val())    //truy vanas toi data
  render();
    // Lấy dữ liệu từ các thẻ nhập
    const name = nameInput.value;
    if(name == null || name == "") return;
    const link = linkInput.value;
    if(link == null || link == "") return;
    const artist = artistInput.value;
    if(artist == null || artist == "") return;
    const Color = color.value;
    if(Color == null || Color == "#000000"){
      alert("tải ảnh thất bại, Thử Lại Sau");
      return;
    }
    let IMAGE = image.value;
    let data = {
      songName: name,
      artist: artist,
      bg: Color,
      files:{
        song:link,
        cover:IMAGE
      }
  };
  return updateFirebase(data);
})
function updateFirebase(data){
  console.log("song trong du lieu "+ songs.length)
  push(ref(db, `Songs/${UserName}`), data);
  // data = JSON.stringify(songs);
  alert("da nhap tren he thong "+songs.length);
  render();
}
function render(){
  const playlist = document.querySelector(".playlist")
  playlist.innerHTML = ""
    songs.forEach(element =>{
      console.log(element.songName)
      playlist.innerHTML += `
      <li>
        <p>${element.songName}</p>
        <a>${element.bg}</a>
        <p>${element.artist}</p>
      </li>
    `
    })
}
