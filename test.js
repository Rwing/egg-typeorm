
const typeorm = require('typeorm');

(function* () {

    const connection = yield typeorm.createConnection({
        driver: {
            type: 'postgres',
            host: '192.168.86.100',
            // 端口号
            port: '5432',
            // 用户名
            username: 'postgres',
            // 密码
            password: 'postgres@ats',
            // 数据库名
            database: 'postgres'
        }
    });

    const rows = yield connection.entityManager.query('select 1 as column1;');
    console.log(rows[0].column1);
})()
