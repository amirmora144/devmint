// Paddle.js v2 integration utility for real-time payments
declare global {
  interface Window {
    Paddle: any;
  }
}

export interface PaddleCheckoutOptions {
  items: Array<{
    priceId: string;
    quantity?: number;
  }>;
  customData?: {
    userId?: string;
    planType?: string;
    billingCycle?: string;
    [key: string]: any;
  };
  customer?: {
    email?: string;
  };
  settings?: {
    displayMode?: 'inline' | 'overlay';
    theme?: 'light' | 'dark';
    locale?: string;
    allowLogout?: boolean;
    showAddTaxId?: boolean;
    showAddDiscounts?: boolean;
  };
}

export class PaddleService {
  private static instance: PaddleService;
  private isInitialized = false;
  private readonly clientToken = 'live_09f0758b28567d8bcbf3f62f734'; // Your live client token
  private readonly environment = 'production';
  private readonly sellerId = '233505';

  private constructor() {}

  static getInstance(): PaddleService {
    if (!PaddleService.instance) {
      PaddleService.instance = new PaddleService();
    }
    return PaddleService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('Paddle already initialized');
      return;
    }

    return new Promise((resolve, reject) => {
      // Remove existing Paddle script if any
      const existingScript = document.querySelector('script[src*="paddle"]');
      if (existingScript) {
        existingScript.remove();
        console.log('Removed existing Paddle script');
      }

      // Load Paddle.js v2 script
      const script = document.createElement('script');
      script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
      script.async = true;
      
      script.onload = () => {
        try {
          console.log('Paddle script loaded, initializing...');
          
          if (window.Paddle) {
            // Initialize Paddle v2 with client token
            window.Paddle.Initialize({
              token: this.clientToken,
              environment: this.environment,
              eventCallback: this.handlePaddleEvent.bind(this)
            });
            
            this.isInitialized = true;
            console.log('Paddle v2 initialized successfully with environment:', this.environment);
            console.log('Seller ID:', this.sellerId);
            resolve();
          } else {
            throw new Error('Paddle object not available after script load');
          }
        } catch (error) {
          console.error('Paddle initialization error:', error);
          this.isInitialized = false;
          reject(error);
        }
      };

      script.onerror = (error) => {
        console.error('Failed to load Paddle.js script:', error);
        reject(new Error('Failed to load Paddle.js script'));
      };

      document.head.appendChild(script);
      console.log('Paddle script added to document head');
    });
  }

  private handlePaddleEvent(data: any) {
    console.log('Paddle Event Received:', data);
    
    try {
      switch (data.name) {
        case 'checkout.completed':
          this.handleCheckoutCompleted(data);
          break;
        case 'checkout.closed':
          this.handleCheckoutClosed(data);
          break;
        case 'checkout.error':
          this.handleCheckoutError(data);
          break;
        case 'checkout.loaded':
          console.log('Checkout loaded successfully');
          break;
        case 'checkout.customer.created':
          console.log('Customer created:', data);
          break;
        case 'checkout.payment.initiated':
          console.log('Payment initiated:', data);
          break;
        case 'checkout.payment.completed':
          console.log('Payment completed:', data);
          break;
        default:
          console.log('Unhandled Paddle event:', data.name, data);
      }
    } catch (error) {
      console.error('Error handling Paddle event:', error);
    }
  }

  private handleCheckoutCompleted(data: any) {
    console.log('Payment completed successfully:', data);
    
    try {
      const transactionData = data.data;
      const customData = transactionData?.custom_data || {};
      const transactionId = transactionData?.transaction?.id || transactionData?.id;
      const customerEmail = transactionData?.customer?.email;
      
      console.log('Transaction ID:', transactionId);
      console.log('Customer Email:', customerEmail);
      console.log('Custom Data:', customData);
      
      if (customData?.planType === 'donation') {
        // Handle donation completion
        this.showSuccessMessage(
          'Thank you for your generous donation! 🙏',
          `Your support helps us continue building amazing tools for developers.`,
          transactionId
        );
        
        // Redirect to dashboard with success indicator
        setTimeout(() => {
          window.location.href = '/dashboard?payment=success&type=donation&txn=' + transactionId;
        }, 3000);
      } else {
        // Handle subscription completion
        const planName = customData?.planType || 'Premium';
        const billingCycle = customData?.billingCycle || 'monthly';
        
        this.showSuccessMessage(
          'Subscription activated successfully! 🎉',
          `Welcome to the ${planName} plan (${billingCycle})! You now have access to all premium features.`,
          transactionId
        );
        
        // Redirect to dashboard with success indicator
        setTimeout(() => {
          window.location.href = '/dashboard?payment=success&plan=' + planName + '&txn=' + transactionId;
        }, 3000);
      }
    } catch (error) {
      console.error('Error processing checkout completion:', error);
    }
  }

  private handleCheckoutClosed(data: any) {
    console.log('Checkout closed by user:', data);
    // User closed the checkout without completing payment
    // This is normal behavior, no error needed
  }

  private handleCheckoutError(data: any) {
    console.error('Checkout error occurred:', data);
    
    try {
      const errorMessage = data.error?.message || data.message || 'An unknown error occurred during payment processing.';
      
      this.showErrorMessage(
        'Payment Failed',
        `We encountered an issue processing your payment: ${errorMessage}`,
        'Please try again or contact our support team if the problem persists.'
      );
    } catch (error) {
      console.error('Error handling checkout error:', error);
    }
  }

  private showSuccessMessage(title: string, message: string, transactionId?: string) {
    const fullMessage = transactionId 
      ? `${message}\n\nTransaction ID: ${transactionId}\n\nYou will receive a confirmation email shortly.`
      : `${message}\n\nYou will receive a confirmation email shortly.`;
    
    // Create a more user-friendly success notification
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        font-family: system-ui, -apple-system, sans-serif;
      ">
        <h3 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">${title}</h3>
        <p style="margin: 0; font-size: 14px; line-height: 1.4;">${fullMessage}</p>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 5000);
  }

  private showErrorMessage(title: string, message: string, suggestion: string) {
    const fullMessage = `${message}\n\n${suggestion}\n\nIf you need help, contact support@devmint.site`;
    
    // Create a more user-friendly error notification
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #EF4444, #DC2626);
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        font-family: system-ui, -apple-system, sans-serif;
      ">
        <h3 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">${title}</h3>
        <p style="margin: 0; font-size: 14px; line-height: 1.4;">${fullMessage}</p>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 8 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 8000);
  }

  async openCheckout(options: PaddleCheckoutOptions): Promise<void> {
    console.log('Opening checkout with options:', options);
    
    if (!this.isInitialized) {
      console.log('Paddle not initialized, initializing now...');
      await this.initialize();
    }

    if (!window.Paddle) {
      throw new Error('Paddle is not available after initialization');
    }

    try {
      // Prepare checkout options for Paddle v2
      const checkoutOptions: any = {
        items: options.items.map(item => ({
          priceId: item.priceId,
          quantity: item.quantity || 1
        })),
        settings: {
          displayMode: 'overlay',
          theme: 'light',
          locale: 'en',
          allowLogout: false,
          showAddTaxId: true,
          showAddDiscounts: true,
          ...options.settings
        }
      };

      // Add customer information if provided
      if (options.customer?.email) {
        checkoutOptions.customer = {
          email: options.customer.email
        };
      }

      // Add custom data if provided
      if (options.customData) {
        checkoutOptions.customData = {
          userId: 'user_' + Date.now(),
          timestamp: new Date().toISOString(),
          source: 'devmint_website',
          ...options.customData
        };
      }

      console.log('Final checkout options:', checkoutOptions);
      
      // Open Paddle v2 checkout
      window.Paddle.Checkout.open(checkoutOptions);
      console.log('Paddle checkout opened successfully');
      
    } catch (error) {
      console.error('Error opening checkout:', error);
      throw new Error(`Failed to open checkout: ${error}`);
    }
  }

  // Create a donation checkout using the Testing invoice product
  async createDonationCheckout(amount: number, description: string = 'Donation to Devmint'): Promise<void> {
    console.log(`Creating donation checkout for $${amount}`);
    
    if (!this.isInitialized) {
      await this.initialize();
    }

    // Validate minimum amount
    if (amount < 1) {
      throw new Error('Minimum donation amount is $1.00');
    }

    try {
      // Use the Testing invoice product for donations
      // Note: This is a $1 product, so for larger amounts you might need to adjust quantity
      // or create additional products in your Paddle dashboard
      
      const donationProductId = 'pro_01jxj37mv7xyy7kmkewmta6dze'; // Testing invoice product ($1)
      const quantity = Math.round(amount); // Round to nearest dollar
      
      await this.openCheckout({
        items: [{
          priceId: donationProductId,
          quantity: quantity
        }],
        customData: {
          planType: 'donation',
          donationAmount: amount,
          description: description,
          isDonation: true
        },
        settings: {
          displayMode: 'overlay',
          theme: 'light',
          locale: 'en'
        }
      });

    } catch (error) {
      console.error('Donation checkout error:', error);
      throw new Error(`Failed to process donation: ${error}`);
    }
  }

  // Check if Paddle is ready
  isReady(): boolean {
    const ready = this.isInitialized && !!window.Paddle;
    console.log('Paddle ready status:', ready);
    return ready;
  }

  // Get Paddle status
  getStatus(): string {
    if (!this.isInitialized) return 'Not initialized';
    if (!window.Paddle) return 'Paddle not loaded';
    return 'Ready';
  }

  // Get environment info
  getEnvironmentInfo(): object {
    return {
      environment: this.environment,
      sellerId: this.sellerId,
      clientToken: this.clientToken.substring(0, 15) + '...',
      isInitialized: this.isInitialized,
      paddleAvailable: !!window.Paddle,
      status: this.getStatus()
    };
  }

  // Force re-initialization (useful for debugging)
  async forceReinitialize(): Promise<void> {
    console.log('Force re-initializing Paddle...');
    this.isInitialized = false;
    
    // Remove existing script
    const existingScript = document.querySelector('script[src*="paddle"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Clear window.Paddle
    if (window.Paddle) {
      delete window.Paddle;
    }
    
    await this.initialize();
  }
}

export const paddle = PaddleService.getInstance();