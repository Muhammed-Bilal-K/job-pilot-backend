import { IJobCreateRequest , IJobAppply } from "../job.interface";

interface IJobUsecase {
    jobCreate(data: IJobCreateRequest): Promise<any>;
    jobList() : Promise<any>;
    companyDetail() : Promise<any>;
    jobApply(data : IJobAppply):Promise<unknown>;
    allJobApplicant():Promise<unknown>;
    Applicant(id : string):Promise<unknown>;
    ComapnyJobs(email : string):Promise<unknown>;
  }
  
  export default IJobUsecase;