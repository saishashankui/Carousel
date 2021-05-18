import App from "../App.vue";
import { shallowMount } from "@vue/test-utils";
import axios from "axios";

jest.mock("axios", () => ({
    get: jest.fn(() => Promise.resolve({ data: 3 })),
}));

describe("Mounted App", () => {
    const wrapper = shallowMount(App);

    beforeEach(() => {
        global.$ = jest.fn();
    });

    test("App", () => {
        global.$ = jest.fn();
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it("Calls axios.get", () => {
        const result = wrapper.vm.loadImages();
        expect(result).toEqual();
        expect(axios.get).toBeCalledWith(
            "https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json"
        );
    });

    it("loadImages function to be called", () => {
        const output = [
            {
                _id: "hth-gingham-bath-mat-b3589-11",
                active: true,
                img:
                    "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0362/heather-taylor-home-gingham-bath-mat-1-m.jpg",
                name: "Heather Taylor Home Gingham Bath Mat",
                price: "$40.00",
                thumbnail:
                    "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0362/heather-taylor-home-gingham-bath-mat-1-m.jpg",
            },
            {
                _id: "hth-scallop-edge-bath-mat-b3587-11",
                img:
                    "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0260/heather-taylor-home-scallop-edge-bath-mat-m.jpg",
                name: "Heather Taylor Home Scallop Edge Bath Mat",
                price: "$40.00",
                thumbnail:
                    "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0260/heather-taylor-home-scallop-edge-bath-mat-m.jpg",
            },
            {
                _id: "hth-gingham-shower-curtain-b3590-11",
                img: "#",
                name: "Heather Taylor Home Gingham Shower Curtain",
                price: "$80.00",
                thumbnail: "#",
            },
            {
                _id: "oval-ikat-shower-curtain-b3591-11",
                img: "#",
                name: "Oval Ikat Shower Curtain",
                price: "$90.00",
                thumbnail: "#",
            },
            {
                _id: "organic-stripe-stitch-candlewick-shower-curtain-b3108-11",
                img: "#",
                name: "Organic Stripe Stitch Candlewick Shower Curtain",
                price: "$90.00",
                thumbnail: "#",
            }
        ];
        wrapper.vm.images = [
            {
                flags: [],
                hero: {},
                id: "hth-gingham-bath-mat-b3589-11",
                images: [],
                links: {},
                messages: [],
                name: "Heather Taylor Home Gingham Bath Mat",
                price: {
                    regular: "40",
                    selling: "50",
                },
                reviews: {},
                swatches: [],
                thumbnail: {},
            },
        ];
        const images = wrapper.vm.loadImages();
        expect(wrapper.vm.loadImages()).toEqual(images);
    });

    it("modalshow function to be called", () => {
        wrapper.vm.modalshow("hth-gingham-bath-mat-b3589-11");
        expect(wrapper.vm.isVisible).toEqual(true);
    });

    it("modalhide function to be called", () => {
        wrapper.vm.modalhide();
        expect(wrapper.vm.isVisible).toEqual(false);
    });

    it("renders the correct html", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
});