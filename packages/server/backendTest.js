var moment = require('moment');
var repository = require('./repository'); // mongo DB repository
var { ObjectID } = require('mongodb');

var getCol = repository.getDoctorScheduleMongoCollection(),
  queryDate = {},
  queryEndTime = {
    $gte: moment()
      .locale('id')
      .format('HH:mm')
  },
  limit = 1,
  skip = 0,
  clinicIds = [];
let query = {
  date: false
};

if (query.date) {
  // request query is saved in query variable
  queryDate = query.date;
  if (query.page) {
    limit = 10;
    skip = 10 * (query.page - 1);
  }
} else {
  queryDate = { $lte: moment().format('YYYY-MM-DD') };
}

function setResult(params) {
  // console.log(params)
  if (params.schedule) {
    params.schedule.toArray((error, item) => {
      // console.log(error,item)
    });
  }
}

// getCol.then(function (collection) {
//   if (!query.date) {
//     collection.distinct('clinicId', {
//       doctorId: query.doctorId
//     }, async function (errors, result) {
//       if (errors) return cancel(errors) // terminate & return errors
//       clinicIds = await result
//     })
//   }

//   collection.aggregate([
//     {
//       $match: {
//         doctorId: query.doctorId,
//         date: queryDate,
//         endTime: queryEndTime
//       }
//     },
//     { $lookup: { from: 'doctor', localField: 'doctorId', foreignField: '_id', as: 'doctors'} },
//     { $sort: { date: 1, endTime: 1 } },
//     { $limit: limit },
//     { $skip: skip }

//   ], async function (errors, result) {
//     if (errors) return cancel(errors) // terminate & return errors

//     let schedules = [],
//       healthCenters = [],
//       healthCentersArray = []

//     if (query.date) clinicIds = result.map((value) => { return value.clinicId })
//     clinics = await getClinic(clinicIds)

//     result.forEach((value) => {
//       value.id = value._id
//       delete value._id
//       value.booking = false
//       value.doctors.forEach((el) => {
//         if (el.active && el.bookingsAvailable && el.isOnline) {
//           value.booking = true
//         }
//       })

//       delete value.doctors

//       clinics.forEach((val) => {
//         if (val._id === value.clinicId) {
//           val.healthCenters.forEach((v) => {
//             value.healthCenterId = v.id
//             value.healthCenter = v
//           })
//         }
//       })
//     })

//     if (!query.date) {
//       clinics.forEach((val) => {
//         val.healthCenters.forEach((v) => {
//           healthCentersArray.push(v)
//         })
//       })
//     }

//     healthCenters = healthCentersArray.filter(function (value) {
//       return !this[value.id] && (this[value.id] = true)
//     }, Object.create(null))

//     schedules = result

//     // grouping list of schedule by healthCenter but default sorting by endtime from agregate
//     if (query.date) {
//       schedules = schedules.reduce(function (res, currentValue) {
//         if (res.indexOf(currentValue.healthCenter.id) === -1) {
//           res.push(currentValue.healthCenter.id)
//         }
//         return res
//       }, []).map(function (healthCenterId) {
//         return schedules.filter(function (el) {
//           return el.healthCenter.id === healthCenterId
//         }).map(function (el) { return el })
//       }).concatAll()
//     }

//     let data = {
//       schedule: schedules.length > 0 ? schedules[0] : null,
//       practiceLocations: healthCenters.length > 0 ? healthCenters : []
//     }

//     schedules.toArray((i, item)=>{
//       // console.log(item)
//     })

//     if (query.date) {
//       setResult(schedules) // terminate & return schedules
//     } else {
//       setResult(data) // terminate & return schedules
//     }

//   })
// })

async function getClinic(id) {
  let data = [],
    promise = new Promise(
      function(resolve, reject) {
        repository.getHealthCenterClinicCollection().then(function(collection) {
          collection.aggregate(
            [
              { $match: { _id: ObjectID(id) } },
              {
                $lookup: {
                  from: 'health-center',
                  localField: 'healthCenter',
                  foreignField: '_id',
                  as: 'healthCenters'
                }
              }
            ],
            function(errors, result) {
              if (errors) return cancel(errors); // terminate & return errors

              result.forEach(item => {
                item.healthCenters.map(function(value, index) {
                  // redefined output collection
                  let arrKey = [
                    'name',
                    'description',
                    'type',
                    'telephone',
                    'addressDetail',
                    '_id'
                  ];
                  Object.keys(value).map(function(key) {
                    if (!arrKey.includes(key)) delete value[key];
                    value.id = value._id;
                  });

                  delete value._id;

                  return value;
                });
              });
              resolve(result);
            }
          );
        });
      },
      function(errors) {
        console.log(errors);
      }
    );

  data = await promise.then(
    function(resolve, reject) {
      return resolve;
    },
    function(errors) {
      console.log(errors);
    }
  );

  return data;
}

Array.prototype.concatAll = () => {
  var results = [];
  this.forEach(function(subArray) {
    subArray.forEach(function(subArrayValue) {
      results.push(subArrayValue);
    });
  });
  return results;
};

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
          let arrKey = [
            'name',
            'description',
            'type',
            'telephone',
            'addressDetail',
            '_id'
          ];

          let dataClinic = result.map((item, index) => {
            delete item.health_center._id;
            return item.health_center;
          });
          resolve(dataClinic);
        });
    });
  });
}

function getSchedule() {
  return new Promise((resolve, reject) => {
    repository.getDoctorScheduleMongoCollection().then(collection => {
      collection
        .aggregate([
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
// getClinicById('5d02e9acc864e0444ddc3761')

// getSchedule().then(data => {
//   console.log(data[0].clinics)
// })
