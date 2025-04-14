import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersService } from '../service/CustomersService';
import { Customer } from '../domain/Customer';

export class CustomersController {
  constructor(private service: CustomersService) {}

  async findByFilter(event: APIGatewayProxyEvent) {
    // if (!event.queryStringParameters?.name) {
      // return this.apiResponseBadRequestError();
      // no viene name
    // }

    let name: string | undefined;
    let lastname: string | undefined;
    let gender: string | undefined;
    
    if (event.queryStringParameters?.name) {
      name = event.queryStringParameters!.name;
    }

    if (event.queryStringParameters?.lastname) {
      lastname = event.queryStringParameters!.lastname;
    }

    if (event.queryStringParameters?.gender) {
      gender = event.queryStringParameters!.gender;
    }

    // const { name, lastname } = event.queryStringParameters;

    return this.apiResponseOk(
      await this.service.findByFilter(new Customer({ name, lastName: lastname, gender }))
    );
  }

  apiResponseBadRequestError() {
    return {
      statusCode: 400,
      isBase64Encoded: false,
    };
  }

  apiResponseOk(customers: Customer[]) {
    return {
      statusCode: 200,
      isBase64Encoded: false,
      body: JSON.stringify(customers),
    };
  }
}
