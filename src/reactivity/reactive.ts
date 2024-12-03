import { track, trigger } from "./effect";

export function reactive(raw) {
  return new Proxy(
    raw /* target */,
    {
      get(target, propKey) {
        // console.log(`getting ${String(propKey)}!`);
        const ret = Reflect.get(target, propKey);
        // todo 依赖收集
        track(target, propKey);
        return ret;
      },
      // get: function (target, propKey, receiver) {
      //   return Reflect.get(target, propKey, receiver);
      // },
      set(target, propKey, value) {
        // console.log(`setting ${String(propKey)}!`);
        const ret = Reflect.set(target, propKey, value);
        // todo 触发依赖
        trigger(target, propKey);
        return ret;
      },
      // set: function (target, propKey, value, receiver) {
      //   return Reflect.set(target, propKey, value, receiver);
      // },
    } /* handler */,
  );
}
