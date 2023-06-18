# Vercel AI + Chat GPT Steams + Postgres Template

This is a repo that has newest vercel ai, chatGpt streaming and postgres features. The App has a quick response times because we are using vercel ai streaming configuration. In addition, I am persisting the messages using postgres.

This is a good starter kit, but please keep in mind that in order to make this a production level app, you need to make app more secure with authentication

## To Run Locally

To run the example locally you need to:

1. Sign up at [OpenAI's Developer Platform](https://platform.openai.com/signup).
2. Go to [OpenAI's dashboard](https://platform.openai.com/account/api-keys) and create an API KEY.
3. Set the required OpenAI environment variable as the token value as shown [the example env file](./.env.local.example) but in a new file called `.env.local`
4. `pnpm install` to install the required dependencies.
5. `pnpm dev` to launch the development server.

## To Deploy

Using [vercel.com](vercel.com), it is easy to deploy. Here are the main steps I took.

1. Publish app on github.com
2. Go on vercel.com, connect your github repo to vercel.
3. Set up Postgres Storage by going to `Storage` Settings
4.

## Steps Taken From Beginning

1. Setup Next.js Repo. You can use one of the templates likes [this](https://github.com/vercel-labs/ai-chatbot) from vercel
2. Add Open AI Key. You can generate a new API Key [here](https://platform.openai.com/account/api-keys)
3. Validate that the front-end works. Run `npm dev` and play with app locally
4. Setup github + deploy. Go to [vercel.com](https://vercel.com/) and set up account and connect to the github repo you setup in step #1 . You can then deploy app with a few clicks.
5. Make sure environment variables are setup in vercel.com. within vercel repo, go to `Settings` => `Environment Variables` and add `OPENAI_API_KEY` key

Exta Credit (Postgres)

7. Wihin vercel.com, navigate to your repo again and go to `Storage` & Setup a Postgres instance. Follow the instruction to connect the instance to your repo & pull the credentials down locally. If you don't have vercel installed, install globally ` npm i --g vercel`
8. Add the necessary postgres code to fetch, update, etc. (I already added some basics)

## Learn More

To learn more about OpenAI, Next.js, and the Vercel AI SDK take a look at the following resources:

- [Vercel AI SDK docs](https://sdk.vercel.ai/docs)
- [Vercel AI Playground](https://play.vercel.ai)
- [OpenAI Documentation](https://platform.openai.com/docs) - learn about OpenAI features and API.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
