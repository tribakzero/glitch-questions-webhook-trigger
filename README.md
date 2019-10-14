# Glitch Questions Webhook Trigger",
Uses glitch-questions and triggers it on a constant basis, then sends a Webhook event

This project is messaging-service-agnostic, has been tested with Slack and Discord, but anything that generates webhooks, should be compatible.

## Installation

  `npm install glitch-questions-webhook-trigger`

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
