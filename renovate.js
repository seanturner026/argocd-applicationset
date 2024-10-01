module.exports = {
  $schema: "https://docs.renovatebot.com/renovate-schema.json",
  extends: ["config:best-practices"],
  labels: ["renovate"],
  baseBranches: ["main"],

  // Define the environments we want to manage separately
  environments: ["production", "staging"],

  packageRules: [
    // {
    //   matchManagers: ["kustomize"],
    //   matchPaths: ["apps/**"],
    //   groupName: "kustomize-dependencies"
    // },
    ...module.exports.environments.map(dir => ({
      matchManagers: ["kustomize"],
      matchPaths: [`apps/infra/karpenter-crds/overlays/${dir}/**`],
      groupName: `karpenter-crds-${dir}`
    }))
  ],

  // argocd: {
  //   fileMatch: ["(^|/)kustomization\\.ya?ml$"],
  //   pinDigests: false
  // },
  argocd: module.exports.environments.map(env => ({
    fileMatch: [`apps/.+/overlays/${env}/kustomization\\.ya?ml$`],
    pinDigests: false,
    groupName: `argocd-${env}`
  })),

  customManagers: [
    // {
    //   customType: "regex",
    //   fileMatch: ["apps/.+/kustomization.ya?ml$"],
    //   matchStrings: [
    //     "https://github\\.com/(?<depName>.*/.*?)/releases/download/(?<currentValue>.*?)/"
    //   ],
    //   datasourceTemplate: "github-releases"
    // },
    // {
    //   customType: "regex",
    //   fileMatch: ["apps/.+/kustomization.ya?ml$"],
    //   matchStrings: [
    //     "https://raw\\.githubusercontent\\.com/(?<depName>[^/]*/[^/]*)/(?<currentValue>.*?)/"
    //   ],
    //   datasourceTemplate: "github-tags"
    // },
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
