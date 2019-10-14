# Glitch Questions Webhook Trigger",
[![Build Status](https://travis-ci.org/tribakzero/glitch-questions-webhook-trigger.svg?branch=master)](https://travis-ci.org/tribakzero/glitch-questions-webhook-trigger)
[![Coverage Status](https://coveralls.io/repos/github/tribakzero/glitch-questions-webhook-trigger/badge.svg?branch=master)](https://coveralls.io/github/tribakzero/glitch-questions-webhook-trigger?branch=master)

Uses glitch-questions and triggers it on a constant basis, then sends a Webhook event

This project is messaging-service-agnostic, has been tested with Slack and Discord, but anything that generates webhooks, should be compatible. This is explained below.

## Installation

  `npm install glitch-questions-webhook-trigger`

## Usage

```
var glitchQuestionsWebhookTrigger = require('glitch-questions-webhook-trigger');

glitchQuestionsWebhookTrigger(WEBHOOK_URL, MESSAGE_GENERATOR_FUNCTION, INTERVAL);
```

# Configuration
The only exposed method is `glitchQuestionsWebhookTrigger`, is has some parameters:

  `webhook` String. It's a full URL of the webhook.
  `messageGenerator`: Function. It's a method that will generate the message the webhook will output to the messaging service. This is explained below.
  `interval`: Integer. It's the interval on which the Glitch Questions API will be requested, you may want to use `10` or greater.

# messageGenerator
This is the most complex setting to add, since this project is message-service-agnostic, a method needs to be passed to know what to output.

## source value
Both the `source`, and a helper method `getNewItems` are passed, the first one has this structure:
```
[
  {
    questionId: 'GDRh5sTofDaHVSWQ',
    question: 'Question Text',
    url: 'https://glitch.com/edit/#!/project-name?path=index.js:0:0'
  },
  ...
]
```

You're free to use any of those values.

Here are a couple of examples, one for Slack and other for Discord:

## Slack Message Generator
```
const messageGenerator = (source, getNewItems) =>
({
  text: "New questions:",
  attachments: getNewItems(source)
    .map(({question, url}) =>
      ({
        text: `${question}\n${url}`
      })
    )
});
```

## Discord Message Generator
```
const messageGenerator = (source, getNewItems) =>
({
  embeds: [{
    fields: getNewItems(source)
      .map(({question, url}) =>
        ({
          name: question,
          value: url,
          inline: true
        })
      )
  }]
});
```

## Tests
  `npm test`
