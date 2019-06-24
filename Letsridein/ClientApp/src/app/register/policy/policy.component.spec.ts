import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { PolicyComponent } from './policy.component';

let component: PolicyComponent;
let fixture: ComponentFixture<PolicyComponent>;

describe('policy component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PolicyComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(PolicyComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
