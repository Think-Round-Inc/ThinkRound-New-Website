# How to set up EmailJS for this project

This app sends the volunteer and subscribe forms through [EmailJS](https://www.emailjs.com/) via the server-side REST API. No EmailJS JS SDK is loaded in the browser — everything happens in the two API routes:

- [src/app/api/volunteer/route.ts](../src/app/api/volunteer/route.ts)
- [src/app/api/subscribe/route.ts](../src/app/api/newsletter/route.ts)

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

### Volunteer template (`EMAILJS_TEMPLATE_ID`)

Used by the volunteer form. The route sends these template params — reference them in the template body/subject with `{{param_name}}`:

| Param        | Description              |
| ------------ | ------------------------- |
| `first_name` | Volunteer's first name    |
| `last_name`  | Volunteer's last name     |
| `email`      | Volunteer's email address |
| `interest`   | What they're interested in |
| `message`    | Their message              |

Paste this into the template's **Content** (HTML) editor as a starting point:

```html
<div style="padding:24px 12px;background:#f0efea;font-family:system-ui,-apple-system,sans-serif;">
<div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e3;">

  <!-- Header -->
  <div style="padding:22px 20px 20px;background:#f8f8f6;border-bottom:1px solid #e5e5e3;">
    <div style="margin-bottom:14px;">
      <div style="margin-bottom:8px;">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#378ADD;margin-right:7px;vertical-align:middle;"></span>
        <span style="font-size:11px;color:#888780;letter-spacing:0.07em;text-transform:uppercase;font-weight:500;vertical-align:middle;">Volunteer Form</span>
      </div>
      <span style="font-size:11px;padding:4px 10px;border-radius:20px;background:#EAF3DE;color:#3B6D11;border:1px solid #97C459;display:inline-block;">&#10003; New submission</span>
    </div>
    <div style="font-size:19px;font-weight:500;color:#1a1a18;line-height:1.3;margin-bottom:4px;">New volunteer application</div>
    <div style="font-size:12px;color:#888780;line-height:1.6;">A message has been received. Kindly respond at your earliest convenience.</div>
  </div>

  <!-- Avatar + Name -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:18px 20px;border-bottom:1px solid #e5e5e3;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:46px;padding-right:14px;vertical-align:middle;">
              <div style="width:46px;height:46px;border-radius:50%;background:#EBF4FF;border:1px solid #B5D4F4;text-align:center;line-height:46px;font-size:20px;">&#128100;</div>
            </td>
            <td style="vertical-align:middle;">
              <div style="font-size:15px;font-weight:500;color:#1a1a18;">{{first_name}} {{last_name}}</div>
              <div style="font-size:12px;color:#888780;margin-top:2px;">{{user_email}}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Chips -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:16px 20px;border-bottom:1px solid #e5e5e3;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:50%;padding-right:5px;vertical-align:top;">
              <div style="background:#EBF4FF;border:1px solid #B5D4F4;border-radius:10px;padding:11px 13px;">
                <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.07em;font-weight:500;color:#185FA5;margin-bottom:4px;">Interest</div>
                <div style="font-size:13px;font-weight:500;color:#0C447C;">{{subject}}</div>
              </div>
            </td>
            <td style="width:50%;padding-left:5px;vertical-align:top;">
              <div style="background:#EAF3DE;border:1px solid #C0DD97;border-radius:10px;padding:11px 13px;">
                <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.07em;font-weight:500;color:#3B6D11;margin-bottom:4px;">From</div>
                <div style="font-size:13px;font-weight:500;color:#27500A;">{{first_name}} {{last_name}}</div>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Message -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:16px 20px;border-bottom:1px solid #e5e5e3;">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.07em;font-weight:500;color:#888780;margin-bottom:8px;">&#9993; Message</div>
        <div style="font-size:13px;color:#2c2c2a;line-height:1.8;">{{message}}</div>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:14px 20px;background:#f8f8f6;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-size:11px;color:#888780;vertical-align:middle;">{{user_email}}</td>
            <td align="right">
              <a href="mailto:{{user_email}}" style="font-size:12px;font-weight:500;color:#ffffff;background:#378ADD;border-radius:8px;padding:7px 16px;text-decoration:none;display:inline-block;">&#9993; Reply to {{first_name}}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</div>
</div>
```


Save the template and copy its **Template ID** into `EMAILJS_TEMPLATE_ID`.

### Subscribe template (`EMAILJS_NEWSLETTER_TEMPLATE_ID`)

Used by the subscribe signup form. Its template params are:

| Param        | Description         |
| ------------ | -------------------- |
| `first_name` | Subscriber's first name |
| `last_name`  | Subscriber's last name  |
| `email`      | Subscriber's email      |
| `subject`    | Message subject         |
| `message`    | Message body             |

Paste this into the template's **Content** (HTML) editor as a starting point:

```html
<div style="padding:24px 12px;background:#f0efea;font-family:system-ui,-apple-system,sans-serif;">
<div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e3;">

  <!-- Header -->
  <div style="padding:22px 20px 20px;background:#1a1a18;border-bottom:1px solid #2e2e2b;">
    <div style="margin-bottom:12px;">
      <span style="font-size:11px;color:rgba(255,255,255,0.5);letter-spacing:0.07em;text-transform:uppercase;font-weight:500;display:block;margin-bottom:8px;">501(c)3 Nonprofit</span>
      <span style="font-size:11px;padding:4px 10px;border-radius:20px;background:#EAF3DE;color:#3B6D11;border:1px solid #97C459;display:inline-block;">&#10003; New subscriber</span>
    </div>
    <div style="font-size:20px;font-weight:500;color:#ffffff;line-height:1.3;margin-bottom:5px;">Think Round, Inc.</div>
    <div style="font-size:12px;color:rgba(255,255,255,0.5);line-height:1.6;">A new mailing list subscription has been received via the website contact form.</div>
  </div>

  <!-- Avatar + Name -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:18px 20px;border-bottom:1px solid #e5e5e3;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:46px;padding-right:14px;vertical-align:middle;">
              <div style="width:46px;height:46px;border-radius:50%;background:#EBF4FF;border:1px solid #B5D4F4;text-align:center;line-height:46px;font-size:20px;">&#128100;</div>
            </td>
            <td style="vertical-align:middle;">
              <div style="font-size:15px;font-weight:500;color:#1a1a18;">{{first_name}} {{last_name}}</div>
              <div style="font-size:12px;color:#888780;margin-top:2px;">{{user_email}}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Chip: Subject only -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:16px 20px;border-bottom:1px solid #e5e5e3;">
        <div style="background:#EBF4FF;border:1px solid #B5D4F4;border-radius:10px;padding:11px 13px;">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.07em;font-weight:500;color:#185FA5;margin-bottom:4px;">Subject</div>
          <div style="font-size:13px;font-weight:500;color:#0C447C;">{{subject}}</div>
        </div>
      </td>
    </tr>
  </table>

  <!-- Message -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:16px 20px;border-bottom:1px solid #e5e5e3;">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.07em;font-weight:500;color:#888780;margin-bottom:8px;">&#9993; Message</div>
        <div style="font-size:13px;color:#2c2c2a;line-height:1.8;">{{message}}</div>
      </td>
    </tr>
  </table>

  <!-- Org Info -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:16px 20px;border-bottom:1px solid #e5e5e3;background:#f8f8f6;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align:top;padding-right:16px;">
              <div style="font-size:11px;font-weight:500;color:#1a1a18;margin-bottom:5px;">Think Round, Inc.</div>
              <div style="font-size:11px;color:#888780;line-height:1.7;">
                2140 Bush Street, Suite 1<br>
                San Francisco, CA 94115<br>
                United States
              </div>
            </td>
            <td style="vertical-align:top;">
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
      <td style="padding:12px 20px;border-bottom:1px solid #e5e5e3;background:#f8f8f6;text-align:center;">
        <a href="https://www.thinkround.org/mission" style="font-size:12px;color:#378ADD;text-decoration:none;margin:0 6px;">Mission</a>
        <span style="color:#d3d1c7;">|</span>
        <a href="https://www.thinkround.org/contact-1" style="font-size:12px;color:#378ADD;text-decoration:none;margin:0 6px;">Contact</a>
        <span style="color:#d3d1c7;">|</span>
        <a href="https://www.thinkround.org/our-team" style="font-size:12px;color:#378ADD;text-decoration:none;margin:0 6px;">Our Board Members</a>
        <span style="color:#d3d1c7;">|</span>
        <a href="https://www.thinkround.org/map" style="font-size:12px;color:#378ADD;text-decoration:none;margin:0 6px;">Map</a>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:14px 20px;background:#1a1a18;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-size:11px;color:rgba(255,255,255,0.4);vertical-align:middle;">{{user_email}}</td>
            <td align="right">
              <a href="mailto:{{user_email}}" style="font-size:12px;font-weight:500;color:#ffffff;background:#378ADD;border-radius:8px;padding:7px 14px;text-decoration:none;display:inline-block;">&#9993; Reply to {{first_name}}</a>
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
EMAILJS_TEMPLATE_ID=template_volunteer123
EMAILJS_SUBSCRIBE_TEMPLATE_ID=template_subscribe456
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key   
```

Restart `npm run dev` after editing `.env.local` so Next.js picks up the new values.

## 6. Test it

1. Run `npm run dev` and open the site.
2. Submit the volunteer form and the subscribe form.
3. Check the inbox tied to the connected email service for each message.
4. If a request fails, the API route returns the EmailJS error message in its JSON response — check the browser network tab or server logs for details (common causes: wrong Service/Template ID, or the non-browser API restriction from step 4).
