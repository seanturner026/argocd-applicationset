#!/bin/bash

kind create cluster --name local
kubectl create namespace argocd
kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-cd/master/manifests/install.yaml

i=0
max_attempts=3
secret_name=argocd-initial-admin-secret
until kubectl get secret $secret_name -n argocd &> /dev/null
do
  i=$((i+1))
  if [ $i -gt $max_attempts ]
  then
    echo "Secret '$secret_name' not found after $max_attempts attempts."
    exit 1
  fi
  sleep 1
done

password=$(kubectl get secret $secret_name -n argocd -o jsonpath='{.data.password}' | base64 --decode)
echo -e "\nInitial user password: $password\n"

kubectl apply -f clusters/staging/argocd-app.yaml
kubectl port-forward svc/argocd-server -n argocd 8080:443
