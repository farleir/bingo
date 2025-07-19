
let ptVoice: SpeechSynthesisVoice | undefined;

function loadVoices() {
  const voices = window.speechSynthesis.getVoices();
  ptVoice = voices.find(voice => voice.lang.startsWith('pt')) || voices.find(voice => voice.default);
}

// Voices are loaded asynchronously
if (typeof window !== 'undefined' && window.speechSynthesis) {
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
}


export function speak(text: string): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn("Speech synthesis not supported.");
    return;
  }
  
  // Cancel any previous speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  if (ptVoice) {
    utterance.voice = ptVoice;
  }
  utterance.lang = 'pt-BR';
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 0.9;
  
  window.speechSynthesis.speak(utterance);
}
