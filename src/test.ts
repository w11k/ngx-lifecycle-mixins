import { OnDestroyMixin, OnInitMixin, OnAfterViewChecked, OnAfterViewInitMixin, OnAfterContentChecked, OnAfterContentInit, OnChangesMixin } from ".";
import { SimpleChanges } from "@angular/core";
import { assert } from "chai";

const NOOP = () => { };

describe("Mixin", () => {
    [
        {
            name: "OnDestroyMixin",
            lifecycle: "ngOnDestroy",
            observeName: "observeOnDestroy",
            instance: new OnDestroyMixin()
        },
        {
            name: "OnInitMixin",
            lifecycle: "ngOnInit",
            observeName: "observeOnInit",
            instance: new OnInitMixin()
        },
        {
            name: "OnAfterViewChecked",
            lifecycle: "ngAfterViewChecked",
            observeName: "observeAfterViewChecked",
            instance: new OnAfterViewChecked()
        },
        {
            name: "OnAfterViewInitMixin",
            lifecycle: "ngAfterViewInit",
            observeName: "observeOnAfterViewInit",
            instance: new OnAfterViewInitMixin()
        },
        {
            name: "OnAfterContentChecked",
            lifecycle: "ngAfterContentChecked",
            observeName: "observeOnAfterContentChecked",
            instance: new OnAfterContentChecked()
        },
        {
            name: "OnAfterContentInit",
            lifecycle: "ngAfterContentInit",
            observeName: "observeOnAfterContentInit",
            instance: new OnAfterContentInit()
        },
    ].forEach(x => {
        it(`${x.name} should emit and complete after lifecycle is called`, () => {
            let isCompleted = false;
            let wasCalled = false;

            (x.instance as any)[x.observeName]().subscribe(
                () => wasCalled = true,
                NOOP,
                () => isCompleted = true
            );

            (x.instance as any)[x.lifecycle]();
            assert.isTrue(wasCalled);
            assert.isTrue(isCompleted);
        });
    });

    it("OnChangesMixin should emit every time onChanges is called and do not complete on its own", () => {
        const onChangesMixin = new OnChangesMixin();
        let isCompleted = false;
        const valuesFromOnChangesMixin: SimpleChanges[] = [];

        const changesOne: SimpleChanges = { foo: {isFirstChange: () => true, previousValue: undefined, currentValue: "foo", firstChange: true} };
        const changesTwo: SimpleChanges = { foo: {isFirstChange: () => false, previousValue: "foo", currentValue: "bar", firstChange: false} };
        const changesThree: SimpleChanges = { foo: {isFirstChange: () => false, previousValue: "bar", currentValue: "baz", firstChange: false} };

        onChangesMixin.observeOnChanges().subscribe(
            changes => valuesFromOnChangesMixin.push(changes),
            NOOP,
            () => isCompleted = true,
        );

        onChangesMixin.ngOnChanges(changesOne);
        onChangesMixin.ngOnChanges(changesTwo);
        onChangesMixin.ngOnChanges(changesThree);

        assert.deepEqual(valuesFromOnChangesMixin, [changesOne, changesTwo, changesThree]);
        assert.isFalse(isCompleted);

        // tear down test
        (onChangesMixin as any).onChanges$.complete();
        assert.isTrue(isCompleted);
    });


});