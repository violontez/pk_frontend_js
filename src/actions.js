export const PC_ADD_ALL = 'PC_ADD_ALL';
export const PC_ADD     = 'PC_ADD';
export const PC_DELETE  = 'PC_DELETE';
export const PC_UPDATE  = 'PC_UPDATE';

export function pcAddAll(pcs) {
  return { type: PC_ADD_ALL, payload: pcs };
}
export function pcAdd(pc) {
  return { type: PC_ADD, payload: pc };
}
export function pcDelete(id) {
  return { type: PC_DELETE, payload: id };
}
export function pcUpdate(pc) {
  return { type: PC_UPDATE, payload: pc };
}
