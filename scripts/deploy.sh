#!/usr/bin/env bash

set -e

usage() {
    echo "Usage: $0 ref"
    exit 1
}

if [ -z "$B2_APPLICATION_KEY" ]; then
    echo "Missing B2_APPLICATION_KEY env var"
    exit 1
fi

if [ -z "$B2_KEY_ID" ]; then
    echo "Missing B2_KEY_ID env var"
    exit 1
fi

if [ -z "$B2_BUCKET_NAME" ]; then
    echo "Missing B2_BUCKET_NAME env var"
    exit 1
fi

if [ -z "$1" ]; then
    usage
fi

REF=$1

echo $REF > version.txt

BUCKET_URL="b2://${B2_BUCKET_NAME}/"

b2 authorize-account $B2_KEY_ID $B2_APPLICATION_KEY 2>&1 >/dev/null
b2 sync \
    --delete \
    --replaceNewer \
    --excludeRegex '(README\.md)|(\.git*)|(scripts/)' \
    . $BUCKET_URL
