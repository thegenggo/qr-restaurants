FROM node:23-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN --mount=type=secret,id=supabase_key \
    --mount=type=secret,id=supabase_url \
    export VITE_SUPABASE_ANON_KEY=$(cat /run/secrets/supabase_key) && \
    export VITE_SUPABASE_URL=$(cat /run/secrets/supabase_url) && \
    npm run build

FROM node:23-alpine AS production
WORKDIR /app
COPY --from=build /app/dist /app/dist
RUN npm i -g serve
EXPOSE 3000

CMD [ "serve", "-s", "dist" ]