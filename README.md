# argocd-applicationset

## TODO

1. Test that `argo-rollouts` works with an `applicationset`.
1. Is the `helmCharts` compatible with ArgoCD Image Updater `annotations`?
1. Get renovate working with kustomization images
1. Get renovate working with kustomization resource versions?
1. Set finalizers based on Application
1. How do we update various environments
1. How do we cutover from an Application to an applicationset?
1. Is there a way to inflate an applicationset so that I can see the changes?

## Testing renovate

```
$ LOG_LEVEL=debug npx renovate --platform=local --repository-cache=reset
```
