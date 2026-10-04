import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    async ngOnInit(): Promise<void> {
        const loggedIn = await this.authService.isLoggedIn();

        if (!loggedIn) {
            await this.router.navigate(['/auth']);
        }
    }

    async logout(): Promise<void> {
        await this.authService.signOut();
        await this.router.navigate(['/auth']);
    }
}