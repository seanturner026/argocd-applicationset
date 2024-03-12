#!/bin/bash

kind create cluster --name local
kubectl create namespace argocd
kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-cd/master/manifests/install.yaml

i=0
max_attempts=3
until kubectl get secret argocd-initial-admin-secret -n argocd &> /dev/null; do
  i=$((i+1))
  if [ $i -gt $max_attempts ]
  then
    echo "Secret 'argocd-initial-admin-secret' not found after $max_attempts attempts."
    exit 1
  fi
  sleep 1
done

password=$(kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath='{.data.password}' | base64 --decode)
echo -e "\nInitial user password: $password\n"
kubectl port-forward svc/argocd-server -n argocd 8080:443
