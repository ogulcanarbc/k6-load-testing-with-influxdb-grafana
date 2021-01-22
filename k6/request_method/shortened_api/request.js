import http from 'k6/http';

export function create_short_link(url) {

  let create_short_url_params = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  return http.post(`${__ENV.MY_HOSTNAME}/v2/shorten?url=` + url, create_short_url_params);
}

export function get_link_information(code) {

  let link_information_params = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  return http.post(`${__ENV.MY_HOSTNAME}/v2/info?code=` + code, link_information_params);
}
