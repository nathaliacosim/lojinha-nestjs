import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { CorsMiddleware } from './cors.middleware';

@Module({
  imports: [UsuarioModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
