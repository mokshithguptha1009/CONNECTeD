import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private supabase: ReturnType<SupabaseService['getClient']>;

  constructor(private supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getClient();
  }

  async getColleges() {
    return await this.supabase
      .from('colleges')
      .select('id, name, city, state')
      .order('name');
  }

  async saveProfile(
    collegeId: string,
    studentId: string
  ) {

    const {
      data: {
        user
      }
    } = await this.supabase.auth.getUser();

    if (!user) {
      return {
        data: null,
        error: new Error('User is not logged in.')
      };
    }

    return await this.supabase
      .from('profiles')
      .upsert({
        id: user.id,
        college_id: collegeId,
        student_id: studentId,
        verification_status: 'pending'
      });
  }
}