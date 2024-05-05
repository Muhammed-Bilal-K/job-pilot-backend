interface IEmployerRepository {
    profile(data : any): Promise<unknown>;
    specificUser(id : string): Promise<unknown>;
}

export default IEmployerRepository;