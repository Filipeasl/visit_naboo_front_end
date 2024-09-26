import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NabooComponent } from './naboo.component';

describe('NabooComponent', () => {
  let component: NabooComponent;
  let fixture: ComponentFixture<NabooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NabooComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NabooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
