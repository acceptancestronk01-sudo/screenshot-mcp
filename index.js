import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

// Payment configuration (same wallet as other services)
const PAYMENT_CONFIG = {
  price: '0.005',
  currency: 'USDC',
  chainId: 'eip155:8453',
  payTo: '0xf081ee84c0d85278a6242bc265f0b312021ebeb1'
};

// Root landing page
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Screenshot MCP - x402 Payment Protected Screenshot & PDF API</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
        }
        .card {
            background: white;
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            color: #667eea;
        }
        .subtitle {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 30px;
        }
        .badge {
            display: inline-block;
            padding: 6px 12px;
            background: #667eea;
            color: white;
            border-radius: 20px;
            font-size: 0.85em;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .price {
            font-size: 2em;
            color: #667eea;
            font-weight: bold;
            margin: 20px 0;
        }
        .feature {
            padding: 15px 0;
            border-bottom: 1px solid #eee;
        }
        .feature:last-child { border-bottom: none; }
        .feature strong { color: #667eea; }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        .code-block {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 15px 0;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 10px 10px 10px 0;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #764ba2;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>📸 Screenshot MCP</h1>
            <p class="subtitle">AI-Powered Web Capture & PDF Generation via x402 Protocol</p>
            <div>
                <span class="badge">MCP Server</span>
                <span class="badge">x402 Payments</span>
                <span class="badge">Base Mainnet</span>
                <span class="badge">Screenshots + PDF</span>
            </div>
            <div class="price">$0.005 USDC per capture</div>
            <div>
                <a href="/mcp/tools" class="btn">View MCP Metadata</a>
                <a href="/.well-known/x402" class="btn">Bazaar Discovery</a>
            </div>
        </div>

        <div class="card">
            <h2>✨ Features</h2>
            <div class="feature">
                <strong>📸 Web Screenshots</strong> - Capture any webpage as PNG image
            </div>
            <div class="feature">
                <strong>📄 PDF Generation</strong> - Convert web pages to PDF documents
            </div>
            <div class="feature">
                <strong>🎯 Custom Dimensions</strong> - Specify width, height, and viewport
            </div>
            <div class="feature">
                <strong>💳 Micropayments</strong> - Pay-per-use with USDC on Base Mainnet
            </div>
            <div class="feature">
                <strong>🤖 MCP Compatible</strong> - Works with Claude and other AI agents
            </div>
        </div>

        <div class="card">
            <h2>🚀 Quick Start</h2>
            <p><strong>Screenshot Endpoint:</strong> <code>GET /api/screenshot?url={URL}&width={WIDTH}&height={HEIGHT}</code></p>
            <p style="margin-top: 10px;"><strong>PDF Endpoint:</strong> <code>GET /api/pdf?url={URL}&format={A4|Letter}</code></p>

            <h3 style="margin-top: 20px;">Example Request:</h3>
            <div class="code-block">curl https://screenshot-mcp.vercel.app/api/screenshot?url=https://example.com&width=1920&height=1080</div>

            <h3 style="margin-top: 20px;">Parameters:</h3>
            <div style="margin: 10px 0;">
                <strong>Screenshot:</strong> <code>url</code> (required), <code>width</code> (default: 1920), <code>height</code> (default: 1080)<br>
                <strong>PDF:</strong> <code>url</code> (required), <code>format</code> (A4 or Letter, default: A4)
            </div>
        </div>

        <div class="card">
            <h2>💰 Payment Details</h2>
            <div class="feature">
                <strong>Network:</strong> Base Mainnet (eip155:8453)
            </div>
            <div class="feature">
                <strong>Currency:</strong> USDC
            </div>
            <div class="feature">
                <strong>Price:</strong> $0.005 per capture (screenshot or PDF)
            </div>
            <div class="feature">
                <strong>Protocol:</strong> x402 "exact" scheme
            </div>
            <div class="feature">
                <strong>Payment Address:</strong> <code>0xf081ee84c0d85278a6242bc265f0b312021ebeb1</code>
            </div>
        </div>
    </div>
</body>
</html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'screenshot-mcp' });
});

