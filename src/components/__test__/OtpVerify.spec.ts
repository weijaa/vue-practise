import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import OtpVerify from "../OtpVerify.vue";

describe("OtpVerify", () => {
    const wrapper = mount(OtpVerify);
    beforeAll(() => { 
        console.log("before all");

    });
    beforeEach(() => { 
        console.log("before each");
    });
    it("should input otp number", async () => {
        const inputs = wrapper.findAll('input')
         const digits = ["1", "2", "3", "4"]; // the digits to input
         for (let i = 0; i < inputs.length; i++) {
           await inputs[i].setValue(digits[i]);
           expect(inputs[i].element.value).toBe(digits[i]);
         }
    });
    it("should render correctly2", () => {
      expect(2).toBe(2);
    });
    it("should render correctly3", () => {
      expect(3).toBe(3);
    });
});
