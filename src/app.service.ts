import { Injectable } from '@nestjs/common';
import { GptService } from './gpt/gpt.service';
import { PineconeService } from './pinecone/pinecone.service';

@Injectable()
export class AppService {
  constructor(
    private readonly gptService: GptService,
    private readonly pineconeService: PineconeService
  ){}



  getHello(): string {
    return 'Hello World!';
  }

  async embedding(content){
    const embedding = await this.gptService.embedding(content)
    const context = await this.pineconeService.test(embedding)
    const answer = await this.gptService.bookConversation(content, context)
    return answer
  }
}
