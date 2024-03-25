import { ICompany } from "../frameworks/models/company.model";
import { Exchanges } from "../frameworks/rabbitmq/exchanges";
import QueuePublisher from "../frameworks/rabbitmq/publisher";
import { Topics } from "../frameworks/rabbitmq/topics";
import IEmpoloyerRepository from "../interfaces/repositories/employer.repositories";
import IEmployerUsecase from "../interfaces/usecase/employer.usecase";

class EmployerUsecase implements IEmployerUsecase {
    private employerRepository : IEmpoloyerRepository; 
    private queuePublisher: QueuePublisher;
    constructor(
        employerRepository : IEmpoloyerRepository, 
        queuePublisher: QueuePublisher,
    ){
        this.employerRepository = employerRepository;
        this.queuePublisher = queuePublisher;
    }

    public async saveData (CompanyData : ICompany){
        try {
            const employer = await this.employerRepository.saveCompanyDetail(CompanyData);
            if (!employer) throw new Error("Employer not created");
            const ExistCompany:any=await this.getCompanyInfo(CompanyData.companyId)

            console.log(ExistCompany, 'from data');
            
            await this.queuePublisher.publish(
                Exchanges.EMPLOYER_EXCHANGE,
                Topics.JOB_CREATE,
                {
                  topic: Topics.JOB_CREATE,
                  _id: employer.companyId,
                  name: ExistCompany.companyId.username,
                  email: ExistCompany.companyId.email,
                }
              );

            return employer;
          } catch (error) {
            throw error;
          }
    }

    async getCompanyInfo(id:string){
        try{
            const company=await this.employerRepository.findById(id)
            
            return company
          }catch(err){
            console.log(err);
                throw err
          }
    }
}

export default EmployerUsecase;









