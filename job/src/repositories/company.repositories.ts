import ICompany from "../entities/job";
import ICompanyRepository from "../interfaces/repositories/company.repositories";
import { CompanyModel } from "../frameworks/models/companyModel";

class AuthRepository implements ICompanyRepository{
  constructor(){}

    public async createUser(data: ICompany): Promise<unknown> {
      try {
          const company = new CompanyModel({
            id: data._id,
            companyusername : data.name,
            email : data.email,
          });
          await company.save();
          return company;
      } catch (error) {
        throw error;
      }
    }   
}

export default AuthRepository