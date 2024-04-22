'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/libs/utils';

type EmblaCarouselProps = {
  slides: {
    src: string;
    alt: string;
  }[];
  direction: 'rtl' | 'ltr';
  vertical?: boolean;
};

const VerticalThumb = ({
  slides,
  direction,
  vertical = false,
}: EmblaCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    direction: direction,
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    direction: direction,
    containScroll: 'keepSnaps',
    dragFree: true,
    axis: vertical ? 'y' : 'x',
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div
      className={cn('hidden w-96 sm:flex', {
        'w-24 flex-col': vertical,
      })}
    >
      <div
        className={cn('overflow-hidden rounded-md', {
          'flex flex-col': vertical,
        })}
        ref={emblaThumbsRef}
      >
        <div className={cn('flex h-24 gap-2')}>
          {slides.map(({ alt, src }, index) => (
            <div
              key={index}
              className={cn(
                'relative aspect-square rounded-md opacity-75 brightness-50',
                {
                  'border opacity-100 brightness-100': index === selectedIndex,
                },
              )}
            >
              <Image
                onClick={() => onThumbClick(index)}
                src={src}
                alt={alt}
                fill
                sizes='100vw'
                className='rounded-md object-cover hover:cursor-pointer'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalThumb;
