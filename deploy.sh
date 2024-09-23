#!/bin/bash

set -euo pipefail

kind create cluster --name local
kubectl create namespace argocd
kustomize build apps/infra/argocd/overlays/staging | kubectl apply -f -

i=0
max_attempts=15
secret_name=argocd-initial-admin-secret
echo -e "\nWaiting for ArgoCD to come online..."
until kubectl get secret $secret_name -n argocd &> /dev/null
do
  i=$((i+1))
  if [ $i -gt $max_attempts ]
  then
    echo "Secret '$secret_name' not found after '$max_attempts' attempts."
    exit 1
  fi
  sleep 2
done

kubectl apply -f clusters/staging/argocd-app.yaml

password=$(kubectl get secret $secret_name -n argocd -o jsonpath='{.data.password}' | base64 --decode)
echo -e "\nInitial user password: $password\n"

kubectl port-forward svc/argocd-server -n argocd 8080:443
