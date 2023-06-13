yarn build

docker build . -t us-west1-docker.pkg.dev/zerok-dev/zerok-dashboard/zerok-dashboard:dev
docker push us-west1-docker.pkg.dev/zerok-dev/zerok-dashboard/zerok-dashboard:dev

kubectl apply -k ./k8s

