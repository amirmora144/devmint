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
            // Initialize Paddle v2 with correct parameters
            window.Paddle.Initialize({
              token: this.clientToken,
              eventCallback: this.handlePaddleEvent.bind(this)
            });
            
            this.isInitialized = true;
            console.log('✅ Paddle v2 initialized successfully');
            console.log('🔑 Client Token:', this.clientToken.substring(0, 15) + '...');
            console.log('🏪 Seller ID:', this.sellerId);
            console.log('🌍 Environment: Production (Live)');
            resolve();
          } else {
            throw new Error('Paddle object not available after script load');
          }
        } catch (error) {
          console.error('❌ Paddle initialization error:', error);
          this.isInitialized = false;
          reject(error);
        }
      };

      script.onerror = (error) => {
        console.error('❌ Failed to load Paddle.js script:', error);
        reject(new Error('Failed to load Paddle.js script'));
      };

      document.head.appendChild(script);
      console.log('📦 Paddle script added to document head');
    });
  }

  private handlePaddleEvent(data: any) {
    console.log('🎯 Paddle Event Received:', data);
    
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
          console.log('✅ Checkout loaded successfully');
          break;
        case 'checkout.customer.created':
          console.log('👤 Customer created:', data);
          break;
        case 'checkout.payment.initiated':
          console.log('💳 Payment initiated:', data);
          break;
        case 'checkout.payment.completed':
          console.log('✅ Payment completed:', data);
          break;
        default:
          console.log('ℹ️ Unhandled Paddle event:', data.name, data);
      }
    } catch (error) {
      console.error('❌ Error handling Paddle event:', error);
    }
  }

  private handleCheckoutCompleted(data: any) {
    console.log('🎉 Payment completed successfully:', data);
    
    try {
      const transactionData = data.data;
      const customData = transactionData?.custom_data || {};
      const transactionId = transactionData?.transaction?.id || transactionData?.id;
      const customerEmail = transactionData?.customer?.email;
      
      console.log('📄 Transaction ID:', transactionId);
      console.log('📧 Customer Email:', customerEmail);
      console.log('📊 Custom Data:', customData);
      
      if (customData?.planType === 'donation') {
        this.showSuccessMessage(
          'Thank you for your generous donation! 🙏',
          `Your support helps us continue building amazing tools for developers.`,
          transactionId
        );
        
        setTimeout(() => {
          window.location.href = '/dashboard?payment=success&type=donation&txn=' + transactionId;
        }, 3000);
      } else {
        const planName = customData?.planType || 'Premium';
        const billingCycle = customData?.billingCycle || 'monthly';
        
        this.showSuccessMessage(
          'Subscription activated successfully! 🎉',
          `Welcome to the ${planName} plan (${billingCycle})! You now have access to all premium features.`,
          transactionId
        );
        
        setTimeout(() => {
          window.location.href = '/dashboard?payment=success&plan=' + planName + '&txn=' + transactionId;
        }, 3000);
      }
    } catch (error) {
      console.error('❌ Error processing checkout completion:', error);
    }
  }

  private handleCheckoutClosed(data: any) {
    console.log('🚪 Checkout closed by user:', data);
  }

  private handleCheckoutError(data: any) {
    console.error('❌ Checkout error occurred:', data);
    
    try {
      const errorMessage = data.error?.message || data.message || 'An unknown error occurred during payment processing.';
      
      this.showErrorMessage(
        'Payment Failed',
        `We encountered an issue processing your payment: ${errorMessage}`,
        'Please try again or contact our support team if the problem persists.'
      );
    } catch (error) {
      console.error('❌ Error handling checkout error:', error);
    }
  }

  private showSuccessMessage(title: string, message: string, transactionId?: string) {
    const fullMessage = transactionId 
      ? `${message}\n\nTransaction ID: ${transactionId}\n\nYou will receive a confirmation email shortly.`
      : `${message}\n\nYou will receive a confirmation email shortly.`;
    
    // Create a beautiful success notification
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 24px;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3);
        z-index: 10000;
        max-width: 420px;
        font-family: system-ui, -apple-system, sans-serif;
        animation: slideIn 0.3s ease-out;
      ">
        <style>
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        </style>
        <h3 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700;">${title}</h3>
        <p style="margin: 0; font-size: 15px; line-height: 1.5; opacity: 0.95;">${fullMessage}</p>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);
  }

  private showErrorMessage(title: string, message: string, suggestion: string) {
    const fullMessage = `${message}\n\n${suggestion}\n\nIf you need help, contact support@devmint.site`;
    
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #EF4444, #DC2626);
        color: white;
        padding: 24px;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(239, 68, 68, 0.3);
        z-index: 10000;
        max-width: 420px;
        font-family: system-ui, -apple-system, sans-serif;
        animation: slideIn 0.3s ease-out;
      ">
        <h3 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700;">${title}</h3>
        <p style="margin: 0; font-size: 15px; line-height: 1.5; opacity: 0.95;">${fullMessage}</p>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 8000);
  }

  async openCheckout(options: PaddleCheckoutOptions): Promise<void> {
    console.log('🚀 Opening checkout with options:', options);
    
    if (!this.isInitialized) {
      console.log('⏳ Paddle not initialized, initializing now...');
      await this.initialize();
    }

    if (!window.Paddle) {
      throw new Error('Paddle is not available after initialization');
    }

    try {
      // Prepare checkout options for Paddle v2 with proper structure
      const checkoutOptions: any = {
        items: options.items.map(item => ({
          priceId: item.priceId,
          quantity: item.quantity || 1
        }))
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

      // Add settings with proper defaults for overlay mode
      checkoutOptions.settings = {
        displayMode: 'overlay',
        theme: 'light',
        locale: 'en',
        allowLogout: false,
        showAddTaxId: true,
        showAddDiscounts: true,
        frameTarget: 'self',
        frameInitialHeight: 450,
        frameStyle: 'width: 100%; min-width: 312px; background-color: transparent; border: none;',
        ...options.settings
      };

      console.log('📋 Final checkout options:', JSON.stringify(checkoutOptions, null, 2));
      
      // Ensure Paddle is ready before opening checkout
      if (!window.Paddle.Checkout) {
        throw new Error('Paddle Checkout is not available');
      }

      // Open Paddle v2 checkout
      console.log('🎯 Opening Paddle checkout...');
      window.Paddle.Checkout.open(checkoutOptions);
      console.log('✅ Paddle checkout opened successfully');
      
    } catch (error) {
      console.error('❌ Error opening checkout:', error);
      throw new Error(`Failed to open checkout: ${error}`);
    }
  }

  // Create a donation checkout using the Testing invoice product
  async createDonationCheckout(amount: number, description: string = 'Donation to Devmint'): Promise<void> {
    console.log(`💝 Creating donation checkout for $${amount}`);
    
    if (!this.isInitialized) {
      await this.initialize();
    }

    // Validate minimum amount
    if (amount < 1) {
      throw new Error('Minimum donation amount is $1.00');
    }

    try {
      // Use the Testing invoice product for donations
      const donationProductId = 'pro_01jxj37mv7xyy7kmkewmta6dze'; // Testing invoice product ($1)
      const quantity = Math.round(amount); // Round to nearest dollar
      
      console.log(`💰 Using product ${donationProductId} with quantity ${quantity} for $${amount} donation`);
      
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
      console.error('❌ Donation checkout error:', error);
      throw new Error(`Failed to process donation: ${error}`);
    }
  }

  // Check if Paddle is ready
  isReady(): boolean {
    const ready = this.isInitialized && !!window.Paddle && !!window.Paddle.Checkout;
    console.log('🔍 Paddle ready status:', ready);
    return ready;
  }

  // Get Paddle status
  getStatus(): string {
    if (!this.isInitialized) return 'Not initialized';
    if (!window.Paddle) return 'Paddle not loaded';
    if (!window.Paddle.Checkout) return 'Checkout not available';
    return 'Ready';
  }

  // Get environment info
  getEnvironmentInfo(): object {
    return {
      sellerId: this.sellerId,
      clientToken: this.clientToken.substring(0, 15) + '...',
      isInitialized: this.isInitialized,
      paddleAvailable: !!window.Paddle,
      checkoutAvailable: !!(window.Paddle && window.Paddle.Checkout),
      status: this.getStatus(),
      environment: 'production'
    };
  }

  // Force re-initialization (useful for debugging)
  async forceReinitialize(): Promise<void> {
    console.log('🔄 Force re-initializing Paddle...');
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

  // Test checkout functionality
  async testCheckout(): Promise<void> {
    console.log('🧪 Testing Paddle checkout functionality...');
    
    if (!this.isReady()) {
      throw new Error('Paddle is not ready for testing');
    }

    // Test with Professional Plan Monthly
    const testOptions = {
      items: [{
        priceId: 'pri_01jxkfd08h8gwv7mqxw1ah948b', // Pro Monthly
        quantity: 1
      }],
      customData: {
        planType: 'pro',
        billingCycle: 'monthly',
        isTest: true
      },
      settings: {
        displayMode: 'overlay' as const,
        theme: 'light' as const
      }
    };

    console.log('🎯 Opening test checkout...');
    await this.openCheckout(testOptions);
  }
}

export const paddle = PaddleService.getInstance();