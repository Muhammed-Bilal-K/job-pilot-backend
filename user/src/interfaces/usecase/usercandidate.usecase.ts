interface IUserUsecase {
    Profile(data: any): Promise<any>;
    specificUser(id: string): Promise<any>;
  }
  
  export default IUserUsecase;