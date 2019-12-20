const sgMail = require('@sendgrid/mail')
const sgClasses = require('@sendgrid/helpers').classes
const sgHelpers = require('@sendgrid/helpers').helpers
const keys = require('../config/keys')

class Mailer {
  constructor({ subject, recipients, content }) {
    sgMail.setApiKey(keys.sendGridKey)
    const args = {
      to: this.formatAddresses(recipients),
      from: new sgClasses.EmailAddress('no-reply@emaily.com'),
      subject: subject,
      html: content
    }

    this.mail = new sgClasses.Mail(args)

    //this.mail.addContent(this.body)
    this.addClickTracking()
    this.addRecipients()
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new sgClasses.EmailAddress(email)
    })
  }

  addClickTracking() {
    const trackingSettings = {
      click_tracking: {
        enable: true,
        enable_text: true
      }
    }
    this.mail.trackingSettings = trackingSettings
  }

  addRecipients() {
    const personalize = new sgClasses.Personalization()
    this.mail.personalizations[0].to.forEach(recipient => {
      personalize.addTo(recipient)
    })
    this.mail.addPersonalization(personalize)
  }

  async send() {
    const response = await sgMail.sendMultiple(this.mail.toJSON())
    return response
  }
}

module.exports = Mailer