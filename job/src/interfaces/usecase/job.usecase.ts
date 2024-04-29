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
  applicant(id: string): Promise<unknown>;
  authUserById(id: string): Promise<unknown>;
  makeFavoriteJob(id: string, JobId: string): Promise<void>;
  getPreferredJobs(GetPreferredJobs: any): Promise<any>;
  jobListByUser(id: string): Promise<unknown>;
  jobAppliedUserDetail(id: string , jobId : string): Promise<unknown>;
  userShortListByValid(id: string , jobId : string): Promise<unknown>;
  comapnyJobs(email: string): Promise<unknown>;
}

export default IJobUsecase;
