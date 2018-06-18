import { Injectable } from "@angular/core";
import { Observable, Subject, from } from "rxjs";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";

@Injectable()
export abstract class BaseSignalRService {

    private connection: HubConnection;

    constructor(hubUrl: string) {
        this.connection = new HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
    }

    public start(): Observable<void> {
        return from(this.connection.start());
    }

    protected on<T>(methodName: string): Observable<T> {
        const subject: Subject<T> = new Subject<T>();

        this.connection.on(methodName, (data: T) => subject.next(data));

        return subject.asObservable();
    }

    protected send<TReturn>(methodName: string, ...data: any[]): Observable<TReturn> {
        return from(this.connection.invoke(methodName, ...data));
    }
}
