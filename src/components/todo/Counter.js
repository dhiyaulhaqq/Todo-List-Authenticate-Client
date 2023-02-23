let count = 1;

const increment = () => {
  count++;
};

const decrement = () => {
  count--;
};

const getCount = () => {
  return count;
};

const Counter = {
  increment,
  decrement,
  getCount,
};

module.exports = Counter;
