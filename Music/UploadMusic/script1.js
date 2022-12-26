  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getStorage,ref,uploadBytes,getDownloadURL } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js"
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
  // const analytics = getAnalytics(app);
  const ds = getStorage(app);
  const userName = localStorage.getItem("Acc");
  
  document.querySelector("#uploadButton1").addEventListener("click", function() {
    // Lấy file .mp3 từ input
    var file = document.querySelector("#audioFileInput1").files[0];
    // Tạo đối tượng storageRef và audioRef
    var storageRef = ref(ds, `IMG/${file.name}`);

    // Tải file lên Firebase Storage
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(ref(ds, `IMG/${userName}/${file.name}`)).then(url=>{
            document.querySelector("#image").value = url;
        })
      });
});
document.querySelector("#link").addEventListener("change", function() {
  const getlinkMUSIC = document.querySelector("#link").value;
  const ID = document.querySelector("#link").value;
  const req = new XMLHttpRequest();
  req.open("GET",getlinkMUSIC);
  req.responseType = "blob";
  const blob = req.response;
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      if (req.status === 200) {
        const blob = req.response;
        const Name = document.querySelector("#name").value;
        var storageRef = ref(ds, `MUSIC/${userName}/${Name}.mp3`);
        console.log("upload file MusiC")
        // Tải file lên Firebase Storage
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(ref(ds, `MUSIC/${userName}/${Name}.mp3`)).then(url=>{
              document.querySelector("#IDbackup").value = url;
              var event = new Event('change');
              document.querySelector("#IDbackup").dispatchEvent(event);
          })
          });
        
      }
    }
  }
})
  document.querySelector("#uploadButton").addEventListener("click", function() {
    // Lấy file .mp3 từ input
    var file = document.querySelector("#audioFileInput").files[0];
    // Tạo đối tượng storageRef và audioRef
    var storageRef = ref(ds, `MUSIC/${file.name}`);

    // Tải file lên Firebase Storage
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    // Get Dat in Promise
        getDownloadURL(ref(ds, `MUSIC/${file.name}`)).then(url=>{
            document.querySelector("#link").value = url;
        })
      });
});
// document.querySelector("#callBack").addEventListener("click",function(){
//     window.history.back();
// })