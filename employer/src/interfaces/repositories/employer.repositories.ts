import { ICompany } from "../../frameworks/models/company.model";
import { ICompanyInfoCreate } from "../employer.interface";

interface IEmployerRepository {
    saveCompanyDetail(data : ICompanyInfoCreate) : Promise<ICompany | null>;
    findById( id: string) : Promise<any>;
    find() : Promise<any>;
}

export default IEmployerRepository;