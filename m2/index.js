const DatabaseManager = require('./lib/DatabaseManager');

const execute = async () => {
  try {
    const dbm = await DatabaseManager.getInstance();
    const res = await dbm.addUser('Miguel');
    // console.log(res);
    if (res.rowCount > 0) {
      console.log('usuario agregaro con éxito!');
      process.exit(0);
    } else {
      console.log('Problemas al agregar un usuario!');
      process.exit(1);
    }
  } catch (error) {
    console.log('Error', error)
  }
}

execute();