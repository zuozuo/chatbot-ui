import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE, WORKSTREAM_CHAT_API } from '@/utils/app/const';
import { OpenAIError, OpenAIStream } from '@/utils/server';

import { WorkstreamChatBody, ChatBody, Message } from '@/types/chat';

// @ts-expect-error
import wasm from '../../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm?module';

import tiktokenModel from '@dqbd/tiktoken/encoders/cl100k_base.json';
import { Tiktoken, init } from '@dqbd/tiktoken/lite/init';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { fromPhone, toPhone, body } = (await req.json()) as WorkstreamChatBody;
    let formData = new FormData();
    formData.append('From', fromPhone);
    formData.append('To', toPhone);
    formData.append('Body', body);
    const res = await fetch(WORKSTREAM_CHAT_API, {
      method: 'POST',
      body: new URLSearchParams(formData),
    });
    return res;

    // console.log(model);
    // console.log('--------------------------');
    // console.log(messages);
    // console.log('--------------------------');
    // console.log(key);
    // console.log('--------------------------');
    // console.log(prompt);
    // console.log('--------------------------');
    // console.log(temperature);
    //
    //
    // await init((imports) => WebAssembly.instantiate(wasm, imports));
    // const encoding = new Tiktoken(
    //   tiktokenModel.bpe_ranks,
    //   tiktokenModel.special_tokens,
    //   tiktokenModel.pat_str,
    // );
    //
    // let promptToSend = prompt;
    // if (!promptToSend) {
    //   promptToSend = DEFAULT_SYSTEM_PROMPT;
    // }
    //
    // let temperatureToUse = temperature;
    // if (temperatureToUse == null) {
    //   temperatureToUse = DEFAULT_TEMPERATURE;
    // }
    //
    // const prompt_tokens = encoding.encode(promptToSend);
    //
    // let tokenCount = prompt_tokens.length;
    // let messagesToSend: Message[] = [];
    //
    // for (let i = messages.length - 1; i >= 0; i--) {
    //   const message = messages[i];
    //   const tokens = encoding.encode(message.content);
    //
    //   if (tokenCount + tokens.length + 1000 > model.tokenLimit) {
    //     break;
    //   }
    //   tokenCount += tokens.length;
    //   messagesToSend = [message, ...messagesToSend];
    // }
    //
    // encoding.free();
    // console.log(messagesToSend);
    //
    // const stream = await OpenAIStream(model, promptToSend, temperatureToUse, key, messagesToSend);
    //
    // const res = new Response(stream);
    // return res;
  } catch (error) {
    console.error(error);
    if (error instanceof OpenAIError) {
      return new Response('Error', { status: 500, statusText: error.message });
    } else {
      return new Response('Error', { status: 500 });
    }
  }
};

export default handler;
