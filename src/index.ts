import { Subject, Observable } from "rxjs";
import { SimpleChanges } from "@angular/core";

export class OnDestroyMixin {
    ngOnDestroyObservable: Observable<void> = new Subject<void>();
    ngOnDestroy() {
        (this.ngOnDestroyObservable as Subject<void>).next();
    }
}

export class OnInitMixin {
    ngOnInitObservable: Observable<void> = new Subject<void>();
    ngOnInit() {
        (this.ngOnInitObservable as Subject<void>).next();
        (this.ngOnInitObservable as Subject<void>).complete();
    }
}

export class OnChangesMixin {
    ngOnSimpleChangesObservable: Observable<SimpleChanges> = new Subject<SimpleChanges>();

    ngOnChanges(changes: SimpleChanges) {

    }
}