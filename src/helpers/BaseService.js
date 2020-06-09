import { compare } from './Extra';
export default class BaseService {
  serviceInited = false;
  listerners = [];

  /**
   *
   * @param {string} event
   * @param {function} callback function callback event fire
   */
  addListerner(event, callback) {
    this.listerners.push({ event, callback });
  }

  /**
   *
   * @param {string} event
   * @param {function} callback callback for remove
   * @param {Boolean} force remove all callback of event without compare callback
   */
  removeListerner(event, callback, force) {
    if (force) {
      this.listerners = this.listerners.filter(e => e.event !== event);
    } else {
      const index = this.listerners.findIndex(
        e => e.event === event && e.callback === callback,
      );
      this.listerners.splice(index, 1);
    }
  }

  /**
   * Notify data change with event
   * @param {string} event
   * @param {any} data
   */
  notify(event, data) {
    this.listerners
      .filter(item => item.event === event)
      .forEach(({ callback }) => callback(data));
  }

  /**
   * Run all callback with data
   * @param {any} data
   */
  broadcast(data) {
    this.listerners.forEach(({ callback }) => callback(data));
  }
}

export function setPagination(ctx, pagination) {
  ctx.page = pagination.page;
  ctx.total = pagination.total;
  ctx.totalPages = pagination.totalPages;
}

export function updateItemInList(list, value, compares = ['id']) {
  const find = list.find(e => compare(e, value, compares));
  if (find) {
    Object.assign(find, value);
  }
}

export function removeItemInList(list, { value, index, compares }) {
  if (!Number.isInteger(index)) {
    index = list.findIndex(e => compare(e, value, compares));
  }
  if (index >= 0) {
    list.splice(index, 1);
  }
}
