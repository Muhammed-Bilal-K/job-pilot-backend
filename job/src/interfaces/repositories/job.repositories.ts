import { IJobAppply, IJobCreateRequest } from "../job.interface";

interface IJobRepository {
    jobCreateData(data : IJobCreateRequest): Promise<any>;
    listJobData(): Promise<any>;
    CompanyData(): Promise<any>;
    jobApply(data : IJobAppply) : Promise<unknown>;
    listAllApplicant() : Promise<unknown>;
    Applicant(id : string) : Promise<unknown>;
}

export default IJobRepository;