# Money Ops

Policy reading and financial comparison prototype. The active web application is in `mockups/finance-native`.

## Run and verify

```sh
cd mockups/finance-native
npm ci
npm test
npm run build
```

Open the served build with `?app=1` for the workspace. The root page is the landing page.

The workspace reads text PDFs locally, up to 5 MB and 1,000,000 extracted characters. Plain-English highlights are derived from a structured JSON record using text-matching rules. Sources and uncertain values remain available for review. OCR and hosted model interpretation are not implemented. Calculator imports require confirmation.

## Releases

Production project: `rvs006s-projects/money-ops`.

Stable review URL: https://money-ops-rvs006s-projects.vercel.app/?app=1

Each release is a Git commit and annotated tag. Deploy from the application directory, linking the existing `money-ops` project. Keep the Git commit SHA in deployment metadata. Vercel retains immutable deployments for rollback; promoting a prior deployment restores the stable URL.

Source control excludes local credentials, dependency folders, generated builds and uploaded personal documents. PDF fixtures contain synthetic test content.
