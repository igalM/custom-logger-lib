import { InjectionToken } from '@angular/core';
import { DateFormat } from '../enums/date-format.enum';
import { LoggerTarget } from '../enums/logger-target.enum';

export const CONFIG = new InjectionToken<InterceptorConfig>('config');

export interface InterceptorConfig {
    target?: LoggerTarget;
    msgFormat?: DateFormat;
    flushAfter?: number;
}