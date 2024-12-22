import { changeRoute } from "../modules/router.js";
import { getHashError, getHashHome, getKeyBtnError, getKeyBtnHome, getKeyBtnNav, getNavMenu, getQuerySelect } from "../modules/storage.js";

export function addMenuBtnsEvents() {
    const index_menu = document.getElementById(getNavMenu);

    const menuButtonsWithId = document.querySelectorAll(getQuerySelect);
    const btnSet = {};
    menuButtonsWithId.forEach((btn) => {
        btnSet[btn.id] = btn;
    });

    btnSet[getKeyBtnNav].addEventListener('click', () => {
        console.log('Dynamic button clicked!');
        index_menu.hidden = !index_menu.hidden;
    });
    btnSet[getKeyBtnHome].addEventListener('click', () => {
        changeRoute(getHashHome);
    });
    btnSet[getKeyBtnError].addEventListener('click', () => {
        changeRoute(getHashError);
    });

}
