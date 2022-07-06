# node-red-contrib-mime-generator
[RFC 2822][45367a6f] compliant raw email message generator for [node-red](https://nodered.org/)

  [45367a6f]: https://www.ietf.org/rfc/rfc2822.txt "RFC 2822 Internet Message Format"

![NPM](https://img.shields.io/npm/l/node-red-contrib-mime-generator)
[![npm version](https://badge.fury.io/js/node-red-contrib-mime-generator.svg)](https://badge.fury.io/js/node-red-contrib-mime-generator)
![npm bundle size](https://img.shields.io/bundlephobia/min/node-red-contrib-mime-generator)
![npm](https://img.shields.io/npm/dm/node-red-contrib-mime-generator)

Inspired and based on the awesome [@muratgozel's](https://github.com/muratgozel) [MIMEText](https://github.com/muratgozel/MIMEText) library.

Supports plain text, HTML and AMP contents. Attachments support not implemented yet.

## Configure the node
Double click the node and fill all fields

## Payload
It expects a payload with an object containing the desired content-types, example:

```json
{
    "text/plain": "This is my awesome email message",
    "text/html": "This is my awesome <b>HTML</b> email message"
}
```

## Message (msg) properties supported
| property | description | type | example |
|--------- | ----------- | ---- | ------- |
| subject | the subject for the e-mail message | string | "My Awesome Subject" |
| from | from email address | single string | "Victor \<victoralmaraz@github.com>" |
| to | to email address(es)  | array of strings or single string | "contact@email.com" |
| cc | cc email address(es)  | array of strings or single string  | [ "another@email.com", "another2@email.com" ] |
| bcc | bcc email address(es)  | array of strings or single string  | "yetanother@email.com" |

## Return
It returns the raw [RFC 2822][45367a6f] email message

```
<add example here>
```
    