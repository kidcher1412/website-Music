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
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  const db = getDatabase(app);
  let getMainUser;
  let listUser;
  window.onload= function(){
    console.log("App Start")
    getMainUser = localStorage.getItem("Acc");
    get(ref(db, `Users`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log("tim thay 1 du lieu")
          listUser = [];
          snapshot.forEach(element => {
            let value = JSON.stringify(element)
            listUser.push(JSON.parse(value))
          });
          const UserList = document.querySelector("#profiles");
          listUser.forEach(snapshotUser =>{
            if(snapshotUser.Name!=getMainUser){
                UserList.innerHTML += `
                <div class="profile" onclick = "GetInbox('${snapshotUser.Name}')">
                <div class="profile-content">
                  <div class="profile-pic">
                    <img class="profile-pic-image" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500" />
                  </div>
                  <h3 class="profile-name">${snapshotUser.Name}</h3>
                </div>
              </div>
                `
            }
          })
        }
        else console.log("null")
    });
  }