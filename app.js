require('dotenv').config()
const express = require('express')
const app = express()

const appPromise = require('./src/app/middlewares/configprovider').appPromise
const { ZIPKIN_LOCAL_ENDPOINT, ZIPKIN_SERVICE_NAME } = require('./src/app/common/constants')
 
const client = require('prom-client');
const counter = new client.Counter({
    name: 'http_request_counter_health',
    help: 'Metrics to count hits on the health api ',
});
const register = new client.Registry();
register.registerMetric(counter)
register.setDefaultLabels({
    app: 'app-account',
    prefix: 'node_'
  })
client.collectDefaultMetrics({ register })

appPromise.then(function(app) {
    const PORT = process.env.SERVER_PORT_ACCOUNT || 3001

    const { Tracer, ExplicitContext, BatchRecorder, jsonEncoder } = require('zipkin')
    const { HttpLogger } = require('zipkin-transport-http')
    const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware
    const ZIPKIN_ENDPOINT = process.env.ZIPKIN_ENDPOINT || ZIPKIN_LOCAL_ENDPOINT
    const tracer = new Tracer({
        ctxImpl: new ExplicitContext(),
        recorder: new BatchRecorder({
            logger: new HttpLogger({
                endpoint: `${ZIPKIN_ENDPOINT}/api/v2/spans`,
                jsonEncoder: jsonEncoder.JSON_V2,
            })
        }),
        localServiceName: ZIPKIN_SERVICE_NAME,
    })

    app.use(zipkinMiddleware({ tracer }))

    app.use('/api', require('./src/app/routes'))
    app.get('/metrics', async (req, res) => {
        res.setHeader('Content-Type', register.contentType)
        res.send(await register.metrics())
    });
    app.get('/health', async (req, res) => {
        counter.inc()
        res.send({message: 'Account App healty'});
    });
    app.listen(PORT, () => {
        console.log('Application running on port ', PORT)
    })
});
