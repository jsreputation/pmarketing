import { Injectable } from '@angular/core';
import { JsonApi, Spec } from '@muellerbbm-vas/grivet';
import { Observable } from 'rxjs';
import { IAnswer, Resource } from './answer.model';
import { EnvConfig } from '../shared/env-config';
import { SurveyComponent } from './survey.service';

export class AngularHttpContext implements JsonApi.Context {
  constructor(private readonly http: HttpClient, public readonly headers: HttpHeaders) {
    this.headers = headers.set('Accept', 'application/vnd.api+json');
  }

  async getDocument(url: URL): Promise<Spec.JsonApiDocument> {
    return this.http.get<Spec.JsonApiDocument>(url.href, { headers: this.headers }).toPromise();
  }

  async post(url: URL, body: any) {
    return this.http.post<Resource>(url.href, body, { headers: this.headers }).toPromise();
  }
}

@Injectable({
  providedIn: 'root'
})
export class V4SurveyService {
  context: AngularHttpContext;
  apiHost: string;

  constructor(@Optional() config: EnvConfig, protected http: HttpClient) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/vnd.api+json'
    });
    this.context = new AngularHttpContext(http, headers);
    if (config.env.force_path_style) {
      this.apiHost = config.env.apiHost + '/survey';
    } else {
      this.apiHost = 'https://survey.' + config.env.apiHost.split('//')[1];
    }
  }

  async fetchSurveys(id: string): Promise<JsonApi.Document> {
    return JsonApi.Document.fromURL(
      new URL(this.apiHost + `/campaigns/${id}?include=sections,sections.questions,sections.questions.choices`),
      this.context
    );
  }

  postResponse(campaignId: string) {
    return this.context.post(
      new URL(this.apiHost + `/responses`),
      {
        data: {
          type: 'responses',
          attributes: {
            campaign_id: campaignId
          }
        }
      }
    );
  }

  postAnswer(answer: Answer) {
    const content = (typeof answer.content === 'number') || (typeof answer.content === 'string') ? `${answer.content}` : undefined;
    const relationships = ((answer.content instanceof Array) && (answer.content.length > 0)) ? {
      choices: {
        data: answer.content.map(ans => ({
          type: 'choices',
          id: ans
        }))
      }
    } : undefined;
    return this.context.post(
      new URL(this.apiHost + `/answers`),
      {
        data: {
          type: 'answers',
          attributes: {
            response_id: answer.response_id,
            question_id: answer.question_id,
            content
          },
          relationships
        }
      }
    );
  }
}
