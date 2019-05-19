import Api from "./Api";
import ClientSession from "./ClientSession";
import Cookies from 'universal-cookie';
const pluralName = "Accounts";
const cookies = new Cookies();
class UserService {
  static login = (email, password) => {
    const url = pluralName + '/login';
    if (email && password) {
        const regExp = new RegExp
        (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return Api.create(url, {[regExp.test(email) ? "email": "username"]: email, "password": password, "ttl": 300000000})
            .then(
                response => {
                    ClientSession.storeAuth(response.data, err => {
                        err ? console.error('cannot save session') : ''
                    });
                  cookies.set('userId',response.data.userId);
                  cookies.set('access_token',response.data.id);
                  //cookies.set('myCat', 'Pacman');
                    return {
                        success: true,
                        message: "Logged in successfully",
                        user: response.data
                    }
                },
                error => {
                    if (error.response) {
                      if (error.response.status == 400) {
                        return {
                          error: true,
                          message: "Sorry! check your account is banned "
                        }
                      }
                        if (error.response.status == 401) {
                            return {
                                error: true,
                                message: "Invalid username or password"
                            }
                        }
                        return {
                            error: true,
                            message: "Oops error occured please. Try Again"
                        }
                    }
                    return {
                        error: true,
                        message: "Error: Not connected"
                    }



                }
        );
    }
  };

  static reset = (email) => {
      if (email) {
          return Api.create("users/reset", {"email": email})
              .then(response => {
                      // ClientSession.storeAuth(response.data, err => {err ? console.error('cannot save session'): ''})
                      return {
                          success: true,
                          message: "Email sent Successfully",
                          user: response.data
                      }
                  },
                  error => {
                      if (error.response) {
                          if (error.response.status == 401) {
                              console.log("email sent error");
                              return {
                                  error: true,
                                  message: "user email is not found"
                              }
                          }
                          return {
                              error: true,
                              message: "Oops error occurred please. Try Again"
                          }
                      }
                      return {
                          error: true,
                          message: "Error: Not connected"
                      }

                  }
              );
      }
  };
  static changePassword =(password,accessToken) =>{
      ClientSession.removeAuth(err => {
          err ? console.log(err) : ''
      });

      if(password){
          return Api.create('users/reset-password'+accessToken,{"newPassword":password})
              .then(
                  response =>{
                      return {
                          success: true,
                          message: "Password changed successfully",
                          user: response.data
                      }
                  },
                  error => {
                      return {
                          error: true,
                          message: "Oops error occurred please. Try Again"
                      }
                  }
              ).catch(error => {
                      return {
                          error: true,
                          message: "Oops error Occurred please. Try Again"
                      }
              });
      }
  };

  static register = (values) => {
      // const url = pluralName;
      /**
       * this one will double check if the required field is g fill or not (email and password)
       */

      if (values.email && values.username) {
          return Api.create(pluralName, values)
              .then(
                  response => {
                      //console.log(response);
                      // Since Registration is admin only we dont store auth here
                      // ClientSession.storeAuth(response.data, err => {
                      //     err ? console.error('cannot save session') : ''
                      // });
                      // get  the user id and by checking the the role  we can

                      const userId=response.data.id;
                      // get the id where name is admin or manger
                      //create the road mapping
                      // const filter2 = `filter={"where":{"or" : [{"first_name":{"like":".*${name}.*"}},{"last_name":{"like":".*${name}.*"}}]}}`;

                      let filter = '';
                      if (values.role == 'school-owner'){
                          filter = `filter={"where":{"name":"school-owner"}}`;
                      } else if (values.role == 'teacher') {
                          filter = `filter={"where":{"name":"teacher"}}`;
                      } else if (values.role == 'student') {
                          filter = `filter={"where":{"name":"student"}}`;
                      }

                      Api.find('roles',null,filter)
                          .then((response) =>{
                              console.log("Role id ",response);
                              //TODO: THE RESPONSE.DATA.is empty array
                              const roleId=response.data[0].id;
                              const roleData={
                                  "principalType": "USER",
                                  "principalId": userId,
                                  "roleId": roleId
                              };
                              Api.create('roleMappings',roleData)
                                  .then((response) =>{})
                          })
                          .catch((error)=>{
                              console.log(error)
                          });

                      return {
                          success: true,
                          message: "Registered successfully! Check email to confirm account",
                          user: response.data
                      }
                  },
                  error => {
                      console.log("Error",error);
                      if (error.response) {
                          if (error.response.status == 422) {
                              return {
                                  error: true,
                                  message: error.response.data.error.message
                              }
                          }
                      }else{
                          console.log("the general error1 is ",error);
                          return {
                              error: true,
                              message: "Oops error occurred please. Try Again"
                      }
                      }

                  }
              ).catch(error => {
                  console.log("the general error1 is ",error);
                  return {
                      error: true,
                      message: "Oops error Occurred please. Try Again"
                  }
              })
      }

  };

  static logout = () => {
      ClientSession.getAccessToken(function (isLoggedIn, authData) {
          if (isLoggedIn && authData != null) {
              Api.create('users/logout', {})
                  .then(response => {
                      ClientSession.removeAuth(err => {
                          err ? console.log(err) : ''
                      });
                      localStorage.clear
                    //   localStorage.removeItem("authorized");
                    //   localStorage.removeItem("projectSelected");
                      window.location = "login";
                  });
          }
      });
  };

  static changePassword = (password,accessToken) =>{

      if(password){
          return Api.create('users/reset-password' + accessToken, {"newPassword":password} )
              .then(
                  response =>{
                      return {
                          success: true,
                          message: "Password changed successfully",
                          user: response.data
                      }
                  },
                  error => {
                      return {
                          error: true,
                          message: "Oops error occurred please. Try Again"
                      }
                  }
              ).catch(error => {
                      return {
                          error: true,
                          message: "Oops error Occurred please. Try Again"
                      }
              });
      }
    };
}

export default UserService;
