const Container = require('../../models/Container');

module.exports = (app) => {

  app.get('/api/containers', (req, res, next) => {
    Container.find()
      .exec()
      .then((container) => res.json(container))
      .catch((err) => next(err));
  });

  app.post('/api/containers', function (req, res, next) {
    var container = new Container({
        contenedor        : req.body.contenedor,
        tipo              : req.body.tipo,
        viaje             : req.body.viaje,
        isocode           : req.body.isocode,
        etapa             : req.body.etapa,
        operador          : req.body.operador,
        puerto_origen     : req.body.puerto_origen,
        linea             : req.body.linea,
        agente_aduana     : req.body.agente_aduana,
        estado            : req.body.estado,
        nombre_aduana     : req.body.nombre_aduana,
        nave_tiene        : req.body.nave_tiene,
        nave_codigo       : req.body.nave_codigo,
        nave_nombre       : req.body.nave_nombre,
        aduana            : req.body.aduana,
        tatc              : req.body.tatc,
        conco             : req.body.conco,
        fecha             : req.body.fecha,
        hora              : req.body.hora,
        camion            : req.body.camion,
        contrato          : req.body.contrato,
        cobro             : req.body.cobro,
        origen            : req.body.origen,
        dym               : req.body.dym,
        conductor         : req.body.conductor,
        rut               : req.body.rut,
        empresa           : req.body.empresa,
        cliente           : req.body.cliente,
        frigorista        : req.body.frigorista,
        booking           : req.body.booking,
        asignacion        : req.body.asignacion,
    });

    container.save()
      .then(() => res.json(container))
      .catch((err) => next(err));
  });

  app.delete('/api/containers/:id', function (req, res, next) {
    Container.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((container) => res.json())
      .catch((err) => next(err));
  });

  //not done yet
  app.put('/api/containers/:id/increment', (req, res, next) => {
    Container.findById(req.params.id)
      .exec()
      .then((container) => {
        container.count++;

        container.save()
          .then(() => res.json(container))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
};
