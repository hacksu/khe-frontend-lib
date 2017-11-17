
import { ApiWrapper } from '../src/index';
import { expect } from 'chai';
import AxiosInstanceMock from './mock-axios';

import 'mocha';

describe('ApiWrapper', () => {

    it('should login', () => {
        const mock = new AxiosInstanceMock();
        mock.setResponse({data: {}})
        const apiWrapper = new ApiWrapper('/var/www', 'test', mock);
        apiWrapper.login('hi', 'test');
        const request = mock.getLastRequest();
        expect(request).to.haveOwnProperty('config');
        if (request.config != undefined ) {
            expect(request.config.data).to.deep.equal({client: 'test', email: 'hi', password: 'test'});
        }

    });
});