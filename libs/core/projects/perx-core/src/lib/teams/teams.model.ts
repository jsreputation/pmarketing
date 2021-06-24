
export interface ITeam {
  id: number;
  campaignId: number;
  invitationCode: string;
  state: TeamState;
}

export enum TeamState {
  inProgress = 'in_progress'
}
