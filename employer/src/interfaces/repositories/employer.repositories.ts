import { IJobCreateRequest } from "../employer.interface";

interface IEmployerRepository {
    jobCreateData(data : IJobCreateRequest): Promise<any>;
}

export default IEmployerRepository;