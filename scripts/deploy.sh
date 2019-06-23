#!/usr/bin/env bash

set -e

usage() {
    echo "Usage: $0 environment tag"
    exit 1
}

if [ -z "$B2_APPLICATION_KEY" ] || [ -z "$B2_KEY_ID" ]; then
    echo "Missing B2_APPLICATION_KEY or B2_KEY_ID env vars"
    exit 1
fi

if [ -z "$2" ]; then
    usage
fi

case "$1" in
    production)
        BUCKET="b2://lyheden-site/"
        ;;
    test)
        echo "no test site yet"
        exit 1
        ;;
    *)
    usage
esac

TAG=$2

echo $TAG > version.txt

b2 authorize-account $B2_KEY_ID $B2_APPLICATION_KEY 2>&1 >/dev/null
b2 sync \
    --delete \
    --replaceNewer \
    --excludeRegex '(README\.md)|(\.git*)|(\.travis\.yml)|(scripts/)' \
    . $BUCKET