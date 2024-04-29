import { Exchanges } from "../frameworks/rabbitmq/exchanges";
import QueuePublisher from "../frameworks/rabbitmq/publisher";
import { Topics } from "../frameworks/rabbitmq/topics";
import {
  ICompanyInfo,
  ICompanyInfoCreate,
} from "../interfaces/employer.interface";
import IEmpoloyerRepository from "../interfaces/repositories/employer.repositories";
import IEmployerUsecase from "../interfaces/usecase/employer.usecase";

class EmployerUsecase implements IEmployerUsecase {
  private employerRepository: IEmpoloyerRepository;
  private queuePublisher: QueuePublisher;
  constructor(
    employerRepository: IEmpoloyerRepository,
    queuePublisher: QueuePublisher
  ) {
    this.employerRepository = employerRepository;
    this.queuePublisher = queuePublisher;
  }

  public async saveData(CompanyData: ICompanyInfoCreate) {
    try {
      const employer = await this.employerRepository.saveCompanyDetail(
        CompanyData
      );
      if (!employer) throw new Error("Employer not created");
      const ExistCompany: any = await this.getCompanyInfo(
        CompanyData.companyId
      );

      console.log(ExistCompany, "from data");

      await this.queuePublisher.publish(
        Exchanges.EMPLOYER_EXCHANGE,
        Topics.JOB_CREATE,
        {
          topic: Topics.JOB_CREATE,
          _id: employer.companyId,
          companyname: ExistCompany.name,
          email: ExistCompany.email,
          logo: ExistCompany.logo,
          banner: ExistCompany.banner,
        }
      );

      return employer;
    } catch (error) {
      throw error;
    }
  }

  public async updateEmploInfoData(CompanyData: ICompanyInfo) {
    try {
      const employer = await this.employerRepository.companyInfoDetailRemain(
        CompanyData
      );

      return employer;
    } catch (error) {
      throw error;
    }
  }

  async allAuthInfo() {
    try {
      const company = await this.employerRepository.find();

      return company;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async allEmployerInfo(selectedIndustries: any, currentPage: any) {
    try {
      const company = await this.employerRepository.findEmployersDetails(
        selectedIndustries,
        currentPage
      );

      return company;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCompanyInfo(id: string) {
    try {
      const company = await this.employerRepository.findById(id);

      return company;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default EmployerUsecase;
