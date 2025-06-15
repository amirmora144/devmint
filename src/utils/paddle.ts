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
  };
  customer?: {
    email?: string;
  };
  settings?: {
    displayMode?: 'inline' | 'overlay';
    theme?: 'light' | 'dark';
    locale?: string;
  };
}

export class PaddleService {
  private static instance: PaddleService;
  private isInitialized = false;
  private readonly clientToken = 'live_09f0758b28567d8bcbf3f62f734'; // Your live client token
  private readonly environment = 'production';

  private constructor() {}

  static getInstance(): PaddleService {
    if (!PaddleService.instance) {
      PaddleService.instance = new PaddleService();
    }
    return PaddleService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      // Remove existing Paddle script if any
      const existingScript = document.querySelector('script[src*="paddle"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Load Paddle.js v2 script
      const script = document.createElement('script');
      script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
      script.async = true;
      
      script.onload = () => {
        try {
          if (window.Paddle) {
            // Initialize Paddle v2 with client token
            window.Paddle.Initialize({
              token: this.clientToken,
              environment: this.environment,
              eventCallback: this.handlePaddleEvent.bind(this)
            });
            
            this.isInitialized = true;
            console.log('Paddle v2 initialized successfully');
            resolve();
          } else {
            throw new Error('Paddle object not available');
          }
        } catch (error) {
          console.error('Paddle initialization error:', error);
          reject(error);
        }
      };

      script.onerror = () => {
        console.error('Failed to load Paddle.js script');
        reject(new Error('Failed to load Paddle.js'));
      };

      document.head.appendChild(script);
    });
  }

  private handlePaddleEvent(data: any) {
    console.log('Paddle Event:', data);
    
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
      default:
        console.log('Unhandled Paddle event:', data.name);
    }
  }

  private handleCheckoutCompleted(data: any) {
    console.log('Payment completed successfully:', data);
    
    const customData = data.data?.custom_data;
    const transactionId = data.data?.transaction?.id || data.data?.id;
    
    if (customData?.planType === 'donation') {
      // Handle donation completion
      this.showSuccessMessage(
        'Thank you for your generous donation! 🙏',
        `Your support helps us continue building amazing tools for developers.`,
        transactionId
      );
      
      // Redirect to dashboard with success indicator
      setTimeout(() => {
        window.location.href = '/dashboard?payment=success&type=donation';
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
        window.location.href = '/dashboard?payment=success&plan=' + planName;
      }, 3000);
    }
  }

  private handleCheckoutClosed(data: any) {
    console.log('Checkout closed by user:', data);
    // Optionally show a message or track the abandonment
  }

  private handleCheckoutError(data: any) {
    console.error('Checkout error occurred:', data);
    const errorMessage = data.error?.message || data.message || 'An unknown error occurred during payment processing.';
    
    this.showErrorMessage(
      'Payment Failed',
      `We encountered an issue processing your payment: ${errorMessage}`,
      'Please try again or contact our support team if the problem persists.'
    );
  }

  private showSuccessMessage(title: string, message: string, transactionId?: string) {
    const fullMessage = transactionId 
      ? `${message}\n\nTransaction ID: ${transactionId}\n\nYou will receive a confirmation email shortly.`
      : `${message}\n\nYou will receive a confirmation email shortly.`;
    
    alert(`${title}\n\n${fullMessage}`);
  }

  private showErrorMessage(title: string, message: string, suggestion: string) {
    alert(`${title}\n\n${message}\n\n${suggestion}\n\nIf you need help, contact support@devmint.site`);
  }

  async openCheckout(options: PaddleCheckoutOptions): Promise<void> {
    if (!this.isInitialized) {
      console.log('Initializing Paddle...');
      await this.initialize();
    }

    if (!window.Paddle) {
      throw new Error('Paddle is not available');
    }

    console.log('Opening Paddle checkout with options:', options);

    try {
      // Prepare checkout options for Paddle v2
      const checkoutOptions = {
        items: options.items.map(item => ({
          priceId: item.priceId,
          quantity: item.quantity || 1
        })),
        customData: {
          userId: 'user_' + Date.now(), // Generate a temporary user ID
          timestamp: new Date().toISOString(),
          ...options.customData
        },
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

      console.log('Final checkout options:', checkoutOptions);
      
      // Open Paddle v2 checkout
      window.Paddle.Checkout.open(checkoutOptions);
      
    } catch (error) {
      console.error('Error opening checkout:', error);
      throw new Error(`Failed to open checkout: ${error}`);
    }
  }

  // Create a donation checkout - Note: You'll need to create products in Paddle dashboard
  async createDonationCheckout(amount: number, description: string = 'Donation to Devmint'): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    // Validate minimum amount
    if (amount < 1) {
      throw new Error('Minimum donation amount is $1.00');
    }

    try {
      // For donations, you'll need to create donation products in your Paddle dashboard
      // with different price points, or use Paddle's custom pricing API
      
      // For now, let's show instructions to the user
      const confirmed = confirm(
        `Donation Feature Setup Required\n\n` +
        `To process your $${amount.toFixed(2)} donation, we need to set up donation products in our Paddle dashboard.\n\n` +
        `Would you like us to contact you about processing this donation?\n\n` +
        `Click OK to send an email with your donation intent, or Cancel to go back.`
      );
      
      if (confirmed) {
        const subject = encodeURIComponent(`Donation Intent - $${amount.toFixed(2)}`);
        const body = encodeURIComponent(
          `Hi Devmint Team,\n\n` +
          `I would like to make a donation of $${amount.toFixed(2)} to support your work.\n\n` +
          `Description: ${description}\n\n` +
          `Please set up a payment link for this donation amount and send it to me.\n\n` +
          `Thank you for building amazing developer tools!\n\n` +
          `Best regards`
        );
        
        window.open(`mailto:support@devmint.site?subject=${subject}&body=${body}`);
        
        // Show follow-up message
        setTimeout(() => {
          alert(
            'Thank you for your donation intent!\n\n' +
            'We\'ve opened your email client with a pre-filled message.\n\n' +
            'Our team will respond within 24 hours with a secure payment link for your donation.'
          );
        }, 1000);
      }

    } catch (error) {
      console.error('Donation checkout error:', error);
      throw new Error(`Failed to process donation: ${error}`);
    }
  }

  // Check if Paddle is ready
  isReady(): boolean {
    return this.isInitialized && !!window.Paddle;
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
      clientToken: this.clientToken.substring(0, 10) + '...',
      isInitialized: this.isInitialized,
      paddleAvailable: !!window.Paddle
    };
  }
}

export const paddle = PaddleService.getInstance();