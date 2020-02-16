import { TestBed } from '@angular/core/testing';

import { TypeExpenseService } from './type-expense.service';

describe('TypeExpenseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeExpenseService = TestBed.get(TypeExpenseService);
    expect(service).toBeTruthy();
  });
});
