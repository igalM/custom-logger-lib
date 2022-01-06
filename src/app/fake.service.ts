import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class FakeService {
    constructor(private http: HttpClient) { }
    getData(): Observable<any> {
        return this.http.get('fake url');
    }
}