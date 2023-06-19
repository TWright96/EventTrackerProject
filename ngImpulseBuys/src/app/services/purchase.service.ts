import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purchase } from '../models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  url: string = environment.baseUrl + 'api/purchases';

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable <Purchase []>{
    return this. http.get<Purchase []>(this.url).pipe(
      catchError((err: any) => {
        console.error('Error fetching purchase list');
        return throwError(
          () => new Error('PurchaseService.index(): error retrieving purchase: ' + err)
        );
      })
    );
  }

create(purchase: Purchase): Observable<Purchase> {

  return this.http.post<Purchase>(this.url, purchase).pipe(
    catchError((err: any) => {
      console.error('Error fetching todo list');
      return throwError(
        () => new Error('PurchaseService.create(): error creating todo: ' + err)
      );
    })

  );

}

update(purchase: Purchase): Observable<Purchase> {
  return this.http.put<Purchase>(this.url + '/' + purchase.id, purchase).pipe(
    catchError((err: any) => {
      console.error('Error updating purchase');
      return throwError(
        () => new Error('PurchaseService.update(): error updating purchase: ' + err)
      );
    })

  );
}


show(purchase: Purchase): Observable<Purchase> {
  return this.http.get<Purchase>(this.url + '/' + purchase.id ).pipe(
    catchError((err: any) => {
      console.error('Error fetching purchase');
      return throwError(
        () => new Error('PurchaseService.show(): error fetching purchase: ' + err)
      );
    })
  );
}


destroy(purchaseId: number): Observable<void> {
  return this.http.delete<void>(this.url + '/' + purchaseId).pipe(
    catchError((err: any) => {
      console.error('Error deleting purchase');
      return throwError(
        () => new Error('PurchaseService.delete(): error deleting purchase: ' + err)
      );
    })

  );
}


}



