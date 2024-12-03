class ReactiveEffect {
  private _fn: any;
  constructor(fn) {
    this._fn = fn;
  }
  run() {
    activeEffect = this;
    this._fn();
  }
}

const target2kds /* target 目标对象 => map (key2deps) */ = new Map();

// 依赖收集
export function track(target, propKey) {
  let key2deps /* propKey 属性键 => deps 依赖集合 */ = target2kds.get(target);
  if (!key2deps) {
    key2deps = new Map();
    target2kds.set(target, key2deps);
  }
  let deps = key2deps.get(propKey);
  if (!deps) {
    deps = new Set();
  }
  deps.add(activeEffect);
  key2deps.set(propKey, deps);
}

export function trigger(target, propKey) {
  let key2deps = target2kds.get(target);
  let deps = key2deps.get(propKey);
  for (const effect of deps) {
    // Reflect.get(effect, "_fn").toString()
    effect.run();
  }
}

let activeEffect: ReactiveEffect;

export function effect(fn) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
}
