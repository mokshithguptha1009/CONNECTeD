import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import { SupabaseService } from './supabase';

describe('AuthService', () => {

  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        SupabaseService
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});