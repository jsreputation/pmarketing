export interface IOutcome {
  id?: string;
  resultId?: number;
  resultType?: string;
  probability?: number;
  slotNumber?: number | null;
  limit?: number | null;
}
