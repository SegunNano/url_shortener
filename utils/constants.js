const charArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];


const Idx = () => {
    const idx = charArr[Math.floor(Math.random() * charArr.length)];
    return idx;
};


const addPrefix = (url) => {
    return (((url.startsWith('http://') || url.startsWith('https://')))
        ? url
        : 'http://' + url
    );
};

export { Idx, addPrefix };