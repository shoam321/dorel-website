# n8n Rating Integration

This document describes the integration between the Sasha Tattoos rating form and the n8n webhook for handling customer ratings.

## Overview

When a customer completes the rating form, the data is sent directly to your n8n Production webhook in a structured JSON format.

## Payload Format

The rating form sends a **POST** request to n8n with the following JSON structure:

```json
{
  "businessName": "Dorel Studio",
  "average": 4.6,
  "feedback": "",
  "timestamp": "2025-11-30T10:46:48.976Z",
  "q1": 5,
  "q2": 5,
  "q3": 4,
  "q4": 5,
  "q5": 4,
  "customerName": "",
  "customerPhone": "",
  "source": "rating-page"
}
```

### Field Descriptions

#### Required Fields (MUST be present)
- **businessName** (string): Always set to `"Dorel Studio"` - MUST match the 'Business Name' column value in your Clients sheet
- **average** (number): Final rating average (e.g., `5`, `4.2`, `3.8`) - calculated from the 5 questions
- **timestamp** (string): ISO 8601 formatted timestamp (e.g., `"2025-11-30T10:46:48.976Z"`)

#### Rating Questions (Optional but typically filled)
- **q1** (number): Overall experience rating (1-5)
- **q2** (number): Training quality rating (1-5)
- **q3** (number): Service level rating (1-5)
- **q4** (number): Atmosphere & cleanliness rating (1-5)
- **q5** (number): Recommendation likelihood rating (1-5)

#### Optional Fields
- **feedback** (string): Free-form customer feedback (currently empty in form)
- **customerName** (string): Customer name (currently empty in form)
- **customerPhone** (string): Customer phone number (currently empty in form)
- **source** (string): Always set to `"rating-page"` for tracking

## Configuration

### Environment Variable

Set the n8n webhook URL in your `.env.local` file:

```bash
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-domain.com/webhook/submit-rating
```

**Important:** 
- Use the **Production webhook URL**, not the test webhook
- The URL should end with `/webhook/submit-rating` (not `/webhook-test/`)
- This is a public environment variable (NEXT_PUBLIC prefix), so it's safe to expose to the browser

### Request Headers

```
Content-Type: application/json
```

## n8n Workflow Setup

Your n8n workflow should:

1. **Accept POST requests** to the webhook `/webhook/submit-rating`
2. **Extract the JSON payload** with the fields listed above
3. **Validate businessName** matches your Clients sheet
4. **Store the data** in your Google Sheets 'Clients' table
5. **Send notifications** (email, SMS, etc.) based on the rating

## Testing

To test the integration:

```javascript
const testPayload = {
  businessName: "Dorel Studio",
  average: 4.5,
  feedback: "Test feedback",
  timestamp: new Date().toISOString(),
  q1: 5,
  q2: 4,
  q3: 5,
  q4: 4,
  q5: 5,
  customerName: "Test User",
  customerPhone: "050-1234567",
  source: "rating-page"
}

fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testPayload),
})
```

## Troubleshooting

### Issue: Ratings not appearing in Google Sheets
- Check that `businessName` exactly matches your Clients sheet
- Verify the n8n workflow is active
- Check n8n logs for webhook execution errors

### Issue: CORS errors
- This should work because n8n webhooks typically allow all origins
- If blocked, configure n8n webhook CORS settings

### Issue: `NEXT_PUBLIC_N8N_WEBHOOK_URL` is undefined
- Ensure `.env.local` is properly configured
- Restart the Next.js development server
- The variable must start with `NEXT_PUBLIC_` to be accessible in the browser

## Future Enhancements

To improve the integration, consider:

1. Adding a **feedback/comments field** to the rating form
2. Collecting **customer name and phone** (add form fields)
3. Implementing **error handling** with retry logic
4. Adding **analytics tracking** for rating trends
5. **Customizing business name** based on which studio is rating

## Related Files

- `components/rating-dialog.tsx` - Rating form component
- `.env.example` - Environment variable template
- `app/page.tsx` - Main page with rating dialog
