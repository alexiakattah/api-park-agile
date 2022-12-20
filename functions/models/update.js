const _ = require('underscore');

exports.updateUser = (firebaseDb, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('dados do usuario', user);
      const userData = await firebaseDb
        .ref(`Users/${user.uid}`)
        .once('value')
        .then(async (snap) => {
          const userSanp = snap.exists() && snap.val();

          console.log('$$$$$$userSnap', userSanp);

          await firebaseDb
            .ref(`Users/${userSanp.uid}`)
            .update(user)
            .then(() => {
              return resolve({
                code: 200,
                success: true,
                message: 'Usuário atualizado com sucesso.',
              });
            });
        });

      if (!userData) {
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
        data: userData,
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
