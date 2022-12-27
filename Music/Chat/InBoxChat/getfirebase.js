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
  let listChat = [];
  let getMainUser;
  let getsecondUser;
  onValue(ref(db, `Chat`), (snapshot) => {
    listChat = [];
    $('<div class="message loading new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    snapshot.forEach(element => {
      let value = JSON.stringify(element)
      if((JSON.parse(value).UserGet == getMainUser && JSON.parse(value).UserSend == getsecondUser)||(JSON.parse(value).UserGet == getsecondUser && JSON.parse(value).UserSend == getMainUser))
          listChat.push(JSON.parse(value))
    });
    console.log(listChat[listChat.length-1])
    loadInner(listChat[listChat.length-1])
    $('.message.loading').remove();
  });
  window.onload= function(){
    console.log("App Start")
    getMainUser = localStorage.getItem("Acc");
    getsecondUser = localStorage.getItem("Sec");
    document.querySelector("#NameSec").textContent = getsecondUser
    get(ref(db, `Chat`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log("tim thay 1 du lieu")
          const d = new Date()
          console.log(d)
          listChat = [];
          snapshot.forEach(element => {
            let value = JSON.stringify(element)
            if((JSON.parse(value).UserGet == getMainUser && JSON.parse(value).UserSend == getsecondUser)||(JSON.parse(value).UserGet == getsecondUser && JSON.parse(value).UserSend == getMainUser))
                listChat.push(JSON.parse(value))
          });
          loadFist()
        }
        else console.log("null")
    });
  }
  function loadFist(){
    listChat.forEach(snapshot =>{
        if(snapshot.UserGet==getMainUser){
            $('<div class="message new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure>' + snapshot.Value+ '</div>').appendTo($('.mCSB_container'));
            $('<div class="timestamp">' + snapshot.Date + '</div>').appendTo($('.message:last'));

        }
        else{
            $('<div class="message message-personal">' + snapshot.Value + '</div>').appendTo($('.mCSB_container'));
            $('<div class="timestamp">' + snapshot.Date + '</div>').appendTo($('.message:last'));
        }
    })
  }
  function loadInner(x){
    if(x.UserGet == getsecondUser) return
    $('<div class="message new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure>' + x.Value + '</div>').appendTo($('.mCSB_container')).addClass('new');
    $('<div class="timestamp">' + x.Date + '</div>').appendTo($('.message:last'));
    updateScrollbar();
  }
  function updateScrollbar() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
      scrollInertia: 10,
      timeout: 0
    });
  }

  function setDate(){
    d = new Date()
    if (m != d.getMinutes()) {
      m = d.getMinutes();
      $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    }
  }
  function UploadDataBase(x){
    const d = new Date()
    const dateSend = d.getHours()+":"+d.getMinutes();
    const data = {
        UserSend: getMainUser,
        UserGet: getsecondUser,
        Value: x,
        Date: dateSend
    }

    push(ref(db, `Chat`),data)
  }

  $('.message-submit').click(function() {
    const ContentChat = document.querySelector(".message-input").value;
    insertMessage();
    UploadDataBase(ContentChat)
  });
  
  $(window).on('keydown', function(e) {
    if (e.which == 13) {
      const ContentChat = document.querySelector(".message-input").value;
      insertMessage();
      UploadDataBase(ContentChat)
      return false;
    }
  })