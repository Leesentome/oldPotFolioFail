
const letters = "abcdefghijklmnopqrstuvwxyz";

function runGlitchAnimation(target, loop) {
    let iterations = 0;
    const interval = setInterval(() => {
        target.innerText = target.innerText.split("")
            .map((letter, index) => {
                const dataText = target.dataset.text;
                if (dataText[index] === " ") return " ";
                if (index < iterations) return dataText[index];
                let l = letters[Math.floor(Math.random() * 26)];
                if (dataText[index] === dataText[index].toUpperCase()) return l.toUpperCase();
                return l;
            })
            .join("");

        if (iterations >= target.dataset.text.length) clearInterval(interval);

        iterations += 1 / loop;
    }, 30);
}

document.querySelector(".name").onmouseover = event => {
    runGlitchAnimation(event.target, 3);
};

document.addEventListener("DOMContentLoaded", () => {
    const targetElement = document.querySelector(".name");
    runGlitchAnimation(targetElement, 6);
});
