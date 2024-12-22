import { changeRoute } from "../modules/router.js";

export function addMenuBtnsEvents() {
    const index_menu = document.getElementById('nav_menu');

    const menuButtonsWithId = document.querySelectorAll('button[id]');
    const btnSet = {};
    menuButtonsWithId.forEach((btn) => {
        btnSet[btn.id] = btn;
    });

    btnSet['btnNav'].addEventListener('click', () => {
        console.log('Dynamic button clicked!');
        index_menu.hidden = !index_menu.hidden;
    });
    btnSet['btn_home'].addEventListener('click', () => {
        changeRoute('#home');
    });
    btnSet['btn_err'].addEventListener('click', () => {
        changeRoute('#error');
    });

}
