import { motion } from 'motion/react';
import { cn } from './ui/utils';

interface CoinEduLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: {
    frame: 'h-12 w-12 rounded-2xl',
    letters: 'text-[0.9rem]',
    book: 'h-3',
    ring: 'inset-[-5px]',
  },
  md: {
    frame: 'h-20 w-20 rounded-3xl',
    letters: 'text-2xl',
    book: 'h-5',
    ring: 'inset-[-7px]',
  },
  lg: {
    frame: 'h-28 w-28 rounded-[2rem]',
    letters: 'text-4xl',
    book: 'h-7',
    ring: 'inset-[-9px]',
  },
};

export function CoinEduLogo({ size = 'md', className }: CoinEduLogoProps) {
  const currentSize = sizes[size];

  return (
    <motion.div
      className={cn('relative isolate flex items-center justify-center', currentSize.frame, className)}
      whileHover={{ scale: 1.06, rotate: -2 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      aria-label="CoinEdu"
    >
      <motion.div
        className={cn(
          'absolute rounded-[inherit] border border-primary/30 bg-[conic-gradient(from_130deg,rgba(22,163,74,0.16),rgba(14,165,233,0.22),rgba(250,204,21,0.18),rgba(22,163,74,0.16))] shadow-[0_0_32px_rgba(34,197,94,0.32)]',
          currentSize.ring,
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/80 via-emerald-100/55 to-sky-100/55 backdrop-blur-xl dark:from-white/15 dark:via-primary/25 dark:to-cyan-500/20"
        animate={{ boxShadow: ['0 0 18px rgba(34,197,94,0.22)', '0 0 34px rgba(34,197,94,0.42)', '0 0 18px rgba(34,197,94,0.22)'] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-[12%] rounded-full border border-white/70 bg-white/55 shadow-inner dark:border-white/20 dark:bg-black/10" />

      <motion.div
        className="absolute right-[10%] top-[13%] z-20 h-[18%] w-[18%] rounded-full border border-yellow-200/90 bg-gradient-to-br from-yellow-200 to-amber-400 shadow-[0_0_16px_rgba(250,204,21,0.45)]"
        animate={{ y: [0, -3, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="absolute inset-[28%] rounded-full border border-yellow-700/30" />
      </motion.div>

      <div className="absolute left-[20%] top-[20%] z-10 h-[26%] w-[60%] rotate-[-10deg] rounded-[45%] bg-gradient-to-r from-emerald-950 to-emerald-700 shadow-[0_5px_12px_rgba(6,78,59,0.22)] dark:from-emerald-950 dark:to-emerald-800" />
      <div className="absolute left-[47%] top-[30%] z-20 h-[30%] w-px rotate-[-4deg] bg-primary/80" />
      <div className="absolute left-[45%] top-[57%] z-20 h-[10%] w-[10%] rounded-full bg-primary shadow-[0_0_9px_rgba(34,197,94,0.55)]" />

      <div className={cn('absolute bottom-[17%] z-10 flex w-[62%] justify-center gap-[5%]', currentSize.book)}>
        <div className="h-full flex-1 origin-bottom-right -skew-y-6 rounded-l-md border border-primary/25 bg-gradient-to-br from-white to-emerald-100 shadow-sm dark:from-emerald-50 dark:to-emerald-200" />
        <div className="h-full flex-1 origin-bottom-left skew-y-6 rounded-r-md border border-primary/25 bg-gradient-to-bl from-white to-emerald-100 shadow-sm dark:from-emerald-50 dark:to-emerald-200" />
      </div>

      <div className={cn('relative z-30 -mt-[3%] font-black tracking-[-0.08em] text-emerald-950 drop-shadow-[0_2px_8px_rgba(34,197,94,0.45)] dark:text-white', currentSize.letters)}>
        <span>C</span>
        <span className="text-primary">E</span>
      </div>

      <div className="absolute left-[16%] top-[17%] z-20 h-[8%] w-[8%] rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.75)]" />
      <div className="absolute bottom-[22%] left-[14%] z-20 h-[5%] w-[5%] rounded-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.7)]" />
    </motion.div>
  );
}
