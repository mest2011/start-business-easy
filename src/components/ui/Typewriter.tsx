import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBeforeDelete?: number;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBeforeDelete = 2000,
  className = "",
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentWord = words[loopNum % words.length];

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        timer = setTimeout(() => {
          setText(currentWord.substring(0, text.length - 1));
        }, deletingSpeed);
      }
    } else {
      if (text === currentWord) {
        timer = setTimeout(() => setIsDeleting(true), delayBeforeDelete);
      } else {
        timer = setTimeout(() => {
          setText(currentWord.substring(0, text.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, delayBeforeDelete]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{text || '\u200B'}</span>
      <span className="animate-pulse ml-[2px] border-r-4 border-neutral-900 h-[1em] mb-[-0.1em]"></span>
    </span>
  );
};
