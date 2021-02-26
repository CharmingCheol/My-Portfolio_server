import request from "supertest";
import { OK } from "http-status";
import app from "!app";

describe("getCategorys Integration Test", () => {
  it("200 상태 코드와 카테고리 리스트를 리턴한다", async () => {
    const response = await request(app).get("/api/categorys");
    expect(response.status).toBe(OK);
    expect(Array.isArray(response.body)).toBeTruthy();
    response.body.forEach((category) => {
      const keys = Object.keys(category);
      expect(keys).toStrictEqual(["_id", "category", "count", "__v"]);
    });
  });
});
