import { IJobCreateRequest } from "../interfaces/job.interface";
import IJobRepository from "../interfaces/repositories/job.repositories";
import jobModel from "../frameworks/models/job.model";

class JobRepository implements IJobRepository {
  constructor() {}

  public async jobCreateData(data: IJobCreateRequest): Promise<any> {
    try {

      console.log(data);
      
      const job = new jobModel({
        company : data.company,
        jobTitle: data.jobTitle,
        tags: data.tags,
        jobRole: data.jobRole,
        minSalary: data.minSalary,
        maxSalary: data.maxSalary,
        education: data.education,
        experience: data.experience,
        jobtype: data.jobtype,
        expiredate: data.expiredate,
        joblevel: data.joblevel,
        applicationNo: data.applicationNo,
        country: data.country,
        state: data.state,
        jobDescription: data.jobDescription,
      });
      await job.save();
      return job;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async listJobData(): Promise<any> {
    try {
      const job = await jobModel.find({}).populate('company');
      
      return job;
    } catch (error) {
      throw error;
    }
  }
}
export default JobRepository;
