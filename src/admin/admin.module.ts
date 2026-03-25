import { Module } from '@nestjs/common';
import { AdminListener, adminListenerFactory } from './admin.listener';

@Module({
    imports: [],
    controllers: [],
    providers: [{
        provide: AdminListener,
        useFactory: adminListenerFactory
    }]
})
export class AdminModule { }
