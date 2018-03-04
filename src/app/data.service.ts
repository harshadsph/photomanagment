import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ImagePanel } from './imagepanel/ImagePanel';
import { IMAGEPANEL } from './imagepanel/mock-imagepanel';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NavbarServerData } from './navbar/NavbarServerData';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {


  private selectSalesCycleDataAPI = 'http://localhost:81/api/web/salescycle';  // URL to web api for selecting the salescycle
  // tslint:disable-next-line:max-line-length
  private selectSalesCampaignDataAPI = 'http://localhost:81/api/web/salescampaign?selectedSalesCycle='; // URL to web api for selecting the salescampaign based on salescycle
  private imagePanel = new BehaviorSubject<ImagePanel[]>(null);
  cast = this.imagePanel.asObservable();

  constructor(
    private http: HttpClient) { }

  getSearchResultRefresh() {
    // We will create API for fetching the Data from PHP Backend
    this.imagePanel.next(IMAGEPANEL);
  }

  /** GET All Select SalesCycle Data from the server */
  getSelectCycleData (): Observable<string[]> {
    return this.http.get<string[]>(this.selectSalesCycleDataAPI) .pipe(
      tap(selectSalesCycleData => this.log(`fetched Data`+selectSalesCycleData)),
      catchError(this.handleError('getall', []))
    );
  }

    /** GET All Select SalesCycle Data from the server */
    getSelectCampaignData (selectedSalesCycle): Observable<string[]> {
      return this.http.get<string[]>(this.selectSalesCampaignDataAPI+selectedSalesCycle) .pipe(
        tap(selectSalesCampaignData => this.log(`fetched Data`+selectSalesCampaignData)),
        catchError(this.handleError('getall', []))
      );
    }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('DataServices: ' + message);
  }
}
