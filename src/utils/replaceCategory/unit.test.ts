import repalceCategory from "./index";

describe("utils/repalceCategory", () => {
  it("category가 영어인 경우, 이니셜을 대문자로 바꾸고 나머지는 소문자로 변경한다", () => {
    const allLowerCase = repalceCategory({ text: "react" });
    const initialUpperCase = repalceCategory({ text: "React" });
    const allUppercase = repalceCategory({ text: "REACT" });
    expect(allLowerCase).toBe("React");
    expect(initialUpperCase).toBe("React");
    expect(allUppercase).toBe("React");
  });

  it("category가 한글인 경우, 파라미터를 그대로 돌려준다", () => {
    const korean = repalceCategory({ text: "차민철" });
    expect(korean).toBe("차민철");
  });
});
