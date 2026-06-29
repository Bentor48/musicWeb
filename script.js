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

// Рандомная нота

let randomNoteNumber;
let randomNoteName;

// результат выбора
let keyForResult;

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
    { name: "До", file: "music/c.mp3", number: 0},
    { name: "До#", file: "music/cSharp.mp3", number: 1},
    { name: "Ре", file: "music/d.mp3", number: 2},
    { name: "Ми♭", file: "music/eFlat.mp3", number: 3},
    { name: "Ми", file: "music/e.mp3", number: 4},
    { name: "Фа", file: "music/f.mp3", number: 5},
    { name: "Фа#", file: "music/fSharp.mp3", number: 6},
    { name: "Соль", file: "music/g.mp3", number: 7},
    { name: "Соль#", file: "music/gSharp.mp3", number: 8},
    { name: "Ля", file: "music/a.mp3", number: 9},
    { name: "Си♭", file: "music/bFlat.mp3", number: 10},
    { name: "Си", file: "music/b.mp3", number: 11}
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

    function startRandomNote() {
        svgForStart.src = 'image/ListenLight.svg';
        svgForStart.alt = 'Человек внимательно слушает музыку';
        svgForStart.style.display = 'flex';
        timerP.style.display = 'none';
        
        function playRandomNote() {
            const randomIndex = Math.floor(Math.random() * notes.length);

            console.log(notes[randomIndex].name);
            randomNoteNumber = notes[randomIndex].number;
            randomNoteName = notes[randomIndex].name;

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
                startPiano()
            }, Number(counter.value) * 1000);
        }

        playRandomNote();
    }
})

function startPiano() {
    window2ForTimer.style.display = 'none';
    window3ForPiano.style.display = 'flex';
    
    // кнопки фо-но
    const whiteBtn = document.querySelectorAll('.white-btn');
    const blackBtn = document.querySelectorAll('.black-btn');

    // Белые клавиши активные

    whiteBtn.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Пользователь нажал белую кнопку' + button.dataset.note);
            // Стандартный стиль

            whiteBtn.forEach(button => {
                button.style.backgroundColor = 'var(--white)';
            });
                
            blackBtn.forEach(button => {
                button.style.backgroundColor = 'var(--black)';
            });

            button.style.backgroundColor = 'var(--whiteForFocus)';
            keyForResult = button.dataset.note;
        });
    });

    blackBtn.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Пользователь нажал черную кнопку' + button.dataset.note);
            // Стандартный стиль

            whiteBtn.forEach(button => {
                button.style.backgroundColor = 'var(--white)';
            });
                
            blackBtn.forEach(button => {
                button.style.backgroundColor = 'var(--black)';
            });

            button.style.backgroundColor = 'var(--blackForFocus)';
            keyForResult = button.dataset.note;
        });
    });
}

// кнопка проверить
const resultBNT = document.getElementById('resultButton');

resultBNT.addEventListener('click', () => {
    if(!keyForResult) {
        alert('Выберите вариант ответа');
    } else {
        checkResuit()
    }
})

// Массив фраз Должно быть всегда одинаковое количество фраз

const successMessages = [
    "Отлично! Вы угадали ноту!",
    "Превосходно! Ваш слух вас не подвёл!",
    "Верно! Так держать!",
    "Браво! Вы отлично справились!",
    "Правильный ответ! Продолжайте в том же духе!"
];

const failMessages = [
    "Пока не получилось. Попробуйте ещё раз!",
    "Ничего страшного, слух развивается с практикой!",
    "Почти! Следующая попытка может быть удачной.",
    "Не сдавайтесь! Каждая попытка делает вас лучше.",
    "Ошибки — это часть обучения. Попробуйте снова!"
];

function checkResuit () {
    window3ForPiano.style.display = 'none';

    if(window.matchMedia("(orientation: landscape) and (pointer: coarse)").matches || window.matchMedia("(min-width: 1024px").matches) {
        window4ForResult.style.display = 'grid';
    } else {
        window4ForResult.style.display = 'flex';
    }

    // Параграф результата
    const textForResult = document.getElementById('textForResult');

    // парвильная нота
    const correctNote = document.getElementById('correctNote');
    correctNote.innerHTML = `Правильная нота <br>${randomNoteName}`;


    const randomNumberForMessages = Math.floor(Math.random() * successMessages.length);

    if(randomNoteNumber === Number(keyForResult)) {
        textForResult.innerText = successMessages[randomNumberForMessages];
    } else {
        textForResult.innerText = failMessages[randomNumberForMessages];
    }
}