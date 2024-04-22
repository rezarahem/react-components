'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { cn } from '@/libs/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DotButton, useDotButton } from './product-slider-dot-buttons';

type EmblaCarouselProps = {
  slides: {
    src: string;
    alt: string;
  }[];
  direction: 'rtl' | 'ltr';
  vertical?: boolean;
};

export default function ProductSlider({
  slides,
  direction,
  vertical = false,
}: EmblaCarouselProps) {
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

  const { selectedIndexDots, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaMainApi);

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

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  return (
    <>
      <div
        className={cn('mx-auto space-y-5 p-2 sm:mx-0 sm:space-y-3', {
          'sm:flex sm:flex-row-reverse sm:space-x-3 sm:space-y-0': vertical,
        })}
      >
        {/* MAIN SLIDER AND HOVER BUTTONS */}
        <div className='group relative w-96 rounded-md border shadow-sm'>
          <div
            className='overflow-hidden rounded-md hover:cursor-grab active:cursor-grabbing'
            ref={emblaMainRef}
          >
            <div className='flex gap-x-2'>
              {slides.map(({ alt, src }, index) => (
                <div
                  key={index}
                  className='relative aspect-square flex-[0_0_100%]'
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes='100vw'
                    className='rounded-md object-cover'
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='transform opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100'>
            <div className='absolute bottom-3 left-3 flex gap-x-2'>
              <button
                onClick={scrollPrev}
                disabled={selectedIndex === 0}
                className={cn(
                  'flex size-8 items-center justify-center rounded-full bg-white',
                  {
                    'cursor-default bg-gray-300 text-gray-400':
                      selectedIndex === 0,
                  },
                )}
              >
                <ChevronRight className='pl-[2px]' />
              </button>
              <button
                disabled={selectedIndex === slides.length - 1}
                onClick={scrollNext}
                className={cn(
                  'flex size-8 items-center justify-center rounded-full bg-white',
                  {
                    'cursor-default bg-gray-300 text-gray-400':
                      selectedIndex === slides.length - 1,
                  },
                )}
              >
                <ChevronLeft className='pr-[2px]' />
              </button>
            </div>
          </div>
        </div>

        {/* THUMBS - desktop */}
        <div className={cn('hidden w-96 sm:flex')}>
          <div
            className={cn('overflow-hidden rounded-md')}
            ref={emblaThumbsRef}
          >
            <div className={cn('flex h-24 gap-2')}>
              {slides.map(({ alt, src }, index) => (
                <div
                  key={index}
                  className={cn(
                    'relative aspect-square rounded-md opacity-75 brightness-50',
                    {
                      'border opacity-100 brightness-100':
                        index === selectedIndex,
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

        {/* BULLET BUTTONS - mobile */}
        <div className='flex items-center justify-center gap-x-5 sm:hidden'>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(
                'flex size-3 cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full bg-gray-400',
                {
                  'size-4 bg-black px-3': index === selectedIndex,
                },
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
}
