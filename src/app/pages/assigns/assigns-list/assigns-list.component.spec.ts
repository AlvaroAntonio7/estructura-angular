import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignsListComponent } from './assigns-list.component';

describe('AssignsListComponent', () => {
  let component: AssignsListComponent;
  let fixture: ComponentFixture<AssignsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
