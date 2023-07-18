const getImageKey = (link) => {
    const stringSplitedArray = link.split("/");
    return stringSplitedArray[stringSplitedArray.length - 1]
};  

module.exports = getImageKey;