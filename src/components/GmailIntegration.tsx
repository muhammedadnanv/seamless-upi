
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/context/AppContext';
import { Send, Mail, MailOpen } from 'lucide-react';
import { sendEmail } from '@/utils/emailService';

const emailSchema = z.object({
  recipient: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Subject cannot be empty" }),
  message: z.string().min(1, { message: "Message cannot be empty" }),
});

const GmailIntegration = () => {
  const [isConnected, setIsConnected] = useState(true); // Default to connected since we're using Resend
  const [isSending, setIsSending] = useState(false);
  const { selectedItems, totalAmount } = useAppContext();
  
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      recipient: "",
      subject: "Payment Receipt from CodeCashier",
      message: "Thank you for your payment!",
    },
  });

  const connectGmail = () => {
    toast({
      title: "Email Service Connected",
      description: "You can now send emails directly from CodeCashier.",
    });
    setIsConnected(true);
  };

  const disconnectGmail = () => {
    toast({
      title: "Email Service Disconnected",
      description: "Email sending has been disabled.",
    });
    setIsConnected(false);
  };
  
  const onSubmit = async (data: z.infer<typeof emailSchema>) => {
    setIsSending(true);
    
    try {
      toast({
        title: "Sending Email",
        description: "Please wait while we send your email...",
      });
      
      const htmlContent = formatEmailAsHtml(data.message);
      
      const result = await sendEmail({
        to: data.recipient,
        subject: data.subject,
        text: data.message,
        html: htmlContent
      });
      
      if (result.success) {
        toast({
          title: "Email Sent",
          description: `Email to ${data.recipient} has been sent successfully.`,
        });
        
        form.reset({
          recipient: "",
          subject: "Payment Receipt from CodeCashier",
          message: "Thank you for your payment!",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Email Sending Failed",
        description: error instanceof Error ? error.message : "Failed to send email. Please try again.",
        variant: "destructive",
      });
      console.error("Email sending error:", error);
    } finally {
      setIsSending(false);
    }
  };

  // Format email as HTML for better presentation
  const formatEmailAsHtml = (text: string): string => {
    // Convert line breaks to HTML breaks
    return text
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^(.*)$/m, '<p>$1</p>');
  };

  const generateReceiptTemplate = () => {
    if (!selectedItems || selectedItems.length === 0) {
      return "Thank you for your payment!";
    }

    const itemsList = selectedItems
      .map(item => `- ${item.name}: ₹${item.price.toFixed(2)} x ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    return `Dear Customer,

Thank you for your payment with CodeCashier!

Items purchased:
${itemsList}

Total Amount: ₹${totalAmount.toFixed(2)}

Your payment has been received successfully. If you have any questions about your purchase, please don't hesitate to contact us.

Best regards,
The CodeCashier Team`;
  };

  return (
    <Card className="payment-card shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          Email Integration
        </CardTitle>
        <CardDescription>
          Send payment receipts and notifications directly via email
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!isConnected ? (
          <div className="flex flex-col items-center space-y-4 py-4">
            <p className="text-sm text-muted-foreground">Connect the email service to send emails through CodeCashier</p>
            <Button onClick={connectGmail} className="w-full">
              <Mail className="mr-2 h-4 w-4" /> Connect Email Service
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Email</FormLabel>
                    <FormControl>
                      <Input placeholder="customer@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Message</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                            Use Receipt Template
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start px-2 py-1.5 text-xs"
                            onClick={() => form.setValue("message", generateReceiptTemplate())}
                          >
                            Insert Payment Receipt
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormControl>
                      <Textarea rows={6} className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-2 justify-end pt-2">
                <Button type="submit" disabled={isSending}>
                  {isSending ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Email
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
      
      {isConnected && (
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <p className="text-xs text-muted-foreground">
            Connected to Email Service (Resend)
          </p>
          <Button variant="ghost" size="sm" onClick={disconnectGmail}>
            Disconnect
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default GmailIntegration;
