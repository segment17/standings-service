#!/usr/bin/env bash
start=$(date +%s)
rm -rf features/cucumberstudio
hiptest-publisher --config-file test/hiptest-publisher.conf --test-run-id 521216 --only=features
kubectl delete deployments -l app=standings-service
kubectl delete svc -l app=standings-service
eval $(minikube docker-env)
docker build -t segment17hub/standingsservice .
kubectl apply -f manifest.yaml
latest_pod=$(kubectl get pods --sort-by=.metadata.creationTimestamp -o jsonpath="{.items[-1].metadata.name}")
while [[ $(kubectl get pods $latest_pod -o 'jsonpath={..status.conditions[?(@.type=="Ready")].status}') != "True" ]]; do echo "Waiting for pod..." && sleep 1; done
# kubectl exec $latest_pod -- bash -c "yarn test --tags '@EndToEnd'"
kubectl exec $latest_pod -- bash -c "yarn test --exit" # Option "--exit" to exit when test run is completed. Otherwise it gets stuck in command prompt.
kubectl cp $latest_pod:test/results.json test/results.json
hiptest-publisher --config-file test/hiptest-publisher.conf --push test/results.json  --test-run-id 521216 --push-format cucumber-json
end=$(date +%s)
echo $(($end-$start))
