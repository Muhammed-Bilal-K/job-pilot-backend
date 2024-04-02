import { ICompany } from "../../frameworks/models/company.model";

interface IEmployerUsecase {
    saveData(data : ICompany ):Promise<any>;
    getCompanyInfo(id : string) : Promise<any>;
    allAuthInfo() : Promise<any>;
  }
  
  export default IEmployerUsecase;