export type FeatureAccessDefinition = {
  /** Used in aria labels so users know which control is locked. */
  productName: string;
  /** Demo / tenant entitlement — when false, locked affordances open the access dialog. */
  entitled: boolean;
  /** Optional overrides; omit to use shared dialog copy everywhere. */
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

/** Same dialog title and body for every locked feature (unless a feature overrides). */
export const FEATURE_ACCESS_DIALOG_COPY = {
  title: "This feature isn't included for your school",
  body: "Your school does not own this product, so this area is locked. To enable it, contact your Exxat account manager or ask your program administrator to update your school's subscription.",
} as const;

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

export function getFeatureAccessDialogCopy(featureKey?: string | null): {
  title: string;
  body: string;
} {
  const def = featureKey ? getFeatureAccessDefinition(featureKey) : undefined;
  return {
    title: def?.title ?? FEATURE_ACCESS_DIALOG_COPY.title,
    body: def?.body ?? FEATURE_ACCESS_DIALOG_COPY.body,
  };
}

export function getFeatureAccessAriaLabel(featureKey: string): string {
  const { productName } = getFeatureAccessDefinition(featureKey) ?? {
    productName: "This feature",
  };
  return `${productName} is locked. ${FEATURE_ACCESS_DIALOG_COPY.title}.`;
}
