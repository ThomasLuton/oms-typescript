import { NotFoundException } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { WorkflowsRepository } from './workflows.repository';

describe('WorkflowsService', () => {
  let service: WorkflowsService;
  let mockRepository: jest.Mocked<WorkflowsRepository>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findAllByUser: jest.fn(),
      findById: jest.fn(),
    } as any;

    service = new WorkflowsService(mockRepository);
  });

  it('devrait créer un workflow et appeler le repository avec les bonnes données', async () => {
    const userId = 1;
    const dto = {
      name: 'Mon workflow',
      trigger: 'order.created',
      isActive: true,
      actions: [{ type: 'notify_user', order: 1 }],
    };
    const fakeWorkflow = { id: 1, userId, ...dto };

    mockRepository.create.mockResolvedValue(fakeWorkflow as any);

    const result = await service.create(userId, dto as any);

    expect(mockRepository.create).toHaveBeenCalledWith(userId, dto);
    expect(result).toEqual(fakeWorkflow);
  });

  it('devrait retourner les workflows de l\'utilisateur', async () => {
    const userId = 1;
    const fakeWorkflows = [
      { id: 1, name: 'Workflow A', userId },
      { id: 2, name: 'Workflow B', userId },
    ];

    mockRepository.findAllByUser.mockResolvedValue(fakeWorkflows as any);

    const result = await service.findAllByUser(userId);

    expect(mockRepository.findAllByUser).toHaveBeenCalledWith(userId);
    expect(result).toHaveLength(2);
    expect(result).toEqual(fakeWorkflows);
  });

  it('devrait lever une NotFoundException si le workflow est introuvable', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(service.findById(99, 1))
      .rejects
      .toThrow(NotFoundException);

    expect(mockRepository.findById).toHaveBeenCalledWith(99, 1);
  });

  it('devrait retourner le workflow s\'il existe et appartient au user', async () => {
    const fakeWorkflow = {
      id: 1,
      name: 'Mon workflow',
      userId: 1,
      isActive: true,
      trigger: 'order.created',
      actions: [],
    };

    mockRepository.findById.mockResolvedValue(fakeWorkflow as any);

    const result = await service.findById(1, 1);

    expect(result).toEqual(fakeWorkflow);
    expect(mockRepository.findById).toHaveBeenCalledWith(1, 1);
  });
});
