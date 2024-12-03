import { reactive } from "../reactive";
import { effect } from "../effect";

describe("effect", () => {
  // it: 创建测试闭包
  it(/* .skip 跳过测试 */ "happy path" /* 测试名 */, () => {
    const user /* 代理对象 */ = reactive({
      age: 10,
    });

    let nextAge;
    effect(() => {
      nextAge = user.age /* get */ + 1;
    });

    expect(nextAge).toBe(11);

    //! update
    user.age++; // get, set
    expect(nextAge).toBe(12);
  } /* 测试函数 */ /* 异步测试函数的 timeout */);
});
