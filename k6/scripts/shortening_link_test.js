import {create_short_link, get_link_information} from "../request_method/shortened_api/request.js";
import {Rate} from 'k6/metrics';
import {check} from 'k6';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

export let errorRate = new Rate('errors');
export let options = {
  thresholds: {
    errors: ['rate<0.1'], // <10% errors
  },
};

const urls = papaparse.parse(open('./data/csv/url.csv'), {header: true}).data;

export function setup() {
  console.log("Test started...")
}

export default function () {

  let randomUrl = {
    url: urls[Math.floor(Math.random() * urls.length)]
  };

  let short_link_response = create_short_link(JSON.stringify(randomUrl.url));
  let code = short_link_response.json('result.code');

  const short_link_result = check(short_link_response, {
    'status is 201': (r) => r.status === 201,
  });

  let information_response = get_link_information(code);
  const information_result = check(information_response, {
    'status is 200': (r) => r.status === 200,
  });

  errorRate.add(!short_link_result);
  errorRate.add(!information_result);
}

export function tearDown() {
  console.log("Test ended...")
}

