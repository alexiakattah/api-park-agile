const _ = require('underscore');

exports.registerAnimals = (firebaseDb, userId, animal) => {
  console.log(animal, userId);
  return new Promise(async (resolve, reject) => {
    try {
      const key = await firebaseDb.ref(`Animals/`).push().key;
      console.log(key);
      if (!key) {
        return {
          code: 200,
          status: false,
          message: 'Erro ao gerar a Key.',
        };
      }

      animal.uid = key;
      animal.userId = userId;
      const animals = await firebaseDb
        .ref(`Animals/${key}`)
        .set(animal)
        .then((snap) =>
          resolve({
            code: 200,
            success: true,
            message: 'Cadastro realizado com sucesso.',
          })
        )
        .catch((e) => console.log('erro: ', e));
      if (!animals) {
        return reject({
          code: 200,
          success: false,
          message: 'Erro ao cadastrar animal.',
        });
      }
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao cadastrar animal.',
      });
    }
  });
};
exports.createCreditCard = (firebaseDb, userId, form) => {
  console.log(form, userId);
  return new Promise(async (resolve, reject) => {
    try {
      const key = await firebaseDb.ref(`Carts/${userId}`).push().key;
      console.log(key);
      if (!key) {
        return {
          code: 200,
          status: false,
          message: 'Erro ao gerar a Key.',
        };
      }

      form.uid = key;
      form.userId = userId;
      const cart = await firebaseDb
        .ref(`Carts/${userId}/${key}`)
        .set(form)
        .then((snap) =>
          resolve({
            code: 200,
            success: true,
            message: 'Cadastro realizado com sucesso.',
          })
        )
        .catch((e) => console.log('erro: ', e));
      if (!cart) {
        return reject({
          code: 200,
          success: false,
          message: 'Erro ao cadastrar cartão.',
        });
      }
    } catch (error) {
      console.log(error);
      return reject({
        code: 200,
        success: false,
        message: 'Erro ao cadastrar cartão.',
      });
    }
  });
};
