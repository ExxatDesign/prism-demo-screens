export {
  FEATURE_ACCESS_DIALOG_COPY,
  FEATURE_ACCESS_REGISTRY,
  getFeatureAccessDefinition,
  getFeatureAccessDialogCopy,
  getFeatureAccessAriaLabel,
  isFeatureEntitled,
  type FeatureAccessDefinition,
  type FeatureAccessKey,
} from "@/components/feature-access/feature-access-config";
export { default as FeatureAccessDialog } from "@/components/feature-access/FeatureAccessDialog";
export type { FeatureAccessDialogCopy } from "@/components/feature-access/FeatureAccessDialog";
export { default as FeatureLevelLock } from "@/components/feature-access/FeatureLevelLock";
export { useFeatureAccessDialog } from "@/components/feature-access/useFeatureAccessDialog";
export {
  PRISM_FEATURE_ACCESS_REQUEST,
  PRISM_FEATURE_ACCESS_SYNC,
  buildFeatureAccessSyncMessage,
  parseFeatureAccessRequestMessage,
  type PrismFeatureAccessRequestMessage,
  type PrismFeatureAccessSyncMessage,
} from "@/components/feature-access/feature-access-messages";
