import * as React from 'react';
import { Send, Loader2, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  errors: Record<string, string>;
}

export function ContactForm() {
  const [formState, setFormState] = React.useState<FormState>({
    status: 'idle',
    message: '',
    errors: {},
  });

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormState({ status: 'loading', message: '', errors: {} });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      privacy: formData.get('privacy') === 'on',
      website: formData.get('website') as string, // Honeypot field
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setFormState({
            status: 'error',
            message: 'Por favor corrige los errores del formulario',
            errors: result.errors,
          });
        } else {
          setFormState({
            status: 'error',
            message: result.error || 'Error al enviar el mensaje',
            errors: {},
          });
        }
        return;
      }

      setFormState({
        status: 'success',
        message: 'Mensaje enviado correctamente. Te responderemos pronto.',
        errors: {},
      });

      formRef.current?.reset();

      setTimeout(() => {
        setFormState({ status: 'idle', message: '', errors: {} });
      }, 5000);
    } catch {
      setFormState({
        status: 'error',
        message: 'Error de conexión. Verifica tu internet e intenta de nuevo.',
        errors: {},
      });
    }
  };

  const isLoading = formState.status === 'loading';
  const isSuccess = formState.status === 'success';
  const isError = formState.status === 'error';

  const inputClasses = (fieldName: string) =>
    cn(
      'flex h-11 w-full rounded-lg border-2 bg-background px-4 py-2 text-base transition-all',
      'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-primary focus-visible:border-primary hover:border-primary/50',
      'disabled:cursor-not-allowed disabled:opacity-50',
      formState.errors[fieldName]
        ? 'border-red-500 focus-visible:ring-red-500'
        : 'border-input'
    );

  return (
    <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
      {/* Honeypot field - invisible para usuarios, visible para bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {(isSuccess || (isError && !Object.keys(formState.errors).length)) && (
        <div
          className={cn(
            'flex items-center gap-3 p-4 rounded-lg',
            isSuccess
              ? 'bg-green-50 text-green-700 border border-green-200'
              : '',
            isError ? 'bg-red-50 text-red-700 border border-red-200' : ''
          )}
        >
          {isSuccess ? (
            <CheckCircle className="size-5 shrink-0" />
          ) : (
            <AlertCircle className="size-5 shrink-0" />
          )}
          <p className="text-sm font-medium">{formState.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-foreground flex items-center gap-2"
          >
            <span>Nombre completo</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={isLoading}
            placeholder="Juan Pérez"
            className={inputClasses('name')}
          />
          {formState.errors.name && (
            <p className="text-sm text-red-500">{formState.errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-foreground flex items-center gap-2"
          >
            <span>Email</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={isLoading}
            placeholder="juan@ejemplo.com"
            className={inputClasses('email')}
          />
          {formState.errors.email && (
            <p className="text-sm text-red-500">{formState.errors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="text-sm font-semibold text-foreground flex items-center gap-2"
        >
          <span>Asunto</span>
          <span className="text-red-500">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          disabled={isLoading}
          placeholder="¿En qué podemos ayudarte?"
          className={inputClasses('subject')}
        />
        {formState.errors.subject && (
          <p className="text-sm text-red-500">{formState.errors.subject}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-semibold text-foreground flex items-center gap-2"
        >
          <span>Mensaje</span>
          <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          disabled={isLoading}
          rows={6}
          placeholder="Cuéntanos más detalles sobre tu consulta o comentario..."
          className={cn(inputClasses('message'), 'min-h-[150px] py-3 resize-none')}
        />
        {formState.errors.message && (
          <p className="text-sm text-red-500">{formState.errors.message}</p>
        )}
      </div>

      <div
        className={cn(
          'flex items-start gap-3 p-4 rounded-lg border',
          formState.errors.privacy
            ? 'bg-red-50 border-red-200'
            : 'bg-muted/50'
        )}
      >
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          required
          disabled={isLoading}
          className="mt-1 size-4 rounded border-input accent-primary cursor-pointer"
        />
        <label
          htmlFor="privacy"
          className="text-sm text-muted-foreground cursor-pointer"
        >
          Acepto la{' '}
          <a
            href="/politicas/politica-de-privacidad"
            className="text-primary hover:underline font-medium"
          >
            política de privacidad
          </a>{' '}
          y el tratamiento de mis datos personales
        </label>
      </div>
      {formState.errors.privacy && (
        <p className="text-sm text-red-500 -mt-4">{formState.errors.privacy}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || isSuccess}
        className={cn(
          'w-full inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4',
          'text-base font-semibold text-primary-foreground transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          isSuccess
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5',
          'disabled:pointer-events-none disabled:opacity-70',
          'active:translate-y-0'
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Enviando...
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle className="size-5" />
            Enviado!
          </>
        ) : (
          <>
            <Send className="size-5" />
            Enviar mensaje
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Clock className="size-4" />
        <span>Responderemos en menos de 24 horas hábiles</span>
      </div>
    </form>
  );
}
