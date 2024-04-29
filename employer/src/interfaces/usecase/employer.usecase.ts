import { ICompanyInfo, ICompanyInfoCreate } from "../employer.interface";

interface IEmployerUsecase {
  saveData(data: ICompanyInfoCreate): Promise<any>;
  updateEmploInfoData(data: ICompanyInfo): Promise<any>;
  getCompanyInfo(id: string): Promise<any>;
  allAuthInfo(): Promise<any>;
  allEmployerInfo(selectedIndustries : unknown , currentPage : any): Promise<any>;
}

export default IEmployerUsecase;
