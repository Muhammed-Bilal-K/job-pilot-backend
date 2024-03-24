import { IJobCreateRequest } from "../job.interface";

interface IJobRepository {
    jobCreateData(data : IJobCreateRequest): Promise<any>;
}

export default IJobRepository;