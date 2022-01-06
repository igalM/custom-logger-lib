import { formatDate } from '@angular/common';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, config, Observable, Subject, throwError } from 'rxjs';
import { catchError, debounce, debounceTime } from 'rxjs/operators';
import { DateFormat } from './enums/date-format.enum';
import { LoggerTarget } from './enums/logger-target.enum';
import { CustomError } from './models/error.model';
import { CONFIG, InterceptorConfig } from './models/interceptor-config.model';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    private queue$ = new BehaviorSubject<CustomError[]>([]);
    private config: InterceptorConfig = {
        target: LoggerTarget.Console,
        msgFormat: DateFormat.Default,
        flushAfter: 0
    }

    constructor(@Inject(CONFIG) config: InterceptorConfig) {
        this.config = config;
        this.queue$
            .pipe(
                debounceTime(this.config.flushAfter || 0)
            ).subscribe(messages => {
                if (messages.length > 0) {
                    messages.forEach((msg) => {
                        if (this.config.target === LoggerTarget.Console) {
                            console.log(msg);
                        } else if (this.config.target === LoggerTarget.Storage) {
                            localStorage.setItem('customError', JSON.stringify(msg));
                        }
                    });
                    this.queue$.next([]);
                }
            })
    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return this.log(error);
                })
            )
    }

    log(error: HttpErrorResponse) {
        let errorMsg = '';
        const date = new Date();
        const time = formatDate(date, this.config.msgFormat || 'dd/MM/yyyy', 'en-US');
        if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
        }
        else {
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        const customError: CustomError = {
            message: errorMsg,
            timestamp: time
        }
        this.queue$.next([...this.queue$.getValue(), customError]);
        return throwError(errorMsg);
    }
}