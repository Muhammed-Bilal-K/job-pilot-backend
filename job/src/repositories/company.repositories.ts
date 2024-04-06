import ICompany from "../entities/job";
import ICompanyRepository from "../interfaces/repositories/company.repositories";
import { CompanyModel } from "../frameworks/models/company.model";

class CompanyRepository implements ICompanyRepository{
  constructor(){}

    public async createUser(data: ICompany): Promise<unknown> {
      try {
          const company = new CompanyModel({
            id: data._id,
            companyname : data.companyname,
            email : data.email,
            logo : data.logo,
          });
          await company.save();
          return company;
      } catch (error) {
        throw error;
      }
    }   
}

export default CompanyRepository