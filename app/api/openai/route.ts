import { NextResponse } from "next/server";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  try {
    const { description } = await request.json();
    const openAiresponse = await openai.createImage({
      prompt: description,
      n: 1,
      size: "512x512",
    });
    const imageUrl = openAiresponse.data.data[0].url;
    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { err: "Error has occured while making a post" },
      { status: 403 }
    );
  }
}
