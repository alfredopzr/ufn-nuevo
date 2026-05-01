# DNS Migration — cPanel to Hostinger

Route `cesfn.edu.mx` (and `ufn.edu.mx`) from the cPanel server to Hostinger while keeping DNS managed in cPanel.

---

## Rollback Values

Keep these in case you need to revert.

| Record | Type | Current Value (cPanel server) |
|--------|------|-------------------------------|
| `cesfn.edu.mx.` | A | `65.99.252.208` |
| `ufn.edu.mx.` | A | `65.99.252.208` |
| `www.cesfn.edu.mx.` | CNAME | _(none — does not exist yet)_ |
| `www.ufn.edu.mx.` | CNAME | _(none — does not exist yet)_ |

Hostinger server IP: `217.196.55.205`
Hostinger CDN hostname: `ufn-nuevo.alfredoperez.xyz.cdn.hstgr.net`

> **Note:** The IP and CDN hostname above are from a previous Hostinger site. After setting up the new Node.js Web App (see Step 0), get the updated values from hPanel and use those instead.

---

## Steps

### 0. Set up the Node.js Web App in Hostinger first

In hPanel → **Websites** → **Add website** → **Node.js Web App**. Connect your GitHub repo and let it build and deploy.

Once deployed, go to the app's settings and find the assigned domain/IP. Hostinger will show either:
- A **CDN hostname** (e.g. `yourapp.cdn.hstgr.net`) — use this for the CNAME in step 2
- A **server IP** — use this for the A record in step 1

Use these values in the steps below, not the old `ufn-nuevo.alfredoperez.xyz` values (those belong to a different site on the account).

---

### 1. Edit the root A record

In cPanel Zone Editor → **Administrar** for the domain, click **Edit** on the root A record (e.g. `cesfn.edu.mx.`).

| Field | Old value | New value |
|-------|-----------|-----------|
| Address | `65.99.252.208` | _(IP from new Node.js app in hPanel)_ |
| TTL | `14400` | `300` |

**Why:** The root A record controls where `cesfn.edu.mx` resolves. Changing the IP reroutes all traffic from the cPanel server to Hostinger. Lowering the TTL to 300 seconds means DNS resolvers refresh every 5 minutes — this makes propagation faster and allows a quick rollback if something breaks.

---

### 2. Add a www CNAME record

Click **+ Add Record** → CNAME.

| Field | Value |
|-------|-------|
| Name | `www.cesfn.edu.mx.` |
| TTL | `300` |
| CNAME | _(CDN hostname from new Node.js app in hPanel)_ |

**Why:** `www.cesfn.edu.mx` is a separate hostname that needs its own record. Without it, visitors using `www.` either get an error or still hit cPanel. A CNAME pointing to Hostinger's CDN hostname is preferred over a raw IP because Hostinger's CDN can rotate IPs — the CNAME always resolves to whatever IP the CDN is currently using.

---

### 3. Save All Records

Click the blue **Save All Records** button in the Zone Editor.

**Why:** cPanel stages changes in memory until explicitly saved. Nothing is applied until this button is clicked.

---

### 4. Add the domain as a custom domain in Hostinger hPanel

> **Note:** This is NOT registering a new domain. Do not use the domain registrar/purchase flow — `.edu.mx` domains aren't supported there anyway.

Go to: **hPanel → Hosting → Manage → Domains → Add domain** (or "Add custom domain"), and enter `cesfn.edu.mx`.

**Why:** Hostinger's server receives traffic for all domains pointing to its IP. It uses the incoming hostname to decide which site to serve. Without adding the domain here, Hostinger won't know to route incoming requests to your site — you'll get a default error page even if DNS is correctly configured.

---

## Do Not Touch

Leave the following records pointing to the cPanel server (`65.99.252.208`). They are cPanel-specific and must stay on the old server:

- `cpanel.cesfn.edu.mx.`
- `whm.cesfn.edu.mx.`
- `webmail.cesfn.edu.mx.`
- `autodiscover.cesfn.edu.mx.`
- `autoconfig.cesfn.edu.mx.`
- `cpcalendars.cesfn.edu.mx.`
- `cpcontacts.cesfn.edu.mx.`

---

## Verifying Propagation

Use [dnschecker.org](https://dnschecker.org) to confirm the root domain is resolving to the new Hostinger IP across regions. TTL is 300s so most resolvers should pick up the change within a few minutes.

---

## Rollback

If you need to revert:

1. Edit `cesfn.edu.mx.` A record → change IP back to `65.99.252.208`
2. Delete the `www` CNAME record
3. Click **Save All Records**

Changes will propagate within 5 minutes (due to the 300s TTL set in step 1).
