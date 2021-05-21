
export interface IQuest  {
    id: number;
    campaignId: number;
    userAccountId: number;
    state?: string;
    completedAt?: Date;
    completedTasks?: IQuestTask[];
  }
export interface IQuestTask {
  id: number;
  campaignId?: number;
  ordering?: number;
  state?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export enum QuestState {
  inProgress = 'in_progress',
  completed = 'completed',
  inactive = 'inactive'
}
