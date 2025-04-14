import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersController } from '../CustomersController';
import { CustomersService } from '../../service/CustomersService';

describe('CustomersController', () => {
  describe('findByFilter', () => {
    it('should return customers - filtered by name', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              email: 'email',
            },
          ])
        ),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          name: 'A',
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: '[{"id":"customerId","name":"name","lastName":"lastName","email":"email"}]',
      });
      expect(service.findByFilter).toBeCalledWith(expect.objectContaining({
        name: 'A',
      }));
    });

    it('should return customers - filtered by lastname', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              email: 'email',
            },
          ])
        ),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          lastname: 'B',
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: '[{"id":"customerId","name":"name","lastName":"lastName","email":"email"}]',
      });
      expect(service.findByFilter).toBeCalledWith(expect.objectContaining({
        lastName: 'B',
      }));
    });

    it('should return customers - filtered by name and lastname', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              email: 'email',
            },
          ])
        ),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          name: 'A',
          lastname: 'B'
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: '[{"id":"customerId","name":"name","lastName":"lastName","email":"email"}]',
      });
      expect(service.findByFilter).toBeCalledWith(expect.objectContaining({
        name: 'A',
        lastName: 'B'
      }));
    });

    it('should return customers - no filter', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              email: 'email',
            },
          ])
        ),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: '[{"id":"customerId","name":"name","lastName":"lastName","email":"email"}]',
      });
      expect(service.findByFilter).not.toBeCalledWith({
        name: 'A',
      });
      expect(service.findByFilter).not.toBeCalledWith({
        lastname: 'B',
      });
    });
  });
});
