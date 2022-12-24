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
  
  
  document.querySelector("#uploadButton1").addEventListener("click", function() {
    // Lấy file .mp3 từ input
    var file = document.querySelector("#audioFileInput1").files[0];
    // Tạo đối tượng storageRef và audioRef
    var storageRef = ref(ds, `IMG/${file.name}`);

    // Tải file lên Firebase Storage
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(ref(ds, `IMG/${file.name}`)).then(url=>{
            document.querySelector("#image").value = url;
        })
      });
});
  document.querySelector("#uploadButton").addEventListener("click", function() {
    // Lấy file .mp3 từ input
    var file = document.querySelector("#audioFileInput").files[0];
    // Tạo đối tượng storageRef và audioRef
    var storageRef = ref(ds, `MUSIC/${file.name}`);

    // Tải file lên Firebase Storage
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(ref(ds, `MUSIC/${file.name}`)).then(url=>{
            document.querySelector("#link").value = url;
        })
      });
});
document.querySelector("#dowloader").addEventListener("click", function() {
  dowloader
})