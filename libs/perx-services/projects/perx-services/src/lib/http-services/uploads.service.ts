import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';
import { Observable } from 'rxjs';
import { IPFtpUploads } from '@perxtech/model';

export interface IFtpFileImportsQuery {
  search_string?: string;
  size?: number;
  page?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UploadsService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getFtpFileImports(query: IFtpFileImportsQuery): Observable<IPFtpUploads> {
    const params: { [k: string]: string } = {};
    if (query) {
      Object.entries(query).forEach(([k, v]: [string, string | number]) => params[k] = `${v}`);
    }
    return this.http.get<IPFtpUploads>(`${this.apiConfig.baseApiPath}/v4/dash/ftp_file_imports`, { params });
  }
}
