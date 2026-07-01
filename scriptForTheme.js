const logoSVGForSettings = {
    sun: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>`,
    moon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>`,
    globe: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /></svg>`
};

const windowSetting = document.getElementById('settings');

let activeTheme
if(localStorage.getItem('theme') === null) {
    activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.setItem('theme', activeTheme ? 'dark' : 'light');
} else {
    if( localStorage.getItem('theme') === 'dark') activeTheme = true
    else activeTheme = false
}

function addSettingForWindow() {
    windowSetting.innerHTML = `<button class="setBTN" id="language">${logoSVGForSettings.globe}</button>
    <button class="setBTN" id="theme">${activeTheme ? logoSVGForSettings.moon : logoSVGForSettings.sun}</button>`
};

addSettingForWindow();

const themeBTN = document.getElementById('theme');
const logo = document.getElementById('logo');

function forLightColor () {
    document.documentElement.setAttribute('data-theme', 'light');
    logo.src = 'image/LogoAPDark.svg';
}

if(localStorage.getItem('theme') === 'light') {
    forLightColor();
}

themeBTN.addEventListener('click', () => {
    activeTheme = !activeTheme;

    if (activeTheme) {
        themeBTN.innerHTML = logoSVGForSettings.moon;
        document.documentElement.setAttribute('data-theme', 'dark');
        logo.src = 'image/LogoAPLight.svg';
    } else {
        themeBTN.innerHTML = logoSVGForSettings.sun;
        forLightColor ()
    }

    localStorage.setItem('theme', activeTheme ? 'dark' : 'light');
})