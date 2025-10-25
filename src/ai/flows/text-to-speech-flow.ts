'use server';

/**
 * @fileOverview A flow for converting text to speech.
 * - textToSpeech - A function that takes text and returns audio data.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';
import wav from 'wav';

export async function textToSpeech(text: string): Promise<string | undefined> {
  return textToSpeechFlow(text);
}

const textToSpeechFlow = ai.defineFlow(
  {
    name: 'textToSpeechFlow',
    inputSchema: z.string(),
    outputSchema: z.string().optional(),
  },
  async (text) => {
    if (!text.trim()) {
        return undefined;
    }

    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: text,
    });

    if (!media) {
      return undefined;
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const base64Wav = await toWav(audioBuffer);
    return `data:audio/wav;base64,${base64Wav}`;
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
