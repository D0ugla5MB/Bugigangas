const bufferLetter = (...info) => {
    return () => {
        const [letter, index, drct_type] = info;
        return { letter, inde, drct_type };
    };
};

function debounce(func, delay) {
    let timer = null;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const random_func = {};