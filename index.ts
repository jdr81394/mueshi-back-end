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
    listings: ListingData[]
}

export interface ListingData {
    id: number,
    ownerId: number,
    name: string,
    price: number,
    highestBid: BidData[]
}


app.get('/', (req, res) => {
    res.send('Hello, API!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
