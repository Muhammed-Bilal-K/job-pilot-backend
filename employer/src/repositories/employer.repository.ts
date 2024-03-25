import IEmployerRepository from "../interfaces/repositories/employer.repositories";
import CompanyModel, { ICompany } from "../frameworks/models/company.model";

class EmployerRepository implements IEmployerRepository {
  constructor() {}

  public async saveCompanyDetail(data: ICompany): Promise<ICompany | null> {
    try {
    
      const employer = new CompanyModel({
        companyId: data.companyId,
        name: data.name,
        logo: data.logo,
        banner: data.banner,
        about: data.about,
        organizationType: data.organizationType,
        industryType: data.industryType,
        teamSize: data.teamSize,
        yearEstablished: data.yearEstablished,
        website: data.website,
        country: data.country,
        state: data.state,
        vision: data.vision,
        socialLinks1: data.socialLinks1,
        socialLinks2: data.socialLinks2,
        phone : data.phone,
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
        const company=await CompanyModel.findOne({companyId:id}).populate('companyId');
      
        return company
    }catch(err){
        return err
    }
}
}
export default EmployerRepository;
