#!/bin/bash
cd /src/assistance
yarn install
ng build --prod --build-optimizer --aot --i18n-file src/messages.xlf --i18n-format xlf --i18n-locale es

