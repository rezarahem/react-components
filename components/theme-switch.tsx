'use client';

import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Button } from './button';
import { Monitor, MoonStar, Sun } from 'lucide-react';
import { cn } from '@/libs';

const getTheme = () => {
 return localStorage.getItem('theme');
};

const ThemeSwtich = () => {
 const { setTheme: upNextTheme } = useTheme();
 const [theme, upView] = useState(getTheme());

 const update = (t: 'light' | 'system' | 'dark') => {
  upNextTheme(t);
  upView(t);
 };

 return (
  <div className='inline-flex rounded-full p-[2px] gap-[2px] border border-input/40'>
   <Button
    onClick={(e) => {
     e.stopPropagation();
     e.preventDefault();
     update('light');
    }}
    className={cn('rounded-full opacity-50', {
     'bg-accent opacity-100': theme === 'light',
    })}
    variant='ghost'
    size='icon'>
    <Sun />
   </Button>

   <Button
    onClick={(e) => {
     e.stopPropagation();
     e.preventDefault();
     update('system');
    }}
    className={cn('rounded-full opacity-50', {
     'bg-accent opacity-100': theme === 'system',
    })}
    variant='ghost'
    size='icon'>
    <Monitor />
   </Button>

   <Button
    onClick={(e) => {
     e.stopPropagation();
     e.preventDefault();
     update('dark');
    }}
    className={cn('rounded-full opacity-50', {
     'bg-accent opacity-100': theme === 'dark',
    })}
    variant='ghost'
    size='icon'>
    <MoonStar />
   </Button>
  </div>
 );
};

export default ThemeSwtich;
