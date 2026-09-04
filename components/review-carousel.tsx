'use client';

import * as React from 'react';
import { MessageSquarePlus, Send, Star } from 'lucide-react';

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
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

const reviews = [
  {
    author: 'Lenka',
    text: 'P. Marcinka už na prvej hodine dokázal nášho pubertiaka povzbudiť a usmerniť v matematike. Náš 11-ročný syn sa teší na každé doučovanie s ním a berie to ako príjemné stretnutie s mladým chalanom, ktorý ho vedie k lepšej známke a k porozumeniu matematiky.\n\nVýber mladého doučovateľa p. Marcinka bola skvelá voľba. Ďakujeme.',
  },
  {
    author: 'Jana',
    text: 'Som veľmi spokojná. Mali sme síce ešte len prvé doučovanie, ale hneď ako skončilo, mi syn volal do práce celý natešený, že mu Juraj za jednu hodinu vysvetlil to, čo učiteľka nedokázala za 2 týždne, odkedy to berú. Určite budeme pokračovať, ďakujeme.',
  },
  {
    author: 'Alexandra',
    text: 'Juraj je veľmi milý, spoľahlivý a hlavne trpezlivý doučovateľ. Mojej dcére veľmi pomohol. Vychádzala jej 4 z matematiky, ale po pravidelnej práci s Jurajom jej teraz vychádza dvojka a do konca roka máme ešte veľa času, takže verím, že ľahko zvládneme aj 1. Ďakujeme, Jurko. :)',
  },
  {
    author: 'Kristína',
    text: 'Veľmi spoľahlivý, zodpovedný, vysvetľuje zrozumiteľne, odporúčam. Nám veľmi pomohol.',
  },
  {
    author: 'Andreja',
    text: 'Pán Marcinka, máte neskutočne dobrý vplyv na nášho Jakuba. Normálne si píše poznámky z matematiky kvôli vám :) a po prvom doučku vypočítal všetky príklady bez chyby – sám sa pochválil. On maká na sebe, lebo ste mu pomohli svojím prístupom pochopiť, že sa to dá :) Tešíme sa na nedeľné stretnutie a prajem pekný víkend.',
  },
  {
    author: 'Max',
    text: 'Čauko, urobil som prijímačky na školu, ktorú som chcel. Díky za tvoj čas a prípravu, veľmi si ťa vážim. Všetko dobré do života.',
  },
  {
    author: 'Jakub',
    text: 'Kurz bol perfektny, vsetko som si zopakoval a na Groslingovu ma prijali ak budem na strednej potrebovat doucko tak sa urcite ozvem.',
  },
  {
    author: 'Martina',
    text: 'Adam sa dosť zlepšil v matike, už nenosí domov trojky ale samé jednotky, ďakujeme',
  },
];

