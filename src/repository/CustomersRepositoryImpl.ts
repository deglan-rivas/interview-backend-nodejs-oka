import axios from 'axios';
import { CustomersRepository } from './CustomersRepository';
import { Customer } from '../domain/Customer';

type RandomUser = {
  id: {
    value: string;
  };
  name: {
    first: string;

    last: string;
  };
  gender: string;
};

export class CustomersRepositoryImpl implements CustomersRepository {
  async findByFilter(customer: Customer): Promise<Customer[]> {
    const result = await axios.get('https://randomuser.me/api/?results=100');
    if (!result?.data?.results) {
      return [];
    }

    let filteredCustomers = [...result.data.results]

    if (customer.name) {
      filteredCustomers = filteredCustomers.filter((item: RandomUser) =>
        item.name.first.toLowerCase().startsWith(customer.name!.toLowerCase())
      )
    }

    if (customer.lastName) {
      filteredCustomers = filteredCustomers.filter((item: RandomUser) =>
        item.name.last.toLowerCase().startsWith(customer.lastName!.toLowerCase())
      )
    }

    return filteredCustomers.map(
        (item: RandomUser) =>
          new Customer({
            id: item.id.value,
            name: item.name.first,
            lastName: item.name.last,
            gender: item.gender
          })
      );
  }
}
