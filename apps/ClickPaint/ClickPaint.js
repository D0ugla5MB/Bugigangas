console.log('RUNNING CLICK PAINT GAME!');
let clicked = false;

function freeBlocker(clickEvent) {
    const main = document.getElementById('app-root');
    if(clickEvent) main.classList.remove('main-blocked');
}

function controller() {
    if(clicked) {
        clearInterval(timer);
        console.log('STOPPED!');
        freeBlocker(clicked);
        return;
    }
    console.log('waiting the click...');
};
const timer = setInterval(controller, 500);


(function closeWelcomeMsg(){
    const containerMsg = document.getElementById('close-msg');
    containerMsg.addEventListener('click', () => {
        clicked = true;
        containerMsg.parentElement.remove();
    });
})();