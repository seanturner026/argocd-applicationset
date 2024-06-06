# argocd-applicationset

## TODO

1. Test that `argo-rollouts` works with an `applicationset`.
1. Identify how to pass annotations to an `application` managed by the `applicationset`. Specifically, does there need
   to be a directory for web applications that all utilize the ArgoCD Image Updater so that wildcards `*` can be
   leveraged?
1. Is the `helmChartInflationGenerator` compatible with ArgoCD Image Updater `annotations`?
