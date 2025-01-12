const initCache = () => new WeakMap();

function manageCache(memCache, keyHash, state) {
    memCache.set(keyHash, {
        content: state.content.cloneNode(true),
        style: state.style.cloneNode(true)
    });
}

function getCache(memCache, keyHash) {
    return memCache.get(keyHash);
}