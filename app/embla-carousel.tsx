'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { cn } from '@/libs/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type EmblaCarouselProps = {
  slides: {
    src: string;
    alt: string;
  }[];
};

export default function EmblaCarousel({ slides }: EmblaCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
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

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  return (
    <div className='space-y-5 p-2'>
      <div className='group w-96 shadow-sm border rounded-md relative'>
        <div
          className='overflow-hidden rounded-md hover:cursor-grab active:cursor-grabbing'
          ref={emblaMainRef}
        >
          <div className='flex gap-x-2'>
            {slides.map(({ alt, src }, index) => (
              <div
                key={index}
                className='relative flex-[0_0_100%] aspect-square'
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes='100vw'
                  className='object-cover rounded-md'
                />
              </div>
            ))}
          </div>
        </div>

        <div className='opacity-0 group-hover:opacity-100 duration-300 ease-out transform transition-opacity'>
          <div className='absolute bottom-3 left-3 flex gap-x-2'>
            <button
              onClick={scrollPrev}
              className='bg-white size-8 rounded-full flex items-center justify-center'
            >
              <ChevronLeft className='pr-[2px]' />
            </button>
            <button
              onClick={scrollNext}
              className='bg-white size-8 rounded-full flex items-center justify-center'
            >
              <ChevronRight className='pl-[2px]' />
            </button>
          </div>
        </div>
      </div>

      <div className='w-96 mt-3 flex justify-between'>
        <div className='overflow-hidden rounded-md' ref={emblaThumbsRef}>
          <div className='flex gap-x-2 h-24'>
            {slides.map(({ alt, src }, index) => (
              <div
                key={index}
                className={cn(
                  'relative aspect-square border rounded-md brightness-50 opacity-75',
                  {
                    'brightness-100 opacity-100': index === selectedIndex,
                  }
                )}
              >
                <Image
                  onClick={() => onThumbClick(index)}
                  src={src}
                  alt={alt}
                  fill
                  sizes='100vw'
                  className='object-cover rounded-md hover:cursor-pointer'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
