
const pianokeys = document.querySelectorAll(".piano-keys .key"),
volumeslider = document.querySelector(".volume_slider .slider");

const gif = document.querySelector(".first");
let allkeys = [],
audio = new Audio(`a.wav`);
// audio.play();

const playTune = (key)=>{
    audio.src =`${key}.wav`;

    audio.play();
    gif.style.visibility = "visible";

    // Hide GIF after 10 nanoseconds
    setTimeout(() => {
        gif.style.visibility = "hidden";
    }, 100);



    const clickedKey = document.querySelector(`[data-key="${key}"]`); // getting clicked key element
    clickedKey.classList.add("active"); // adding active class to the clicked key element
    setTimeout(() => { // removing active class after 150 ms from the clicked key element
        clickedKey.classList.remove("active");
    }, 150);
}

pianokeys.forEach(key =>{
    allkeys.push(key.dataset.key);
    key.addEventListener("click",()=>{
        playTune(key.dataset.key);
    })
})
console.log(allkeys);

const pressedKey = (e)=>{
    if(allkeys.includes(e.key)) playTune(e.key);
}
document.addEventListener("keydown",pressedKey);


const volumesslider = (e)=>{
audio.volume = e.target.value;
}

volumeslider.addEventListener("input",volumesslider);

let show1= document.querySelector(".show1");
let show2= document.querySelector(".show2");


show2.addEventListener("click", () => {
    toggleVisibility();
    pianokeys.forEach((index)=>{
        index.textContent=" "
    })
});

show1.addEventListener("click", () => {
    toggleVisibility();
    pianokeys.forEach((index,i)=>{
        index.textContent=allkeys[i];
    })
});

function toggleVisibility() {
    if (show1.style.visibility === "visible") {
        show1.style.visibility = "hidden";
        show2.style.visibility = "visible";
    } else {
        show1.style.visibility = "visible";
        show2.style.visibility = "hidden";
    }
}


let plus=document.querySelector(".plus"),
minus = document.querySelector(".minus");


plus.addEventListener("click", () => {
    adjustVolume(1);
    console.log(plus);
});

minus.addEventListener("click", () => {
    adjustVolume(-1);
    console.log(minus);

});

function adjustVolume(step) {
    console.log(volumeslider.value)
    let currentVolume = parseFloat(volumeslider.value); // Get the current volume value as a number
    let newVolume = currentVolume + step * 0.1; // Increase or decrease the volume by 0.1 (you can adjust this step size as needed)

    // Ensure the new volume stays within the range of 0 to 1
    newVolume = Math.max(0, Math.min(1, newVolume));

    volumeslider.value = newVolume; // Set the new volume value to the volume slider
}


