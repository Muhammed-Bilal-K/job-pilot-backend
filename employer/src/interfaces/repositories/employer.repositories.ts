import { ICompany } from "../../frameworks/models/company.model";
import { ICompanyInfo, ICompanyInfoCreate } from "../employer.interface";

interface IEmployerRepository {
    saveCompanyDetail(data : ICompanyInfoCreate) : Promise<ICompany | null>;
    companyInfoDetailRemain(data : ICompanyInfo) : Promise<unknown>;
    findById( id: string) : Promise<unknown>;
    find() : Promise<unknown>;
    findEmployersDetails(selectedIndustries : [string], currentPage : string) : Promise<unknown>;
}

export default IEmployerRepository;