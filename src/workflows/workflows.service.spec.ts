import { NotFoundException } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { WorkflowsRepository } from './workflows.repository';

describe('WorkflowsService', () => {
  let service: WorkflowsService;
  let mockRepository: jest.Mocked<WorkflowsRepository>;

  // Avant chaque test, on recrée un mock propre du repository
  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findAllByUser: jest.fn(),
      findById: jest.fn(),
    } as any;

    service = new WorkflowsService(mockRepository);
  });

  // TEST 1
  // create() doit appeler le repository avec le bon userId et le bon dto
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

  // TEST 2
  // findAllByUser() doit appeler le repository avec le bon userId
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

  // TEST 3
  // findById() doit lever une NotFoundException si le workflow n'existe pas
  // C'est la logique la plus importante — un user ne doit pas accéder
  // au workflow d'un autre
  it('devrait lever une NotFoundException si le workflow est introuvable', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(service.findById(99, 1))
      .rejects
      .toThrow(NotFoundException);

    expect(mockRepository.findById).toHaveBeenCalledWith(99, 1);
  });

  // TEST 4
  // findById() doit retourner le workflow s'il existe et appartient au user
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