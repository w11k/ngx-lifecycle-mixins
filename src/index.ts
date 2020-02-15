import { ReplaySubject, Observable } from "rxjs";
import { SimpleChanges } from "@angular/core";

export class OnDestroyMixin {
    onDestroy$ = new ReplaySubject<void>(1);

    observeOnDestroy(): Observable<void> {
        return this.onDestroy$.asObservable();
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}

export class OnInitMixin {
    onInit$ = new ReplaySubject<void>(1);

    observeOnInit(): Observable<void> {
        return this.onInit$.asObservable();
    }

    ngOnInit() {
        this.onInit$.next();
    }
}

export class OnChangesMixin {
    onChanges$ = new ReplaySubject<SimpleChanges>(1);

    observeOnChanges(): Observable<SimpleChanges> {
        return this.onChanges$.asObservable();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.onChanges$.next(changes);
    }
}