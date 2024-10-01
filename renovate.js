module.exports = {
  $schema: "https://docs.renovatebot.com/renovate-schema.json",
  extends: ["config:best-practices"],
  labels: ["renovate"],
  baseBranches: ["main"],

  environments: ["production", "staging"],

  packageRules: [
    ...module.exports.environments.map(dir => ({
      matchManagers: ["kustomize"],
      matchPaths: [`apps/infra/karpenter-crds/overlays/${dir}/**`],
      groupName: `karpenter-crds-${dir}`
    }))
  ],

  argocd: module.exports.environments.map(env => ({
    fileMatch: [`apps/.+/overlays/${env}/kustomization\\.ya?ml$`],
    pinDigests: false,
    groupName: `argocd-${env}`
  })),

  customManagers: [
    ...module.exports.environments.map(dir => ({
      customType: "regex",
      fileMatch: [`apps/infra/karpenter-crds/overlays/${dir}/kustomization.ya?ml$`],
      matchStrings: [
        "https://github\\.com/(?<depName>.*/.*?)/releases/download/(?<currentValue>.*?)/"
      ],
      datasourceTemplate: "github-tags",
      groupName: `karpenter-crds-${dir}`
    })),
    ...module.exports.environments.map(dir => ({
      customType: "regex",
      fileMatch: [`apps/infra/karpenter-crds/overlays/${dir}/kustomization.ya?ml$`],
      matchStrings: [
        "https://raw\\.githubusercontent\\.com/(?<depName>[^/]*/[^/]*)/(?<currentValue>.*?)/"
      ],
      datasourceTemplate: "github-tags",
      groupName: `karpenter-crds-${dir}`
    })),
    {
      customType: "regex",
      fileMatch: ["\\.github/workflows/.*\\.ya?ml$"],
      matchStrings: [
        "dagandersen/argocd-diff-preview:(?<currentValue>.*?)\\s"
      ],
      depNameTemplate: "dagandersen/argocd-diff-preview",
      datasourceTemplate: "docker"
    }
  ]
};
