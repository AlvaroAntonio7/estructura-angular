import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignsDetailComponent } from './assigns-detail.component';

describe('AssignsDetailComponent', () => {
  let component: AssignsDetailComponent;
  let fixture: ComponentFixture<AssignsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignsDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
