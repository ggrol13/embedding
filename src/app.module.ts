import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GptModule } from './gpt/gpt.module';
import { PineconeModule } from './pinecone/pinecone.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [GptModule, PineconeModule,ConfigModule.forRoot({ isGlobal: true}),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
