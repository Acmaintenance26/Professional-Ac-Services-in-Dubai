import React, { useState, useRef } from "react";
import { Volume2, VolumeX, Loader2, Play, Pause, Sparkles } from "lucide-react";

interface AudioAssistantProps {
  textToSpeak?: string;
  buttonLabel?: string;
  variant?: "floating" | "compact" | "card";
  voice?: "Kore" | "Puck" | "Zephyr" | "Charon";
  className?: string;
}

export const AudioAssistant: React.FC<AudioAssistantProps> = ({
  textToSpeak = "Welcome to AC Maintenance Dubai. We provide fast, reliable, and 24/7 same day AC repair, gas refill, duct cleaning, and central HVAC servicing across Dubai.",
  buttonLabel = "Listen to AI Voice Overview",
  variant = "compact",
  voice = "Kore",
  className = "",
}) => {
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      } catch (e) {
        // ignore if already stopped
      }
      sourceNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  const speakText = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSpeak, voice }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to generate audio");
      }

      const data = await res.json();
      const base64Audio = data.audio;

      if (!base64Audio) {
        throw new Error("No audio returned from server");
      }

      // Decode base64 to binary ArrayBuffer
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Convert PCM 16-bit 24kHz to AudioBuffer
      // The Gemini TTS returns raw 16-bit PCM little endian at 24000 Hz
      const sampleRate = 24000;
      const pcm16 = new Int16Array(bytes.buffer);
      const numSamples = pcm16.length;

      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioCtx({ sampleRate });
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      const audioBuffer = ctx.createBuffer(1, numSamples, sampleRate);
      const channelData = audioBuffer.getChannelData(0);

      for (let i = 0; i < numSamples; i++) {
        // Convert 16-bit signed integer (-32768 to 32767) to float32 (-1.0 to 1.0)
        channelData[i] = pcm16[i] / 32768.0;
      }

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);

      source.onended = () => {
        setIsPlaying(false);
        sourceNodeRef.current = null;
      };

      sourceNodeRef.current = source;
      source.start(0);
      setIsPlaying(true);
    } catch (err: any) {
      console.error("Audio Assistant Error:", err);
      setError(err.message || "Failed to load audio");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "compact") {
    return (
      <button
        onClick={speakText}
        disabled={loading}
        title="Listen with Gemini 3.1 TTS"
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 transition-all duration-200 ${className}`}
      >
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-600" />
        ) : isPlaying ? (
          <VolumeX className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-sky-600" />
        )}
        <span>{isPlaying ? "Stop Audio" : buttonLabel}</span>
        <Sparkles className="w-3 h-3 text-amber-500" />
      </button>
    );
  }

  if (variant === "card") {
    return (
      <div className={`bg-gradient-to-r from-sky-900 to-slate-900 text-white rounded-xl p-4 shadow-lg border border-sky-700/50 ${className}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-lg border border-sky-400/30">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                AI Voice Overview <span className="bg-sky-400/20 text-sky-200 text-[10px] px-1.5 py-0.5 rounded">Gemini 3.1 Flash TTS</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 max-w-md line-clamp-1">
                {textToSpeak}
              </p>
            </div>
          </div>
          <button
            onClick={speakText}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold rounded-lg shadow transition-all duration-200 shrink-0"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isPlaying ? (
              <>
                <Pause className="w-4 h-4 text-orange-300" /> Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" /> Listen Now
              </>
            )}
          </button>
        </div>
        {error && <p className="text-[11px] text-rose-300 mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <button
      onClick={speakText}
      disabled={loading}
      className={`fixed bottom-24 right-6 z-40 flex items-center gap-2 px-4 py-2.5 bg-sky-900 text-white border border-sky-400/40 rounded-full shadow-2xl hover:bg-sky-800 transition-all ${className}`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-sky-300" />
      ) : isPlaying ? (
        <VolumeX className="w-4 h-4 text-amber-400" />
      ) : (
        <Volume2 className="w-4 h-4 text-sky-300" />
      )}
      <span className="text-xs font-medium">{isPlaying ? "Pause" : "Audio Guide"}</span>
    </button>
  );
};
