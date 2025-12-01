# Deployment Checklist - n8n Integration

## Pre-Deployment Steps

- [ ] **Get n8n Production Webhook URL**
  - Access your n8n instance
  - Navigate to the rating workflow
  - Find the webhook trigger node
  - Copy the Production webhook URL (not the test one)
  - Format: `https://your-domain.com/webhook/submit-rating`

- [ ] **Verify n8n Workflow**
  - [ ] Webhook node accepts POST requests
  - [ ] JSON body is properly parsed
  - [ ] Validation: businessName === "Dorel Studio"
  - [ ] Google Sheets integration is configured
  - [ ] All required fields are mapped correctly

- [ ] **Test Integration Locally**
  ```bash
  pnpm dev
  ```
  - Set `NEXT_PUBLIC_N8N_WEBHOOK_URL` in `.env.local`
  - Open http://localhost:3000
  - Click "דרגו אותנו" button
  - Complete all 5 rating questions
  - Submit and verify data arrives in n8n webhook logs

## Deployment Steps

- [ ] **Set Environment Variable in Production**
  - Add to Vercel environment variables (or your hosting provider)
  - Variable: `NEXT_PUBLIC_N8N_WEBHOOK_URL`
  - Value: Your n8n Production webhook URL

- [ ] **Deploy to Production**
  ```bash
  git push
  # (automatic Vercel deployment)
  ```

- [ ] **Verify Deployment**
  - Test the rating form on the live site
  - Check n8n webhook logs for incoming requests
  - Verify data appears in Google Sheets

## Expected JSON Payload

When a customer completes the rating form, this JSON is sent to n8n:

```json
{
  "businessName": "Dorel Studio",
  "average": 4.6,
  "feedback": "",
  "timestamp": "2025-12-01T14:30:00.000Z",
  "q1": 5,
  "q2": 4,
  "q3": 5,
  "q4": 5,
  "q5": 4,
  "customerName": "",
  "customerPhone": "",
  "source": "rating-page"
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Ratings not saving | Check n8n webhook logs for errors |
| `CORS` errors | Verify n8n webhook CORS settings |
| `businessName` mismatch | Ensure it matches exactly: `"Dorel Studio"` |
| Empty fields | Currently q1-q5 are required; others are optional |
| 404 on webhook | Verify the URL format doesn't have trailing slashes |

## Additional Resources

- See `N8N_INTEGRATION.md` for detailed documentation
- See `components/rating-dialog.tsx` for the form implementation
- See `.env.example` for required environment variables

## Rollback Plan

If issues occur:

1. Temporarily set a dummy webhook URL (e.g., `https://webhook.site/your-unique-id`)
2. Test with webhook.site to see the payload structure
3. Fix n8n workflow
4. Re-deploy

---

**Last Updated:** December 1, 2025
**Status:** Ready for deployment
