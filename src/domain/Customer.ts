export class Customer {
  id?: string;

  name?: string;

  lastName?: string;

  email?: string;

  gender?: string;

  constructor(data?: Partial<Customer>) {
    if (data) {
      if (data.id !== undefined) this.id = data.id;
      if (data.name !== undefined) this.name = data.name;
      if (data.lastName !== undefined) this.lastName = data.lastName;
      if (data.email !== undefined) this.email = data.email;
      if (data.gender !== undefined) this.gender = data.gender;
    }
  }
}
