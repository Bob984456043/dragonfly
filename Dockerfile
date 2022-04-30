FROM node:12.19.0

RUN rm -rf node_modules  && rm -rf build

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN cd /app && npm install --registry=https://registry.npm.taobao.org

COPY . app
WORKDIR /app
CMD ["npm","run","build"]
CMD ["node","build/js/index.js"]
