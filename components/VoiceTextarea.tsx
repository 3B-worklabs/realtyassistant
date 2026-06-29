"use client";

import { useMemo, useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

type SpeechRecognitionConstructor = new () => {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionEventLike = {
  results: ArrayLike<{
    0: { transcript: string };
    isFinal: boolean;
  }>;
};

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

type VoiceTextareaProps = {
  label: string;
  placeholder: string;
  minHeight?: string;
};

export function VoiceTextarea({ label, placeholder, minHeight = 'min-h-[120px]' }: VoiceTextareaProps) {
  const [value, setValue] = useState('');
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState('Voice input ready');
  const recognitionRef = useRef<InstanceType<SpeechRecognitionConstructor> | null>(null);

  const supported = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }, []);

  function toggleListening() {
    if (!supported) {
      setMessage('Voice input is not supported in this browser. Typing still works.');
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      setMessage('Voice input paused');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ');
      setValue(transcript.trim());
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => {
      setListening(false);
      setMessage('Voice input needs microphone permission.');
    };
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
    setMessage('Listening...');
  }

  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-text">{label}</span>
        <button
          type="button"
          onClick={toggleListening}
          className="inline-flex h-9 items-center gap-2 rounded-2xl border border-border bg-white px-3 text-xs font-semibold text-text transition hover:bg-background"
        >
          {listening ? <MicOff size={15} className="text-accent" /> : <Mic size={15} className="text-accent" />}
          {listening ? 'Stop' : 'Voice'}
        </button>
      </div>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className={`${minHeight} w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20`}
      />
      <p className="mt-2 text-xs text-muted">{message}</p>
    </label>
  );
}
