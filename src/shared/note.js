module.exports = function note(n) {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: n.text
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: "x",
        emoji: true
      },
      value: n.key
    }
  }
}
