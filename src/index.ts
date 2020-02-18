import { ReplaySubject, Observable } from "rxjs";
import { 
    SimpleChanges, 
    OnDestroy, 
    OnInit, 
    OnChanges, 
    AfterViewInit, 
    AfterViewChecked,
    AfterContentChecked,
    AfterContentInit 
} from "@angular/core";

export class OnDestroyMixin implements OnDestroy {
    private onDestroy$ = new ReplaySubject<void>(1);

    observeOnDestroy(): Observable<void> {
        return this.onDestroy$.asObservable();
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}

export class OnInitMixin implements OnInit {
    private onInit$ = new ReplaySubject<void>(1);

    observeOnInit(): Observable<void> {
        return this.onInit$.asObservable();
    }

    ngOnInit() {
        this.onInit$.next();
        this.onInit$.complete();
    }
}

export class OnChangesMixin implements OnChanges {
    private onChanges$ = new ReplaySubject<SimpleChanges>(1);

    observeOnChanges(): Observable<SimpleChanges> {
        return this.onChanges$.asObservable();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.onChanges$.next(changes);
    }
}

export class OnAfterViewChecked implements AfterViewChecked {
    private onAfterViewChecked$ = new ReplaySubject<void>(1);

    observeAfterViewChecked() : Observable<void> {
        return this.onAfterViewChecked$.asObservable();
    }

    ngAfterViewChecked() {
        this.onAfterViewChecked$.next();
        this.onAfterViewChecked$.complete();
    }
}

export class OnAfterViewInitMixin implements AfterViewInit {
    private onAfterViewInit$ = new ReplaySubject<void>(1);

    observeOnAfterViewInit() : Observable<void> {
        return this.onAfterViewInit$.asObservable();
    }

    ngAfterViewInit() {
        this.onAfterViewInit$.next();
        this.onAfterViewInit$.complete();
    }
}

export class OnAfterContentChecked implements AfterContentChecked {
    private onAfterContentChecked$ = new ReplaySubject<void>(1);

    observeOnAfterContentChecked() : Observable<void> {
        return this.onAfterContentChecked$.asObservable();
    }

    ngAfterContentChecked() {
        this.onAfterContentChecked$.next();
        this.onAfterContentChecked$.complete();
    }
}

export class OnAfterContentInit implements AfterContentInit {
    private onAfterContentInit$ = new ReplaySubject<void>(1);

    observeOnAfterContentInit() : Observable<void> {
        return this.onAfterContentInit$.asObservable();
    }

    ngAfterContentInit() {
        this.onAfterContentInit$.next();
        this.onAfterContentInit$.complete();
    }
}