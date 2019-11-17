import tabletop from 'tabletop';

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

    const people = data.map((row) =>
      Object.keys(spreadsheetColumns).reduce((mappedRow, originalColumn) => {
        const renamedColumn = spreadsheetColumns[originalColumn];
        return {
          ...mappedRow,
          [renamedColumn]: row[originalColumn],
        };
      }, {})
    );

    return people;
  },
};

export default services;
