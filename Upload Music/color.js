const imgElement = document.getElementById('img');
// imgElement.crossOrigin="anonymous"
imgElement.crossOrigin = "Anonymous";
const vibrant = new Vibrant(imgElement);


document.querySelector(".hint").addEventListener("click",function(){
    var swatches = vibrant.swatches()
    document.querySelector(".hint").style.backgroundColor = swatches.LightVibrant.getHex()
    // document.querySelector(".hint").style.backgroundColor = swatches.DarkVibrant.getHex()
    // document.querySelector(".hint").style.backgroundColor = swatches.Vibrant.getHex()
    // document.querySelector(".hint").style.backgroundColor = swatches.Muted.getHex()
    
})