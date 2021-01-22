**Required Installation**

    Docker Deamon

**How to Run a Test?**

`vus` and `duration` parameters must be defined
`vus=arg0 duration=arg1 file=arg2 docker-compose up`

**Calculating RPS with k6**

   `Request Rate = (VU * R) / T`
   
   `T = (R * http_req_duration) + 1s`
   
    Request Rate: measured by the number of requests per second (RPS)
    VU: the number of virtual users
    R: the number of requests per VU iteration
    T: a value larger than the time needed to complete a VU iteration

*For Example:*

* execute `vus="10" duration="10s" file="/k6/scripts/shortening_link_test.js" docker-compose up`

**Results visualization:**

*In order of;*
* Go to http: `localhost: 3000`
* Create a data source

    *`Name`: myInfluxDB*
    
    *`Url`: http://influxdb:8086*
    
    *`Database`: k6*
    
configure fields as above

* Create a dashboard
* Click graph to create a new graph panel
* Click the panel title and then edit to set up the graph panel
* Set the panel data source to your `myInfluxDB` database and click the `SELECT mean(value)...` statement to edit the metric

![grafana-metric](https://user-images.githubusercontent.com/26281581/105518429-58177600-5ce9-11eb-865f-161f7073348e.png)

*Recommended Article:*
* https://k6.io/docs
