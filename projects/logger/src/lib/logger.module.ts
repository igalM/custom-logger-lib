import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CustomInterceptor } from './custom-interceptor';
import { CONFIG, InterceptorConfig } from './models/interceptor-config.model';
import { LoggerComponent } from './logger.component';



@NgModule({
  declarations: [
    LoggerComponent
  ],
  imports: [
  ],
  exports: [
    LoggerComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }

  ]
})
export class LoggerModule {
  static forRoot(config?: InterceptorConfig): ModuleWithProviders<LoggerModule> {
    return {
      ngModule: LoggerModule,
      providers: [
        { provide: CONFIG, useValue: config },
      ]
    };
  }
}
