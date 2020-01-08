const axios = require("axios").default;
const csv = require('csv-parser')
const fs = require('fs');

const client = axios.create({
  baseURL: "http://localhost:8080/v1alpha1/graphql",
  timeout: 1000,
  headers: {
    "x-hasura-access-key": "mylongsecretkey"
  }
});

const results = [];
 
const directionMap = {
  'E of': 'E',
  'N of': 'N',
  'S of': 'S',
  'W of': 'W',
};

fs.createReadStream('adt-2015-2015.csv')
.pipe(csv())
.on('data', (data) => results.push({
  cars: +data['TOTAL (Cars/Day)'],
  time: data['COUNT_DATE'],
  direction: directionMap[data['LegDir']],
  location: {
    type: 'Point',
    coordinates: [parseFloat(data['Lat']), parseFloat(data['Lng'])],
  }
}))
.on('end', async() => {
  console.log(results[0]);
  try {
    const response = await client.post("", {
      query: 'mutation insert_daily_traffic($objects: [daily_traffic_insert_input!]! ) {\
        insert_daily_traffic(objects: $objects) {\
          returning {\
            location\
            cars\
          }\
        }\
      }',
      variables: {
        objects: results
      }
    });    
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.error(error.response.data)
  }
});

