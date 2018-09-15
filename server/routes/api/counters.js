const Counter = require('../../models/gif');

module.exports = (app) => {

  app.post('/api/gifs', function (req, res, next) {
    const counter = new Counter();

    counter.save()
      .then(() => res.json(counter))
      .catch((err) => next(err));
  });
};
