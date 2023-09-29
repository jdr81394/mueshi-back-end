// src/app.ts
import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";


const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors);

export enum Status {
    Denied,
    InProgress,
    Accepted
};

export interface BidData {
    id: number,
    bidderId: number,
    listingId: number,
    price: number,
    status: Status
};
export interface PersonData {
    id: number,
    name: string,
    totalSales: number,
    listings: number[]          // listing ids
}

export interface ListingData {
    id: number,
    ownerId: number,
    name: string,
    price: number,
    highestBid: number,
    bids: number[]
}

const peopleDataArray: PersonData[] = [
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
const listingDataArray: ListingData[] = [
    {
        id: 0,
        ownerId: 0,
        name: 'Product A',
        price: 50,
        highestBid: 1,
        bids: [1, 2],
    },
    {
        id: 1,
        ownerId: 0,
        name: 'Product B',
        price: 60,
        bids: [3],
        highestBid: 3
    },
    {
        id: 2,
        ownerId: 1,
        name: 'Product C',
        price: 70,
        bids: [],
        highestBid: [],
    },
];

// Dummy data for BidData array
const bidDataArray: BidData[] = [
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
        listingId: 2,
        price: 70,
        status: Status.InProgress,
    },
    {
        id: 4,
        bidderId: 3,
        listingId: 3,
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
];



app.get('/', (req, res) => {
    // res.send('Hello, API!');
    res.json(listingDataArray);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
