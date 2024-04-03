import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient){

  }

    // Save Images
    saveFrontIDImage(payload: any): Observable<any> {
      const formData = new FormData();
      for (const key in payload) {
        if (payload) {
          formData.append(key, payload[key]);
        }
      }
      return this.http.post(this.baseUrl + '/identity-doc-front', formData,{ headers: { 'Content-Type': 'multipart/form-data','descriptor':'bb4c5ae1-4ef8-4e96-acc2-a2579640b348' }});
    }

    saveBackIDImage(payload: any): Observable<any> {
      return this.http.post(this.baseUrl + '/identity-doc-back', payload,{ headers: { 'Content-Type': 'multipart/form-data','descriptor':'bb4c5ae1-4ef8-4e96-acc2-a2579640b348' }});
    }

    saveSignatureImage(payload: any): Observable<any> {
      const formData = new FormData();
      for (const key in payload) {
        if (payload) {
          formData.append(key, payload[key]);
        }
      }
      return this.http.post(this.baseUrl + '/applicant-photo', formData);
    }
}
