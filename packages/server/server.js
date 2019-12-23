require('dotenv').config()
var express = require('express')
var moment = require('moment');
var repository = require('./repository'); // mongo DB repository
var {ObjectID} = require('mongodb');

async function getClinicById(id) {
  return new Promise((resolve, reject) => {
    repository.getHealthCenterClinicCollection().then(collection => {
      collection
        .aggregate([
          {
            $match: { _id: ObjectID(id) }
          },
          {
            $lookup: {
              from: 'health-center',
              localField: 'healthCenter',
              foreignField: '_id',
              as: 'health_center'
            }
          },
          {
            $unwind: '$health_center'
          }
        ])
        .toArray((error, result) => {
          // console.log(result[0].health_center)
          if (error) {
            reject(error);
          }

          let dataClinic = result.map((item, index) => {
            delete item.health_center._id;
            return item.health_center;
          });
          resolve(dataClinic);
        });
    });
  });
}

function getSchedule(query) {
  let queryDoctor = {};
  
  if (query.doctor_id) {
    queryDoctor = {doctorId: ObjectID(query.doctor_id)};
  }
  
  return new Promise((resolve, reject) => {
    repository.getDoctorScheduleMongoCollection().then(collection => {
      collection
        .aggregate([
          {$match : queryDoctor},
          {
            $sort: {date: -1}
          },
          {
            $lookup: {
              from: 'doctors',
              localField: 'doctorId',
              foreignField: '_id',
              as: 'doctor'
            }
          },
          {
            $unwind: '$doctor'
          }
        ])
        .toArray((err, result) => {
          if (err) {
            reject(err);
          }

          let schedules = [];

          result.forEach(async (item, index) => {
            let data = { ...item };

            delete data.clinicId;
            delete data.doctorId;

            let clinic = await getClinicById(item.clinicId);
            data.clinics = clinic;

            schedules.push(data)
            resolve(schedules)
          });
        });
    });
  });
}

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', async (req, res)=>{
  console.log(req)
    // let doctor = {doctor_id: req.query.doctor_id}
    const schedules = await getSchedule(req.query)
    res.status(200).send(schedules)
})


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})