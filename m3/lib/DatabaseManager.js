const dbInfo = require('./dbInfo');

const { Pool } = require('pg');

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class DatabaseManager {
  static instance;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  constructor() {
    this.pool = new Pool({
      host: dbInfo.HOST,
      user: dbInfo.USER,
      password: dbInfo.PASSWORD,
      port: dbInfo.PORT,
      database: dbInfo.DATABASE,
      idleTimeoutMillis: 5000,
      max: 20,
      connectionTimeoutMillis: 2000
    });
    
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  static async getInstance() {
      if (!DatabaseManager.instance) {
        DatabaseManager.instance = new DatabaseManager();
        const client = await DatabaseManager.instance.pool.connect();
        DatabaseManager.instance.setClient(client);
      }
      return DatabaseManager.instance;
  }

  setClient(client) {
    this.client = client
  }

  connect() {
    this.pool.connect();
  }

  async addUser(name) {
    return new Promise((resolve, reject) => {
      const queryText = `
      INSERT INTO 
      usuarios
        (
          nombre
        ) 
      values
        (
          $1
        )
      returning *;
        `;
  
      const data = [
        name
      ];
  
      const query = {
        name: 'add-user',
        text: queryText,
        values: data
      };
  
      this.pool.query(query, (err, res) => {
        if (err) reject(err);
        this.pool.release;
        resolve(res);
      });
    });
  }

  async getAllUsers() {
    return new Promise((resolve, reject) => {
      const queryText = `Select * from usuarios;`;
  
      const query = {
        name: 'get-users',
        text: queryText,
        values: data
      };
  
      this.pool.query(query, (err, res) => {
        if (err) reject(err);
        this.pool.release;
        resolve(res);
      });
    });

    
  }

  async updateUser(id, name) {
    return new Promise((resolve, reject) => {
      const queryText = `
      UPDATE usuarios set nombre=$1 where id=$2 returning *;
        `;
  
      const data = [
        name,
        id
      ];
  
      const query = {
        name: 'update-user',
        text: queryText,
        values: data
      };
  
      this.pool.query(query, (err, res) => {
        if (err) reject(err);
        this.pool.release;
        resolve(res);
      });
    });
  }

  async deleteUser(id) {
    return new Promise((resolve, reject) => {
      const queryText = `
      Delete from usuarios where id=$1 returning *;
        `;
  
      const data = [
        id
      ];
  
      const query = {
        name: 'delete-user',
        text: queryText,
        values: data
      };
  
      this.pool.query(query, (err, res) => {
        if (err) reject(err);
        this.pool.release;
        resolve(res);
      });
    });
  }

}

module.exports = DatabaseManager;

