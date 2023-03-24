import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from 'nest-neo4j';

@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: '19dbc8f1.databases.neo4j.io',
      port: 7687,
      username: 'neo4j',
      password: '7qPGAwuP0aTyph030v0POAfrHD1uA5UWR7EUcDSGGaY'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}