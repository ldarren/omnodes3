## setup
omnodes3 need s3 write permission, please keep your aws credential in `~/.aws/credentials`
```
[logger]
aws_access_key_id = {ACCESS_KEY}
aws_secret_access_key = {SECRET_KEY}
```

run omnodes3
```
npm start -- -b 'your bucket' -s 'your app name'
```

## usage
omnodes3 can be used to forward log to s3. in rsyslog `/etc/rsyslog.d/1000-YOURSERVICE`
```
:rawmsg,contains,"YOUR SERVICE KEY WORD" @localhost:41337 
```

## test
```bash
echo '{"foo":"bar"}' > /dev/udp/127.0.0.1/41337
```
