const _ = require('underscore');

exports.getVeterinarians = (firebaseDb, harasId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const veterinarians = await firebaseDb
        .ref(`Users`)
        .orderByChild('harasId')
        .equalTo(harasId)
        .once('value')
        .then((snap) => snap.exists() && _.values(snap.val()))
        .catch();
      console.log('$$$$vet', veterinarians[0]);
      if (!veterinarians) {
        return reject({
          code: 200,
          success: false,
          message: 'Nenhum veterinário encontrado.',
        });
      }
      return resolve({
        code: 200,
        success: true,
        message: 'veterinário encontrado.',
        data: veterinarians,
      });
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao pesquisar veterinários.',
      });
    }
  });
};
exports.getVeterinarian = (firebaseDb, harasId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const veterinarians = await firebaseDb
        .ref(`Users`)
        .orderByChild('harasId')
        .equalTo(harasId)
        .once('value')
        .then((snap) => snap.exists() && _.values(snap.val()))
        .catch();

      if (!veterinarians) {
        return reject({
          code: 200,
          success: false,
          message: 'Nenhum veterinário encontrado.',
        });
      }
      const veterinarianActive = veterinarians.find(
        (veterinarian) => veterinarian.active
      );

      console.log('veterinarianActive', veterinarianActive);
      return resolve({
        code: 200,
        success: true,
        message: 'veterinário encontrado.',
        data: veterinarianActive,
      });
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao pesquisar veterinários.',
      });
    }
  });
};
exports.getDataUser = (firebaseDb, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await firebaseDb
        .ref(`Users/${userId}`)
        .once('value')
        .then((snap) => snap.exists() && snap.val())
        .catch();

      if (!user) {
        return reject({
          code: 200,
          success: false,
          message: 'Nenhum usuário encontrado.',
        });
      }
      return resolve({
        code: 200,
        success: true,
        message: 'usuário encontrado.',
        data: user,
      });
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao pesquisar usuário.',
      });
    }
  });
};
exports.getAnimals = (firebaseDb, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const animals = await firebaseDb
        .ref(`Animals/`)
        .orderByChild('userId')
        .equalTo(userId)
        .once('value')
        .then((snap) => snap.exists() && _.values(snap.val()))
        .catch((error) => {
          console.log(error);
          return reject({
            code: 200,
            success: false,
            message: 'Erro ao pesquisar veterinários.',
          });
        });
      console.log('$$$$vet', animals);
      if (!animals) {
        return reject({
          code: 200,
          success: false,
          message: 'Nenhum animal encontrado.',
        });
      }
      return resolve({
        code: 200,
        success: true,
        message: 'animal encontrado.',
        data: animals,
      });
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao pesquisar animals.',
      });
    }
  });
};
exports.getCreditCards = (firebaseDb, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const carts = await firebaseDb
        .ref(`Carts/${userId}`)
        .once('value')
        .then((snap) => snap.exists() && _.values(snap.val()))
        .catch((error) => {
          console.log(error);
          return reject({
            code: 200,
            success: false,
            message: 'Erro ao pesquisar cartões.',
          });
        });

      if (!carts) {
        return reject({
          code: 200,
          success: false,
          message: 'Nenhum cartão encontrado.',
        });
      }
      return resolve({
        code: 200,
        success: true,
        message: 'cartões encontrados.',
        data: carts,
      });
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao pesquisar cartões.',
      });
    }
  });
};
exports.findAnimals = (firebaseDb, find) => {
  return new Promise(async (resolve, reject) => {
    try {
      const animals = await firebaseDb
        .ref(`Animals/`)
        .orderByChild('register')
        .equalTo(find)
        .once('value')
        .then((snap) => snap.exists() && _.values(snap.val()))
        .catch((error) => {
          console.log(error);
          return reject({
            code: 200,
            success: false,
            message: 'Erro ao pesquisar veterinários.',
          });
        });
      console.log('$$$$vet', animals[0]);
      if (!animals) {
        return reject({
          code: 200,
          success: false,
          message: 'Nenhum animal encontrado.',
        });
      }

      const haras = await firebaseDb
        .ref(`Users/${animals[0].harasId}`)
        .once('value')
        .then((snap) => snap.exists() && snap.val())
        .catch((error) => {
          console.log(error);
          return reject({
            code: 200,
            success: false,
            message: 'Erro ao pesquisar haras.',
          });
        });
      const data = {
        harasId: animals[0].harasId,
        name: animals[0].name,
        register: animals[0].register,
        uid: animals[0].uid,
        urlImage: animals[0].urlImage,
        nameHaras: haras.name,
        userId: animals[0].userId,
      };
      let d = [];
      d.push(data);

      return resolve({
        code: 200,
        success: true,
        message: 'animal encontrado.',
        data: d,
      });
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao pesquisar animals.',
      });
    }
  });
};
