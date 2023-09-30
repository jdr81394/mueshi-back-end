"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
// src/app.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3001;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
var Status;
(function (Status) {
    Status[Status["Denied"] = 0] = "Denied";
    Status[Status["InProgress"] = 1] = "InProgress";
    Status[Status["Accepted"] = 2] = "Accepted";
})(Status || (exports.Status = Status = {}));
;
;
let peopleDataArray = [
    {
        id: 0,
        name: 'Alice',
        totalSales: 500,
        listings: [1, 2],
    },
    {
        id: 1,
        name: 'Bob',
        totalSales: 800,
        listings: [3],
    },
    {
        id: 2,
        name: 'Charlie',
        totalSales: 300,
        listings: [],
    },
    {
        id: 3,
        name: 'Dan',
        totalSales: 300,
        listings: [],
    },
    {
        id: 4,
        name: 'Blair',
        totalSales: 300,
        listings: [],
    },
];
// Create 10 objects and put them into an array
let listingDataArray = [
    {
        id: 0,
        ownerId: 0,
        name: 'Product A',
        price: 50,
        highestBid: 1,
        bids: [0, 1, 2, 9],
    },
    {
        id: 1,
        ownerId: 0,
        name: 'Product B',
        price: 60,
        bids: [3, 10],
        highestBid: 3
    },
    {
        id: 2,
        ownerId: 1,
        name: 'Product C',
        price: 70,
        bids: [4],
        highestBid: null
    },
    {
        id: 3,
        ownerId: 0,
        name: 'Product D',
        price: 4320,
        bids: [5, 6, 7, 8],
        highestBid: null,
    },
    {
        id: 4,
        ownerId: 0,
        name: 'Product E',
        price: 655,
        bids: [],
        highestBid: null,
    },
    {
        id: 5,
        ownerId: 0,
        name: 'Product F',
        price: 90,
        bids: [],
        highestBid: null,
    },
    {
        id: 6,
        ownerId: 0,
        name: 'Product G',
        price: 90,
        bids: [],
        highestBid: null,
    },
    {
        id: 7,
        ownerId: 1,
        name: 'Product H',
        price: 70,
        bids: [],
        highestBid: null
    },
    {
        id: 8,
        ownerId: 1,
        name: 'Product I',
        price: 70,
        bids: [],
        highestBid: null
    },
    {
        id: 9,
        ownerId: 1,
        name: 'Product J',
        price: 70,
        bids: [],
        highestBid: null
    },
    {
        id: 10,
        ownerId: 1,
        name: 'Product K',
        price: 70,
        bids: [],
        highestBid: null
    },
];
// Dummy data for BidData array
let bidDataArray = [
    {
        id: 0,
        bidderId: 1,
        listingId: 0,
        price: 85,
        status: Status.InProgress,
    },
    {
        id: 1,
        bidderId: 1,
        listingId: 0,
        price: 60,
        status: Status.InProgress,
    },
    {
        id: 2,
        bidderId: 2,
        listingId: 0,
        price: 65,
        status: Status.Denied,
    },
    {
        id: 3,
        bidderId: 3,
        listingId: 1,
        price: 70,
        status: Status.InProgress,
    },
    {
        id: 4,
        bidderId: 3,
        listingId: 2,
        price: 45,
        status: Status.Accepted,
    },
    {
        id: 5,
        bidderId: 2,
        listingId: 3,
        price: 50,
        status: Status.Denied,
    },
    {
        id: 6,
        bidderId: 4,
        listingId: 3,
        price: 25,
        status: Status.InProgress
    },
    {
        id: 7,
        bidderId: 4,
        listingId: 3,
        price: 34,
        status: Status.InProgress
    },
    {
        id: 8,
        bidderId: 2,
        listingId: 3,
        price: 54,
        status: Status.InProgress
    },
    {
        id: 9,
        bidderId: 2,
        listingId: 0,
        price: 954,
        status: Status.InProgress
    },
    {
        id: 10,
        bidderId: 3,
        listingId: 1,
        price: 700,
        status: Status.InProgress,
    },
];
app.get('/', (req, res) => {
    // res.send('Hello, API!');
    res.json(listingDataArray);
});
app.get("/getPeople", (req, res) => {
    res.json(peopleDataArray[0]);
});
app.get('/getListing', (req, res) => {
    var _a;
    const id = req.query.id;
    const listing = listingDataArray.find((data) => data.id == id);
    if (listing === undefined)
        res.status(404).json({});
    let bids = [];
    if ((listing === null || listing === void 0 ? void 0 : listing.bids.length) !== undefined)
        for (let i = 0; i < ((_a = listing === null || listing === void 0 ? void 0 : listing.bids) === null || _a === void 0 ? void 0 : _a.length); i++) {
            const bidId = listing.bids[i];
            // Get each bid id
            let bid = bidDataArray.find((data) => data.id === bidId);
            if (bid === undefined)
                continue;
            const person = peopleDataArray.find((data) => data.id === bid.bidderId);
            bid.bidder = person;
            bids.push(bid);
        }
    res.status(200).json({
        listing,
        bids
    });
});
app.post("/postListing", (req, res) => {
    try {
        const { name, price, ownerId } = req.body;
        const id = listingDataArray[listingDataArray.length - 1].id + 1;
        const newListing = {
            name,
            price,
            ownerId,
            id,
            bids: [],
            highestBid: null
        };
        listingDataArray.push(newListing);
        res.status(200).json(newListing);
    }
    catch (e) {
        console.error("error while adding into listing array: ", e);
        res.status(300).json({});
    }
});
app.put("/putListing", (req, res) => {
    try {
        const { name, price, id } = req.body;
        const index = listingDataArray.findIndex((data) => data.id == id);
        if (index === -1)
            res.status(300).json({});
        listingDataArray[index].name = name;
        listingDataArray[index].price = price;
        res.status(200).json(listingDataArray[index]);
    }
    catch (err) {
    }
});
app.put("/acceptBid", (req, res) => {
    const { id } = req.body;
    let bidIndex = bidDataArray.findIndex((data) => data.id == id);
    if (bidIndex === -1)
        res.status(300).json({});
    bidDataArray[bidIndex].status = Status.Accepted;
    const listingId = bidDataArray[bidIndex].listingId;
    let listingIndex = listingDataArray.findIndex((data) => data.id == listingId);
    if (listingIndex === -1)
        res.status(300).json({});
    listingDataArray[listingIndex].accepted = true;
    const personId = listingDataArray[listingIndex].ownerId;
    const personIndex = peopleDataArray.findIndex((data) => data.id === personId);
    peopleDataArray[personIndex].totalSales += bidDataArray[bidIndex].price;
    res.status(200).json(peopleDataArray[personIndex]);
});
app.delete("/deleteListing", (req, res) => {
    const { id } = req.query;
    const index = listingDataArray.findIndex((data) => {
        return data.id == id;
    });
    listingDataArray = listingDataArray.slice(0, index).concat(listingDataArray.slice(index + 1));
    // should delete it out of persons listings array as well..... 
    // also all bids associated with it sould be deleted
    res.status(200).json({});
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
