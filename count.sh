echo '\nindex.js:\n' && yarn sloc index.js &&
echo '\nGlobalObjects:\n' && yarn sloc GlobalObjects.js &&
echo '\nDockerfile:\n' && cat Dockerfile | wc -l && echo '\nDockerfile comments:\n' && cat Dockerfile | grep \# | wc -l &&
echo '\nk8s manifests:\n' && yarn sloc manifest.yaml &&
echo '\nautomations:\n' && find . -name 'automate*.sh' | xargs wc -l && echo '\nAutomations comments:\n' && find . -name 'automate*.sh' -exec cat {} + | grep \# | wc -l &&
echo '\nsrc:\n' && yarn sloc src/ &&
echo '\nproto:\n' && find ./proto -name '*.proto' | xargs wc -l &&
echo '\nfeatures:\n' && find ./test/features_raw -name '*.feature' | xargs wc -l  && echo '\nFeature comments:\n' && find ./test/features_raw -name '*.feature' -exec cat {} + | grep \# | wc -l &&
echo '\nstep-definitions:\n' && yarn sloc features/step_definitions &&
echo '\nscenario-testers:\n' && yarn sloc test/ScenarioTesters &&
echo '\ntest-data:\n' && yarn sloc test/TestData.js &&
echo '\ntest-functions:\n' && yarn sloc test/TestFunctions.js
