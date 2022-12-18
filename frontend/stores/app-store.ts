import { UiStore } from './ui-store';

export class AppStore {
  uiStore = new UiStore();
}

export const appStore = new AppStore();
export const uiStore = appStore.uiStore;
