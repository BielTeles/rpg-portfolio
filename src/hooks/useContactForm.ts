import { useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG, EMAIL_STATUS } from '@/config/constants';

interface ContactFormData {
  name: string;
  email: string;
  questType: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  questType: '',
  message: ''
};

export const useContactForm = () => {
  const [contactForm, setContactForm] = useState<ContactFormData>(initialFormData);
  const [emailStatus, setEmailStatus] = useState<keyof typeof EMAIL_STATUS>('IDLE');
  const [emailMessage, setEmailMessage] = useState('');

  const updateForm = useCallback((field: keyof ContactFormData, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setContactForm(initialFormData);
    setEmailStatus('IDLE');
    setEmailMessage('');
  }, []);

  const handleContactSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (emailStatus === 'SENDING') return;
    
    setEmailStatus('SENDING');
    
    try {
      const templateParams = {
        from_name: contactForm.name,
        from_email: contactForm.email,
        quest_type: contactForm.questType || 'Aventura Geral',
        message: contactForm.message,
        to_name: 'Gabriel Teles Rosa'
      };

      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAIL_CONFIG.PUBLIC_KEY
      );

      setEmailStatus('SUCCESS');
      setEmailMessage('🎉 Sua quest foi enviada com sucesso! Responderei em breve, aventureiro!');
      
      // Auto-reset after 5 seconds
      setTimeout(() => {
        resetForm();
      }, 5000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailStatus('ERROR');
      setEmailMessage('❌ Falha ao enviar a quest. Por favor, tente novamente ou use métodos alternativos.');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setEmailStatus('IDLE');
        setEmailMessage('');
      }, 3000);
    }
  }, [contactForm, emailStatus, resetForm]);

  return {
    contactForm,
    emailStatus,
    emailMessage,
    updateForm,
    resetForm,
    handleContactSubmit
  };
}; 