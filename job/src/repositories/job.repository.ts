import { IJobAppply, IJobCreateRequest } from "../interfaces/job.interface";
import IJobRepository from "../interfaces/repositories/job.repositories";
import jobModel from "../frameworks/models/job.model";
import { CompanyModel } from "../frameworks/models/company.model";
import { ApplicationModel } from "../frameworks/models/application.model";

class JobRepository implements IJobRepository {
  constructor() {}

  public async jobCreateData(data: IJobCreateRequest): Promise<any> {
    try {
      console.log(data);

      const job = new jobModel({
        company: data.company,
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
      const job = await jobModel.find({}).populate("company");

      return job;
    } catch (error) {
      throw error;
    }
  }

  public async CompanyData(): Promise<any> {
    try {
      const company = await CompanyModel.find({});
      console.log(company);
      return company;
    } catch (error) {
      throw error;
    }
  }

  public async jobApply(data: IJobAppply): Promise<unknown> {
    try {
      const job = new ApplicationModel({
        user: data.userId,
        job: data.jobId,
        coverLetter: data.coverLetter,
        resumeURL: data.resumeURL 
      })
      await job.save();
      return job;
    } catch (error) {
      throw error;
    }
  }

  public async listAllApplicant(): Promise<unknown> {
    try {
      const job = await ApplicationModel.find({});

      return job;
    } catch (error) {
      throw error;
    }
  }

  public async Applicant(id : string ): Promise<unknown> {
    try {
      const job = await ApplicationModel.find({user : id}).populate('job');

      return job;
    } catch (error) {
      throw error;
    }
  }
}
export default JobRepository;
