import { IJobAppply, IJobCreateRequest } from "../job.interface";

interface IJobRepository {
    jobCreateData(data : IJobCreateRequest): Promise<any>;
    listJobData(selectedIndustries : any, selectedSalaryRange : any , selectedJobType : any, selectedSort :any,currentPage : any): Promise<any>;
    companyData(): Promise<any>;
    jobApply(data : IJobAppply) : Promise<unknown>;
    listAllApplicant() : Promise<unknown>;
    applicant(id : string) : Promise<unknown>;
    authUserById(id : string) : Promise<unknown>;
    makeFavoriteJob(id : string, JobId :string) : Promise<void>;
    getPreferredJobs(preferedJobList : any) : Promise<unknown>;
    jobListByUser(id : string) : Promise<unknown>;
    jobAppliedUserDetail(id : string , jobId : string) : Promise<unknown>;
    userShortListByValid(id : string , jobId : string) : Promise<unknown>;
    jobDetailsofCompany(email : string) : Promise<unknown>;
}

export default IJobRepository;