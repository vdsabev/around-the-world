import { useEffect, useState } from 'react';
import { toLngLatObject } from '../utils';
import services from './services';

export const useGetPeople = () => {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    services
      .getPeople()
      .then((data) => data.map(toLngLatObject))
      .then(setPeople);
  }, []);

  return people;
};
