module.exports = (seconds) => {
    let millisec = seconds * 1000;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('');
        }, millisec);
    });
};
