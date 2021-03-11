import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jivoxData } from '../assets/jivox';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private result = new BehaviorSubject<any>(null);

  constructor() {
    this.result.next(jivoxData.data);
  }

  getData(): Observable<any> {
    return this.result.asObservable();
  }
}
