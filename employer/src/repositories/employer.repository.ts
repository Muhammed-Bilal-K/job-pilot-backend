import IEmployerRepository from "../interfaces/repositories/employer.repositories";
import CompanyModel, { ICompany } from "../frameworks/models/company.model";
import AuthModel from "../frameworks/models/auth.model";
import {
  ICompanyInfo,
  ICompanyInfoCreate,
} from "../interfaces/employer.interface";
import { FilterQuery } from "mongoose";

class EmployerRepository implements IEmployerRepository {
  constructor() {}

  public async saveCompanyDetail(
    data: ICompanyInfoCreate
  ): Promise<ICompany | null> {
    try {
      const employer = new CompanyModel({
        companyId: data.companyId,
        name: data.name,
        email: data.email,
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

  public async companyInfoDetailRemain(data: ICompanyInfo): Promise<any> {
    try {
      console.log(data, "from emplo");

      const updatedProfile = await CompanyModel.updateOne(
        { companyId: data.companyId },
        {
          $set: {
            industryType: data.industryType,
            country: data.country,
            state: data.state,
            organizationType: data.organizationType,
            teamSize: data.teamSize,
            yearEstablished: data.yearOfEstablished,
            website: data.companyWebsiteUrl,
            vision: data.companyVision,
            socialLinks1: data.socialLinks1,
            socialLinks2: data.socialLinks2,
          },
        }
      );
      return updatedProfile;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const company = await CompanyModel.findOne({ companyId: id });

      return company;
    } catch (err) {
      return err;
    }
  }

  async find(): Promise<any> {
    try {
      const company = await AuthModel.find({});

      return company;
    } catch (err) {
      return err;
    }
  }

  async findEmployersDetails(
    selectedIndustries: [string],
    currPage: string
  ): Promise<any> {
    try {
      let company;
      let currentPage = parseInt(currPage);
      let totalEmployerCount;
      const limit = 6;

      if (selectedIndustries) {
        const industryQuery =
          selectedIndustries?.length > 0
            ? { industryType: { $in: selectedIndustries } }
            : {};

        const combinedQuery = {
          $and: [industryQuery],
        } as unknown as FilterQuery<ICompany>;

        company = await CompanyModel.find(combinedQuery);
      } else {
        company = await CompanyModel.find({});
        totalEmployerCount = await CompanyModel.countDocuments({});
      }


      const totalPages = Math.ceil(totalEmployerCount! / limit);

      const startIndex = (currentPage - 1) * limit;
      company = company.slice(startIndex, startIndex + limit);

      return { company: company, totalPages: totalPages };
    } catch (err) {
      return err;
    }
  }
}
export default EmployerRepository;
