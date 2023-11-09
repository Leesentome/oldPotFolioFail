
const letters = "abcdefghijklmnopqrstuvwxyz";

let glitchedTextRunning = false
function runGlitchAnimation(target, loop, fullLength=true) {
    if (glitchedTextRunning) return;
    glitchedTextRunning = true;
    let iterations = 0;
    if (!fullLength) iterations -= 2;
    const interval = setInterval(() => {
        let offset = 0;
        target.innerText = target.dataset.text.split("")
            .map((letter, index) => {
                if (!fullLength && index > iterations + 2) return "";
                if (letter === " ") {
                    offset += 1
                    return " ";
                }
                if (index < iterations + offset) return letter;
                let l = letters[Math.floor(Math.random() * 26)];
                if (letter === letter.toUpperCase()) return l.toUpperCase();
                return l;
            })
            .join("");

        if (iterations + offset >= target.dataset.text.length) {
            clearInterval(interval);
            glitchedTextRunning = false
        }
        iterations += 1 / loop;
    }, 30);
}

document.querySelector(".name").onmouseover = event => {
    runGlitchAnimation(event.target, 3);
};

document.addEventListener("DOMContentLoaded", () => {
    const targetElement = document.querySelector(".name");
    runGlitchAnimation(targetElement, 3, false);
});

document.querySelector(".centralunit").addEventListener("click", function() {
    const proc = document.querySelector('.centralunit');
    let first = true;
    for (const child of proc.children) {
        if (child.nodeName === 'SPAN') {
            child.style.display = "block"
            child.style.animation = 'none';
            void child.offsetWidth;
            child.style.animation = 'shockblast 1s cubic-bezier(0,1.2,1,.9) 1';
            if (first) {
                first = false;
                child.addEventListener('animationend', function() {
                    child.style.display = 'none';
                    glitchedTransition();
                });
            }
        }
    }
});

function randomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

let glitchedTransRunning = false
function glitchedTransition() {
    if (glitchedTransRunning) return;
    glitchedTransRunning = true
    let bg = document.querySelector('.glitchTrans');
    const count = 30;
    const maxIter = 10;
    const landing = document.querySelector('.landing');

    for (let i = 0; i < count; i++) {
        let glitchedBox = document.createElement('div');
        glitchedBox.className = 'glitchedBox';
        bg.appendChild(glitchedBox);
    }
    bg.style.display = 'block';
    let glitched = document.getElementsByClassName('glitchedBox');
    html2canvas(landing).then((screen) => {
        let img = screen.toDataURL()
        for (let i = 0; i < glitched.length; i++) {
            glitched[i].style.background = `url(${img})`;
            glitched[i].style.backgroundAttachment = 'fixed';
        }
    });
    let iterations = 0;
    let interval = setInterval(function() {
        for (let i = 0; i < glitched.length; i++) {
            if (i < iterations * count / maxIter) {
                let color = randomColor();
                if (iterations < maxIter / 2) color = '#FFFFFF';
                glitched[i].style.background = color;
            }
            glitched[i].style.left = Math.floor(Math.random()*100) + 'vw';
            glitched[i].style.top = Math.floor(Math.random()*100) + 'vh';
            glitched[i].style.width = Math.floor(Math.random()*400) + 'px';
            glitched[i].style.height = Math.floor(Math.random()*100) + 'px';
            glitched[i].style.backgroundPosition = Math.floor(Math.random()*20) + 'px';
        }
        if (iterations == maxIter / 2) {
            landing.style.display = 'none';
        }
        if (iterations >= maxIter) {
            clearInterval(interval);
            bg.style.display = 'none';
            glitchedTransRunning = false
        }
        iterations++;
    }, 200);
}


