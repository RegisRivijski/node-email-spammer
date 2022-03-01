module.exports = {
  makeChunks(chunkSize, array) {
    const chunkedArr = [];
    let counter = 0;
    while(counter < array.length) {
      chunkedArr.push(array.slice(counter, counter + chunkSize));
      counter += chunkSize;
    }
    return chunkedArr;
  },
};
