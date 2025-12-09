import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserData {
  name: string;
  age: string;
  phoneNo: string;
  _id: string;
  _v : 0
}


@Injectable({
  providedIn: 'root',
})
export class Product {
  constructor(private http: HttpClient) {

  }
  getDatabase() {
    const url = `http://127.0.0.1:3000/api/v1`
    return this.http.get<{ status: string, data: UserData[] }>(url);
  }

  getData(id: string) {
    const url = `http://127.0.0.1:3000/api/v1/${id}`
    return this.http.get<{ status: string, data: UserData }>(url);
  }

  createData(data: {}) {
    const url = `http://127.0.0.1:3000/api/v1`;
    return this.http.post<{ status: string, data: UserData[] }>(url, data);
  }

  updateData(data: {}, id: string) {
    const url = `http://127.0.0.1:3000/api/v1/${id}`
    return this.http.patch<{ status: string, data: UserData[] }>(url, data);
  }

  deleteData(id: string) {
    const url = `http://127.0.0.1:3000/api/v1/${id}`
    return this.http.delete<{ status: string, data: UserData[] }>(url);
  }

}