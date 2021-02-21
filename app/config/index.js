module.exports = {
    port: process.env.PORT || 2020,
    environment: process.env.NODE_ENV || 'development',
    sqlOptions: {
        host: process.env.DB_HOST || '35.194.6.170',
        user: process.env.DB_USER || 'task_tracker',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_DATABASE || 'task_tracking',
        password: process.env.DB_PASS || 'YellowUmbrell@1'
    },
    session: {
        name: 'tasks.sid',
        domain: 'baraon.dev',
        secret: 'elongated-muskrats-and-navalnys'
    }
}
