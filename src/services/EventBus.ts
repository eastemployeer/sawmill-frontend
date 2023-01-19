import mitt, {
  Emitter, Handler,
} from 'mitt';

const emitter: Emitter<Record<string, Handler<any>>> = mitt();

export default {
  $on: (type: any, handler: Handler<any>) => emitter.on(type, handler),
  $off: (type: any, handler: Handler<any>) => emitter.off(type, handler),
  $emit: (type: any, value: any) => emitter.emit(type, value),
};
