import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductCreateDto } from './models/product-create.dto';
import { ProductUpdateDto } from './models/product-update.dto';
import { HasPermission } from 'src/permission/has-permission.decorator';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @HasPermission('products')
  async all(@Query('page') page = 1) {
    return this.productService.paginate(page);
  }

  @Post()
  @HasPermission('products')
  async create(@Body() body: ProductCreateDto) {
    return this.productService.create(body);
  }

  @Get(':id')
  @HasPermission('products')
  async get(@Param('id') id: number) {
    return this.productService.findOne({ id });
  }

  @Put(':id')
  @HasPermission('products')
  async update(@Param('id') id: number, @Body() body: ProductUpdateDto) {
    await this.productService.update(id, body);

    return this.productService.findOne({ id });
  }

  @Delete(':id')
  @HasPermission('products')
  async delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
