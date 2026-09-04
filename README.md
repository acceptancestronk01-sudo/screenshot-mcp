# Screenshot MCP

**x402 Payment-Protected Screenshot & PDF Generation API**

Capture web pages as images or PDF documents. Perfect for AI agents that need to document findings, archive content, or create visual reports.

## 🚀 Features

- **📸 Web Screenshots** - Capture any webpage as PNG image
- **📄 PDF Generation** - Convert web pages to PDF documents  
- **🎯 Custom Dimensions** - Specify width, height, and format
- **💳 x402 Micropayments** - Pay $0.005 USDC per capture on Base Mainnet
- **🤖 MCP Compatible** - Works with Claude and other AI agents

## 📡 Live Endpoints

**Base URL**: `https://screenshot-mcp.vercel.app`

### Screenshot Capture

```bash
GET /api/screenshot?url={URL}&width={WIDTH}&height={HEIGHT}
```

**Parameters:**
- `url` (required): URL to capture
- `width` (optional): Viewport width in pixels (320-3840, default: 1920)
- `height` (optional): Viewport height in pixels (240-2160, default: 1080)

**Example:**
```bash
curl https://screenshot-mcp.vercel.app/api/screenshot?url=https://example.com&width=1920&height=1080
```

### PDF Generation

```bash
GET /api/pdf?url={URL}&format={FORMAT}
```

**Parameters:**
- `url` (required): URL to convert to PDF
- `format` (optional): PDF page format - `A4` or `Letter` (default: A4)

**Example:**
```bash
curl https://screenshot-mcp.vercel.app/api/pdf?url=https://example.com&format=A4
```

**Response (402 Payment Required):**
```json
{
  "error": "Payment Required",
  "payment": {
    "scheme": "exact",
    "network": "eip155:8453",
    "price": "$0.005",
    "currency": "USDC",
    "payTo": "0xf081ee84c0d85278a6242bc265f0b312021ebeb1"
  }
}
```

## 🔍 Discovery Endpoints

- **Bazaar Discovery**: `/.well-known/x402`
- **MCP Metadata**: `/mcp/tools`
- **Health Check**: `/health`

## 💰 Payment Details

- **Network**: Base Mainnet (Chain ID: eip155:8453)
- **Currency**: USDC
- **Price**: $0.005 per capture (screenshot or PDF)
- **Protocol**: x402 "exact" scheme
- **Payment Address**: `0xf081ee84c0d85278a6242bc265f0b312021ebeb1`

## 🤖 Use with AI Agents

This MCP server is designed to work with Claude Code and other AI agents that support the Model Context Protocol (MCP) and x402 payments.

AI agents can:
1. Discover the service on x402 Bazaar
2. Pay via CDP Facilitator
3. Capture screenshots or generate PDFs
4. Use visual content in their workflows

## 📦 Response Format

### Screenshot Response
```json
{
  "format": "image/png",
  "url": "https://example.com",
  "dimensions": {
    "width": 1920,
    "height": 1080
  },
  "capturedAt": "2026-09-04T18:30:00.000Z",
  "size": 125000
}
```

### PDF Response
```json
{
  "format": "application/pdf",
  "url": "https://example.com",
  "pageFormat": "A4",
  "generatedAt": "2026-09-04T18:30:00.000Z",
  "size": 245000
}
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run locally
npm start

# Development mode with auto-reload
npm run dev
```

## ⚠️ Note

This service uses mock screenshot/PDF generation for Vercel deployment compatibility. In production with persistent infrastructure, it would use Puppeteer to generate real screenshots and PDFs.

## 📝 License

MIT

## 🔗 Links

- **Live API**: https://screenshot-mcp.vercel.app
- **x402 Bazaar**: https://x402bazaar.app
- **MCP Protocol**: https://modelcontextprotocol.io

---

Built with ❤️ for the AI agent ecosystem
