import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  baseUrl = environment.baseUrl;
  userId: any = sessionStorage.getItem("userId");

  constructor(private http: HttpClient){

  }

    // Save Images
    saveFrontIDImage(payload: any): Observable<any> {
      return this.http.post(this.baseUrl + '/identity-doc-front', payload,{ headers: {'descriptor': this.userId }});
    }

    saveBackIDImage(payload: any): Observable<any> {
      const boundary = this.generateBoundary();
      return this.http.post(this.baseUrl + '/identity-doc-back', payload,{ headers: {'descriptor': this.userId }});
    }

    saveSignatureImage(payload: any): Observable<any> {
      return this.http.post(this.baseUrl + '/applicant-photo', payload,{ headers: {'descriptor': this.userId }});
    }

    saveSelfieImage(payload: any): Observable<any> {
      return this.http.post(this.baseUrl + '/applicant-photo', payload,{ headers: {'descriptor': this.userId }});
    }

   generateBoundary() {
      return "----" + new Date().getTime().toString(32);
    }
}
