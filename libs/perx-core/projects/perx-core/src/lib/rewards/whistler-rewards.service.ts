import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RewardsService } from './rewards.service';
import { Observable, combineLatest, of } from 'rxjs';
import { IReward, ICatalog, IPrice, RedemptionType } from './models/reward.model';
import { Config } from '../config/config';
import { IJsonApiItemPayload, IJsonApiItem, IJsonApiListPayload } from '../jsonapi.payload';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { IMerchant } from '../merchants/models/merchants.model';
import { IMerchantsService } from '../merchants/imerchants.service';
import { IRewardEntityAttributes } from '@perx/whistler';

interface IWMetaData {
  totalPages?: number;
  currentPage?: number;
}
@Injectable({
  providedIn: 'root'
})
export class WhistlerRewardsService implements RewardsService {
  private baseUrl: string;

  constructor(private http: HttpClient, config: Config, private merchantService: IMerchantsService) {
    this.baseUrl = `${config.apiHost}/reward/entities`;
  }

  private static WRedemptionToRT(rt: string): RedemptionType {
    if (rt === 'Promo Code') {
      return RedemptionType.txtCode;
    }
    if (rt === 'QR Code') {
      return RedemptionType.qr;
    }
    return RedemptionType.none;
  }

  private static WRewardToReward(r: IJsonApiItem<IRewardEntityAttributes>, merchant: IMerchant | null, metaData?: IWMetaData): IReward {
    return {
      // @ts-ignore
      id: (typeof r.id) === 'string' ? Number.parseInt(r.id, 10) : r.id,
      name: r.attributes.name,
      description: r.attributes.description,
      subtitle: '',
      validFrom: new Date(r.attributes.created_at),
      validTo: null,
      rewardThumbnail: r.attributes.image_url,
      rewardBanner: r.attributes.image_url,
      merchantId: Number.parseInt(r.attributes.organization_id, 10),
      merchantImg: merchant && merchant.images.length > 0 ? merchant.images[0].url : null,
      merchantName: merchant ? merchant.name : null,
      rewardPrice: [],
      termsAndConditions: r.attributes.terms_conditions,
      // howToRedeem: r.attributes.redemption_type,
      redemptionText: ('redemption_text' in r.attributes.display_properties) ? r.attributes.display_properties.redemption_text : null,
      categoryTags: [
        {
          id: 0,
          title: r.attributes.category
        }
      ],
      redemptionType: WhistlerRewardsService.WRedemptionToRT(r.attributes.redemption_type),
      rawPayload: metaData
    };
  }

  // @ts-ignore
  public getAllRewards(tags?: string[], categories?: string[]): Observable<IReward[]> {
    return new Observable(subject => {
      let current: IReward[] = [];
      let meta: IWMetaData = { currentPage: 1 };
      // we do not want to get all pages in parallel, so we get pages one after the other in order not to dos the server
      const process = (res: IReward[]) => {
        meta = res[0].rawPayload;
        current = current.concat(res);
        subject.next(current);
        // if finished close the stream
        if (meta.currentPage >= meta.totalPages) {
          subject.complete();
        } else {
          // otherwise get next page
          this.getRewards(meta.currentPage + 1, undefined, tags, categories)
            .subscribe(process);
        }
      };
      // do the first query
      this.getRewards(1, undefined, tags, categories).subscribe(process);
    });
  }

  // @ts-ignore
  public getRewards(
    page: number,
    pageSize: number = 10,
    tags?: string[],
    categories?: string[],
  ): Observable<IReward[]> {
    const tagsString = tags && tags.join(',');
    const categoriesString = categories && categories.join(',');
    let metaData: IWMetaData = {};
    const params = {
      'page[number]': page.toString(),
      'page[size]': pageSize.toString()
    };
    if (tagsString) {
      params['filter[tags]'] = tagsString;
    }
    if (categoriesString) {
      params['filter[category]'] = categoriesString;
    }

    return this.http.get<IJsonApiListPayload<IRewardEntityAttributes>>(`${this.baseUrl}`,
      {
        params
      }
    ).pipe(
      tap((res: IJsonApiListPayload<IRewardEntityAttributes>) => {
        metaData = {
          currentPage: page,
          totalPages: res.meta && res.meta.page_count
        };
      }),
      map(res => {
        const merchantIds: { [k: number]: boolean } = {};
        res.data.forEach((r) => !!r.attributes.organization_id && (merchantIds[r.attributes.organization_id] = true));
        return { rewards: res.data, mIds: Object.keys(merchantIds) };
      }),
      switchMap(
        (obj) => combineLatest(
          of(obj.rewards),
          combineLatest(...obj.mIds.map(id => this.merchantService.getMerchant(Number.parseInt(id, 10))))
        )
      ),
      map(([rewards, merchants]: [IJsonApiItem<IRewardEntityAttributes>[], IMerchant[]]) => rewards.map(
          r => WhistlerRewardsService.WRewardToReward(
            r,
            merchants.find(m => m.id === Number.parseInt(r.attributes.organization_id, 10)),
            metaData
          )
        )
      )
    );
  }

  // @ts-ignore
  public getReward(id: number, userId?: string): Observable<IReward> {
    return this.http.get<IJsonApiItemPayload<IRewardEntityAttributes>>(`${this.baseUrl}/${id}`)
      .pipe(
        switchMap((reward: IJsonApiItemPayload<IRewardEntityAttributes>) => {
          if (reward.data.attributes.organization_id === null) {
            return of([reward, null]);
          }
          return combineLatest(
            of(reward),
            this.merchantService.getMerchant(Number.parseInt(reward.data.attributes.organization_id, 10))
              .pipe(catchError(() => of(null)))
          );
        }),
        map(([reward, merchant]: [IJsonApiItemPayload<IRewardEntityAttributes>, IMerchant | null]) =>
          WhistlerRewardsService.WRewardToReward(reward.data, merchant))
      );
  }

  // @ts-ignore
  public getRewardPricesOptions(id: number): Observable<IPrice[]> {
    throw new Error('Method not implemented.');
  }

  public getAllCatalogs(): Observable<ICatalog[]> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public getCatalogs(page: number, pageSize: number): Observable<ICatalog[]> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public getCatalog(id: number): Observable<ICatalog> {
    throw new Error('Method not implemented.');
  }
}
