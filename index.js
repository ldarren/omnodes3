const args = require('pico-args')
const defaults={
    port: [41337, 'default port is 41337'],
    p:'@port',
    region: ['us-east-1', 'default region is us-east-1'],
    r:'@region',
    cred: ['logger', 'default credential profile name is "logger"'],
    c:'@cred',
    bucket: 's3 bucket name',
    b:'@bucket',
    src: 'source name',
    s:'@src',
}
const opt = args.parse(defaults)
const dgram = require('dgram')
const AWS = require('aws-sdk')
const pStr = require('pico-common').export('pico/str')
const server = dgram.createSocket('udp4')

AWS.config.update({region: opt.region})
AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: opt.cred})
const s3 = new AWS.S3({apiVersion: '2006-03-01'})
const s3PutOpt = {
	Bucket: opt.bucket,
	ACL: 'bucket-owner-full-control',
	Metadata: { src: opt.src }
}

server.on('error', err => {
	console.error(`server error:\n${err.stack}`)
	server.close()
})

server.on('message', (msg, rinfo) => {
	s3.putObject(Object.assign(s3PutOpt, {
		Key: Date.now() + '-' + pStr.rand(),
		Body: msg,
	}), err => {
		if (err) return console.error(err)
	})
})

server.on('listening', () => {
	const address = server.address()
	console.log(`server listening ${address.address}:${address.port}`)
})

server.bind(opt.port)

