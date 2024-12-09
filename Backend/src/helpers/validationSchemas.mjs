export const UserValidationSchema = {
  email :{
    notEmpty:{
      errorMessage:"email is empty"
    }
  },
  password :{
    notEmpty:{
      errorMessage:"password is empty"
    }
  },
  username :{
    notEmpty:{
      errorMessage:"username is empty"
    }
  },
  subscription_id :{
    notEmpty:{
      errorMessage:"subscription_id is empty"
    }
  }
};