import { Module } from '@nestjs/common';
import { GptService } from './gpt.service';
import { PineconeService } from 'src/pinecone/pinecone.service';

@Module({
  providers: [GptService, PineconeService],
  exports: [GptService]
})
export class GptModule {}
