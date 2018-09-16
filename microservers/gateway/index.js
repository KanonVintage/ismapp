    const thrift = require('thrift');
    const TopTenService = require('./gen-nodejs/TopTenService');
    const app = require('express')();
    const cors = require('cors')
    const transport = thrift.TBufferedTransport;
    const protocol = thrift.TBinaryProtocol;
    

    app.use(cors());

    function createConnection(host, port, thing, errorCallback) {
        const connection = thrift.createConnection(host, port, {
            transport : transport,
            protocol : protocol
        });
        connection.on('error', errorCallback);
        return thrift.createClient(thing, connection);
    }


    app.get('/topten/:sometext', (req, res) => {
        const TopTen = createConnection(process.env.TOPTEN_HOST, process.env.TOPTEN_PORT, TopTenService, (err) => {
            return res.status(500).json({
                name: err.name,
                message: err.message,
                stack: err.stack
            });
        });
        return TopTen.topten(req.params.sometext)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json(err));
    });

    app.listen(process.env.PORT || 8000);