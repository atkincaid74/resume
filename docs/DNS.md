# DNS records for the two custom domains

Firebase Hosting provides auto-SSL once these records resolve publicly.

> Check live requirements any time with the helper script:
> `./scripts/check-domain-status.sh`

## `andrew.kincaid.io` — canonical site

Registrar/DNS: **Squarespace Domains** (formerly Google Domains).
Manage at: https://account.squarespace.com/domains

| Type  | Host                                 | Value                              |
| ----- | ------------------------------------ | ---------------------------------- |
| CNAME | `andrew` (host inside `kincaid.io`)  | `kincaid-resume.web.app`           |
| TXT   | `_acme-challenge.andrew`             | (see current value via script)     |

The CNAME is the main record. Firebase typically issues SSL on CNAME alone
for subdomains; the TXT is a fallback for when Firebase can't verify via
CNAME path. If the domain still says "needs verification" after the CNAME
propagates, add the TXT from the live API response.

## `andrew.kinca.id` — mirror (301 to canonical)

Registrar/DNS: **GoDaddy**.
Manage at: https://dcc.godaddy.com/control/portfolio

| Type  | Host                                   | Value                                 |
| ----- | -------------------------------------- | ------------------------------------- |
| CNAME | `andrew` (host inside `kinca.id`)      | `kincaid-resume-mirror.web.app`       |
| TXT   | `_acme-challenge.andrew`               | (see current value via script)        |

## Why no A records?

The Firebase Hosting customDomains API issues **CNAME-based setup** for
subdomains now — the older "A record to 151.101.x.x" flow is legacy. CNAMEs
are easier, they follow whatever Firebase changes under the hood, and they
still get full auto-SSL.

## After adding records

1. Wait for DNS to propagate (usually 5–30 min, can be longer).
2. Firebase polls automatically; SSL provisions within ~1 hour of records
   being visible.
3. Check status with the helper script below. When you see
   `HOST_ACTIVE` + `ownership: OWNERSHIP_ACTIVE`, you're live.

## Helper script

See `scripts/check-domain-status.sh` — it hits the Firebase Hosting API
and prints the current state and any remaining required DNS.
