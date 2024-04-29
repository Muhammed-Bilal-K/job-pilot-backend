interface IEmployerRepository {
    profile(data : any): Promise<any>;
    specificUser(id : string): Promise<any>;
}

export default IEmployerRepository;