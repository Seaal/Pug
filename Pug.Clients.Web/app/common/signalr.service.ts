import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";

@Injectable()
export class SignalRService {

    private connection: SignalR.Hub.Connection;
    private proxies: { [hubName: string] : SignalR.Hub.Proxy};

    constructor() {
        this.connection = $.hubConnection();
        this.proxies = {};
    }

    public start(): Observable<boolean> {
        const subject: Subject<boolean> = new Subject<boolean>();

        this.connection.start({
            waitForPageLoad: false
        }).then(
            () => subject.next(true),
            () => subject.next(false)
        );

        return subject;
    }

    public on<T>(hubName: string, methodName: string): Observable<T> {
        const proxy: SignalR.Hub.Proxy = this.getProxy(hubName);

        const subject: Subject<T> = new Subject<T>();

        proxy.on(methodName, (data: T) => subject.next(data));

        return subject;
    }

    public send<TReturn>(hubName: string, methodName: string, ...data: any[]): Observable<TReturn> {
        const proxy: SignalR.Hub.Proxy = this.getProxy(hubName);

        const subject: Subject<TReturn> = new Subject<TReturn>();

        data.unshift(methodName);

        proxy.invoke.apply(proxy, data).then(
            (value: TReturn) => subject.next(value)
        );

        return subject;
    }

    private getProxy(hubName: string) {
        if (!this.proxies[hubName]) {
            this.proxies[hubName] = this.connection.createHubProxy(hubName);
        }

        return this.proxies[hubName];
    }
}