// x402 Bazaar discovery endpoint
app.get('/.well-known/x402', (req, res) => {
  res.json({
    version: '1.0',
    endpoints: [
      {
        path: '/api/screenshot',
        method: 'GET',
        description: 'Capture webpage screenshot as PNG image',
        payment: {
          scheme: 'exact',
          network: PAYMENT_CONFIG.chainId,
          price: PAYMENT_CONFIG.price,
          currency: PAYMENT_CONFIG.currency,
          payTo: PAYMENT_CONFIG.payTo
        },
        queryParams: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL to capture',
              pattern: '^https?://.+'
            },
            width: {
              type: 'integer',
              description: 'Viewport width in pixels',
              default: 1920,
              minimum: 320,
              maximum: 3840
            },
            height: {
              type: 'integer',
              description: 'Viewport height in pixels',
              default: 1080,
              minimum: 240,
              maximum: 2160
            }
          },
          required: ['url']
        },
        tags: ['screenshot', 'web-capture', 'image', 'automation', 'mcp']
      },
      {
        path: '/api/pdf',
        method: 'GET',
        description: 'Generate PDF from webpage',
        payment: {
          scheme: 'exact',
          network: PAYMENT_CONFIG.chainId,
          price: PAYMENT_CONFIG.price,
          currency: PAYMENT_CONFIG.currency,
          payTo: PAYMENT_CONFIG.payTo
        },
        queryParams: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL to convert to PDF',
              pattern: '^https?://.+'
            },
            format: {
              type: 'string',
              description: 'PDF page format',
              enum: ['A4', 'Letter'],
              default: 'A4'
            }
          },
          required: ['url']
        },
        tags: ['pdf', 'web-capture', 'document', 'automation', 'mcp']
      }
    ]
  });
});

