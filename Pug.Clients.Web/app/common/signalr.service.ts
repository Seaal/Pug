import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";

@Injectable()
export class SignalRService {

    private connection: HubConnection;

    constructor() {
        this.connection = new HubConnectionBuilder()
            .withUrl("/hubs/pug")
            .build();
    }

    public start(): Observable<void> {
        const subject: Subject<void> = new Subject<void>();

        this.connection.start().then(
            () => subject.next(),
            error => subject.error(error)
        );

        return subject.asObservable();
    }

    public on<T>(methodName: string): Observable<T> {
        const subject: Subject<T> = new Subject<T>();

        this.connection.on(methodName, (data: T) => subject.next(data));

        return subject.asObservable();
    }

    public send<TReturn>(methodName: string, ...data: any[]): Observable<TReturn> {
        const subject: Subject<TReturn> = new Subject<TReturn>();

        this.connection.invoke(methodName, ...data).then(
            (value: TReturn) => subject.next(value)
        );

        return subject;
    }
}
