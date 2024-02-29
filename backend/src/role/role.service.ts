import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './models/role.entity';
import { AbstractService } from 'src/common/abstract.service';

@Injectable()
export class RoleService extends AbstractService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }

  async findOne(condition): Promise<Role> {
    return this.roleRepository.findOne({
      where: condition,
      relations: ['permissions'],
    });
  }
}
