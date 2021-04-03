import { ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpInterceptorService } from './http.interceptor';
import { HttpLoggingInterceptor } from './logging/http-logging.interceptor';
import { SampleService } from './services/sample.service';
import { LoggingService } from './logging/logging.service';
import { HttpErrorHandlerService } from './services/http-error-handler.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [],
  exports: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`${CoreModule.name} is already loaded. Import modules only in AppModule.`);
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        LoggingService,
        SampleService,
        HttpErrorHandlerService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpLoggingInterceptor, multi: true },
        { provide: ErrorHandler, useClass: HttpErrorHandlerService },
      ]
    };
  }
}
