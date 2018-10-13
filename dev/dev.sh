#!/bin/bash
echo "corriendo en el puerto 10305"
docker run --rm -ti --name assistance-ui -v $(pwd)/src:/src -p 10305:4200 desarrollo-ui
