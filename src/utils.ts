import { Arcane } from "arcanepad-web-sdk";
import { UpdateSharedStateEvent } from "./models/models";
import { sharedState } from "./stores/SharedState";

const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
const audioBuffers: { [url: string]: AudioBuffer } = {};
const gainNode = audioCtx.createGain(); // Create a GainNode
gainNode.connect(audioCtx.destination); // Connect the GainNode to the destination

// Function to load a sound if it hasn't been loaded yet
function loadSound(url: string): Promise<AudioBuffer> {
  return fetch(url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      audioBuffers[url] = audioBuffer;
      return audioBuffer;  // Return the buffer for immediate use
    })
    .catch(e => {
      console.error(`Error loading sound: ${url}`, e);
      throw e;
    });
}

// Function to play a sound from the pool or load it if not already available
export function playSound(url: string, volume: number = .05): void {
  const audioBuffer = audioBuffers[url];
  if (audioBuffer) {
    // If the buffer exists, play it
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(gainNode);
    gainNode.gain.value = volume; // Set volume level
    source.start(0);
  } else {
    // If the buffer does not exist, load and play it
    loadSound(url).then(audioBuffer => {
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(gainNode);
      gainNode.gain.value = volume; // Set volume level
      source.start(0);
    });
  }
}

export const updateSharedState = () => {
  Arcane.msg.emitToPads(new UpdateSharedStateEvent(sharedState.value))
}
