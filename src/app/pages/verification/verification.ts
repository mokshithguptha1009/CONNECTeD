import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile';

interface College {
  id: string;
  name: string;
  city: string;
  state: string;
}

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verification.html',
  styleUrl: './verification.scss'
})
export class Verification implements OnInit {

  colleges: College[] = [];

  selectedCollege = '';
  studentId = '';

  loading = false;
  loadingColleges = true;
  errorMessage = '';

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadColleges();
  }

  async loadColleges(): Promise<void> {

    this.loadingColleges = true;

    const { data, error } = await this.profileService.getColleges();

    this.loadingColleges = false;

    if (error) {
      console.error('COLLEGE LOAD ERROR:', error);
      this.errorMessage = 'Unable to load colleges.';
      return;
    }

    this.colleges = data ?? [];

    console.log('COLLEGES:', this.colleges);
  }

  async continueVerification(): Promise<void> {

    this.errorMessage = '';

    console.log('SELECTED COLLEGE:', this.selectedCollege);
    console.log('STUDENT ID:', this.studentId);

    if (!this.selectedCollege) {
      this.errorMessage = 'Please select your college.';
      return;
    }

    if (!this.studentId.trim()) {
      this.errorMessage = 'Please enter your student ID.';
      return;
    }

    this.loading = true;

    const { error } = await this.profileService.saveProfile(
      this.selectedCollege,
      this.studentId.trim()
    );

    this.loading = false;

    if (error) {
      console.error('PROFILE SAVE ERROR:', error);
      this.errorMessage = error.message;
      return;
    }

    console.log('PROFILE SAVED');

    await this.router.navigate(['/dashboard']);
  }
}