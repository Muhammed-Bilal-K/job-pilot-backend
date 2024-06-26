import sendMail from "../frameworks/utils/sendMail";
import {
  IActivationRequest,
  ILoginRequest,
  IRegisterRequest,
  IRequestEmail,
  IResendOtp,
  InputPass,
} from "../interfaces/auth.interface";
import QueuePublisher from "../frameworks/rabbitmq/publisher";
import JwtService from "../frameworks/utils/jwt";
import { IAuth } from "../entities/auth";
import IAuthRepository from "../interfaces/repository/auth.repository";
import IAuthUsecase from "../interfaces/usecase/auth.usecase";
import { Exchanges } from "../frameworks/rabbitmq/exchanges";
import { Topics } from "../frameworks/rabbitmq/topics";
import { token } from "morgan";

class AuthUsecase implements IAuthUsecase {
  private authRepository: IAuthRepository;
  private jwt: JwtService;
  private queuePublisher: QueuePublisher;
  private tuser: IRegisterRequest | null;
  constructor(
    authRepository: IAuthRepository,
    jwt: JwtService,
    queuePublisher: QueuePublisher
  ) {
    this.authRepository = authRepository;
    this.jwt = jwt;
    this.queuePublisher = queuePublisher;
    this.tuser = null;
  }

  // user registeration
  public async register(userData: IRegisterRequest) {
    if (userData.password !== userData.confirmpassword) {
      throw new Error("Password not match");
    }

    const isEmailExist = await this.getUserByEmail(userData.email);
    if (isEmailExist) {
      throw new Error("User already exist");
    }

    this.tuser = {
      fullname: userData.fullname,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    };

    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = await this.jwt.createActivationCode(
      this.tuser,
      activationCode
    );
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

  //activate the user
  public async activateUser(data: IActivationRequest) {
    try {
      const newUser = await this.jwt.verifyActivationCode(data);
      if (newUser.activationCode !== data.activation_code) {
        throw new Error("Invalid activation code");
      }

      const { fullname, username, email, password, role } = newUser.user;

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

  //user login
  public async login(data: ILoginRequest) {
    try {
      const user = await this.getUserByEmail(data.email);
      if (!user) {
        throw new Error("User not found");
      }
      if (user?.isBlock) {
        throw new Error("You are blocked by admin");
      }
      
      if (user?.isVerify === 0 && user.role === 'employer') {
        throw new Error("Your account request has not yet been verified by an admin!");
      }
      const isPasswordMatched = await this.compareUserPassword(
        data.email,
        data.password
      );

      if (!isPasswordMatched) {
        throw new Error("Invalid email or password");
      }

      const token = await this.jwt.createToken(user);
      return token;
    } catch (error) {
      throw error;
    }
  }

  //getting user using by email
  public async userByEmail(data: IRequestEmail) {
    try {
      const existEmail = await this.getUserByEmail(data.email);
      if (!existEmail) {
        throw new Error("User not found");
      }

      return existEmail;
    } catch (error) {
      throw error;
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

  public async socialAuth(data: IAuth) {
    try {
      const user = await this.getUserByEmail(data.email);
      let token;
      if (!user) {
        const newUser = await this.createUser(data);

        token = await this.jwt.createToken(newUser);
      } else {
        token = await this.jwt.createToken(user);
      }

      return token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async createUser(data: IAuth) {
    try {
      const user = await this.authRepository.create(data);
      if (!user) throw new Error("User not created");

      await this.queuePublisher.publish(
        Exchanges.USER_EXCHANGE,
        Topics.USER_CREATE,
        {
          topic: Topics.USER_CREATE,
          _id: user._id,
          name: data.fullname,
          username: data.username,
          email: data.email,
          role: data.role,
        }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async updatePassByEmail(data: InputPass) {
    try {
      const existEmail = await this.getUserByEmail(data.email);
      if (!existEmail) {
        throw new Error("User not found");
      }

      const user = await this.authRepository.update(
        existEmail.email,
        data.npassword
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async currentUserData(data: string | undefined) {
    try {
      const userData = await this.jwt.verifyForCurr(data);

      const user = await this.authRepository.findByEmail(userData.email);

      return user as IAuth;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async listUsers() {
    try {
      const user = await this.authRepository.listUsers();

      return user as IAuth;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async blockUser(id : string ) {
    try {
      const user = await this.authRepository.blockUser(id);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async listEmployers() {
    try {
      const user = await this.authRepository.listEmployers();

      return user as IAuth;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async blockEmployer(id : string) {
    try {
      const user = await this.authRepository.blockEmployer(id);
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async resendUserOtp(dataE: IResendOtp) {
    try {
      const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
      const token = await this.jwt.createActivationCode(
        this.tuser,
        activationCode
      );
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


