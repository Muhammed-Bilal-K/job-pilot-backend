import { IJobCreateRequest, IJobAppply } from "../interfaces/job.interface";
import IJobRepository from "../interfaces/repositories/job.repositories";
import IJobUsecase from "../interfaces/usecase/job.usecase";

class JobUsecase implements IJobUsecase {
  private jobRepository: IJobRepository;
  constructor(jobRepository: IJobRepository) {
    this.jobRepository = jobRepository;
  }

  public async jobCreate(employerJobData: IJobCreateRequest) {
    try {
      const job = await this.jobRepository.jobCreateData(employerJobData);

      return job;
    } catch (error) {
      throw error;
    }
  }

  public async jobList(
    selectedIndustries: any,
    selectedSalaryRange: any,
    selectedJobType: any,
    selectedSort: any,
    currentPage: any
  ) {
    try {
      const job = await this.jobRepository.listJobData(
        selectedIndustries,
        selectedSalaryRange,
        selectedJobType,
        selectedSort,
        currentPage
      );

      return job;
    } catch (error) {
      throw error;
    }
  }


  public async allJobApplicant() {
    try {
      const job = await this.jobRepository.listAllApplicant();

      return job;
    } catch (error) {
      throw error;
    }
  }

  public async Applicant(id: string) {
    try {
      const job = await this.jobRepository.Applicant(id);

      return job;
    } catch (error) {
      throw error;
    }
  }

  public async AuthUserById(id: string) {
    try {
      const job = await this.jobRepository.AuthUserById(id);

      return job;
    } catch (error) {
      throw error;
    }
  }

  public async MakeFavoriteJob(id: string , JobId :string) {
    try {
      const job = await this.jobRepository.MakeFavoriteJob(id,JobId);

    } catch (error) {
      throw error;
    }
  }

  public async GetPreferredJobs(preferedJobList: any) {
    try {
      const jobs = await this.jobRepository.GetPreferredJobs(preferedJobList);
       
      return jobs
    } catch (error) {
      throw error;
    }
  }

  public async JobListByUser(id: string) {
    try {
      const job = await this.jobRepository.JobListByUser(id);

      return job;
    } catch (error) {
      throw error;
    }
  }

  public async ComapnyJobs(email: string) {
    try {
      const job = await this.jobRepository.JobDetailsofCompany(email);

      return job;
    } catch (error) {
      throw error;
    }
  }

  public async companyDetail() {
    try {
      const job = await this.jobRepository.CompanyData();

      return job;
    } catch (error) {
      throw error;
    }
  }

  public async jobApply(data: any) {
    try {
      const job = await this.jobRepository.jobApply(data);

      return job;
    } catch (error) {
      throw error;
    }
  }
}

export default JobUsecase;
