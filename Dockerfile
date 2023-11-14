###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node src ./src
COPY --chown=node:node nest-cli.json ./
COPY --chown=node:node tsconfig.json ./

RUN yarn install --frozen-lockfile --no-script

USER $user

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node src ./src
COPY --chown=node:node nest-cli.json ./
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node tsconfig.build.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

RUN yarn build

ENV NODE_ENV production

RUN yarn install --frozen-lockfile --prod --no-script && yarn cache clean

USER $user

FROM node:18-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/package.json ./package.json

CMD [ "yarn", "start:prod" ]
