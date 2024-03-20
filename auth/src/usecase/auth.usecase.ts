import sendMail from "../frameworks/utils/sendMail";
import {
  IActivationRequest,
    ILoginRequest,
    IRegisterRequest,
    IRequestEmail,
    IResendOtp,
    InputPass,
  } from "../interfaces/auth.interface";
import JwtService from "../frameworks/utils/jwt";
import IAuth from '../entities/auth';
import IAuthRepository from "../interfaces/repository/auth.respository";
import IAuthUsecase from "../interfaces/usecase/auth.usecase";

class AuthUsecase implements IAuthUsecase {
    private authRepository : IAuthRepository; 
    private jwt: JwtService;
    private tuser: IRegisterRequest | null;
    constructor(
        authRepository: IAuthRepository,
        jwt: JwtService,
    ){
        this.authRepository = authRepository;
        this.jwt = jwt;
        this.tuser = null;
    }

    public async register(userData : IRegisterRequest){     
        if (userData.password !== userData.confirmpassword) {
          throw new Error("Password not match");
        }

        const isEmailExist = await this.getUserByEmail(userData.email);
        if (isEmailExist) {
            throw new Error("User already exist");
        }

        this.tuser = {
            fullname : userData.fullname,
            username : userData.username,
            email : userData.email,
            password : userData.password,
            role : userData.role,
        }

        const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
        const token = await this.jwt.createActivationCode(this.tuser, activationCode);
        const data = { user: { name: this.tuser.fullname }, activationCode };
        console.log(activationCode);

        try {
          await sendMail({
            email: this.tuser.email,
            subject: "Account Activation",
            template: "activation-mail.ejs",
            data,
          });
          const activationToken = token.token;
          return activationToken;
        } catch (error) {
          throw error;
        }
    }

    public async activateUser(data: IActivationRequest) {
      try {
        const newUser = await this.jwt.verifyActivationCode(data);
        if (newUser.activationCode !== data.activation_code) {
          throw new Error("Invalid activation code");
        }
  
        const { fullname ,username , email, password , role } = newUser.user;
  
        const existingUser = await this.getUserByEmail(email);
        if (existingUser) {
          throw new Error("User already exist");
        }
        const user = await this.createUser({
          fullname,
          username,
          email,
          password,
          role,
        } as IAuth);
      } catch (error) {
        throw error;
      }
    }

    public async login(data: ILoginRequest) {
        try {
          const user = await this.getUserByEmail(data.email);
        if (!user) {
          throw new Error("User not found");
        }
        if (user?.isBlock) {
          throw new Error("You are blocked by admin");
        }
        const isPasswordMatched = await this.compareUserPassword(
          data.email,
          data.password
        );
    
        if (isPasswordMatched === false) {
          throw new Error("Invalid email or password");
        }
        const token = await this.jwt.createToken(user);
        return token;
        } catch (error) {
          throw error
        }
    }

    public async UserByEmail(data : IRequestEmail){
      try {

        const existEmail  = await this.getUserByEmail(data.email);
        if (!existEmail) {
          throw new Error("User not found");
        }

        return existEmail;
      } catch (error) {
        throw error
      }
    }

    public async compareUserPassword(email: string, password: string) {
        try {
          const isPasswordMatched =
            await this.authRepository.findByEmailAndComparePassword(
              email,
              password
            );
          return isPasswordMatched;
        } catch (error) {
          throw error;
        }
      }

    public async getUserByEmail(email: string): Promise<IAuth | null> {
        try {
          const user = await this.authRepository.findByEmail(email);
          return user as IAuth | null;
        } catch (error) {
          throw error;
        }
    }

    public async createUser(data: IAuth) {
      try {
        const user = await this.authRepository.create(data);
        
        return user;
      } catch (error) {
        throw error;
      }
    }

    public async UpdatePassByEmail(data :InputPass){ 
      try {
        const existEmail  = await this.getUserByEmail(data.email);
      if (!existEmail) {
        throw new Error("User not found");
      }

      const user = await this.authRepository.update(existEmail.email,data.npassword);
      return user;
      } catch (error) {
        throw error;
      }
    }

    public async ResendUserOtp(dataE :IResendOtp){ 
      try {

        const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
        const token = await this.jwt.createActivationCode(this.tuser, activationCode);
        const data = { user: { name: dataE.email }, activationCode };

        try {
          await sendMail({
            email: dataE.email,
            subject: "Resend Otp Mail",
            template: "activation-mail.ejs",
            data,
          });
          const activationToken = token.token;
          return activationToken;
        } catch (error) {
          throw error;
        }
      } catch (error) {
        throw error;
      }
    }
}

export default AuthUsecase;









// public async createUser(data: IAuth) {
//   try {
//     const user = await this.authRepository.create(data);
//     // if (!user) throw new Error("User not created");
//     // publish user create event
//     // await this.eventPublisher.publish(
//     //   Exchanges.USER_EXCHANGE,
//     //   Topics.USER_CREATE,
//     //   {
//     //     topic: Topics.USER_CREATE,
//     //     _id: user._id,
//     //     name: data.name,
//     //     email: data.email,
//     //     role: data.role,
//     //     avatar: data.avatar,
//     //   }
//     // );
//     return user;
//   } catch (error) {
//     throw error;
//   }
// }