
interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
}

const RESEND_API_KEY = 're_BKN5qBAk_AyXqWP1JGharRXhtezZNCiM4';

export const sendEmail = async ({ to, subject, text }: SendEmailParams): Promise<{ success: boolean, message: string }> => {
  try {
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
        text
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

    return { 
      success: true,
      message: 'Email sent successfully'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};
