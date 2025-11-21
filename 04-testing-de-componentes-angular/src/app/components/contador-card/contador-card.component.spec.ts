import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorCardComponent } from './contador-card.component';

describe('ContadorCardComponent', () => {
  let component: ContadorCardComponent;
  let fixture: ComponentFixture<ContadorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContadorCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContadorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
