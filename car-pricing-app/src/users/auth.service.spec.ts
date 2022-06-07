import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService:Partial<UsersService> = {
    findByEmail: () => Promise.resolve([]),
    create: (email:string,password:string)=>Promise.resolve({id:1,email,password} as User ),
  };

  beforeEach(async () => {
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
});
