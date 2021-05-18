# github-action-repeat-string

## Usage

### Inputs

| Input                  | Description                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `separator`            | string                                                                                   |
| `source`               | string                                                                                   |
| `list`                 | string (list of object [{key:value}])                                                    |


```yaml
list: |
    - $DOMAIN: test1.test.com
        $PORT: 8080
    - $DOMAIN: test2.test.com
        $PORT: 8081
    - $DOMAIN: test3.test.com
        $PORT: 8082
```

### Outputs

| Output          | Description                                 |
| --------------- | ------------------------------------------- |
| `value`         | 'ok' or 'fail'                              |


## Examples

```yaml
  - name: Nginx config builder
    uses: leodoc-app/github-action-repeat-string
    with:
        separator: "#------------------------------------------------"
        source: |
        upstream websocket$PORT {
            server 127.0.0.1:$PORT;
        }
        server {
            client_max_body_size 0;
            listen 80;
            listen 443 ssl;
            server_name $DOMAIN;
            if ($server_port = 80) { set $https_redirect 1; }
            if ($host ~ '^www\.') { set $https_redirect 1; }
            if ($https_redirect = 1) { return 301 https://$DOMAIN$request_uri; }
            location / {
                set $targetdomain http://websocket$PORT;
                proxy_set_header Host $http_host;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection $connection_upgrade;
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass $targetdomain;
            }
        }
        list: |
            - $DOMAIN: test1.test.com
                $PORT: 8080
            - $DOMAIN: test2.test.com
                $PORT: 8081
            - $DOMAIN: test3.test.com
                $PORT: 8082
```