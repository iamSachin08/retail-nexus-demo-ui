import { useCallback, useMemo, useRef, useState } from 'react';

interface SpeechAlternativeLike {
  transcript: string;
}
interface SpeechResultLike extends ArrayLike<SpeechAlternativeLike> {
  isFinal: boolean;
}
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: { results: ArrayLike<SpeechResultLike> }) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}
type SRConstructor = new () => SpeechRecognitionLike;

export function getSpeechRecognition(): SRConstructor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: SRConstructor; webkitSpeechRecognition?: SRConstructor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

interface UseVoiceInputOptions {
  /** Called with the final transcript when recognition naturally ends. */
  onComplete: (transcript: string) => void;
  /** Optional live-transcript callback (final + interim segments). */
  onTranscript?: (live: string) => void;
  lang?: string;
}

export function useVoiceInput({ onComplete, onTranscript, lang = 'en-IN' }: UseVoiceInputOptions) {
  const [listening, setListening] = useState(false);
  const recogRef = useRef<SpeechRecognitionLike | null>(null);
  const finalRef = useRef<string>('');
  const cancelledRef = useRef<boolean>(false);
  const supported = useMemo(() => getSpeechRecognition() !== null, []);

  const start = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR) return;
    if (recogRef.current) {
      try { recogRef.current.stop(); } catch { /* ignore */ }
    }
    finalRef.current = '';
    cancelledRef.current = false;

    const rec = new SR();
    rec.lang = lang;
    rec.continuous = false;
    rec.interimResults = true;

    rec.onresult = (e) => {
      let finalText = '';
      let interimText = '';
      for (let i = 0; i < e.results.length; i++) {
        const result = e.results[i];
        const alt = result[0]?.transcript ?? '';
        if (result.isFinal) finalText += alt + ' ';
        else interimText += alt;
      }
      if (finalText) finalRef.current = (finalRef.current + ' ' + finalText).trim();
      onTranscript?.((finalRef.current + ' ' + interimText).trim());
    };

    rec.onerror = () => {
      cancelledRef.current = true;
      setListening(false);
    };

    rec.onend = () => {
      setListening(false);
      const transcript = finalRef.current.trim();
      if (!cancelledRef.current && transcript) {
        onComplete(transcript);
      }
    };

    recogRef.current = rec;
    setListening(true);
    try {
      rec.start();
    } catch {
      setListening(false);
    }
  }, [lang, onComplete, onTranscript]);

  /** Commit and fire onComplete with whatever has been captured so far. */
  const stop = useCallback(() => {
    try { recogRef.current?.stop(); } catch { /* ignore */ }
    setListening(false);
  }, []);

  /** Discard transcript without firing onComplete. */
  const cancel = useCallback(() => {
    cancelledRef.current = true;
    finalRef.current = '';
    try { recogRef.current?.stop(); } catch { /* ignore */ }
    setListening(false);
  }, []);

  return { listening, supported, start, stop, cancel };
}
