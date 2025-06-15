// Paddle webhook handler for processing payment events
// This file should be deployed to handle webhook notifications from Paddle

const crypto = require('crypto');

// Your Paddle webhook secret key
const PADDLE_WEBHOOK_SECRET = 'pdl_ntfset_01jxn3cq8ty0nsvp7vq4h7aqwb_Tmr4c87MsJgNz6ff8SErCq2dAG0UWH8+';

// Verify Paddle webhook signature
function verifyPaddleSignature(body, signature, secret) {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body, 'utf8')
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

// Process different types of Paddle events
function processWebhookEvent(eventData) {
  const { event_type, data } = eventData;
  
  console.log(`Processing Paddle event: ${event_type}`);
  console.log('Event data:', JSON.stringify(data, null, 2));
  
  switch (event_type) {
    case 'transaction.completed':
      handleTransactionCompleted(data);
      break;
    
    case 'transaction.created':
      handleTransactionCreated(data);
      break;
    
    case 'subscription.created':
      handleSubscriptionCreated(data);
      break;
    
    case 'subscription.updated':
      handleSubscriptionUpdated(data);
      break;
    
    case 'subscription.canceled':
      handleSubscriptionCanceled(data);
      break;
    
    case 'subscription.paused':
      handleSubscriptionPaused(data);
      break;
    
    case 'subscription.resumed':
      handleSubscriptionResumed(data);
      break;
    
    case 'customer.created':
      handleCustomerCreated(data);
      break;
    
    case 'customer.updated':
      handleCustomerUpdated(data);
      break;
    
    default:
      console.log(`Unhandled event type: ${event_type}`);
  }
}

function handleTransactionCompleted(data) {
  console.log('Transaction completed:', data.id);
  
  const customData = data.custom_data || {};
  const customerEmail = data.customer?.email;
  const amount = data.details?.totals?.total;
  const currency = data.currency_code;
  
  // Handle different transaction types
  if (customData.planType === 'donation') {
    console.log(`Donation completed: ${amount} ${currency} from ${customerEmail}`);
    // Process donation - update donor records, send thank you email, etc.
    processDonation({
      transactionId: data.id,
      amount: amount,
      currency: currency,
      customerEmail: customerEmail,
      customData: customData
    });
  } else {
    console.log(`Subscription payment completed: ${amount} ${currency} from ${customerEmail}`);
    // Process subscription payment - update user account, grant access, etc.
    processSubscriptionPayment({
      transactionId: data.id,
      amount: amount,
      currency: currency,
      customerEmail: customerEmail,
      planType: customData.planType,
      billingCycle: customData.billingCycle,
      customData: customData
    });
  }
}

function handleTransactionCreated(data) {
  console.log('Transaction created:', data.id);
  // Log transaction creation for tracking
}

function handleSubscriptionCreated(data) {
  console.log('Subscription created:', data.id);
  
  const customerEmail = data.customer?.email;
  const planId = data.items?.[0]?.price?.id;
  
  // Activate user's subscription
  activateUserSubscription({
    subscriptionId: data.id,
    customerEmail: customerEmail,
    planId: planId,
    status: data.status,
    nextBilledAt: data.next_billed_at
  });
}

function handleSubscriptionUpdated(data) {
  console.log('Subscription updated:', data.id);
  
  // Update user's subscription details
  updateUserSubscription({
    subscriptionId: data.id,
    status: data.status,
    nextBilledAt: data.next_billed_at,
    items: data.items
  });
}

function handleSubscriptionCanceled(data) {
  console.log('Subscription canceled:', data.id);
  
  // Handle subscription cancellation
  cancelUserSubscription({
    subscriptionId: data.id,
    canceledAt: data.canceled_at,
    reason: data.cancellation_reason
  });
}

function handleSubscriptionPaused(data) {
  console.log('Subscription paused:', data.id);
  
  // Handle subscription pause
  pauseUserSubscription({
    subscriptionId: data.id,
    pausedAt: data.paused_at
  });
}

function handleSubscriptionResumed(data) {
  console.log('Subscription resumed:', data.id);
  
  // Handle subscription resume
  resumeUserSubscription({
    subscriptionId: data.id,
    resumedAt: data.resumed_at
  });
}

function handleCustomerCreated(data) {
  console.log('Customer created:', data.id);
  
  // Create or update customer record
  createOrUpdateCustomer({
    customerId: data.id,
    email: data.email,
    name: data.name,
    createdAt: data.created_at
  });
}

function handleCustomerUpdated(data) {
  console.log('Customer updated:', data.id);
  
  // Update customer record
  updateCustomer({
    customerId: data.id,
    email: data.email,
    name: data.name,
    updatedAt: data.updated_at
  });
}

// Business logic functions (implement these based on your needs)
function processDonation(donationData) {
  // TODO: Implement donation processing logic
  // - Update donor database
  // - Send thank you email
  // - Update donation analytics
  console.log('Processing donation:', donationData);
}

function processSubscriptionPayment(paymentData) {
  // TODO: Implement subscription payment processing logic
  // - Update user account with new plan
  // - Grant access to premium features
  // - Send confirmation email
  console.log('Processing subscription payment:', paymentData);
}

function activateUserSubscription(subscriptionData) {
  // TODO: Implement subscription activation logic
  // - Update user's plan in database
  // - Set subscription status to active
  // - Grant access to features
  console.log('Activating user subscription:', subscriptionData);
}

function updateUserSubscription(subscriptionData) {
  // TODO: Implement subscription update logic
  // - Update subscription details in database
  // - Adjust user's access level if plan changed
  console.log('Updating user subscription:', subscriptionData);
}

function cancelUserSubscription(cancellationData) {
  // TODO: Implement subscription cancellation logic
  // - Update subscription status
  // - Schedule access removal for end of billing period
  // - Send cancellation confirmation
  console.log('Canceling user subscription:', cancellationData);
}

function pauseUserSubscription(pauseData) {
  // TODO: Implement subscription pause logic
  // - Update subscription status
  // - Maintain access during pause period
  console.log('Pausing user subscription:', pauseData);
}

function resumeUserSubscription(resumeData) {
  // TODO: Implement subscription resume logic
  // - Update subscription status
  // - Resume billing and access
  console.log('Resuming user subscription:', resumeData);
}

function createOrUpdateCustomer(customerData) {
  // TODO: Implement customer creation/update logic
  // - Create or update customer record in database
  // - Sync with user accounts
  console.log('Creating/updating customer:', customerData);
}

function updateCustomer(customerData) {
  // TODO: Implement customer update logic
  // - Update customer details in database
  console.log('Updating customer:', customerData);
}

// Main webhook handler function
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the raw body and signature
    const body = JSON.stringify(req.body);
    const signature = req.headers['paddle-signature'];

    if (!signature) {
      console.error('Missing Paddle signature header');
      return res.status(400).json({ error: 'Missing signature' });
    }

    // Verify the webhook signature
    if (!verifyPaddleSignature(body, signature, PADDLE_WEBHOOK_SECRET)) {
      console.error('Invalid Paddle signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Process the webhook event
    processWebhookEvent(req.body);

    // Respond with success
    res.status(200).json({ success: true, message: 'Webhook processed successfully' });

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export for testing
module.exports.verifyPaddleSignature = verifyPaddleSignature;
module.exports.processWebhookEvent = processWebhookEvent;