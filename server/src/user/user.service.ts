import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/database/prisma.service";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(email: string): Promise<User | void> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? user : null;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: { ...createUserDto } });
  }

  async searchUser(email: string): Promise<User[]> {
    const user = await this.prisma.user.findMany({
      where: { email: { contains: email } },
      orderBy: { email: "asc" },
    });
    return user ? user : null;
  }
}
