export function loadMenu(nav_menu, btnNav, btnHome) {
    const index_menu = nav_menu;
    const menuBtn = btnNav;
    const homeBtn = btnHome;

    window.addEventListener('hashchange', loadContent);
    menuBtn.addEventListener('click', () => {
        console.log('Dynamic button clicked!');
        index_menu.hidden = !index_menu.hidden;
    });
    homeBtn.addEventListener('click', () => {
        changeRoute('#home');
    });
}
