'use client';

import * as React from 'react';
import { CalendarCheck2, Send } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export function ConsultationDialog({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = React.useState('');

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      setStatus('idle');
      setMessage('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get('_honey')) {
      setStatus('success');
      return;
    }

    if (!formData.get('consent')) {
      setStatus('error');
      setMessage('Pred odoslaním potvrďte súhlas so spracovaním údajov.');
      return;
    }

    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/matikaren.info@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          city: formData.get('city'),
          message: formData.get('message'),
          consent: 'Áno – súhlas so spracovaním údajov na účel kontaktovania',
          _subject: 'Nová žiadosť o bezplatnú konzultáciu – Matikáreň',
          _template: 'table',
          _captcha: 'false',
          _honey: '',
        }),
      });

      const result = (await response.json()) as { success?: boolean | string; message?: string };
      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error(result.message || 'Požiadavku sa nepodarilo odoslať.');
      }

      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
      setMessage('Požiadavku sa nepodarilo odoslať. Skúste to, prosím, ešte raz.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className={cn(
          'booking-pulse button-font inline-flex items-center justify-center rounded-xl bg-[#0b5cff] font-extrabold text-white shadow-[0_12px_28px_rgba(0,75,255,.35)] transition hover:bg-[#2470ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8cb7ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071c50]',
          compact ? 'hidden px-5 py-3 text-[14px] sm:inline-flex' : 'px-6 py-3 text-[15px]',
        )}
      >
        {compact ? 'Bezplatná konzultácia' : 'Objednať bezplatnú konzultáciu'}
      </DialogTrigger>

      <DialogContent showCloseButton={false} className="max-h-[92vh] max-w-4xl overflow-y-auto rounded-2xl border border-[#c7d8f5] bg-white p-6 text-[#153373] shadow-2xl sm:p-8">
        {status === 'success' ? (
          <>
            <DialogHeader className="items-center text-center">
              <span className="grid size-14 place-items-center rounded-full bg-[#eaf2ff] text-[#075cff]">
                <CalendarCheck2 className="size-7" />
              </span>
              <DialogTitle className="mt-2 text-[24px] font-extrabold text-[#09266f]">Konzultácia je objednaná</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-center text-[15px] font-medium leading-relaxed text-[#405a8c]">
              Vaša požiadavka bola odoslaná. Ozveme sa vám čo najskôr.
            </DialogDescription>
            <DialogFooter className="-mx-6 -mb-6 mt-2 border-[#dce6f8] bg-[#f7faff] px-6 py-4 sm:-mx-8 sm:-mb-8 sm:px-8">
              <DialogClose className="rounded-lg bg-[#075cff] px-5 py-2.5 text-[14px] font-bold text-white transition hover:bg-[#064dcc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075cff] focus-visible:ring-offset-2">
                Zavrieť
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-[27px] font-extrabold text-[#09266f]">Objednať bezplatnú konzultáciu</DialogTitle>
              <DialogDescription className="text-[14px] leading-relaxed text-[#526891]">
                Napíšte nám svoje kontaktné údaje a stručne opíšte, s čím potrebujete pomôcť.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="consultation-name" className="text-[14px] font-bold text-[#153373]">Vaše meno *</Label>
                  <Input id="consultation-name" name="name" required maxLength={80} autoComplete="name" className="h-12 border-[#bdcff0] bg-[#f9fbff] px-4 text-[15px] text-[#153373]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultation-email" className="text-[14px] font-bold text-[#153373]">E-mail *</Label>
                  <Input id="consultation-email" name="email" type="email" required maxLength={120} autoComplete="email" className="h-12 border-[#bdcff0] bg-[#f9fbff] px-4 text-[15px] text-[#153373]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultation-phone" className="text-[14px] font-bold text-[#153373]">Telefón *</Label>
                  <Input id="consultation-phone" name="phone" type="tel" required maxLength={30} autoComplete="tel" className="h-12 border-[#bdcff0] bg-[#f9fbff] px-4 text-[15px] text-[#153373]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultation-city" className="text-[14px] font-bold text-[#153373]">Mesto *</Label>
                  <Input id="consultation-city" name="city" required maxLength={100} autoComplete="address-level2" className="h-12 border-[#bdcff0] bg-[#f9fbff] px-4 text-[15px] text-[#153373]" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="consultation-message" className="text-[14px] font-bold text-[#153373]">Správa pre nás</Label>
                <Textarea
                  id="consultation-message"
                  name="message"
                  maxLength={2000}
                  rows={4}
                  placeholder="Napr. ročník, téma, cieľ alebo preferovaný spôsob doučovania…"
                  className="min-h-28 resize-y border-[#bdcff0] bg-[#f9fbff] px-4 py-3 text-[15px] leading-relaxed text-[#153373]"
                />
              </div>

              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <Label htmlFor="consultation-consent" className="items-start gap-3 text-[12px] font-medium leading-[1.5] text-[#526891]">
                <Checkbox id="consultation-consent" name="consent" value="yes" required className="mt-0.5" />
                Súhlasím so spracovaním osobných údajov na účel kontaktovania.
              </Label>

              {status === 'error' && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-700">{message}</p>}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <DialogClose className="rounded-lg border border-[#bdcff0] bg-white px-5 py-2.5 text-[14px] font-bold text-[#153373] transition hover:bg-[#f2f6fd]">Zrušiť</DialogClose>
                <button type="submit" disabled={status === 'sending'} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#075cff] px-6 py-3 text-[14px] font-extrabold text-white transition hover:bg-[#064dcc] disabled:cursor-wait disabled:opacity-70">
                  <Send className="size-4" />
                  {status === 'sending' ? 'Odosielam…' : 'Odoslať požiadavku'}
                </button>
              </div>
              <p className="text-center text-[11px] leading-relaxed text-[#7182a4]">Požiadavka sa odošle na matikaren.info@gmail.com.</p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
