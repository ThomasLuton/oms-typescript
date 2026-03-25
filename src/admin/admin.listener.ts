import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { UserRegistered } from "src/auth/auth.dto";

@Injectable()
export class AdminListener {
    handleEvent(payload: UserRegistered) {
        console.log("User " + payload.id + " with email " + payload.email + " registered at " + new Date(payload.createdAt))
    }
}

@Injectable()
export class AdminListenerWithMail extends AdminListener {

    @OnEvent('user.registered')
    handleEvent(payload: UserRegistered): void {
        console.log("Send mail to admin");
        super.handleEvent(payload);
    }
}

@Injectable()
export class AdminListenerNoMail extends AdminListener {
    @OnEvent('user.registered')
    handleEvent(payload: UserRegistered): void {
        console.log("We are in dev no mail send to admin");
        super.handleEvent(payload);
    }
}

export function adminListenerFactory(): AdminListener {
    return process.env.prod === "prod" ? new AdminListenerWithMail : new AdminListenerNoMail;
}