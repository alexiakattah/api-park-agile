const _ = require("underscore");

exports.create = (firebaseAuth, firebaseDb, parameters) => {
  return new Promise(async (resolve, reject) => {
  
    const { nameAnimal, nameResponsible, numberRegister, email, password,          name,
      crmv ,
      cpf,
      valueBotuflex,

      confirmPassword,
      valueNoBotuflex,
      agency,
      count, } =
      parameters.user;
    const { typeUser, user } = parameters;
console.log('paramsss', parameters)

    if(typeUser === 'registerEgua'){
      if (
        (!nameAnimal || !nameResponsible || !numberRegister || !email, !password)
        ) {
          return reject({
            code: 200,
            success: false,
            message: "Preencha todos os campos.",
          });
        }
        
      }else if(typeUser === 'registerVeterinarian'){
        if(          !name ||!crmv || !cpf ||!email||  !valueBotuflex ||  !password  ||!confirmPassword || !valueNoBotuflex || !agency
          ||!count){
            return reject({
              code: 200,
              success: false,
              message: "Preencha todos os campos.",
            });
          }
      }
    //Cadastro no authentication
    const findUserAuthentication = await firebaseAuth
      .getUserByEmail(email)
      .then((user) => user)
      .catch((error) => undefined);

    if (findUserAuthentication) {
     

      return reject({
        code: 200,
        success: false,
        message: "Esse email já está em uso, favor utilizar outro email.",
      });

    }
    if(typeUser === 'registerEgua'){

      firebaseAuth.createUser({
        email,
        password,
        displayName: nameResponsible.trim(),
        emailVerified: false,
        disable: false
      }).then((snap)=>{
        user.uid = snap.uid
  
        delete password
  
        user.emailVerified = false
        user.createdAt = Date.now()
        user.active = true
        user.typeUser = typeUser
  
        //Criando usuario no banco de dados 
        createUser(firebaseDb, user).then(res=>{
          console.log('response api register', res)
          return resolve({
            code: 200,
            success: true,
            message: 'Cadastro realizado com sucesso'
          })
        }).catch(e=>console.log('error api register', e))
      }).catch((e)=>
      {
        console.log('eeeee', e)
        if(e.errorInfo.message === 'The password must be a string with at least 6 characters.'){
          return reject({
            code: 200,
            success: false,
            message: 'A senha deve conter no mínimo 6 caracteres.'
          })
        }else{
          return reject({
            code: 200,
            success: false,
            message: e.errorInfo.message
          })
        }
      })
    }else if(typeUser === 'registerVeterinarian'){

      firebaseAuth.createUser({
        email,
        password,
        displayName:  name.trim(),
        emailVerified: false,
        disable: false
      }).then((snap)=>{
        user.uid = snap.uid
  
        delete password
  
        user.emailVerified = false
        user.createdAt = Date.now()
        user.active = true
        user.typeUser = typeUser
        user.harasId = parameters.harasId

        //Criando usuario no banco de dados 
        createUser(firebaseDb, user).then(res=>{
          console.log('response api register', res)
          return resolve({
            code: 200,
            success: true,
            message: 'Cadastro realizado com sucesso'
          })
        }).catch(e=>console.log('error api register', e))
      }).catch((e)=>
      {
        console.log('eeeee', e)
        if(e.errorInfo.message === 'The password must be a string with at least 6 characters.'){
          return reject({
            code: 200,
            success: false,
            message: 'A senha deve conter no mínimo 6 caracteres.'
          })
        }else{
          return reject({
            code: 200,
            success: false,
            message: e.errorInfo.message
          })
        }
      })
    }
    

  });
};


function createUser(firebaseDb, user){
  return new Promise((resolve, reject)=>{
    if(!user.uid){
      return reject({
        code: 200,
        success: false, 
        message: 'Erro ao cadastrar usuário',

      })
    }
    firebaseDb.ref(`Users/${user.uid}`).set(user).then(()=>{
      resolve(user)
    }).catch(e=>{
      reject({
        code: 200,
        success: false,
        message: 'Erro ao criar usuário'
      })
    })
  })

}
