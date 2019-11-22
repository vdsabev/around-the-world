import tabletop from 'tabletop';
import { toObjectWithLngLat, toObjectWithRenamedKeys } from './utils';

const spreadsheetUrl = process.env.REACT_APP_GOOGLE_SPREADSHEET_URL;
const spreadsheetColumns = JSON.parse(
  process.env.REACT_APP_GOOGLE_SPREADSHEET_COLUMNS
);

const services = {
  async getPeople() {
    const data = await tabletop.init({
      key: spreadsheetUrl,
      simpleSheet: true,
      parseNumbers: true,
    });

    const people = data
      .map(toObjectWithRenamedKeys(spreadsheetColumns))
      .map(toObjectWithLngLat);

    return people;
  },
};

export default services;
