import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import {
  validateContactForm,
  sanitizeInput,
  type ContactFormData,
} from '@/lib/validation';

// Rate limiting configuration
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const RATE_LIMIT_MAX = 2; // 2 requests por minuto
const MAX_REQUEST_SIZE = 10 * 1024; // 10KB máximo

// Limpiar entradas expiradas cada 5 minutos para evitar memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now - record.timestamp > RATE_LIMIT_WINDOW * 2) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const securityHeaders = {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };

  const corsHeaders = {
    'Access-Control-Allow-Origin': import.meta.env.PROD
      ? 'https://ahorratranquilo.com'
      : '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const headers = { ...securityHeaders, ...corsHeaders };

  try {
    // Validar Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Content-Type debe ser application/json',
        }),
        { status: 415, headers }
      );
    }

    // Validar tamaño del request
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'El tamaño del request excede el límite permitido',
        }),
        { status: 413, headers }
      );
    }

    // Rate limiting
    const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.',
        }),
        {
          status: 429,
          headers: {
            ...headers,
            'Retry-After': '60',
            'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    const body = (await request.json()) as ContactFormData & { website?: string };

    // Honeypot: si el campo oculto tiene valor, es un bot
    if (body.website) {
      // Simular éxito para no alertar al bot
      return new Response(
        JSON.stringify({ success: true, message: 'Mensaje enviado correctamente' }),
        { status: 200, headers }
      );
    }

    const validation = validateContactForm(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: validation.errors,
        }),
        { status: 400, headers }
      );
    }

    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      subject: sanitizeInput(body.subject),
      message: sanitizeInput(body.message),
    };

    const resendApiKey = import.meta.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY no configurada');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Error de configuración del servidor',
        }),
        { status: 500, headers }
      );
    }

    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: 'Ahorra Tranquilo <soporte@support.ahorratranquilo.com>',
      to: ['soporte@support.ahorratranquilo.com'],
      replyTo: sanitizedData.email,
      subject: `[Contacto Web] ${sanitizedData.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0ea5a4 0%, #2dd4bf 100%); padding: 20px; border-radius: 8px 8px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 16px; }
            .label { font-weight: 600; color: #374151; margin-bottom: 4px; }
            .value { color: #1f2937; }
            .message-box { background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; }
            .footer { background: #f3f4f6; padding: 16px; text-align: center; color: #6b7280; font-size: 12px; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nuevo mensaje de contacto</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nombre:</div>
                <div class="value">${sanitizedData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></div>
              </div>
              <div class="field">
                <div class="label">Asunto:</div>
                <div class="value">${sanitizedData.subject}</div>
              </div>
              <div class="field">
                <div class="label">Mensaje:</div>
                <div class="message-box">${sanitizedData.message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              Recibido desde el formulario de contacto de ahorratranquilo.com
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error enviando email:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Error al enviar el mensaje. Intenta de nuevo.',
        }),
        { status: 500, headers }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Mensaje enviado correctamente',
      }),
      {
        status: 200,
        headers: {
          ...headers,
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        },
      }
    );
  } catch (err) {
    console.error('Error en endpoint de contacto:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error interno del servidor',
      }),
      { status: 500, headers }
    );
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': import.meta.env.PROD
        ? 'https://ahorratranquilo.com'
        : '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
