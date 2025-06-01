
import { useNotifications } from '@/context/NotificationContext';
import { useCallback } from 'react';

export const useNotificationTriggers = () => {
  const { addNotification } = useNotifications();

  const notifySuccess = useCallback((title: string, message: string, action?: { label: string; onClick: () => void }) => {
    addNotification({
      type: 'success',
      title,
      message,
      action
    });
  }, [addNotification]);

  const notifyError = useCallback((title: string, message: string, action?: { label: string; onClick: () => void }) => {
    addNotification({
      type: 'error',
      title,
      message,
      action
    });
  }, [addNotification]);

  const notifyWarning = useCallback((title: string, message: string, action?: { label: string; onClick: () => void }) => {
    addNotification({
      type: 'warning',
      title,
      message,
      action
    });
  }, [addNotification]);

  const notifyInfo = useCallback((title: string, message: string, action?: { label: string; onClick: () => void }) => {
    addNotification({
      type: 'info',
      title,
      message,
      action
    });
  }, [addNotification]);

  const notifyPaymentSuccess = useCallback((amount: number, upiId: string) => {
    notifySuccess(
      'Payment Received',
      `₹${amount.toFixed(2)} received successfully via ${upiId}`,
      {
        label: 'View Receipt',
        onClick: () => {
          console.log('View payment receipt');
          // Add navigation to receipt here
        }
      }
    );
  }, [notifySuccess]);

  const notifyQRGenerated = useCallback((amount: number) => {
    notifyInfo(
      'QR Code Generated',
      `Payment QR code created for ₹${amount.toFixed(2)}`,
      {
        label: 'Download QR',
        onClick: () => {
          console.log('Download QR code');
          // Add QR download functionality here
        }
      }
    );
  }, [notifyInfo]);

  const notifyEmailSent = useCallback((recipient: string) => {
    notifySuccess(
      'Email Sent',
      `Receipt sent successfully to ${recipient}`
    );
  }, [notifySuccess]);

  const notifyEmailFailed = useCallback((recipient: string, error: string) => {
    notifyError(
      'Email Failed',
      `Failed to send receipt to ${recipient}: ${error}`,
      {
        label: 'Retry',
        onClick: () => {
          console.log('Retry sending email');
          // Add retry functionality here
        }
      }
    );
  }, [notifyError]);

  return {
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
    notifyPaymentSuccess,
    notifyQRGenerated,
    notifyEmailSent,
    notifyEmailFailed
  };
};
