import { setActivePinia } from 'pinia';

let _pinia = null;

export function setPiniaInstance(pinia) {
  _pinia = pinia;
  setActivePinia(pinia);
}

export function getPiniaInstance() {
  if (!_pinia) {
    throw new Error('[FlickrGallery] Pinia is not initialized. Call setPiniaInstance() first.');
  }
  return _pinia;
}