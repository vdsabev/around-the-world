import { useEffect, useState } from 'react';
import services from './services';

export const useGetPeople = () => {
  const [people, setPeople] = useState();
  useEffect(() => {
    services.getPeople().then((data) => setPeople(data));
  }, []);

  return people || [];
};
