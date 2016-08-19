import request from "supertest-as-promised";
import httpStatus from "http-status";
import chai from "chai";
import { expect } from "chai";
import app from "../../index";

chai.config.includeStack = true;

describe("## Misc", () => {
	describe("# GET /api/health-check", () => {
		it("should return OK", (done) => {
			request(app)
				.get("/api/health-check")
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.text).to.equal("OK");
					done();
				});
		});
	});

	describe("# GET /api/404", () => {
		it("should return 404 status", (done) => {
			request(app)
				.get("/api/404")
				.expect(httpStatus.NOT_FOUND)
				.then(res => {
					expect(res.body.message).to.equal("Not Found");
					done();
				});
		});
	});

	describe("# Error Handling", () => {

		it("should handle express validation error - other values are also required", (done) => {
			request(app)
				.post("/api/beers")
                .set({
                    token: "development",
                })
				.send({
					ratebeerId: "1234567890"
				})
				.expect(httpStatus.BAD_REQUEST)
				.then(res => {
					expect(res.body.message).to.equal(`"breweryName" is required and "beerName" is required and "beerFullName" is required`);
					done();
				});
		});
	});
});
