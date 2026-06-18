function checkScroll() {

    const needScroll =
        document.documentElement.scrollHeight >
        window.innerHeight;

    document.body.style.overflowY =
        needScroll ? "auto" : "hidden";

    document.documentElement.style.overflowY =
        needScroll ? "auto" : "hidden";
}

checkScroll();

window.addEventListener("resize", checkScroll);

// Нота Ля старт

let noteA = false;
const textP = document.getElementById('welcome-containerp');
const checkboxButton = document.getElementById('noteA');

console.log(textP.innerText);
console.log(checkboxButton.checked);

checkboxButton.addEventListener('click', forNoteA);

function forNoteA() {
    if(!noteA) {
        textP.innerText = 'После нажатия на кнопку "Начать" вы услышите для настройки слуха ноту Ля(А). Затем сосредоточьтесь на играющей неизвестной ноте. Ваша задача - угадать, какая нота была сыграна. Также вы можете настроить длительность воспроизведения.';
        noteA = true;
    } else {
        textP.innerText = 'После нажатия на кнопку "Начать" вы услышите звук ноты. Ваша задача - угадать, какая нота была сыграна. Также вы можете настроить длительность воспроизведения.';
        noteA = false;
    }
};

// значение ползунка

const counter = document.getElementById('counter');
const counterTimer = document.getElementById('counter-value');

counter.addEventListener('input', () => {
    counterTimer.innerText = counter.value;
})