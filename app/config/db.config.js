module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "@VBLGyTr3662806",
  DB: "absensi",
  dialect: "postgres",
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
};