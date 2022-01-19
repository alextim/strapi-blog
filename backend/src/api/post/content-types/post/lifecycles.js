const readingTime = require('reading-time');

const getReadingTime = (text) => {
  if (!text || text.length === 0) {
    return null;
  }
  const n = readingTime(text)?.minutes;
  if (!n) {
    return null;
  }
  const time = parseInt(n.toFixed(0), 10);
  return time || 1;
};

module.exports = {
  beforeCreate(event) {
    // eslint-disable-next-line no-param-reassign
    event.params.data.readingTime = getReadingTime(event.params.data.content);
  },

  beforeUpdate(event) {
    // eslint-disable-next-line no-param-reassign
    event.params.data.readingTime = getReadingTime(event.params.data.content);
  },
};
