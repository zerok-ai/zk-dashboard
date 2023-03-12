yarn build

docker build . -t us-west1-docker.pkg.dev/zerok-dev/zerok-dashboard/zerok-dashboard:latest
docker push us-west1-docker.pkg.dev/zerok-dev/zerok-dashboard/zerok-dashboard:latest

kubectl apply -k ./k8s

