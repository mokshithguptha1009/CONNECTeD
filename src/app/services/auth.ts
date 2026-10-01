import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private supabase: ReturnType<SupabaseService['getClient']>;

    constructor(private supabaseService: SupabaseService) {
        this.supabase = this.supabaseService.getClient();
    }

    async signUp(email: string, password: string) {
        return await this.supabase.auth.signUp({
            email,
            password
        });
    }

    async signIn(email: string, password: string) {
        return await this.supabase.auth.signInWithPassword({
            email,
            password
        });
    }

    async signOut() {
        return await this.supabase.auth.signOut();
    }

    async getCurrentUser() {
        const { data } = await this.supabase.auth.getUser();
        return data.user;
    }
}