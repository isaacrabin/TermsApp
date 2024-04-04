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
      return this.http.post(this.baseUrl + '/identity-doc-front', payload,{ headers: {'descriptor':'bb4c5ae1-4ef8-4e96-acc2-a2579640b348' }});
    }

    saveBackIDImage(payload: any): Observable<any> {
      const boundary = this.generateBoundary();
      return this.http.post(this.baseUrl + '/identity-doc-back', payload,{ headers: {'descriptor':'bb4c5ae1-4ef8-4e96-acc2-a2579640b348' }});
    }

    saveSignatureImage(payload: any): Observable<any> {
      return this.http.post(this.baseUrl + '/applicant-photo', payload,{ headers: {'descriptor':'bb4c5ae1-4ef8-4e96-acc2-a2579640b348' }});
    }

    saveSelfieImage(payload: any): Observable<any> {
      return this.http.post(this.baseUrl + '/applicant-photo', payload,{ headers: {'descriptor':'bb4c5ae1-4ef8-4e96-acc2-a2579640b348' }});
    }

   generateBoundary() {
      return "----" + new Date().getTime().toString(32);
    }
}
