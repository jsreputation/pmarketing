declare interface IAMGroup {
  id: string;
  type: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
  };
}
