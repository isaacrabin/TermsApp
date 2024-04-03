import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Identification, Selfie } from "../_models/types";

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  constructor(private http: HttpClient) {}

  public identification: Identification = {};
  public selfie: Selfie = {};
}
