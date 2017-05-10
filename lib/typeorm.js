'use strict';

const assert = require('assert');
const typeorm = require('typeorm');

let count = 0;

module.exports = createOneClient;

async function createOneClient(config, app) {
    assert(config.type && config.host && config.port && config.username && config.database,
        `[egg-typeorm] 'type: ${config.type}', 'host: ${config.host}', 'port: ${config.port}', 'user: ${config.username}', 'database: ${config.database}' are required on config`);

    app.coreLogger.info('[egg-typeorm] connecting %s@%s:%s/%s',
        config.username, config.host, config.port, config.database);

    const connection = await typeorm.createConnection({
        driver: {
            type: config.type,
            host: config.host,
            port: config.port,
            username: config.username,
            password: config.password,
            database: config.database
        },
        entities: [
            config.entityPath
        ],
        autoSchemaSync: config.autoSchemaSync
    });

    app.beforeStart(function* () {
        const rows = yield connection.entityManager.query('select 1 as column1;');
        const index = count++;
        app.coreLogger.info(`[egg-typeorm] instance[${index}] status OK, typeorm result: ${rows[0].column1}`);
    });
    return await connection;
}