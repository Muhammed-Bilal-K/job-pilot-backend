import { ICompanyInfoCreate } from "../employer.interface";

interface IEmployerUsecase {
    saveData(data : ICompanyInfoCreate ):Promise<any>;
    getCompanyInfo(id : string) : Promise<any>;
    allAuthInfo() : Promise<any>;
  }
  
  export default IEmployerUsecase;