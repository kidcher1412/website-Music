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
  let userdata;
get(ref(db, `Users`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log("tim thay 1 du lieu")
      userdata = [];
      snapshot.forEach(element => {
        let value = JSON.stringify(element)
        userdata.push(JSON.parse(value))
      });
    }
    else console.log("null")
});

const MailLog = document.querySelector("#logemail")
const PassLog = document.querySelector("#logpass")
const BntLog = document.querySelector("#login")
const BntForget = document.querySelector("#getacc")

BntLog.addEventListener("click",function(){
    let checkercontiniue = 0;
    userdata.forEach(element =>{
        if((element.Mail == MailLog.value||element.Name == MailLog.value)&&element.Pass == PassLog.value){
            console.log('thuc hien sao ke');
            var json_string = element.Name;
            localStorage.setItem("Acc",json_string)
            checkercontiniue = 1;
            alert("Hê Lô "+ element.Name+ " Wellcome Back!!!")
            return window.open('./Music/index.html','_parent');

        }
    })
    if(!checkercontiniue == 1) alert("sai thong tin dang nhap")
})
BntForget.addEventListener("click",function(){
    let userdata;
    get(ref(db, `Users`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log("tim thay 1 du lieu")
          userdata = [];
          snapshot.forEach(element => {
            let value = JSON.stringify(element)
            userdata.push(JSON.parse(value))
          });
        }
        else console.log("null")
    });
    document.querySelector("#labletoLogin").textContent = "By Email";
    document.querySelector("#labletosignup").textContent = "By Name";
    const backup = document.querySelector(".card-3d-wrapper")
    // document.querySelector("lable").style.display = "none";
    document.querySelector(".card-3d-wrapper").innerHTML = `
    <div class="card-front" style ="padding: 5%; height: 69%;" >
        <h4 class="mb-4 pb-3" style ="margin-top: 5%;">Forgot Password</h4>
        <div class="form-group">
        <input type="email" name="logemail" class="form-style" placeholder="Your Email" id="forgetemail" autocomplete="off">
        <i class="input-icon uil uil-at"></i>
        </div>
        <a href="#" class="btn mt-4" id="forget">Get Password</a>
        <div class="Auth" style ="margin-top: 5%; "></div>
    </div>
    <div class="card-back" style ="padding: 5%; height: 69%;" >
        <h4 class="mb-4 pb-3" style ="margin-top: 5%;">Forgot Password</h4>
        <div class="form-group">
        <input type="email" name="logemail" class="form-style" placeholder="Your Name" id="forgetname" autocomplete="off">
        <i class="input-icon uil uil-at"></i>
        </div>
        <a href="#" class="btn mt-4" id="forget1">Get Password</a>
        <div class="Auth" style ="margin-top: 5%; "></div>
    </div>
    `
    document.querySelector("#forget").addEventListener("click",function(){
        console.log("da nhap")
        let checkercontiniue = 0;
        userdata.forEach(element =>{
            if(element.Mail == document.querySelector("#forgetemail").value){
                alert("Mật Khẩu Của Bạn Là "+element.Pass) ;
                checkercontiniue =1;
            }
        })
        if(checkercontiniue == 0 ) alert("không tìm thấy tài khoản mang thông tin Email "+document.querySelector("#forgetemail").value)
        return window.location.reload();
    })
    document.querySelector("#forget1").addEventListener("click",function(){
        console.log("da nhap")
        let checkercontiniue = 0;
        userdata.forEach(element =>{
            if(element.Name == document.querySelector("#forgetname").value) 
        {
            alert("Mật Khẩu Của Bạn Là "+element.Pass) ;
            checkercontiniue =1;
            return window.location.reload();
        }
        })
        if(checkercontiniue == 0 ){
            alert("không tìm thấy tài khoản mang thông tin Tên "+document.querySelector("#forgetname").value)
            return window.location.reload();
        }
        return window.location.reload();
    })
})