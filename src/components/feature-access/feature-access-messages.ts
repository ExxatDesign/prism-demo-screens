import {
  FEATURE_ACCESS_REGISTRY,
  type FeatureAccessDefinition,
} from "@/components/feature-access/feature-access-config";

export const PRISM_FEATURE_ACCESS_REQUEST = "prism-feature-access-request" as const;
export const PRISM_FEATURE_ACCESS_SYNC = "prism-feature-access-sync" as const;

export type PrismFeatureAccessRequestMessage = {
  type: typeof PRISM_FEATURE_ACCESS_REQUEST;
  featureKey: string;
};

export type PrismFeatureAccessSyncMessage = {
  type: typeof PRISM_FEATURE_ACCESS_SYNC;
  features: Record<string, Pick<FeatureAccessDefinition, "entitled" | "productName">>;
};

export function buildFeatureAccessSyncMessage(): PrismFeatureAccessSyncMessage {
  const features: PrismFeatureAccessSyncMessage["features"] = {};
  for (const [key, def] of Object.entries(FEATURE_ACCESS_REGISTRY)) {
    features[key] = { entitled: def.entitled, productName: def.productName };
  }
  return { type: PRISM_FEATURE_ACCESS_SYNC, features };
}

export function parseFeatureAccessRequestMessage(
  data: unknown,
): PrismFeatureAccessRequestMessage | null {
  if (
    typeof data === "object" &&
    data !== null &&
    (data as PrismFeatureAccessRequestMessage).type === PRISM_FEATURE_ACCESS_REQUEST &&
    typeof (data as PrismFeatureAccessRequestMessage).featureKey === "string"
  ) {
    return data as PrismFeatureAccessRequestMessage;
  }
  return null;
}
