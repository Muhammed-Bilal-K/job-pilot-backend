import IEmployerRepository from "../interfaces/repositories/usercandidte.repositories";
import AuthModel from "../frameworks/models/auth.model";

class EmployerRepository implements IEmployerRepository {
  constructor() {}

  public async profile(data: any): Promise<any> {
    try {
      const updatedProfile = await AuthModel.updateOne(
        { _id: data.userId },
        {
          $set: {
            address: data.address,
            educations: data.education,
            experienceLevel: data.experience,
            linkedinUrl: data.websiteUrl,
            biography: data.bio,
            userlogo: data.logo,
            preferredJob:data.preferredJob,
            resumeUrl:data.resumeUrl,
          },
        }
      );
      return updatedProfile;
    } catch (error) {
      console.log(error);
    }
  }

  public async specificUser(id: string): Promise<any> {
    try {
      const specificProfile = await AuthModel.findById({ _id: id });
      return specificProfile;
    } catch (error) {
      console.log(error);
    }
  }
}
export default EmployerRepository;