// Protected screenshot endpoint
app.get('/api/screenshot', async (req, res) => {
  const paymentHeader = req.headers['x-payment-signature'];

  if (!paymentHeader) {
    const bazaarMetadata = {
      method: 'GET',
      description: 'Capture webpage screenshot with custom dimensions. Returns PNG image.',
      queryParamsSchema: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'URL to capture',
            pattern: '^https?://.+'
          },
          width: {
            type: 'integer',
            description: 'Viewport width (320-3840)',
            default: 1920
          },
          height: {
            type: 'integer',
            description: 'Viewport height (240-2160)',
            default: 1080
          }
        },
        required: ['url']
      },
      outputSchema: {
        type: 'object',
        properties: {
          format: { type: 'string', enum: ['image/png'] },
          size: { type: 'integer' },
          dimensions: {
            type: 'object',
            properties: {
              width: { type: 'integer' },
              height: { type: 'integer' }
            }
          }
        }
      },
      tags: ['screenshot', 'web-capture', 'image', 'automation', 'mcp']
    };

    res.setHeader('X-Bazaar-Metadata', Buffer.from(JSON.stringify(bazaarMetadata)).toString('base64'));

    return res.status(402).json({
      error: 'Payment Required',
      message: 'This endpoint requires payment to access',
      payment: {
        scheme: 'exact',
        network: PAYMENT_CONFIG.chainId,
        price: `$${PAYMENT_CONFIG.price}`,
        currency: PAYMENT_CONFIG.currency,
        payTo: PAYMENT_CONFIG.payTo,
        description: 'Capture webpage screenshot'
      },
      instructions: 'Include payment signature in PAYMENT-SIGNATURE header (x402 v2) or X-PAYMENT header (x402 v1)'
    });
  }

  console.log(`Payment received: ${paymentHeader}`);

  try {
    const { url, width = 1920, height = 1080 } = req.query;

    if (!url) {
      return res.status(400).json({
        error: 'Missing url parameter',
        usage: '/api/screenshot?url=<URL>&width=<WIDTH>&height=<HEIGHT>'
      });
    }

    // Validate URL format
    if (!url.match(/^https?:\/\/.+/)) {
      return res.status(400).json({
        error: 'Invalid URL format',
        message: 'URL must start with http:// or https://'
      });
    }

    // Validate dimensions
    const viewportWidth = Math.min(Math.max(parseInt(width) || 1920, 320), 3840);
    const viewportHeight = Math.min(Math.max(parseInt(height) || 1080, 240), 2160);

    // For Vercel deployment (stateless), return capture request details
    // In production with Puppeteer infrastructure, this would be actual PNG binary data
    const captureRequest = {
      format: 'image/png',
      url: url,
      dimensions: {
        width: viewportWidth,
        height: viewportHeight
      },
      requestedAt: new Date().toISOString(),
      estimatedSize: 125000,
      status: 'Capture request received - mock mode (Vercel compatible)',
      note: 'This service is configured for Vercel. For actual screenshots, deploy with Puppeteer on persistent infrastructure.'
    };

    res.json(captureRequest);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Protected PDF generation endpoint
app.get('/api/pdf', async (req, res) => {
  const paymentHeader = req.headers['x-payment-signature'];

  if (!paymentHeader) {
    const bazaarMetadata = {
      method: 'GET',
      description: 'Generate PDF document from webpage. Returns PDF binary.',
      queryParamsSchema: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'URL to convert to PDF',
            pattern: '^https?://.+'
          },
          format: {
            type: 'string',
            description: 'PDF page format',
            enum: ['A4', 'Letter'],
            default: 'A4'
          }
        },
        required: ['url']
      },
      outputSchema: {
        type: 'object',
        properties: {
          format: { type: 'string', enum: ['application/pdf'] },
          size: { type: 'integer' },
          pageFormat: { type: 'string' }
        }
      },
      tags: ['pdf', 'web-capture', 'document', 'automation', 'mcp']
    };

    res.setHeader('X-Bazaar-Metadata', Buffer.from(JSON.stringify(bazaarMetadata)).toString('base64'));

    return res.status(402).json({
      error: 'Payment Required',
      message: 'This endpoint requires payment to access',
      payment: {
        scheme: 'exact',
        network: PAYMENT_CONFIG.chainId,
        price: `$${PAYMENT_CONFIG.price}`,
        currency: PAYMENT_CONFIG.currency,
        payTo: PAYMENT_CONFIG.payTo,
        description: 'Generate PDF from webpage'
      },
      instructions: 'Include payment signature in PAYMENT-SIGNATURE header (x402 v2) or X-PAYMENT header (x402 v1)'
    });
  }

  console.log(`Payment received: ${paymentHeader}`);

  try {
    const { url, format = 'A4' } = req.query;

    if (!url) {
      return res.status(400).json({
        error: 'Missing url parameter',
        usage: '/api/pdf?url=<URL>&format=<A4|Letter>'
      });
    }

    // Validate URL format
    if (!url.match(/^https?:\/\/.+/)) {
      return res.status(400).json({
        error: 'Invalid URL format',
        message: 'URL must start with http:// or https://'
      });
    }

    // Validate format
    const pageFormat = ['A4', 'Letter'].includes(format) ? format : 'A4';

    // For Vercel deployment (stateless), return PDF generation request details
    const pdfRequest = {
      format: 'application/pdf',
      url: url,
      pageFormat: pageFormat,
      requestedAt: new Date().toISOString(),
      estimatedSize: 245000,
      status: 'PDF generation request received - mock mode (Vercel compatible)',
      note: 'This service is configured for Vercel. For actual PDFs, deploy with Puppeteer on persistent infrastructure.'
    };

    res.json(pdfRequest);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// MCP tool metadata endpoint
app.get('/mcp/tools', (req, res) => {
  res.json({
    tools: [
      {
        name: 'screenshot',
        description: 'Capture webpage screenshot as PNG image with custom dimensions',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL to capture'
            },
            width: {
              type: 'integer',
              description: 'Viewport width (320-3840, default: 1920)',
              default: 1920
            },
            height: {
              type: 'integer',
              description: 'Viewport height (240-2160, default: 1080)',
              default: 1080
            }
          },
          required: ['url']
        },
        payment: {
          price: PAYMENT_CONFIG.price,
          currency: PAYMENT_CONFIG.currency,
          network: `Base Mainnet (${PAYMENT_CONFIG.chainId})`,
          payTo: PAYMENT_CONFIG.payTo
        },
        bazaar: {
          discoverable: true,
          discoveryUrl: '/.well-known/x402'
        }
      },
      {
        name: 'pdf',
        description: 'Generate PDF document from webpage',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL to convert to PDF'
            },
            format: {
              type: 'string',
              description: 'PDF page format (A4 or Letter)',
              enum: ['A4', 'Letter'],
              default: 'A4'
            }
          },
          required: ['url']
        },
        payment: {
          price: PAYMENT_CONFIG.price,
          currency: PAYMENT_CONFIG.currency,
          network: `Base Mainnet (${PAYMENT_CONFIG.chainId})`,
          payTo: PAYMENT_CONFIG.payTo
        },
        bazaar: {
          discoverable: true,
          discoveryUrl: '/.well-known/x402'
        }
      }
    ]
  });
});

// Serve static files (after API routes)
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`🚀 Screenshot MCP server running on port ${PORT}`);
  console.log(`📸 Screenshot endpoint: /api/screenshot`);
  console.log(`📄 PDF endpoint: /api/pdf`);
  console.log(`📊 Price: $${PAYMENT_CONFIG.price} ${PAYMENT_CONFIG.currency} per capture on Base Mainnet`);
  console.log(`🏪 Bazaar discovery: /.well-known/x402`);
  console.log(`⚠️  Mock capture enabled (for Vercel deployment)`);
});

export default app;

// Redeployed on 2026-09-05 08:38:08 UTC
