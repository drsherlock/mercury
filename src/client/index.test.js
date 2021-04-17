import { jest } from "@jest/globals";
import axios from "axios";

import client from "./";

const url = "/";
const method = "GET";

jest.mock("axios", () => jest.fn(() => Promise.resolve()));

describe("Client", () => {
	// skip until native esm support in jest
	it.skip("should call axios and return a response", async () => {
		await client.createRequest(url, method);

		expect(axios).toHaveBeenCalled();
	});
});
