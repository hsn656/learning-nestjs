import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService:Partial<UsersService>;
  let users:User[];

  

  

  beforeEach(async () => {
    users = [];
    mockUsersService = {
      findByEmail: (email) => Promise.resolve(users.filter(user => user.email === email)),
      create: (email:string,password:string)=>{
        const user = {
          email,
          password,
          id: users.length + 1,
        } as User;

        users.push(user);
        return Promise.resolve(user);
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide:UsersService,
          useValue:mockUsersService
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sign up', ()=>{
    it("create a user with a salt and hash",async ()=>{
      const user = await service.signup("test@test.com","password");
      const [salt,hash]=user.password.split(".");

      expect(user.email).toBe("test@test.com");
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
    })

    it("throw an error if the email is already used",async ()=>{
      await service.signup("test@test.com","password");
      try {
        await service.signup("test@test.com","password");
      } catch (error) {
        expect(error.message).toBe("User already exists");
      }
    })

  })

  describe('sign in', ()=>{
    it("throw an error if the user is not found",async ()=>{
      try {
        await service.signin("test@test.com","password");
      } catch (error) {
        expect(error.message).toBe("User does not exist");
      }
    })

    it("throw an error if the password is wrong",async ()=>{
      await service.signup("test@test.com","password");
      try {
        await service.signin("test@test.com","wrong password");
      } catch (error) {
        expect(error.message).toBe("Invalid password");
      }
    })

    it("return the user if the password is correct",async ()=>{
      await service.signup("test@test.com","password"); 
      const user = await service.signin("test@test.com","password");
      expect(user).toBeDefined();
      expect(user.email).toBe("test@test.com");
    })

  })
});
