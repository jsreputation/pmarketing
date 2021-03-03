import { Injectable } from '@angular/core';
import { IQuestService } from './quest.service';
import { IQuest, IQuestTask } from './quest.model';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IConfig } from '../config/models/config.model';
import { ConfigService } from '../config/config.service';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class V4QuestService implements IQuestService {
  private hostName: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.hostName = config.apiHost as string;
      });
  }

  public  getQuestFromCampaign(campaignId: number): Observable<IQuest[]> {

    if (!campaignId) {
      return throwError('Invalid campaign Id');
    }

    return this.http.get<IV4QuestsResponse>(`${this.hostName}/v4/campaigns/${campaignId}/user_quests`)
      .pipe(
        map(res => res.data),
        map((quests: IV4Quest[]) => quests.map(quest => V4QuestService.v4QuestToQuest(quest))));
  }

  public  getQuestTasks(campaignId: number): Observable<IQuestTask[]> {

    if (!campaignId) {
      return throwError('Invalid campaign Id');
    }

    return this.http.get<IV4QuestTaskResponse>(`${this.hostName}/v4/campaigns/${campaignId}/quest_tasks?state=active`)
      .pipe(
        map(res => res.data),
        map((tasks: IV4QuestTask[]) => tasks.map(task => V4QuestService.v4QuestTaskToQuestTask(task))));
  }

  public  getQuestProgress(questId: number): Observable<IQuest> {

    return this.http.get<IV4QuestResponse>(`${this.hostName}/v4/user_quests/${questId}`)
      .pipe(
        map(res => res.data),
        map((quest: IV4Quest) => V4QuestService.v4QuestToQuest(quest)));
  }


  public  postEnrollQuest(campaignId: number): Observable<boolean> {
    return this.http.post(`${this.hostName}/v4/campaigns/${campaignId}/enrol`, null, {observe : 'response'} ).pipe(
      map((response: HttpResponse<any>) => response.status === 200 ? true : false ) ,
      catchError((error: HttpErrorResponse) => error.status === 404 ? of(false) : throwError(error)));
  }

   private static v4QuestToQuest(quest: IV4Quest): IQuest {

    const questTasks =  quest.completed_tasks && quest.completed_tasks.map(task => V4QuestService.v4QuestTaskToQuestTask(task));
    return {
      id: quest.id,
      campaignId: quest.campaign_id,
      userAccountId: quest.user_account_id,
      state: quest.state,
      completedAt: quest.completed_at ? new Date(quest.completed_at) : undefined,
      completedTasks: questTasks,
    };
  }

  private static v4QuestTaskToQuestTask(task: IV4QuestTask): IQuestTask {

    const taskId = task.quest_task_id ? task.quest_task_id : task.id;

    return {
      id: taskId,
      campaignId: task.campaign_id,
      ordering: task.ordering,
      state: task.state,
      title: task.display_properties ?  task.display_properties.title : '',
      description: task.display_properties ?  task.display_properties.description : '',
      imageUrl: (task.display_properties && task.display_properties.image) ?  task.display_properties.image.value.image_url
      || task.display_properties.image.value.file  : ''
    };
  }
}

export interface IV4Quest {
  id: number;
  campaign_id: number;
  completed_at?: string;
  state: string;
  user_account_id: number;
  completed_tasks?: IV4QuestTask[];
}

export interface IV4QuestTask {
  id: number;
  quest_task_id?: number;
  campaign_id?: number;
  user_account_id?: number;
  user_quest_id?: number;
  ordering?: number;
  redeemed_at?: string;
  state?: string;
  display_properties?: QuestTaskDisplayProperties;
}

export interface IV4QuestsResponse {
  data: IV4Quest[];
  meta: {
    count: number;
  };
}

export interface IV4QuestResponse {
  data: IV4Quest;
  meta: {
    count: number;
  };
}

export interface IV4QuestTaskResponse {
  data: IV4QuestTask[];
  meta: {
    count: number;
  };
}

export interface QuestDisplayProperties {
  header?: {
    type: string;
    value: {
      title: string;
      description: string;
    }
  };
  body?: string;
  image?: Asset;
  quest_success_image?: Asset;
}

export interface QuestTaskDisplayProperties {
  title: string;
  description: string;
  image?: Asset;
}
export interface Asset {
  type: string;
  value: {
    file: string;
    filename: string;
    image_id: number;
    image_url: string;
  };
}
