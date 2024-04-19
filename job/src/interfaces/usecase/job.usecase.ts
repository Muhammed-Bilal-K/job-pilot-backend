import { IJobCreateRequest, IJobAppply } from "../job.interface";

interface IJobUsecase {
  jobCreate(data: IJobCreateRequest): Promise<any>;
  jobList(
    selectedIndustries: any,
    selectedSalaryRange: any,
    selectedJobType: any,
    selectedSort: any,
    currentPage: any
  ): Promise<any>;
  companyDetail(): Promise<any>;
  jobApply(data: IJobAppply): Promise<unknown>;
  allJobApplicant(): Promise<unknown>;
  Applicant(id: string): Promise<unknown>;
  AuthUserById(id: string): Promise<unknown>;
  MakeFavoriteJob(id: string, JobId: string): Promise<void>;
  GetPreferredJobs(GetPreferredJobs: any): Promise<any>;
  JobListByUser(id: string): Promise<unknown>;
  ComapnyJobs(email: string): Promise<unknown>;
}

export default IJobUsecase;
