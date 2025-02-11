// src/superheroes/superheroes.controller.ts
import { Controller, Get, Post, Body, ValidationPipe, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

class CreateSuperheroDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  superpower: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  humilityScore: number;
}

interface Superhero {
  name: string;
  superpower: string;
  humilityScore: number;
}

@Controller('superheroes')
export class SuperheroesController {
  private superheroes: Superhero[] = [];

  @Post()
  create(@Body(ValidationPipe) createSuperheroDto: CreateSuperheroDto) {
    this.superheroes.push(createSuperheroDto);
    return { message: 'Superhero added successfully' };
  }

  @Get()
  findAll() {
    const sortedSuperheroes = [...this.superheroes].sort((a, b) => b.humilityScore - a.humilityScore);
    return sortedSuperheroes;
  }
}



// src/superheroes/superheroes.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a superhero', () => {
      const superhero = { name: 'Test Hero', superpower: 'Test Power', humilityScore: 7 };
      controller.create(superhero);
      const superheroes = controller.findAll();
      expect(superheroes.length).toBe(1);
      expect(superheroes[0].name).toBe('Test Hero');
  });

    it('should return superheroes sorted by humility', () => {
        const hero1 = { name: 'Hero 1', superpower: 'Power 1', humilityScore: 5 };
        const hero2 = { name: 'Hero 2', superpower: 'Power 2', humilityScore: 9 };
        const hero3 = { name: 'Hero 3', superpower: 'Power 3', humilityScore: 2 };

        controller.create(hero1);
        controller.create(hero2);
        controller.create(hero3);

        const sortedHeroes = controller.findAll();

        expect(sortedHeroes[0].name).toBe('Hero 2'); // Humility 9
        expect(sortedHeroes[1].name).toBe('Hero 1'); // Humility 5
        expect(sortedHeroes[2].name).toBe('Hero 3'); // Humility 2

    });
});


// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// app.module.ts
import { Module } from '@nestjs/common';
import { SuperheroesController } from './superheroes/superheroes.controller';

@Module({
  imports: [],
  controllers: [SuperheroesController],
  providers: [],
})
export class AppModule {}
