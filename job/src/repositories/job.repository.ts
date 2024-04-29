import { IJobAppply, IJobCreateRequest } from "../interfaces/job.interface";
import IJobRepository from "../interfaces/repositories/job.repositories";
import jobModel, { IJob } from "../frameworks/models/job.model";
import { CompanyModel } from "../frameworks/models/company.model";
import UserModel from "../frameworks/models/auth.model";
import { ApplicationModel } from "../frameworks/models/application.model";
import { FilterQuery } from "mongoose";

class JobRepository implements IJobRepository {
  constructor() {}

  public async jobCreateData(data: IJobCreateRequest): Promise<any> {
    try {
      const job = new jobModel({
        company: data.company,
        jobTitle: data.jobTitle.toLocaleLowerCase(),
        tags: data.tags.toLocaleLowerCase(),
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

  public async listJobData(
    selectedIndustries: any,
    selectedSalaryRange: any,
    selectedJobType: any,
    selectedSort: string,
    currentPage: any
  ): Promise<any> {
    try {
      let job;
      currentPage = parseInt(currentPage);
      let totalJobsCount;
      let sortOption: string | { [key: string]: 1 | -1 } = { createdAt: 1 };
      const limit = 2;

      if (currentPage === 0) {
        job = await jobModel.find({}).populate("company");
        return { jobs: job, totalPages: 1 };
      }

      if (
        selectedIndustries ||
        selectedSalaryRange ||
        selectedJobType ||
        selectedSort
      ) {
        if (selectedSort === "asc") {
          sortOption = { createdAt: -1 };
        } else {
          sortOption = { createdAt: 1 };
        }

        const industryQuery =
          selectedIndustries?.length > 0
            ? { tags: { $in: selectedIndustries } }
            : {};
        const salaryRangeQuery = selectedSalaryRange
          ? {
              $and: [
                {
                  minSalary: {
                    $gte: parseInt(selectedSalaryRange.split("-")[0]),
                  },
                },
                {
                  maxSalary: {
                    $lte: parseInt(selectedSalaryRange.split("-")[1]),
                  },
                },
              ],
            }
          : {};
        const jobTypeQuery =
          selectedJobType?.length > 0
            ? { jobtype: { $in: selectedJobType } }
            : {};

        const combinedQuery = {
          $and: [industryQuery, salaryRangeQuery, jobTypeQuery],
        } as unknown as FilterQuery<IJob>;

        job = await jobModel
          .find(combinedQuery)
          .populate("company")
          .sort(sortOption);
      } else {
        // job = await jobModel.find({}).populate("company").skip((currentPage - 1) * limit).limit(limit);
        job = await jobModel.find({}).populate("company");
        totalJobsCount = await jobModel.countDocuments({});
      }

      const totalPages = Math.ceil(totalJobsCount! / limit);

      const startIndex = (currentPage - 1) * limit;
      job = job.slice(startIndex, startIndex + limit);

      return { jobs: job, totalPages: totalPages };
      // return job;
    } catch (error) {
      throw error;
    }
  }

  public async companyData(): Promise<any> {
    try {
      const company = await CompanyModel.find({});

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
        resumeURL: data.resumeURL,
      });
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

  public async applicant(id: string): Promise<unknown> {
    try {
      const job = await ApplicationModel.find({ user: id })
        .populate({
          path: "job",
          populate: { path: "company" },
        })
        .sort({ createdAt: 1 });
      return job;
    } catch (error) {
      throw error;
    }
  }

  public async authUserById(id: string): Promise<unknown> {
    try {
      const job = await UserModel.findOne({ _id: id })
        .populate({ path: "favoriteJobs", populate: { path: "company" } })
        .sort({ createdAt: 1 });
      return job;
    } catch (error) {
      throw error;
    }
  }

  public async makeFavoriteJob(id: string, JobId: string): Promise<void> {
    try {
      const user = await UserModel.findById(id);

      if (!user) {
        throw new Error("User not found");
      }

      if (user.favoriteJobs.includes(JobId)) {
        throw new Error("Job already exists in favorites");
      }

      user.favoriteJobs.push(JobId);

      await user.save();
    } catch (error) {
      throw error;
    }
  }

  public async getPreferredJobs(preferedJobList: any): Promise<unknown> {
    try {
      if (!preferedJobList) {
        throw new Error("Preferred job titles are required");
      }

      const keywords = preferedJobList
        .split(",")
        .map((keyword: string) => keyword.trim());

      const jobs = await jobModel
        .find({
          $or: [
            { jobTitle: { $regex: keywords.join("|"), $options: "i" } },
            { tags: { $regex: keywords.join("|"), $options: "i" } },
          ],
        })
        .populate("company");

      return jobs;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async jobListByUser(id: string): Promise<unknown> {
    try {
      const jobs = await ApplicationModel.find({ job: id })
        .populate("user")
        .populate("job");
      return jobs;
    } catch (error) {
      throw error;
    }
  }

  public async jobAppliedUserDetail(
    id: string,
    jobId: string
  ): Promise<unknown> {
    try {
      const jobs = await ApplicationModel.findOne({ user: id, job: jobId })
        .populate("user")
        .populate("job");

      return jobs;
    } catch (error) {
      throw error;
    }
  }

  public async userShortListByValid(
    id: string,
    jobId: string
  ): Promise<unknown> {
    try {
      const jobs = await ApplicationModel.updateOne(
        { user: id, job: jobId },
        {
          $set: {
            shortlisted: true,
          },
        }
      );
      return jobs;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async jobDetailsofCompany(email: string): Promise<unknown> {
    try {
      // Find the company using the email
      const company = await CompanyModel.findOne({ email: email });

      if (!company) {
        throw new Error("Company not found");
      }

      // Find jobs associated with the company using the company's _id
      const jobList = await jobModel.find({ company: company._id });

      return jobList;
    } catch (error) {
      throw error;
    }
  }
}
export default JobRepository;
