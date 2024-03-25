interface ICompanyRepository {
    createUser(data : any): Promise<any>;
}

export default ICompanyRepository;