Array.prototype.mapAsync = function(fn) {
  return this.reduce(async (accumulatorPromise, currentValue, index) => {
    return accumulatorPromise.then(async () => await fn(currentValue, index, this.length))
  }, Promise.resolve())
}

module.exports = Array