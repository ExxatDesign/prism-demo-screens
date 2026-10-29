export type FeatureAccessDefinition = {
  /** Display name used in default dialog copy and aria labels. */
  productName: string;
  /** Demo / tenant entitlement — when false, locked affordances open the access dialog. */
  entitled: boolean;
  title?: string;
  body?: string;
};

/** Add feature keys here; reference the same key from locks, tabs, and buttons. */
export const FEATURE_ACCESS_REGISTRY = {
  reviewClarifications: {
    productName: "Review Clarifications",
    entitled: false,
  },
  placements: {
    productName: "Placements",
    entitled: false,
  },
  schoolCompliance: {
    productName: "School Compliance",
    entitled: false,
  },
} as const satisfies Record<string, FeatureAccessDefinition>;

export type FeatureAccessKey = keyof typeof FEATURE_ACCESS_REGISTRY;

const DEFAULT_ACCESS_BODY = (productName: string) =>
  `Your organization does not currently have ${productName} in its subscription. To use this feature, contact your Exxat account manager or ask your program administrator to enable it.`;

export function getFeatureAccessDefinition(
  featureKey: string,
): FeatureAccessDefinition | undefined {
  return (FEATURE_ACCESS_REGISTRY as Record<string, FeatureAccessDefinition>)[
    featureKey
  ];
}

export function isFeatureEntitled(featureKey: string): boolean {
  return getFeatureAccessDefinition(featureKey)?.entitled ?? true;
}

export function getFeatureAccessDialogCopy(featureKey: string): {
  title: string;
  body: string;
} {
  const def = getFeatureAccessDefinition(featureKey);
  const productName = def?.productName ?? "this feature";
  return {
    title: def?.title ?? `Get access to ${productName}`,
    body: def?.body ?? DEFAULT_ACCESS_BODY(productName),
  };
}

export function getFeatureAccessAriaLabel(featureKey: string): string {
  const { productName } = getFeatureAccessDefinition(featureKey) ?? {
    productName: "This feature",
  };
  return `${productName} is locked. Learn how to get access.`;
}
