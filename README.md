## setup
keep your aws credential in ~/.aws/credential
```
[logger]
aws_access_key_id = {ACCESS_KEY}
aws_secret_access_key = {SECRET_KEY}
```

## test
run mnodes3
```
npm start -- -b 'your bucket' -s 'your app name'
```

```bash
echo '{"foo":"bar"}' > /dev/udp/127.0.0.1/41337
```
