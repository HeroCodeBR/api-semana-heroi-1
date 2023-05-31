import { endOfDay, startOfDay } from 'date-fns';
import { prisma } from '../database/prisma';
import { ICreate } from '../interfaces/SchedulesInterface';

class SchedulesRepository {
  async create({ name, phone, date, user_id }: ICreate) {
    console.log(user_id);
    const result = await prisma.schedule.create({
      data: {
        name,
        phone,
        date,
        user_id,
      },
    });
    return result;
  }
  async find(date: Date, user_id: string) {
    const result = await prisma.schedule.findFirst({
      where: { date, user_id },
    });
    return result;
  }
  async findById(id: string) {
    const result = await prisma.schedule.findUnique({
      where: { id },
    });
    return result;
  }
  async findAll(date: Date) {
    const result = await prisma.schedule.findMany({
      where: {
        date: {
          gte: startOfDay(date),
          lt: endOfDay(date),
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
    return result;
  }
  async update(id: string, date: Date) {
    const result = await prisma.schedule.update({
      where: {
        id,
      },
      data: {
        date,
      },
    });
    return result;
  }

  async delete(id: string) {
    const result = await prisma.schedule.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
export { SchedulesRepository };
