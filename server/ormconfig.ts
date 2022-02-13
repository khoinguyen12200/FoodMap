require('dotenv').config()

module.exports =  {
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logger: "advanced-console",
    logging: process.env.NODE_ENV === "production" ? ["error", "warn"] : "all",
    cache: true,
    dropSchema: false,
    entities: ["./src/models/*.ts"],
    useUnifiedTopology: true
};
