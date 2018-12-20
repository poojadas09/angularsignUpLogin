import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { error } from 'util';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    register(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
        return true;
        // return this.http.post(`http://localhost:4000/users/register`, user);
    }
    login(username: any, password: string) {
        const userdata = JSON.parse(localStorage.getItem('user'));
        if (userdata.username === username || userdata.mobile === username || userdata.email === username) {
            if (userdata.password === password) {
                localStorage.setItem('currentUser', JSON.stringify(userdata));
                return true;
            } else {
            return false;
            }
        } else {
            return false;
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
