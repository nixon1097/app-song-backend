const app = require('./app');
require('./models')
const sequelize = require('./utils/connection');

const PORT = process.env.PORT || 8080;

const main = async () => {
    try {
        sequelize.sync(); //cria tabelas no banco de dados se elas não existire
        console.log("DB connected");
        app.listen(PORT);
        console.log(`👉 Server running on port ${PORT}`);
        console.log(`👉 Link http://localhost:${PORT}`);
    } catch (error) {
        console.log(error)
    }
}

main();
