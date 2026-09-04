'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';

const PHONE_URI = 'tel:+421944275203';

export function CallLink({ onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    event.preventDefault();
    window.location.href = PHONE_URI;
  };

  return <a {...props} href={PHONE_URI} onClick={handleClick} />;
}
