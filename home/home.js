export function test() {
    const btn = document.getElementById('t');
    btn.addEventListener('click', () => {
        btn.innerText = 'Clicked!';
    });
}

document.addEventListener('DOMContentLoaded',() => {
    console.log('reached the home.js');
    test();
});