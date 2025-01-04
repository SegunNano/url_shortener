import axios from "axios";


const charArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

const addPrefix = (url) => {
    return (((url.startsWith('http://') || url.startsWith('https://')))
        ? url
        : 'http://' + url
    );
};


const formatUrl = (url) => {
    let prefixedUrl = addPrefix(url);
    return (prefixedUrl.endsWith('/'))
        ? prefixedUrl
        : prefixedUrl + '/';
};


const checkUrlExistence = async (url) => {
    try {
        const response = await axios.head(formatUrl(url), {
            headers: { 'User-Agent': 'Mozilla/5.0' } // Mimic a browser
        });
        return response.status >= 200 && response.status < 300; // Return true if 2xx
    } catch (error) {
        console.log('Error:', error.response?.status || error.message);
        return false; // Return false for errors
    }
};



const Idx = () => {
    const idx = charArr[Math.floor(Math.random() * charArr.length)];
    return idx;
};

const generateIdx = () => {
    const firstIdx = Idx();
    const secondIdx = Idx();
    const thirdIdx = Idx();
    const fourthIdx = Idx();
    const fifthIdx = Idx();

    return `${firstIdx}${secondIdx}${thirdIdx}${fourthIdx}${fifthIdx}`;
};





export { generateIdx, checkUrlExistence, formatUrl };