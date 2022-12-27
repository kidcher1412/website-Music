function GetInbox(x){
    localStorage.setItem("Sec",x)
    console.log("set thanh cong "+ localStorage.getItem("Sec"))
    window.open("./InBoxChat/index.html","_parent")
  }