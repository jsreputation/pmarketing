import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';
import { PCatalogueState, IPCatalogues, IPPostCatalogue, IPPostCatalogueReponse } from '@perx/model';
import { Observable } from 'rxjs';
import { IPPutCatalog } from '@perx/model/dist/perx-model/lib/catalogues/catalogues';

export interface ICatloguesQuery {
  state?: PCatalogueState;
  search_string?: string;
  size?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CataloguesService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getCatalogues(query?: ICatloguesQuery): Observable<IPCatalogues> {
    const params: { [k: string]: string } = {};
    if (query) {
      Object.entries(query).forEach(([k, value]: [string, string]) => { params[k] = value; });
    }
    return this.http.get<IPCatalogues>(`${this.apiConfig.baseApiPath}/v4/dash/catalogs`, { params });
  }

  public postCatalogue(req: IPPostCatalogue): Observable<IPPostCatalogueReponse> {
    return this.http.post<IPPostCatalogueReponse>(`${this.apiConfig.baseApiPath}/v4/dash/catalogs`, req);
  }

  public putCatalog(req: IPPutCatalog): Observable<IPPostCatalogueReponse> {
    return this.http.put<IPPostCatalogueReponse>(`${this.apiConfig.baseApiPath}/v4/dash/catalogs/${req.id}`, req);
  }
}
