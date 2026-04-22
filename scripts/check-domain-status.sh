#!/usr/bin/env bash
# Report the live status of both Firebase custom domains.
#
# Usage:
#   ./scripts/check-domain-status.sh
#
# Needs gcloud + an account that has access to the kincaid-resume project.

set -euo pipefail

PROJECT="kincaid-resume"
TOKEN="$(gcloud auth print-access-token)"

report() {
  local site="$1" domain="$2"
  local url="https://firebasehosting.googleapis.com/v1beta1/projects/${PROJECT}/sites/${site}/customDomains/${domain}"
  echo "=== ${domain} (site: ${site}) ==="
  curl -s "$url" \
    -H "Authorization: Bearer $TOKEN" \
    -H "x-goog-user-project: ${PROJECT}" \
    | python3 -c '
import json, sys
d = json.load(sys.stdin)
if "error" in d:
    print("  ERROR:", d["error"].get("message"))
    sys.exit(0)
print("  host:     ", d.get("hostState"))
print("  ownership:", d.get("ownershipState"))
cert = d.get("cert", {})
print("  cert:     ", cert.get("state"), "(", cert.get("type"), ")")

def records(section):
    out = []
    for dom in section:
        for r in dom.get("records", []):
            out.append((r.get("requiredAction"), r.get("type"), r.get("domainName"), r.get("rdata")))
    return out

need_host = records(d.get("requiredDnsUpdates", {}).get("desired", []))
need_cert = records(cert.get("verification", {}).get("dns", {}).get("desired", []))
if need_host or need_cert:
    print("  DNS still needed:")
    for a, t, n, v in need_host + need_cert:
        print(f"    {a:4}  {t:6}  {n}  =>  {v}")
else:
    print("  DNS: nothing outstanding.")
'
  echo
}

report "kincaid-resume"        "andrew.kincaid.io"
report "kincaid-resume-mirror" "andrew.kinca.id"
