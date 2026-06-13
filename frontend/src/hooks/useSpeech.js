import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * useSpeech — Alexa-style voice for the shopping agent.
 *
 * Wraps the browser Web Speech API:
 *   - SpeechRecognition  -> speech-to-text (listening)
 *   - speechSynthesis    -> text-to-speech (speaking)
 *
 * Gracefully degrades: `supported` is false on browsers without the API
 * (the UI then simply hides the mic button).
 */
export default function useSpeech({ onResult, lang = 'en-IN' } = {}) {
  const SpeechRecognition =
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition)

  const synthSupported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const supported = Boolean(SpeechRecognition) || synthSupported

  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [interim, setInterim] = useState('')

  const recognitionRef = useRef(null)
  const onResultRef = useRef(onResult)
  onResultRef.current = onResult

  // ── Set up recognition once ────────────────────────────────────────────
  useEffect(() => {
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = lang
    recognition.continuous = false
    recognition.interimResults = true
    recognition.maxAlternatives = 1

    recognition.onresult = (event) => {
      let finalText = ''
      let interimText = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) finalText += transcript
        else interimText += transcript
      }
      setInterim(interimText)
      if (finalText) {
        setInterim('')
        onResultRef.current?.(finalText.trim())
      }
    }

    recognition.onerror = () => {
      setListening(false)
      setInterim('')
    }
    recognition.onend = () => {
      setListening(false)
      setInterim('')
    }

    recognitionRef.current = recognition
    return () => {
      try { recognition.abort() } catch {}
    }
  }, [SpeechRecognition, lang])

  const startListening = useCallback(() => {
    if (!recognitionRef.current || listening) return
    // Don't listen to ourselves
    if (synthSupported) window.speechSynthesis.cancel()
    setSpeaking(false)
    try {
      recognitionRef.current.start()
      setListening(true)
    } catch {
      // start() can throw if called while already starting — ignore
    }
  }, [listening, synthSupported])

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return
    try { recognitionRef.current.stop() } catch {}
    setListening(false)
  }, [])

  // ── Text to speech ──────────────────────────────────────────────────────
  const speak = useCallback(
    (text) => {
      if (!synthSupported || !text) return
      const synth = window.speechSynthesis
      synth.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 1.02
      utterance.pitch = 1
      utterance.onstart = () => setSpeaking(true)
      utterance.onend = () => setSpeaking(false)
      utterance.onerror = () => setSpeaking(false)
      synth.speak(utterance)
    },
    [synthSupported, lang]
  )

  const stopSpeaking = useCallback(() => {
    if (synthSupported) window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [synthSupported])

  return {
    supported,
    sttSupported: Boolean(SpeechRecognition),
    ttsSupported: synthSupported,
    listening,
    speaking,
    interim,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  }
}
