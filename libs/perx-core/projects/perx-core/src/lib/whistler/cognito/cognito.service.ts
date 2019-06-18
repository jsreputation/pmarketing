import {Injectable, Optional} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';

export class EnvConfig {
  // defaults
  env = {
    apiHost: 'localhost:3000',
    production: false,
    preAuth: false,
    preAuthPath: '/preauth',
  };
}

class Response {
  payload: string;
}

@Injectable({
  providedIn: 'root'
})
export class CognitoService {


  apiHost: string;
  preAuthEndpoint: string;
  isAuthenticated: boolean;

  constructor(@Optional() config: EnvConfig, private http: HttpClient) {
    this.apiHost = config.env.apiHost;
    this.isAuthenticated = false;
    if (!config.env.production) {
      this.preAuthEndpoint = 'http://localhost:4000' + config.env.preAuthPath;
    } else {
      this.preAuthEndpoint = config.env.preAuthPath;
    }
  }

  authenticateAppWithPreAuth(referrer: string) {

    return this.http.get(this.preAuthEndpoint, {
      params: {
        url: referrer
      },
      observe: 'response'
    });
  }

  authenticateUserIdWithAppBearer(bearer: string, user: string) {
    const payload = {
      data: {
        type: 'login',
        attributes: {
          primary_identifier: user,
        }
      }
    };
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/vnd.api+json',
          Authorization: bearer
        })
    };
    return this.http.post(this.apiHost + '/cognito/login', payload, {
      headers: httpOptions.headers,
      observe: 'response'
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
