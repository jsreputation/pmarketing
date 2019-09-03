declare interface IUserApi {
    id: number;
    type: string;
    links: {
        self: string;
    };
    attributes: {
        urn: string;
        created_at: string;
        updated_at: string;
        title: string;
        first_name: string;
        last_name: string;
        phone_number: string;
        email_address: string;
        primary_identifier: string;
        properties: {},
    };
}
