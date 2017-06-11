function Counter(count) {
    this.count = count;
    
}

module.exports = function (count) {
    return new Counter(count);
};