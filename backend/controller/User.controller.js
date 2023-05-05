export class UserController {
    constructor(UserModel) {
      this.user = userModel;
    }
  
    async getAll() {
      const users = await this.user.findAll();
      return users;
    }
  
    
}
  