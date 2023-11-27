const mysql = require('mysql2/promise');

async function connectToDB() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    console.log('Conectado a la base de datos MySQL');

    return connection;
  } catch (error) {
    throw new Error('Error al conectar a la base de datos:', error);
  }
}

const UserSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
};

UserSchema.methods.isCorrectPassword = async function (password) {
  try {
    // Comparamos la contraseña ingresada con la contraseña almacenada en la base de datos
    return password === this.password;
  } catch (error) {
    throw new Error('Error al comparar contraseñas');
  }
};

module.exports = UserSchema;

