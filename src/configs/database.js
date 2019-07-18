module.exports = {
  username: process.env.PG_USERNAME || 'pagarme_user',
  password: process.env.PG_PASSWORD || 'senha_secreta',
  database: process.env.PG_DATABASE || 'pegarme',
  host: process.env.PG_HOST || 'localhost',
  url: process.env.PG_URL || 'postgresql://localhost:5432/pagarme',
  dialect: 'postgres',
  pool: {
    max: 100,
    min: 0,
    idle: 30000,
  },
};
