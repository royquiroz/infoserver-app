import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ServersService {
  url = "http://35.169.118.220:82/v1/api/server";

  constructor(private http: HttpClient) {
    console.log("Servers Service Listo");
  }

  data(): Observable<any> {
    return this.http.get(this.url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  dataId(id): Observable<any> {
    return this.http.get(`${this.url}/${id}`).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
