#!/usr/bin/env bash
start=$(date +%s)
rm -rf features/cucumberstudio
hiptest-publisher --config-file test/hiptest-publisher.conf --test-run-id 546816 --only=features
yarn test --exit
# DON'T PUSH TO CUCUMBER STUDIO
end=$(date +%s)
echo $(($end-$start))
