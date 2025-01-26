function clearContainer(container) {
    if (container instanceof Node) {
        container.innerHTML = '';
        return;
    }
    document.getElementById(container).innerHTML = '';
}

function clearHeadLinks() {
    const children = document.head.children;
    for (let i = children.length - 1; i >= 0; i--) {
        if (children[i].classList.contains('dynamic-style')) {
            children[i].remove();
        }
    }
}
export default {
    clearContainer,
    clearHeadLinks
};
