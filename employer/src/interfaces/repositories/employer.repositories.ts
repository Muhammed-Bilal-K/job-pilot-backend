import { ICompany } from "../../frameworks/models/company.model";

interface IEmployerRepository {
    saveCompanyDetail(data : ICompany) : Promise<ICompany | null>;
    findById( id: string) : Promise<any>;
    find() : Promise<any>;
}

export default IEmployerRepository;