function FullReviewDialog({ author, text }: { author: string; text: string }) {
  return (
    <Dialog>
      <DialogTrigger className="shrink-0 rounded-lg bg-[#eaf2ff] px-3 py-2 text-[12px] font-extrabold text-[#075cff] transition hover:bg-[#dbe9ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075cff] focus-visible:ring-offset-2">
        Prečítať celé
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="max-h-[85vh] max-w-xl overflow-y-auto rounded-2xl border border-[#c7d8f5] bg-white p-6 text-[#153373] shadow-2xl sm:p-8">
        <DialogHeader className="gap-3">
          <div className="flex gap-1 text-[#ffb500]" aria-label="5 z 5 hviezdičiek">
            {[0, 1, 2, 3, 4].map((star) => (
              <Star key={star} className="size-5" fill="currentColor" strokeWidth={1.8} />
            ))}
          </div>
          <DialogTitle className="text-[22px] font-extrabold text-[#09266f]">{author}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="whitespace-pre-line text-[16px] font-medium leading-[1.75] text-[#1d376d]">
          „{text}“
        </DialogDescription>
        <DialogFooter className="-mx-6 -mb-6 mt-2 border-[#dce6f8] bg-[#f7faff] px-6 py-4 sm:-mx-8 sm:-mb-8 sm:px-8">
          <DialogClose className="rounded-lg bg-[#075cff] px-5 py-2.5 text-[14px] font-bold text-white transition hover:bg-[#064dcc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075cff] focus-visible:ring-offset-2">
            Zavrieť
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddReviewDialog() {
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
      setMessage('Pred odoslaním potvrďte súhlas so spracovaním recenzie.');
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
          message: formData.get('review'),
          consent: 'Áno – súhlas so spracovaním mena a textu recenzie',
          _subject: 'Nová recenzia z webu Matikáreň',
          _template: 'table',
          _captcha: 'false',
          _honey: '',
        }),
      });

      const result = (await response.json()) as { success?: boolean | string; message?: string };
      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error(result.message || 'Recenziu sa nepodarilo odoslať.');
      }

      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
      setMessage('Recenziu sa nepodarilo odoslať. Skúste to, prosím, ešte raz.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="inline-flex items-center gap-2 rounded-xl bg-[#075cff] px-5 py-3 text-[14px] font-extrabold text-white shadow-[0_10px_24px_rgba(7,92,255,.24)] transition hover:-translate-y-0.5 hover:bg-[#064dcc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075cff] focus-visible:ring-offset-2">
        <MessageSquarePlus className="size-5" />
        Pridať recenziu
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl border border-[#c7d8f5] bg-white p-6 text-[#153373] shadow-2xl sm:p-8">
        {status === 'success' ? (
          <>
            <DialogHeader className="items-center text-center">
              <span className="grid size-14 place-items-center rounded-full bg-[#eaf2ff] text-[#075cff]">
                <Send className="size-7" />
              </span>
              <DialogTitle className="mt-2 text-[24px] font-extrabold text-[#09266f]">Ďakujeme za recenziu</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-center text-[15px] font-medium leading-relaxed text-[#405a8c]">
              Vaša recenzia bola odoslaná Matikárni.
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
              <DialogTitle className="text-[24px] font-extrabold text-[#09266f]">Pridať recenziu</DialogTitle>
              <DialogDescription className="text-[14px] leading-relaxed text-[#526891]">
                Napíšte nám svoju skúsenosť.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="review-name" className="text-[14px] font-bold text-[#153373]">Meno</Label>
                <Input
                  id="review-name"
                  name="name"
                  required
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Vaše meno"
                  className="h-11 border-[#bdcff0] bg-[#f9fbff] px-4 text-[15px] text-[#153373]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review-text" className="text-[14px] font-bold text-[#153373]">Recenzia</Label>
                <Textarea
                  id="review-text"
                  name="review"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={6}
                  placeholder="Podeľte sa s nami o vašu skúsenosť s doučovaním…"
                  className="min-h-36 resize-y border-[#bdcff0] bg-[#f9fbff] px-4 py-3 text-[15px] leading-relaxed text-[#153373]"
                />
              </div>
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <Label htmlFor="review-consent" className="items-start gap-3 text-[12px] font-medium leading-[1.5] text-[#526891]">
                <Checkbox id="review-consent" name="consent" value="yes" required className="mt-0.5" />
                Súhlasím so spracovaním mena a textu recenzie.
              </Label>
              {status === 'error' && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-700">{message}</p>}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <DialogClose className="rounded-lg border border-[#bdcff0] bg-white px-5 py-2.5 text-[14px] font-bold text-[#153373] transition hover:bg-[#f2f6fd]">
                  Zrušiť
                </DialogClose>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#075cff] px-5 py-2.5 text-[14px] font-bold text-white transition hover:bg-[#064dcc] disabled:cursor-wait disabled:opacity-70"
                >
                  <Send className="size-4" />
                  {status === 'sending' ? 'Odosielam…' : 'Odoslať recenziu'}
                </button>
              </div>
              <p className="text-center text-[11px] leading-relaxed text-[#7182a4]">Údaje sa odošlú na matikaren.info@gmail.com cez zabezpečenú formulárovú službu.</p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ReviewCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!api) return;

    const updateCarousel = () => {
      setSelectedIndex(api.selectedScrollSnap());
      setScrollSnaps(api.scrollSnapList());
    };

    updateCarousel();
    api.on('select', updateCarousel);
    api.on('reInit', updateCarousel);

    return () => {
      api.off('select', updateCarousel);
      api.off('reInit', updateCarousel);
    };
  }, [api]);

  return (
    <div>
      <div className="mb-5 flex justify-center sm:justify-end">
        <AddReviewDialog />
      </div>
      <Carousel
        setApi={setApi}
        opts={{ align: 'start', loop: true }}
        className="mx-auto w-full px-7 sm:px-9"
        aria-label="Recenzie klientov"
      >
      <CarouselContent className="items-stretch">
        {reviews.map((review, index) => (
          <CarouselItem
            key={`${review.author}-${index}`}
            className="flex basis-full sm:basis-1/2 lg:basis-1/3"
            aria-label={`${index + 1} z ${reviews.length}`}
          >
            <figure className="relative flex h-[280px] w-full flex-col rounded-2xl border border-[#cad9f4] bg-[linear-gradient(145deg,#ffffff,#f5f9ff)] px-6 py-5 shadow-[0_12px_30px_rgba(25,69,150,.08)]">
              <div className="flex gap-1 text-[#ffb500]" aria-label="5 z 5 hviezdičiek">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} className="size-[18px]" fill="currentColor" strokeWidth={1.8} />
                ))}
              </div>
              <blockquote className="mt-3 line-clamp-7 whitespace-pre-line text-[15px] font-semibold leading-[1.55] text-[#1d376d]">
                „{review.text}“
              </blockquote>
              <figcaption className="mt-auto flex min-h-11 items-end justify-between gap-3 border-t border-[#dce6f8] pt-3">
                <span className="block pb-1 text-[16px] font-extrabold text-[#09266f]">{review.author}</span>
                {review.text.length > 180 && <FullReviewDialog author={review.author} text={review.text} />}
              </figcaption>
              <span aria-hidden="true" className="absolute right-5 top-3 text-5xl font-extrabold leading-none text-[#dce8ff]">”</span>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious
        aria-label="Predchádzajúca recenzia"
        className="left-0 size-10 border-[#b9cdf2] bg-white text-[#075cff] shadow-md hover:bg-[#edf4ff] hover:text-[#064dcc] disabled:opacity-60"
      />
      <CarouselNext
        aria-label="Ďalšia recenzia"
        className="right-0 size-10 border-[#b9cdf2] bg-white text-[#075cff] shadow-md hover:bg-[#edf4ff] hover:text-[#064dcc] disabled:opacity-60"
      />

        <div className="mt-5 flex justify-center gap-2" aria-label="Výber recenzie">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Zobraziť recenziu ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : undefined}
              className={cn(
                'h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075cff] focus-visible:ring-offset-2',
                index === selectedIndex ? 'w-7 bg-[#075cff]' : 'w-2.5 bg-[#b9cdf2] hover:bg-[#7ba5ee]',
              )}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
