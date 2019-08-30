// tslint:disable
export class User {
    public id: number;
    public type: string;
    public self: string;
    public urn: string;
    public created_at: string;
    public updated_at: string;
    public title: string;
    public first_name: string;
    public last_name: string;
    public phone_number: string;
    public email_address: string;
    public primary_identifier: string;
    constructor(data: IUser) {
      this.id = data.id;
      this.type = data.type;
      this.self = data.links.self;
      this.urn = data.attributes.urn;
      this.created_at = data.attributes.created_at;
      this.updated_at = data.attributes.updated_at;
      this.title = data.attributes.title;
      this.first_name = data.attributes.first_name;
      this.last_name = data.attributes.last_name;
      this.phone_number = data.attributes.phone_number;
      this.email_address = data.attributes.email_address;
      this.primary_identifier = data.attributes.primary_identifier;
    }
  }
  