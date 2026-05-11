import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TalksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.talk.findMany({
      orderBy: {
        startTime: 'asc',
      },
    });
  }

  async create(data: any) {
    return this.prisma.talk.create({
      data,
    });
  }
  async remove(id: number) {
  return this.prisma.talk.delete({
    where: {
      id,
    },
  });
}
}