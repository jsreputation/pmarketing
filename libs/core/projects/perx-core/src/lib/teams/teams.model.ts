
export interface ITeam {
  id: number;
  campaignId: number;
  invitationCode: string;
  state: TeamState;
  joinedMembersCount: number;
}

export enum TeamState {
  inProgress = 'in_progress',
  completed = 'completed'
}
