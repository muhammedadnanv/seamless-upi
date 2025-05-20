
interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

// This is a publishable API key for Resend
const RESEND_API_KEY = 're_BKN5qBAk_AyXqWP1JGharRXhtezZNCiM4';

/**
 * Sends an email using the Resend API
 * @param params Email parameters (to, subject, text)
 * @returns Promise with success status and message
 */
export const sendEmail = async ({ to, subject, text, html }: SendEmailParams): Promise<{ success: boolean, message: string }> => {
  try {
    console.log('Sending email to:', to);
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'CodeCashier <receipts@codecashier.app>',
        to: [to],
        subject,
        text,
        html: html || undefined
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Email sending error:', data);
      return { 
        success: false, 
        message: data.message || 'Failed to send email'
      };
    }

    console.log('Email sent successfully:', data);
    return { 
      success: true,
      message: 'Email sent successfully'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
};
