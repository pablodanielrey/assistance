#!/bin/bash
docker run --rm -ti --name assistance-ui -v $(pwd)/src:/src -p 10305:4200 assistance-ui /bin/sh
