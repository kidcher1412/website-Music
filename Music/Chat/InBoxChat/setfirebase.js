import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase,ref,onValue,push,remove, set, get,child, update,orderByChild } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase(app);

document.querySelector('.message-submit').addEventListener("click",function(){{
    console.log("set du lieu")
}})
  
  $(window).on('keydown', function(e) {
    if (e.which == 13) {
      insertMessage();
      return false;
    }
  })