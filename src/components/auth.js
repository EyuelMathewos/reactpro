  class auth {
    constructor() {
      this.authenticated = false;
    }
  
     login(cb) {
      this.authenticated = true;
      setTimeout(cb,100)
    }
  
    logout(cb) {
      this.authenticated = false;
      setTimeout(cb,100)
    }
  
     isAuthenticated() {
      return this.authenticated;
    }
  }
// const auth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };
  export default auth;
  