# argocd-applicationset

## TODO

1. Is deploying `kustomization` and `helm` together possible?
1. Test that `argo-rollouts` works with an `applicationset`.
1. Identify how to pass annotations to an `application` managed by the `applicationset`.
1. Simulate what the behavior is when switching the branch (say when wanting to upgrade).
1. Need to kustomize this: Adding the helm enable command to the argocd configmap and then installing helm charts with
   kustomize? https://argo-cd.readthedocs.io/en/stable/user-guide/kustomize/#kustomizing-helm-charts
