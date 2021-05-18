<template>
    <div id="app">
        <div id="data" class="row card-container">
            <div class="card col-sm-12 col-md-4 custom-card" v-for="item in output" :key="item._id">
                <div class="title">{{item.name}}</div>
                <img :id=item._id :src="item.img" @click="modalshow(item._id)" />
                <div class="price"> {{item.price}}</div>
            </div>
        </div>
        <div id="condition" v-bind:style="[isVisible ? { display: 'block' } : {display: 'none'}]" class="overlay">
            <div id="text">
                <div class="closeIcon" @click="modalhide()"><span class="closetext">X</span></div>
                <div id="myCarousel" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators" id="ind">
                        <li v-for="(item, index) in output" v-bind:key="index" data-target="#carouselExampleIndicators"
                            v-bind:class="{'active': item.active}"></li>
                    </ol>

                    <!-- Wrapper for slides -->
                    <div class="carousel-inner">
                        <div v-for="(item, index) in output" v-bind:key="index" class="item"
                            v-bind:class="{'active': item.active}">
                            <img class="" :src="item.img" alt="slide">
                        </div>
                    </div>

                    <!-- Left and right controls -->
                    <a class="left carousel-control" href="#myCarousel" data-slide="prev" @click="previousImage()">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="right carousel-control" href="#myCarousel" data-slide="next" @click="nextImage()">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    const $ = window.$;

    export default {
        name: 'App',
        data() {
            return {
                output: [],
                images: [],
                isVisible: false
            }
        },
        created() {
            this.loadImages();
        },
        mounted() {
            if ($) {
                $('.carousel').carousel({
                    keyboard: true,
                    interval: '9999999'
                });
            }
        },
        methods: {
            loadImages() {
                const formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2
                });
                axios
                    .get("https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json")
                    .then(result => {
                        this.images = result.data.groups;
                        for (let z = 0; z < this.images.length; z++) {
                            if (this.images[z].price) {
                                this.output.push({
                                    name: this.images[z].name,
                                    img: this.images[z].hero ? this.images[z].hero.href : '#',
                                    price: formatter.format(this.images[z].price.selling),
                                    thumbnail: this.images[z].thumbnail ? this.images[z].thumbnail.href : '#',
                                    _id: this.images[z].id
                                });
                            } else {
                                this.output.push({
                                    name: this.images[z].name,
                                    img: this.images[z].hero ? this.images[z].hero.href : '#',
                                    price: formatter.format(this.images[z].priceRange.selling.high),
                                    thumbnail: this.images[z].thumbnail ? this.images[z].thumbnail.href : '#',
                                    _id: this.images[z].id
                                });
                            }
                        }
                        this.output[0].active = true;
                    })
                    .catch(error => {
                        const result = {
                            "id": "shop/new/all-new", "name": "All New", "categoryType": "subcat", "groups": [{ "id": "hth-gingham-bath-mat-b3589", "name": "Heather Taylor Home Gingham Bath Mat", "links": { "www": "https://www.westelm.com/products/hth-gingham-bath-mat-b3589/" }, "price": { "regular": 40, "selling": 40 }, "thumbnail": { "size": "m", "meta": "", "alt": "", "rel": "thumbnail", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0362/heather-taylor-home-gingham-bath-mat-1-m.jpg", "height": 363 }, "hero": { "size": "m", "meta": "", "alt": "", "rel": "hero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0362/heather-taylor-home-gingham-bath-mat-1-m.jpg", "height": 363 }, "images": [{ "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0258/heather-taylor-home-gingham-bath-mat-5-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0362/heather-taylor-home-gingham-bath-mat-m.jpg", "height": 363 }], "swatches": [], "messages": [], "flags": [{ "bopisSuppress": false, "rank": 3, "id": "newcore" }, { "bopisSuppress": false, "rank": 4, "id": "freeship" }, { "bopisSuppress": false, "rank": 7, "id": "organic" }, { "bopisSuppress": false, "rank": 9, "id": "fairTrade" }, { "bopisSuppress": false, "rank": 10, "id": "handcrafted" }, { "bopisSuppress": false, "rank": 32, "id": "limTimeOnly" }], "reviews": { "recommendationCount": 0, "likelihood": 0, "reviewCount": 0, "averageRating": 0, "id": "hth-gingham-bath-mat-b3589", "type": "GROUP_REVIEWS" } }, { "id": "hth-scallop-edge-bath-mat-b3587", "name": "Heather Taylor Home Scallop Edge Bath Mat", "links": { "www": "https://www.westelm.com/products/hth-scallop-edge-bath-mat-b3587/" }, "price": { "regular": 40, "selling": 40 }, "thumbnail": { "size": "m", "meta": "", "alt": "", "rel": "thumbnail", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0260/heather-taylor-home-scallop-edge-bath-mat-m.jpg", "height": 363 }, "hero": { "size": "m", "meta": "", "alt": "", "rel": "hero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0260/heather-taylor-home-scallop-edge-bath-mat-m.jpg", "height": 363 }, "images": [], "swatches": [], "messages": [], "flags": [{ "bopisSuppress": false, "rank": 3, "id": "newcore" }, { "bopisSuppress": false, "rank": 4, "id": "freeship" }, { "bopisSuppress": false, "rank": 7, "id": "organic" }, { "bopisSuppress": false, "rank": 32, "id": "limTimeOnly" }], "reviews": { "recommendationCount": 0, "likelihood": 0, "reviewCount": 0, "averageRating": 0, "id": "hth-scallop-edge-bath-mat-b3587", "type": "GROUP_REVIEWS" } }, { "id": "hth-gingham-shower-curtain-b3590", "name": "Heather Taylor Home Gingham Shower Curtain", "links": { "www": "https://www.westelm.com/products/hth-gingham-shower-curtain-b3590/" }, "priceRange": { "selling": { "high": 80, "low": 60 } }, "images": [{ "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0260/heather-taylor-home-gingham-shower-curtain-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0260/heather-taylor-home-gingham-shower-curtain-2-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0259/heather-taylor-home-gingham-shower-curtain-4-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0259/heather-taylor-home-gingham-shower-curtain-1-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0259/heather-taylor-home-gingham-shower-curtain-4-m.jpg", "height": 363 }], "swatches": [], "messages": [], "flags": [{ "bopisSuppress": false, "rank": 3, "id": "newcore" }, { "bopisSuppress": false, "rank": 7, "id": "organic" }], "reviews": { "recommendationCount": 0, "likelihood": 0, "reviewCount": 0, "averageRating": 0, "id": "hth-gingham-shower-curtain-b3590", "type": "GROUP_REVIEWS" } }, { "id": "oval-ikat-shower-curtain-b3591", "name": "Oval Ikat Shower Curtain", "links": { "www": "https://www.westelm.com/products/oval-ikat-shower-curtain-b3591/" }, "priceRange": { "selling": { "high": 90, "low": 70 } }, "images": [{ "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0258/oval-ikat-shower-curtain-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0258/oval-ikat-shower-curtain-6-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0258/oval-ikat-shower-curtain-2-m.jpg", "height": 363 }], "swatches": [], "messages": [], "flags": [{ "bopisSuppress": false, "rank": 3, "id": "newcore" }, { "bopisSuppress": false, "rank": 8, "id": "handmade" }], "reviews": { "recommendationCount": 0, "likelihood": 0, "reviewCount": 0, "averageRating": 0, "id": "oval-ikat-shower-curtain-b3591", "type": "GROUP_REVIEWS" } }, { "id": "organic-stripe-stitch-candlewick-shower-curtain-b3108", "name": "Organic Stripe Stitch Candlewick Shower Curtain", "links": { "www": "https://www.westelm.com/products/organic-stripe-stitch-candlewick-shower-curtain-b3108/" }, "priceRange": { "selling": { "high": 90, "low": 70 } }, "images": [{ "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202115/0812/organic-stripe-stitch-candlewick-shower-curtain-4-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202115/0813/organic-stripe-stitch-candlewick-shower-curtain-1-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202115/0814/organic-stripe-stitch-candlewick-shower-curtain-1-m.jpg", "height": 363 }], "swatches": [], "messages": [], "flags": [{ "bopisSuppress": false, "rank": 7, "id": "organic" }, { "bopisSuppress": false, "rank": 9, "id": "fairTrade" }], "reviews": { "recommendationCount": 0, "likelihood": 0, "reviewCount": 0, "averageRating": 0, "id": "organic-stripe-stitch-candlewick-shower-curtain-b3108", "type": "GROUP_REVIEWS" } }, { "id": "hth-gingham-stripe-bath-towel-b3588", "name": "Heather Taylor Home Gingham &amp; Stripe Bath Towels", "links": { "www": "https://www.westelm.com/products/hth-gingham-stripe-bath-towel-b3588/" }, "priceRange": { "selling": { "high": 34.5, "low": 24.5 } }, "thumbnail": { "size": "m", "meta": "", "alt": "", "rel": "thumbnail", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0258/heather-taylor-home-gingham-stripe-bath-towel-2-m.jpg", "height": 363 }, "hero": { "size": "m", "meta": "", "alt": "", "rel": "hero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0258/heather-taylor-home-gingham-stripe-bath-towel-2-m.jpg", "height": 363 }, "images": [{ "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0260/heather-taylor-home-gingham-stripe-bath-towel-1-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202116/0259/heather-taylor-home-gingham-stripe-bath-towel-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0285/heather-taylor-home-gingham-stripe-bath-towels-1-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0285/heather-taylor-home-gingham-stripe-bath-towels-2-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0285/heather-taylor-home-gingham-stripe-bath-towels-m.jpg", "height": 363 }], "swatches": [], "messages": [], "flags": [{ "bopisSuppress": false, "rank": 3, "id": "newcore" }, { "bopisSuppress": false, "rank": 4, "id": "freeship" }, { "bopisSuppress": false, "rank": 7, "id": "organic" }], "reviews": { "recommendationCount": 0, "likelihood": 0, "reviewCount": 0, "averageRating": 0, "id": "hth-gingham-stripe-bath-towel-b3588", "type": "GROUP_REVIEWS" } }, {
                                "id": "nova-pedal-waste-bin-b3583", "name": "Nova Pedal Waste Bin", "links": { "www": "https://www.westelm.com/products/nova-pedal-waste-bin-b3583/" }, "priceRange": { "selling": { "high": 110, "low": 85 } }, "thumbnail": { "size": "m", "meta": "", "alt": "", "rel": "thumbnail", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0200/nova-pedal-waste-bin-1-m.jpg", "height": 363 }, "hero": { "size": "m", "meta": "", "alt": "", "rel": "hero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0200/nova-pedal-waste-bin-1-m.jpg", "height": 363 }, "images":
                                    [{ "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0200/nova-pedal-waste-bin-m.jpg", "height": 363 }], "swatches": [], "messages": [], "flags": [{ "bopisSuppress": false, "rank": 3, "id": "newcore" }], "reviews": { "recommendationCount": 0, "likelihood": 0, "reviewCount": 0, "averageRating": 0, "id": "nova-pedal-waste-bin-b3583", "type": "GROUP_REVIEWS" }
                            }, { "id": "ume-pedal-waste-bin-b3586", "name": "Ume Pedal Waste Bin", "links": { "www": "https://www.westelm.com/products/ume-pedal-waste-bin-b3586/" }, "price": { "regular": 85, "selling": 85 }, "thumbnail": { "size": "m", "meta": "", "alt": "", "rel": "thumbnail", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0282/ume-pedal-waste-bin-m.jpg", "height": 363 }, "hero": { "size": "m", "meta": "", "alt": "", "rel": "hero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0282/ume-pedal-waste-bin-m.jpg", "height": 363 }, "images": [{ "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0200/ume-pedal-waste-bin-1-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0200/ume-pedal-waste-bin-4-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0200/ume-toilet-brush-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0200/ume-pedal-waste-bin-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0200/ume-pedal-waste-bin-2-m.jpg", "height": 363 }], "swatches": [], "messages": [], "flags": [{ "bopisSuppress": false, "rank": 3, "id": "newcore" }], "reviews": { "recommendationCount": 0, "likelihood": 0, "reviewCount": 0, "averageRating": 0, "id": "ume-pedal-waste-bin-b3586", "type": "GROUP_REVIEWS" } }, { "id": "nova-toilet-brush-b3582", "name": "Nova Toilet Brush", "links": { "www": "https://www.westelm.com/products/nova-toilet-brush-b3582/" }, "price": { "regular": 69, "selling": 69 }, "thumbnail": { "size": "m", "meta": "", "alt": "", "rel": "thumbnail", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0282/nova-toilet-brush-2-m.jpg", "height": 363 }, "hero": { "size": "m", "meta": "", "alt": "", "rel": "hero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0282/nova-toilet-brush-2-m.jpg", "height": 363 }, "images": [{ "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0200/nova-bath-accessories-4-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0282/nova-toilet-brush-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0282/nova-toilet-brush-1-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202117/0200/nova-toilet-brush-m.jpg", "height": 363 }], "swatches": [], "messages": [], "flags": [{ "bopisSuppress": false, "rank": 3, "id": "newcore" }], "reviews": { "recommendationCount": 0, "likelihood": 0, "reviewCount": 0, "averageRating": 0, "id": "nova-toilet-brush-b3582", "type": "GROUP_REVIEWS" } }, { "id": "dylan-industrial-bed-h8077", "name": "Dylan Industrial Bed", "links": { "www": "https://www.westelm.com/products/dylan-industrial-bed-h8077/" }, "priceRange": { "selling": { "high": 1399, "low": 1199 } }, "thumbnail": { "size": "m", "meta": "", "alt": "", "rel": "thumbnail", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202118/0060/dylan-industrial-bed-1-m.jpg", "height": 363 }, "images": [{ "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202118/0060/dylan-industrial-bed-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202118/0061/dylan-industrial-bed-2-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202118/0061/dylan-industrial-bed-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202118/0061/dylan-industrial-bed-1-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202118/0062/dylan-industrial-bed-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202115/0886/dylan-industrial-bed-5-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202115/0886/dylan-industrial-bed-6-m.jpg", "height": 363 }], "swatches": [], "messages": [], "flags": [{ "bopisSuppress": false, "rank": 3, "id": "newcore" }, { "bopisSuppress": false, "rank": 8, "id": "handmade" }, { "bopisSuppress": false, "rank": 19, "id": "freeMono" }], "reviews": { "recommendationCount": 0, "likelihood": 0, "reviewCount": 0, "averageRating": 0, "id": "dylan-industrial-bed-h8077", "type": "GROUP_REVIEWS" } }], "totalPages": 70, "categories": []
                        };

                        this.images = result.groups;
                        for (let z = 0; z < this.images.length; z++) {
                            if (this.images[z].price) {
                                this.output.push({
                                    name: this.images[z].name,
                                    img: this.images[z].hero ? this.images[z].hero.href : '#',
                                    price: formatter.format(this.images[z].price.selling),
                                    thumbnail: this.images[z].thumbnail ? this.images[z].thumbnail.href : '#',
                                    _id: this.images[z].id
                                });
                            } else {
                                this.output.push({
                                    name: this.images[z].name,
                                    img: this.images[z].hero ? this.images[z].hero.href : '#',
                                    price: formatter.format(this.images[z].priceRange.selling.high),
                                    thumbnail: this.images[z].thumbnail ? this.images[z].thumbnail.href : '#',
                                    _id: this.images[z].id
                                });
                            }
                        }
                        this.output[0].active = true;
                        console.log(error);
                    })
            },
            modalshow(id) {
                for (let k = 0; k < this.output.length; k++) {
                    if (this.output[k]._id == id) {
                        $('.carousel').carousel(k);
                    }
                }
                this.isVisible = true;
            },
            nextImage() {
                $('.carousel').carousel('next');
            },
            previousImage() {
                $('.carousel').carousel('prev');
            },
            modalhide() {
                this.isVisible = false;
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .custom-card {
        padding: 2px;
    }

    .card-container {
        justify-content: center;
        margin: 0;
    }

    .card-container img {
        cursor: pointer;
        min-height: 415px;
        width: 100%;
    }

    .title {
        background: #E8E8E8;
        padding: 6px;
        font-weight: 600;
        font-size: 14px;
        color: #363636;
    }

    .price {
        background: black;
        width: 72px;
        color: whitesmoke;
        margin: 7px;
        padding: 2px;
        font-size: 13px;
    }

    .overlay {
        position: fixed;
        display: none;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2;
        cursor: pointer;
    }

    #text {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 50px;
        color: white;
        width: 500px;
        height: 500px;
        background: white;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
    }

    @media (max-width: 768px) {
        #text {
            top: 27%;
        }
    }

    @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
        #text {
            top: 27%;
        }
    }

    @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
        #text {
            top: 27%;
        }
    }

    @media only screen and (max-width: 600px) {
        #text {
            width: 350px !important;
        }
    }

    /*iPhone 6 Portrait*/
    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation : portrait) {
        #text {
            top: 27%;
        }
    }

    /*iPhone 6 landscape*/
    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation : landscape) {
        #text {
            top: 27%;
        }
    }

    /*iPhone 6+ Portrait*/
    @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation : portrait) {
        #text {
            top: 45%
        }
    }

    /*iPhone 6+ landscape*/
    @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation : landscape) {
        #text {
            top: 45%
        }
    }

    /*iPhone 6 and iPhone 6+ portrait and landscape*/
    @media only screen and (max-device-width: 640px),
    only screen and (max-device-width: 667px),
    only screen and (max-width: 480px) {
        #text {
            top: 45%
        }
    }

    /*iPhone 6 and iPhone 6+ portrait*/
    @media only screen and (max-device-width: 640px),
    only screen and (max-device-width: 667px),
    only screen and (max-width: 480px) and (orientation : portrait) {
        #text {
            top: 45%
        }

    }

    /*iPhone 6 and iPhone 6+ landscape*/
    @media only screen and (max-device-width: 640px),
    only screen and (max-device-width: 667px),
    only screen and (max-width: 480px) and (orientation : landscape) {
        #text {
            top: 45%
        }
    }

    .item img {
        width: 100%;
    }

    .closeIcon {
        background: black;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        float: right;
        margin: 3px;
        display: flex;
        justify-content: center;
    }

    .closetext {
        font-size: 10px;
        color: white;
        font-weight: 700;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
</style>