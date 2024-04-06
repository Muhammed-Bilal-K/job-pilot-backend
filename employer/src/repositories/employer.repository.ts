import IEmployerRepository from "../interfaces/repositories/employer.repositories";
import CompanyModel, { ICompany } from "../frameworks/models/company.model";
import AuthModel from "../frameworks/models/auth.model";
import { ICompanyInfoCreate } from "../interfaces/employer.interface";

class EmployerRepository implements IEmployerRepository {
  constructor() {}

  public async saveCompanyDetail(data: ICompanyInfoCreate): Promise<ICompany | null> {
    try {
    
      const employer = new CompanyModel({
        companyId: data.companyId,
        name: data.name,
        email:data.email,
        logo: data.logo,
        banner: data.banner,
        about: data.about,
      });
      const emp = await employer.save();
      console.log(emp);
      return employer;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findById(id: string): Promise<any> {
    try{
        const company=await CompanyModel.findOne({companyId:id});
      
        return company
    }catch(err){
        return err
    }
  }

  async find(): Promise<any> {
    try{
        const company=await AuthModel.find({});
      
        return company
    }catch(err){
        return err
    }
  }
}
export default EmployerRepository;
