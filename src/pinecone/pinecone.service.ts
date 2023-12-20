import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pinecone } from '@pinecone-database/pinecone';

@Injectable()
export class PineconeService {
    private readonly pinecone: Pinecone
    constructor(private readonly configService: ConfigService){
        this.pinecone= new Pinecone({
            apiKey: this.configService.get("PINECONE_API_KEY"),
            environment: this.configService.get("PINECONE_ENVIRONMENT")
        })
    }

    async test (embeddings:number[]) {
        //pinecone에서 index 가져오기
        const index = this.pinecone.index('sample-index')

        //query날려서 similarity 측정 후 스코어 높은 순으로 가져옴
        //tokK는 몇개 가져올건지
        //namespace없으면 default로 가져온다.
        const result = await index.namespace('Pinocchio').query({vector:embeddings, topK:2, includeMetadata:true})
        console.log(result)
        console.log(result.matches[0].metadata.text)

        return result.matches[0].metadata.text

        //데이터 집어넣기
        // index.namespace('Pinocchio').upsert([{
        //     id: 'Pinocchio-02',
        //     values: embeddings,
        //     metadata: {
        //         text: text
        //     }
        // }])

        //인덱스 생성
        // await this.pinecone.createIndex({
        //     name: 'sample-index',
        //     dimension: 1536,
        //     metric: 'cosine',
        //     pods: 2,
        //     replicas: 2,
        //     podType: 'p1.x2',
        //     metadataConfig: {
        //       indexed: ['product_type'],
        //     },
          
        //     // This option tells the client not to throw if the index already exists.
        //     suppressConflicts: true,
          
        //     // This option tells the client not to resolve the promise until the
        //     // index is ready.
        //     waitUntilReady: true,
        //   });
    }
}
