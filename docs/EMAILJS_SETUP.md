# How to set up EmailJS for this project

This app sends the volunteer and subscribe forms through [EmailJS](https://www.emailjs.com/) via the server-side REST API. No EmailJS JS SDK is loaded in the browser — everything happens in the two API routes:


## 1. Create an EmailJS account

1. Go to [emailjs.com](https://www.emailjs.com/) and sign up (or log in).
2. You land on the **Dashboard**.

## 2. Connect an email service

1. In the left sidebar, go to **Email Services** → **Add New Service**.
2. Pick a provider (Gmail, Outlook, SMTP, etc.) and connect/authorize your account.
3. After it's created, copy the **Service ID** (e.g. `service_abc1234`).
4. Set it as `EMAILJS_SERVICE_ID` in your `.env.local`.

## 3. Create email templates

This project needs **two templates** — one for each form. Go to **Email Templates** → **Create New Template** for each.

### Volunteer template (`EMAILJS_VOLUNTEER_TEMPLATE_ID`)

Used by the volunteer form. The route sends these template params — reference them in the template body/subject with `{{param_name}}`:


Paste this into the template's **Content** (HTML) editor as a starting point:

```html
<style>
  @media only screen and (max-width: 640px) {
    .tr-wrap { padding: 12px 8px !important; }
    .tr-card { border-radius: 12px !important; }
    .tr-pad { padding-left: 16px !important; padding-right: 16px !important; }
    .tr-title { display: block !important; text-align: center !important; font-size: 13px !important; padding: 8px 12px !important; margin-bottom: 14px !important; }
    .tr-label { font-size: 10px !important; margin-bottom: 8px !important; }
    .tr-intro { font-size: 14px !important; }
    .tr-col { display: block !important; width: 100% !important; box-sizing: border-box !important; }
    .tr-gap { display: block !important; width: 100% !important; height: 8px !important; line-height: 8px !important; }
    .tr-msg { font-size: 14px !important; }
    .tr-foot-email { display: block !important; width: 100% !important; text-align: center !important; padding-bottom: 10px !important; }
    .tr-foot-btn { display: block !important; width: 100% !important; text-align: center !important; }
    .tr-btn { display: block !important; padding: 11px 16px !important; font-size: 14px !important; }
    .tr-email { word-break: break-all !important; }
  }
</style>
<div class="tr-wrap" style="padding:24px 12px;background:white;font-family:system-ui,-apple-system,sans-serif;">
<div class="tr-card" style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e3;">

  <!-- Logo bar -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td class="tr-pad" style="padding:12px 20px;background:#ffffff;border-bottom:3px solid #6f2da8;vertical-align:middle;">
        <a href="https://www.thinkround.org/" style="text-decoration:none;">
          <img src="https://images.squarespace-cdn.com/content/v1/522e01f0e4b074119b24a9d8/3f82b049-2e02-41b3-9737-d1792357a136/New_Logo-02-02.png?format=750w" alt="Think Round, Inc." height="36" style="display:block;height:36px;width:auto;max-width:220px;border:0;">
        </a>
      </td>
    </tr>
  </table>

  <!-- Header -->
  <div class="tr-pad" style="padding:24px 20px;background:#4A9FEA;border-bottom:1px solid #e5e5e3;">
    <div style="margin-bottom:10px;font-size:11px;color:rgba(255,255,255,0.85);letter-spacing:0.08em;text-transform:uppercase;font-weight:600;">
      Volunteer Form
    </div>
    <div class="tr-title" style="display:inline-block;margin-bottom:12px;padding:4px 12px;border-radius:20px;background:#ffffff;color:#6f2da8;font-size:12px;font-weight:600;line-height:1.4;">
      &#10003; New volunteer application
    </div>
    <div style="font-size:13px;color:#ffffff;line-height:1.6;">
      A new volunteer sign-up has come in through the website!
    </div>
  </div>

  <!-- Avatar + Name -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td class="tr-pad" style="padding:18px 20px;border-bottom:1px solid #e5e5e3;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:46px;padding-right:14px;vertical-align:middle;">
              <div style="width:46px;height:46px;border-radius:50%;background:white;border:1px solid #68B7FD;text-align:center;line-height:46px;font-size:20px;">&#128100;</div>
            </td>
            <td style="vertical-align:middle;">
              <div style="font-size:15px;font-weight:500;color:#1a1a18;">{{first_name}} {{last_name}}</div>
              <div class="tr-email" style="font-size:12px;color:#888780;margin-top:2px;">{{user_email}}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Chips -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td class="tr-pad" style="padding:16px 20px;border-bottom:1px solid #e5e5e3;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
          <tr>
            <td class="tr-col" width="49%" valign="top" style="width:49%;background:#9f78ce;border:1px solid #6f2da8;border-radius:10px;padding:11px 13px;vertical-align:top;">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.07em;font-weight:500;color:white;margin-bottom:4px;">Interest</div>
              <div style="font-size:13px;font-weight:500;color:white;">{{subject}}</div>
            </td>
            <td class="tr-gap" width="10" style="width:10px;font-size:0;line-height:0;">&nbsp;</td>
            <td class="tr-col" width="49%" valign="top" style="width:49%;background:#fcae63;border:1px solid #fa7d00;border-radius:10px;padding:11px 13px;vertical-align:top;">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.07em;font-weight:500;color:white;margin-bottom:4px;">From</div>
              <div style="font-size:13px;font-weight:500;color:white;">{{first_name}} {{last_name}}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Message -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td class="tr-pad" style="padding:16px 20px;border-bottom:1px solid #e5e5e3;">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.07em;font-weight:500;color:#888780;margin-bottom:8px;">&#9993; Message</div>
        <div class="tr-msg" style="font-size:13px;color:#2c2c2a;line-height:1.8;">{{message}}</div>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td class="tr-pad" style="padding:14px 20px;background:#68B7FD;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="tr-foot-email tr-email" style="font-size:11px;color:white;vertical-align:middle;">{{user_email}}</td>
            <td class="tr-foot-btn" align="right">
              <a class="tr-btn" href="mailto:{{user_email}}" style="font-size:12px;font-weight:500;color:#ffffff;background:#6f2da8;border-radius:8px;padding:7px 16px;text-decoration:none;display:inline-block;">&#9993; Reply to {{first_name}}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</div>
</div>
```


Save the template and copy its **Template ID** into `EMAILJS_VOLUNTEER_TEMPLATE_ID`.

### Subscribe/contact form template (`EMAILJS_SUBSCRIBE_TEMPLATE_ID`)


Paste this into the template's **Content** (HTML) editor as a starting point:

```html
<style>
  @media only screen and (max-width: 480px) {
    .tr-wrap { padding: 12px 8px !important; }
    .tr-card { border-radius: 12px !important; }
    .tr-pad { padding-left: 16px !important; padding-right: 16px !important; }
    .tr-title { font-size: 18px !important; }
    .tr-col { display: block !important; width: 100% !important; padding: 0 !important; }
    .tr-col-first { padding-bottom: 10px !important; }
    .tr-msg { font-size: 14px !important; }
    .tr-foot-email { display: block !important; width: 100% !important; text-align: center !important; padding-bottom: 10px !important; }
    .tr-foot-btn { display: block !important; width: 100% !important; text-align: center !important; }
    .tr-btn { display: block !important; padding: 11px 16px !important; font-size: 14px !important; }
    .tr-email { word-break: break-all !important; }
    .tr-org { padding-left: 12px !important; }
    .tr-org-first { margin-bottom: 12px !important; padding-bottom: 0 !important; }
    .tr-org div { font-size: 12px !important; }
    .tr-nav span { display: none !important; }
    .tr-nav a { display: inline-block !important; margin: 4px 10px !important; font-size: 13px !important; }
  }
</style>
<div class="tr-wrap" style="padding:24px 12px;background:white;font-family:system-ui,-apple-system,sans-serif;">
<div class="tr-card" style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e3;">

  <!-- Logo bar -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td class="tr-pad" style="padding:12px 20px;background:#ffffff;border-bottom:3px solid #6f2da8;vertical-align:middle;">
        <a href="https://www.thinkround.org/" style="text-decoration:none;">
          <img src="https://images.squarespace-cdn.com/content/v1/522e01f0e4b074119b24a9d8/3f82b049-2e02-41b3-9737-d1792357a136/New_Logo-02-02.png?format=750w" alt="Think Round, Inc." height="36" style="display:block;height:36px;width:auto;max-width:220px;border:0;">
        </a>
      </td>
    </tr>
  </table>

  <!-- Header -->
  <div class="tr-pad" style="padding:20px 20px 20px;background:#68B7FD;border-bottom:1px solid #e5e5e3;">
    <div style="margin-bottom:12px;">
      <div style="font-size:11px;line-height:16px;color:white;letter-spacing:0.07em;text-transform:uppercase;font-weight:600;margin:0 0 8px 0;">501(c)3 Nonprofit</div>
      <span style="display:inline-block;font-size:11px;line-height:16px;padding:3px 10px;border-radius:20px;background:{{chip_bg}};color:white;border:2px solid {{chip_border}};white-space:nowrap;">{{type_icon}} {{type_label}}</span>
    </div>
    <div class="tr-title" style="font-size:19px;font-weight:500;color:white;line-height:1.3;margin-bottom:4px;">Think Round, Inc.</div>
    <div style="font-size:12px;color:white;line-height:1.6;">{{intro_text}}</div>
  </div>

  <!-- Avatar + Name -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td class="tr-pad" style="padding:18px 20px;border-bottom:1px solid #e5e5e3;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:46px;padding-right:14px;vertical-align:middle;">
              <div style="width:46px;height:46px;border-radius:50%;background:white;border:1px solid #68B7FD;text-align:center;line-height:46px;font-size:20px;">&#128100;</div>
            </td>
            <td style="vertical-align:middle;">
              <div style="font-size:15px;font-weight:500;color:#1a1a18;">{{first_name}} {{last_name}}</div>
              <div class="tr-email" style="font-size:12px;color:#888780;margin-top:2px;">{{user_email}}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Chip: Subject -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td class="tr-pad" style="padding:16px 20px;border-bottom:1px solid #e5e5e3;">
        <div style="background:{{chip_bg}};border:1px solid {{chip_border}};border-radius:10px;padding:11px 13px;">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.07em;font-weight:500;color:black;margin-bottom:4px;">Subject</div>
          <div style="font-size:13px;font-weight:500;color:black;">{{subject}}</div>
        </div>
      </td>
    </tr>
  </table>

  <!-- Message -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td class="tr-pad" style="padding:16px 20px;border-bottom:1px solid #e5e5e3;">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.07em;font-weight:500;color:#888780;margin-bottom:8px;">&#9993; Message</div>
        <div class="tr-msg" style="font-size:13px;color:#2c2c2a;line-height:1.8;">{{message}}</div>
      </td>
    </tr>
  </table>

  <!-- Org Info -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td class="tr-pad" style="padding:16px 20px;border-bottom:1px solid #e5e5e3;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="tr-col tr-org tr-org-first" style="vertical-align:top;padding-right:16px;border-left:3px solid #fcae63;padding-left:12px;">
              <div style="font-size:11px;font-weight:600;color:#1a1a18;margin-bottom:5px;">Think Round, Inc.</div>
              <div style="font-size:11px;color:#888780;line-height:1.7;">
                2140 Bush Street, Suite 1<br>
                San Francisco, CA 94115<br>
                United States
              </div>
            </td>
            <td class="tr-col tr-org" style="vertical-align:top;border-left:3px solid #9f78ce;padding-left:12px;">
              <div style="font-size:11px;color:#888780;line-height:1.7;">
                <a href="tel:4156029599" style="color:#378ADD;text-decoration:none;">(415) 602-9599</a><br>
                <a href="mailto:info@thinkround.org" style="color:#378ADD;text-decoration:none;">info@thinkround.org</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Nav Links -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td class="tr-pad tr-nav" style="padding:12px 20px;text-align:center;">
        <a href="https://www.thinkround.org/mission" style="font-size:12px;font-weight:500;color:#6f2da8;text-decoration:none;margin:0 6px;">Mission</a>
        <span style="color:#e5e5e3;">|</span>
        <a href="https://www.thinkround.org/contact-1" style="font-size:12px;font-weight:500;color:#6f2da8;text-decoration:none;margin:0 6px;">Contact</a>
        <span style="color:#e5e5e3;">|</span>
        <a href="https://www.thinkround.org/our-team" style="font-size:12px;font-weight:500;color:#6f2da8;text-decoration:none;margin:0 6px;">Our Board Members</a>
        <span style="color:#e5e5e3;">|</span>
        <a href="https://www.thinkround.org/map" style="font-size:12px;font-weight:500;color:#6f2da8;text-decoration:none;margin:0 6px;">Map</a>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td class="tr-pad" style="padding:14px 20px;background:#68B7FD;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="tr-foot-email tr-email" style="font-size:11px;color:white;vertical-align:middle;">{{user_email}}</td>
            <td class="tr-foot-btn" align="right">
              <a class="tr-btn" href="mailto:{{user_email}}" style="font-size:12px;font-weight:500;color:#ffffff;background:#6f2da8;border-radius:8px;padding:7px 16px;text-decoration:none;display:inline-block;">&#9993; Reply to {{first_name}}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</div>
</div>
```


Save the template and copy its **Template ID** into `EMAILJS_SUBSCRIBE_TEMPLATE_ID`.

## 4. Get your API keys

1. Go to **Account** → **General** (or **API Keys**, depending on the current dashboard layout).
2. Copy the **Public Key** → set as `EMAILJS_PUBLIC_KEY`.
3. If your account has **non-strict origin / API access restrictions** disabled, server-side calls (like this app's) may also need the **Private Key** → set as `EMAILJS_PRIVATE_KEY` .
   - This setting lives under **Account** → **Security** → **API Calls** as "Allow EmailJS API for non-browser applications" — enable it if requests fail with an origin/allowlist error.

## 5. Fill in `.env.local`

Copy the example file and fill in the values you collected above:

```bash
cp .env.local.example .env.local
```

```
EMAILJS_SERVICE_ID=service_abc1234
EMAILJS_VOLUNTEER_TEMPLATE_ID=template_volunteer123
EMAILJS_SUBSCRIBE_TEMPLATE_ID=template_subscribe456
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key   
```

Restart `npm run dev` after editing `.env.local` so Next.js picks up the new values.

## 6. Test it

1. Run `npm run dev` and open the site.
2. Submit the contact form, the volunteer form and the subscribe form.
3. Check the inbox tied to the connected email service for each message.
4. If a request fails, the API route returns the EmailJS error message in its JSON response — check the browser network tab or server logs for details (common causes: wrong Service/Template ID, or the non-browser API restriction from step 4).
