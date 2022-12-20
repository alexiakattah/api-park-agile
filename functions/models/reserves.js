const _ = require('underscore');
const moment = require('moment');
exports.registerReserve = (firebaseDb, userId, params) => {
  console.log(params, userId);
  return new Promise(async (resolve, reject) => {
    try {
      const key = await firebaseDb.ref(`Reserves/`).push().key;

      console.log(key);
      if (!key) {
        return {
          code: 200,
          status: false,
          message: 'Erro ao gerar a Key.',
        };
      }
      console.log(params);

      let data = {
        animalId: params.animal.uid,
        animal: params.animal,
        date: moment().format('DD/MM/YYYY HH:mm:ss'),
        dateEpoch: moment().valueOf(),
        botuflex: params.botuflex,
        dataCreditCard: params.dataResponseCreditCards,
        reservationRequestBy: userId,
        value: params.value,
        reservationSendTo: params.animal.userId,
        delivered: false,
        document: params.image,
        egua: params.selectedLanguage,
        uid: key,
      };
      console.log(data);

      const reserve = await firebaseDb
        .ref(`Reserves/${key}`)
        .set(data)
        .then((snap) =>
          resolve({
            code: 200,
            success: true,
            message: 'Cadastro realizado com sucesso.',
            data,
          })
        )
        .catch((e) => console.log('erro: ', e));
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao cadastrar.',
      });
    }
  });
};
exports.getReserves = (firebaseDb, userId, params) => {
  console.log(params, userId);
  return new Promise(async (resolve, reject) => {
    try {
      const reserveSnap = await firebaseDb
        .ref(`Reserves`)
        .orderByChild('reservationSendTo')
        .equalTo(userId)
        .once('value')
        .then((snap) => snap.exists() && _.values(snap.val()));

      if (!reserveSnap) {
        return reject({
          code: 200,
          success: false,
          message: 'Nenhuma reserva encontrada',
        });
      }
      // console.log(reserveSnap);
      var dataReserveAndUsers = [];
      _.each(reserveSnap, async (reserve) => {
        console.log(reserve);
        const user = await firebaseDb
          .ref(`Users`)
          .orderByChild('uid')
          .equalTo(reserve.reservationRequestBy)
          .once('value')
          .then((snap) => {
            const usere = snap.exists() && _.values(snap.val());

            dataReserveAndUsers.push({ user: usere[0], reserve });
          });
        Promise.all(dataReserveAndUsers).then((snap) => {
          let ussss = snap;
          console.log('usssss', ussss);
          return resolve({
            code: 200,
            success: true,
            message: 'Reservas encontradas',
            data: ussss,
          });
        });

        // console.log('$$$$$$$ user', user);
      });
      console.log('rrrrrrrrrrrrrr', dataReserveAndUsers);
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao cadastrar.',
      });
    }
  });
};
exports.getReservesEgua = (firebaseDb, userId) => {
  console.log(userId);
  return new Promise(async (resolve, reject) => {
    try {
      const reserveSnap = await firebaseDb
        .ref(`Reserves`)
        .orderByChild('reservationRequestBy')
        .equalTo(userId)
        .once('value')
        .then((snap) => snap.exists() && _.values(snap.val()));

      if (!reserveSnap) {
        return reject({
          code: 200,
          success: false,
          message: 'Nenhuma reserva encontrada',
        });
      }
      console.log(reserveSnap);
      var dataReserveAndUsers = [];
      _.each(reserveSnap, async (reserve) => {
        console.log(reserve);
        const user = await firebaseDb
          .ref(`Users`)
          .orderByChild('uid')
          .equalTo(reserve.reservationSendTo)
          .once('value')
          .then((snap) => {
            const usere = snap.exists() && _.values(snap.val());

            dataReserveAndUsers.push({ user: usere[0], reserve });
          });
        Promise.all(dataReserveAndUsers).then((snap) => {
          let ussss = snap;
          console.log('usssss', ussss);
          return resolve({
            code: 200,
            success: true,
            message: 'Reservas encontradas',
            data: ussss,
          });
        });

        // console.log('$$$$$$$ user', user);
      });
      console.log('rrrrrrrrrrrrrr', dataReserveAndUsers);
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao cadastrar.',
      });
    }
  });
};
exports.getUserWhoRequestedReserve = (firebaseDb, userId, reserveDetails) => {
  console.log(reserveDetails, userId);
  return new Promise(async (resolve, reject) => {
    try {
      const userRequestReserve = await firebaseDb
        .ref(`Users/${reserveDetails.reservationRequestBy}`)

        .once('value')
        .then((snap) => snap.exists() && snap.val());
      if (!userRequestReserve) {
        return reject({
          code: 200,
          success: false,
          message: 'Nenhuma reserva encontrada',
        });
      }
      console.log(userRequestReserve);
      return resolve({
        code: 200,
        success: true,
        message: 'Reserva encontrada',
        data: userRequestReserve,
      });
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao cadastrar.',
      });
    }
  });
};
exports.getAnimalsDay = (firebaseDb, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userRequestReserve = await firebaseDb
        .ref(`Users/${userId}`)

        .once('value')
        .then((snap) => snap.exists() && snap.val());

      const reserveSnap = await firebaseDb
        .ref(`Reserves`)
        .orderByChild('reservationSendTo')
        .equalTo(userId)
        .once('value')
        .then((snap) => snap.exists() && _.values(snap.val()));

      if (!reserveSnap) {
        return reject({
          code: 200,
          success: false,
          message: 'Nenhuma reserva encontrada',
        });
      }
      // console.log(reserveSnap);
      var dataReserveAndUsers = [];
      _.each(reserveSnap, async (reserve) => {
        const user = await firebaseDb
          .ref(`Animals`)
          .orderByChild('userId')
          .equalTo(userRequestReserve.uid)
          .once('value')
          .then((snap) => {
            const usere = snap.exists() && _.values(snap.val());
            return _.each(usere, (animal) => {
              console.log(animal.uid, reserve.animalId);
              if (animal.uid === reserve.animalId) {
                var date = moment(reserve.dateEpoch).format('YYYY-MM-DD');
                var now = moment().format('YYYY-MM-DD');
                console.log(date, now);
                //se a data atual for menor que a data da reserva, exibir no front a reserva
                if (now === date) {
                  // date is past
                  dataReserveAndUsers.push({ user: animal, reserve });
                } else {
                  // date is future
                  console.log('elseeeee');
                }
              }
            });
          });
        Promise.all(dataReserveAndUsers)
          .then((snap) => {
            let ussss = snap;
            console.log('usssss', ussss);
            return resolve({
              code: 200,
              success: true,
              message: 'retoronou encontradas',
              data: ussss,
            });
          })
          .catch((err) => {
            return resolve({
              code: 200,
              success: true,
              message: 'retoronou encontradas',
              data: dataReserveAndUsers,
            });
          });
      });

      if (!userRequestReserve) {
        return reject({
          code: 200,
          success: false,
          message: 'Nenhuma reserva encontrada',
        });
      }
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao cadastrar.',
      });
    }
  });
};
exports.cancelReserve = (firebaseDb, userId, reserveDetails) => {
  console.log(reserveDetails, userId);
  return new Promise(async (resolve, reject) => {
    try {
      const userRequestReserve = await firebaseDb
        .ref(`Reserves/${reserveDetails.uid}`)
        .update({ delivered: 'canceled' })

        .then((snap) => {
          return resolve({
            code: 200,
            success: true,
            message: 'Reserva cancelada com sucesso',
          });
        });
      // if (!userRequestReserve) {
      //   return reject({
      //     code: 200,
      //     success: false,
      //     message: 'Nenhuma reserva encontrada',
      //   });
      // }
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao cadastrar.',
      });
    }
  });
};
exports.confirmReserve = (firebaseDb, userId, reserveDetails) => {
  console.log(reserveDetails, userId);
  return new Promise(async (resolve, reject) => {
    try {
      const userRequestReserve = await firebaseDb
        .ref(`Reserves/${reserveDetails.uid}`)
        .update({ delivered: true })

        .then((snap) => {
          return resolve({
            code: 200,
            success: true,
            message: 'Reserva confirmada com sucesso',
          });
        });
      // if (!userRequestReserve) {
      //   return reject({
      //     code: 200,
      //     success: false,
      //     message: 'Nenhuma reserva encontrada',
      //   });
      // }
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao confirmar a reserva.',
      });
    }
  });
};
exports.confirmColeta = (firebaseDb, userId, reserveDetails) => {
  console.log(reserveDetails, userId);
  return new Promise(async (resolve, reject) => {
    try {
      const userRequestReserve = await firebaseDb
        .ref(`Reserves/${reserveDetails}`)
        .update({ delivered: 'coleted' })

        .then((snap) => {
          return resolve({
            code: 200,
            success: true,
            message: 'Reserva confirmada com sucesso',
          });
        });
      // if (!userRequestReserve) {
      //   return reject({
      //     code: 200,
      //     success: false,
      //     message: 'Nenhuma reserva encontrada',
      //   });
      // }
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao confirmar a reserva.',
      });
    }
  });
};
