import { IJobCreateRequest } from "../employer.interface";

interface IEmployerUsecase {
    jobCreate(data: IJobCreateRequest): Promise<any>;
  }
  
  export default IEmployerUsecase;