import { ref } from "vue";
import { LightgunApp, apps } from "./AppsStore";

export class SharedState {
  selectedApp: LightgunApp = apps[0]
  inApp: boolean = false
}

export const sharedState = ref<SharedState>(new SharedState())
