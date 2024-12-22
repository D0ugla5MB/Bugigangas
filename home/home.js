import { EnvVars, changeRoute } from '../app.js';

export function addMenuBtnsEvents() {
    const index_menu = document.getElementById(EnvVars.getNavMenu);

    const menuButtonsWithId = document.querySelectorAll(EnvVars.getQuerySelect);
    const btnSet = {};
    menuButtonsWithId.forEach((btn) => {
        btnSet[btn.id] = btn;
    });

    btnSet[EnvVars.getKeyBtnNav].addEventListener('click', () => {
        console.log('Dynamic button clicked!');
        index_menu.hidden = !index_menu.hidden;
    });
    btnSet[EnvVars.getKeyBtnHome].addEventListener('click', () => {
        changeRoute(EnvVars.getHashHome);
    });
    btnSet[EnvVars.getKeyBtnError].addEventListener('click', () => {
        changeRoute(EnvVars.getHashError);
    });

}
