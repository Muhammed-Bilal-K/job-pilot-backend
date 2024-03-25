import { IJobCreateRequest } from "../job.interface";

interface IJobRepository {
    jobCreateData(data : IJobCreateRequest): Promise<any>;
    listJobData(): Promise<any>;
}

export default IJobRepository;