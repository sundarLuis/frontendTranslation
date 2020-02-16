import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeExpensesComponent } from './type-expenses.component';

describe('TypeExpensesComponent', () => {
  let component: TypeExpensesComponent;
  let fixture: ComponentFixture<TypeExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
