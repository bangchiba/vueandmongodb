require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;

class Repository {
  constructor(){
    this.connectionUrl = process.env.CONNECTION_URL
    this.dbname = process.env.DB_NAME
    this.getConnection = this.getConnection.bind(this)
  }

  async getConnection(){
    try {
      const koneksi = await MongoClient.connect(this.connectionUrl,{ useNewUrlParser: true, useUnifiedTopology: true })
      const db = await koneksi.db(this.dbname);
      this.conn = db;
      return db;
    } catch (error) {
      console.log(error)
    }
  }

  async getDoctorScheduleMongoCollection(){
    try {
      const db = await this.getConnection()
      return db.collection('doctorScheduleMongo')
    } catch (error) {
      console.log(error)
    }
  }

  async getHealthCenterClinicCollection(){
    try {
      const db = await this.getConnection()
      return db.collection('clinic')
    } catch (error) {
      console.log(error)
    }
  }

}

// new Repository().getHealthCenterClinicCollection().then(collection=>{
//   collection.find().toArray((err, rest)=>{
//     console.log(rest)
//   })
// })
module.exports = new Repository();