import { ICompany } from "../../frameworks/models/company.model";
import { ICompanyInfo, ICompanyInfoCreate } from "../employer.interface";

interface IEmployerRepository {
    saveCompanyDetail(data : ICompanyInfoCreate) : Promise<ICompany | null>;
    companyInfoDetailRemain(data : ICompanyInfo) : Promise<any>;
    findById( id: string) : Promise<any>;
    find() : Promise<any>;
    findEmployersDetails(selectedIndustries : any, currentPage : any) : Promise<any>;
}

export default IEmployerRepository;