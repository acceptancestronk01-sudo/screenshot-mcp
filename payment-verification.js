// X402 Payment Verification Module
// Auto-generated: 2026-09-05

import { HTTPFacilitatorClient } from '@x402/core/server';

// Initialize Facilitator Client (mainnet)
const facilitatorClient = new HTTPFacilitatorClient({
  url: process.env.X402_FACILITATOR_URL || 'https://api.cdp.coinbase.com/platform/v2/x402'
});

/**
 * Verify x402 payment signature with facilitator
 * @param {string} paymentSignature - Payment signature from PAYMENT-SIGNATURE header
 * @param {object} paymentConfig - Payment configuration (price, currency, network, payTo)
 * @returns {Promise<object>} Verification result
 */
export async function verifyPaymentSignature(paymentSignature, paymentConfig) {
  try {
    const verificationResult = await facilitatorClient.verify({
      signature: paymentSignature,
      payment: {
        scheme: 'exact',
        network: paymentConfig.chainId,
        price: paymentConfig.price,
        currency: paymentConfig.currency,
        recipient: paymentConfig.payTo
      }
    });

    return {
      valid: verificationResult.valid,
      details: verificationResult
    };
  } catch (error) {
    console.error('Payment verification error:', error);
    return {
      valid: false,
      error: error.message
    };
  }
}

/**
 * Express middleware for x402 payment verification
 * @param {object} paymentConfig - Payment configuration
 * @returns {Function} Express middleware function
 */
export function createPaymentMiddleware(paymentConfig) {
  return async function verifyX402Payment(req, res, next) {
    const paymentSignature = req.headers['payment-signature'] || req.headers['x-payment'];

    // No payment signature provided
    if (!paymentSignature) {
      return res.status(402).json({
        error: 'Payment Required',
        message: 'This endpoint requires x402 payment',
        payment: {
          scheme: 'exact',
          network: paymentConfig.chainId,
          price: '$' + paymentConfig.price,
          currency: paymentConfig.currency,
          payTo: paymentConfig.payTo
        },
        instructions: 'Include payment signature in PAYMENT-SIGNATURE header (x402 v2) or X-PAYMENT header (x402 v1)'
      });
    }

    // Verify payment signature with facilitator
    const verification = await verifyPaymentSignature(paymentSignature, paymentConfig);

    if (!verification.valid) {
      return res.status(402).json({
        error: 'Invalid Payment',
        message: 'Payment signature verification failed',
        details: verification.error || 'Signature could not be verified',
        payment: {
          scheme: 'exact',
          network: paymentConfig.chainId,
          price: '$' + paymentConfig.price,
          currency: paymentConfig.currency,
          payTo: paymentConfig.payTo
        }
      });
    }

    // Payment verified! Add details to request and continue
    req.paymentVerified = true;
    req.paymentDetails = verification.details;
    next();
  };
}
