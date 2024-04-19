import { IJobAppply, IJobCreateRequest } from "../job.interface";

interface IJobRepository {
    jobCreateData(data : IJobCreateRequest): Promise<any>;
    listJobData(selectedIndustries : any, selectedSalaryRange : any , selectedJobType : any, selectedSort :any,currentPage : any): Promise<any>;
    CompanyData(): Promise<any>;
    jobApply(data : IJobAppply) : Promise<unknown>;
    listAllApplicant() : Promise<unknown>;
    Applicant(id : string) : Promise<unknown>;
    AuthUserById(id : string) : Promise<unknown>;
    MakeFavoriteJob(id : string, JobId :string) : Promise<void>;
    GetPreferredJobs(preferedJobList : any) : Promise<unknown>;
    JobListByUser(id : string) : Promise<unknown>;
    JobDetailsofCompany(email : string) : Promise<unknown>;
}

export default IJobRepository;