#!/bin/bash
docker run --rm -ti --name assistance-ui -v $(pwd)/src:/src -p 4202:4200 assistance-ui /bin/sh
