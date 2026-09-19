FROM node:18-bookworm-slim AS build

WORKDIR /app

ENV CI=1

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

RUN yarn install --immutable

COPY . .

RUN yarn build

FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/public /usr/share/nginx/html

EXPOSE 80
LABEL org.opencontainers.image.source=https://github.com/tyorka-shop/admin.tyorka.com

CMD ["nginx", "-g", "daemon off;"]