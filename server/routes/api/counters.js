const Counter = require('../../models/gif');

module.exports = (app) => {

  app.post('/api/gifs', function (req, res, next) {
    var counter = new Counter({
      source    : req.body.source,
      creator   : req.body.creator,
      rating    : req.body.rating 
    });

    counter.save()
      .then(() => res.json(counter))
      .catch((err) => next(err));
  });
};
