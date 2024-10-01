module.exports = {
  $schema: "https://docs.renovatebot.com/renovate-schema.json",
  extends: ["config:best-practices"],
  labels: ["renovate"],
  baseBranches: ["main"],

  environments: ["production", "staging"],

  packageRules: [
    ...module.exports.environments.map(env => ({
      matchManagers: ["kustomize"],
      matchPaths: [`apps/.+/${env}/**`],
      groupName: `kustomize-${env}`
    }))
  ],

  argocd: [
    ...module.exports.environments.map(env => ({
      fileMatch: [`apps/.+/${env}/kustomization.ya?ml$`],
      pinDigests: false,
      groupName: `argocd-${env}`
    }))
  ],

  customManagers: [
    ...module.exports.environments.map(env => ({
      customType: "regex",
      fileMatch: [`apps/.+/${env}/kustomization.ya?ml$`],
      matchStrings: [
        "https://github\\.com/(?<depName>.*/.*?)/releases/download/(?<currentValue>.*?)/"
      ],
      datasourceTemplate: "github-tags",
      groupName: `kustomize-github-${env}`
    })),

    ...module.exports.environments.map(env => ({
      customType: "regex",
      fileMatch: [`apps/.+/${env}/kustomization.ya?ml$`],
      matchStrings: [
        "https://raw\\.githubusercontent\\.com/(?<depName>[^/]*/[^/]*)/(?<currentValue>.*?)/"
      ],
      datasourceTemplate: "github-tags",
      groupName: `kustomize-raw-github-${env}`
    })),

    {
      customType: "regex",
      fileMatch: [".github/workflows/.*.ya?ml$"],
      matchStrings: [
        "dagandersen/argocd-diff-preview:(?<currentValue>.*?)\\s"
      ],
      depNameTemplate: "dagandersen/argocd-diff-preview",
      datasourceTemplate: "docker"
    }
  ]
};
