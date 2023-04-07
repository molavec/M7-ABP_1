const DatabaseManager = require('./lib/DatabaseManager');

const execute = async () => {
  try {
    const dbm = await DatabaseManager.getInstance();

    // Add user
    let res = await dbm.addUser('Miguel');
    const userId = res.rows[0].id;

    console.log('Crea usuario %d - %s', userId,  res.rows[0].nombre);

    // Update user
    res = await dbm.updateUser(userId, 'Angel');
    console.log('Actualiza usuario %d - %s', userId,  res.rows[0].nombre);

    // Update user
    res = await dbm.deleteUser(userId);
    console.log('Elimina usuario %d - %s', userId,  res.rows[0].nombre);

    process.exit(0);

  } catch (error) {
    console.log('Error', error)
  }
}

execute();