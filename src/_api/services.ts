import mockServices from 'utils/mockServices';
import { services } from 'data/services';

import { KeyedObject } from 'types/services';

mockServices.onGet('/api/services/list').reply(200, { services });

mockServices.onPost('/api/services/filter').reply((config) => {
  try {
    const { filter } = JSON.parse(config.data);

    const results = services.filter((service: KeyedObject) => {
      let searchMatches = true;
      if (filter.search) {
        const properties = ['name'];
        let containsQuery = false;
        properties.forEach((property) => {
          if (service[property] && service[property].toString().toLowerCase().includes(filter.search.toString().toLowerCase())) {
            containsQuery = true;
          }
        });
        if (!containsQuery) {
          searchMatches = false;
        }
      }
      return searchMatches;
    });
    return [200, results];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});
