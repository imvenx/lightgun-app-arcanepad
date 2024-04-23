import { ref } from "vue";
import { LightgunApp, apps } from "./AppsStore";
import { sharedState } from "./SharedState";

export class PadState {
  selectedApp: LightgunApp = sharedState.value.selectedApp
}

export const padState = ref<PadState>(new PadState())
