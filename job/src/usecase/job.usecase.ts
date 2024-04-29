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

  public async applicant(id: string) {
    try {
      const job = await this.jobRepository.applicant(id);

      return job;
    } catch (error) {
      throw error;
    }
  }

  public async authUserById(id: string) {
    try {
      const job = await this.jobRepository.authUserById(id);

      return job;
    } catch (error) {
      throw error;
    }
  }

  public async makeFavoriteJob(id: string , JobId :string) {
    try {
      const job = await this.jobRepository.makeFavoriteJob(id,JobId);

    } catch (error) {
      throw error;
    }
  }

  public async getPreferredJobs(preferedJobList: any) {
    try {
      const jobs = await this.jobRepository.getPreferredJobs(preferedJobList);
       
      return jobs
    } catch (error) {
      throw error;
    }
  }

  public async jobListByUser(id: string) {
    try {
      const job = await this.jobRepository.jobListByUser(id);

      return job;
    } catch (error) {
      throw error;
    }
  }

  public async jobAppliedUserDetail(id: string , jobId : string) {
    try {
      const job = await this.jobRepository.jobAppliedUserDetail(id , jobId );

      return job;
    } catch (error) {
      throw error;
    }
  }

  public async userShortListByValid(id: string , jobId : string) {
    try {
      const job = await this.jobRepository.userShortListByValid(id , jobId );

      return job;
    } catch (error) {
      throw error;
    }
  }

  public async comapnyJobs(email: string) {
    try {
      const job = await this.jobRepository.jobDetailsofCompany(email);

      return job;
    } catch (error) {
      throw error;
    }
  }

  public async companyDetail() {
    try {
      const job = await this.jobRepository.companyData();

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
