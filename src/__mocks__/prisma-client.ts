export const PrismaClient = jest.fn().mockImplementation(() => ({
  workflow: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    findUnique: jest.fn(),
  },
  execution: { create: jest.fn() },
  order: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
}));
