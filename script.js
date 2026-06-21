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
const svgForStart = document.getElementById('svgForStart');

// длинна ноты ля
const noteADuration = 1200;
// параграф дял подсказки
const timerP = document.getElementById('timer');

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

function playNoteA() {
    const audioContext = new AudioContext();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine'; // форма волны
    oscillator.frequency.value = 440; // Ля первой октавы
    gainNode.gain.value = 0.2;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    svgForStart.src = 'image/forkLight.svg';
    svgForStart.alt = 'Метроном издаёт звук';
    timerP.innerText = 'Ля(A)'


    setTimeout(() => {
        oscillator.stop();
        audioContext.close();
    }, noteADuration);
}

// значение ползунка

const counter = document.getElementById('counter');
const counterTimer = document.getElementById('counter-value');

counter.addEventListener('input', () => {
    counterTimer.innerText = counter.value;
})

// переход от первого окна ко второму, обратный отсчёт

const startBNT = document.getElementById('start-btn');
const window1 = document.getElementById('window1ForStart');
const window2 = document.getElementById('window2ForTimer');

//Массив нот

const notes = [
    { name: "До", file: "music/c.mp3" },
    { name: "До#", file: "music/cSharp.mp3" },
    { name: "Ре", file: "music/d.mp3" },
    { name: "Ми♭", file: "music/eFlat.mp3" },
    { name: "Ми", file: "music/e.mp3" },
    { name: "Фа", file: "music/f.mp3" },
    { name: "Фа#", file: "music/fSharp.mp3" },
    { name: "Соль", file: "music/g.mp3" },
    { name: "Соль#", file: "music/gSharp.mp3" },
    { name: "Ля", file: "music/a.mp3" },
    { name: "Си♭", file: "music/bFlat.mp3" },
    { name: "Си", file: "music/b.mp3" }
];

startBNT.addEventListener('click', () => {
    window1.style.display = 'none';
    window2.style.display = 'flex';

    let timeLeftForStart = 3;

    if(noteA) {
        playNoteA();
        setTimeout(startTimer, noteADuration); 
    } else {
        startTimer();
    }

    setTimeout(startRandomNote, 4000);

    function startTimer() {

        svgForStart.style.display = 'none';
        timerP.innerText = timeLeftForStart;

        const intervalId = setInterval(() => {
            timeLeftForStart--

            timerP.innerText = timeLeftForStart;

            if (timeLeftForStart > 0) {
                timerP.innerText = timeLeftForStart
            } 
            
            else if(timeLeftForStart === 0){
                timerP.innerText = 'Старт!'
            }

            else {
                clearInterval(intervalId);
            }
        }, 1000);

    }

// Рандомная нота

    function startRandomNote() {
        svgForStart.src = 'image/ListenLight.svg';
        svgForStart.alt = 'Человек внимательно слушает музыку';
        svgForStart.style.display = 'flex';
        timerP.style.display = 'none';
        
        function playRandomNote() {
            const randomIndex = Math.floor(Math.random() * notes.length);

            console.log(notes[randomIndex].name)

            const audio = new Audio(
                notes[randomIndex].file
            );

            const audioContext = new AudioContext();
            const source = audioContext.createMediaElementSource(audio)


            const gainNode = audioContext.createGain();
            gainNode.gain.value = 4;

            source.connect(gainNode);
            gainNode.connect(audioContext.destination);

            audio.play()

            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, Number(counter.value) * 1000);
        }

        playRandomNote();

    }

})