// src/app.ts
import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";


const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());


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
    highestBid: number | null,
    bids: number[],
    accepted?: boolean
}

let peopleDataArray: PersonData[] = [
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
let listingDataArray: ListingData[] = [
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
        bids: [3, 4],
        highestBid: null
    },
];

// Dummy data for BidData array
let bidDataArray: BidData[] = [
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
] as BidData[];



app.get('/', (req, res) => {
    // res.send('Hello, API!');
    res.json(listingDataArray);
});

app.get("/getPeople", (req, res) => {

    res.json(peopleDataArray[0]);
})

app.get('/getListing', (req, res) => {
    const id: number = req.query.id as unknown as number;

    const listing = listingDataArray.find((data) => data.id == id);
    if (listing === undefined) res.status(404).json({});

    let bids = [];

    if (listing?.bids.length !== undefined)
        for (let i = 0; i < listing?.bids?.length; i++) {
            const bidId = listing.bids[i];
            // Get each bid id
            let bid: any = bidDataArray.find((data) => data.id === bidId);
            if (bid === undefined) continue;

            const person: any = peopleDataArray.find((data) => data.id === bid.bidderId);
            bid.bidder = person;
            bids.push(bid);
        }



    res.status(200).json({
        listing,
        bids
    })

});

app.post("/postListing", (req, res) => {
    try {
        const { name, price, ownerId } = req.body;

        const id = listingDataArray[listingDataArray.length - 1].id + 1;

        const newListing: ListingData = {
            name,
            price,
            ownerId,
            id,
            bids: [],
            highestBid: null
        }

        listingDataArray.push(newListing)

        res.status(200).json(newListing);


    } catch (e) {
        console.error("error while adding into listing array: ", e);
        res.status(300).json({})

    }
})

app.put("/putListing", (req, res) => {
    try {


        const { name, price, id } = req.body;

        const index = listingDataArray.findIndex((data) => data.id == id);

        if (index === -1) res.status(300).json({});

        listingDataArray[index].name = name;
        listingDataArray[index].price = price;

        res.status(200).json(listingDataArray[index]);

    } catch (err) {

    }
})

app.put("/acceptBid", (req, res) => {

    const { id } = req.body;

    let bidIndex = bidDataArray.findIndex((data) => data.id == id);

    if (bidIndex === -1) res.status(300).json({});

    bidDataArray[bidIndex].status = Status.Accepted;

    const listingId = bidDataArray[bidIndex].listingId;

    let listingIndex = listingDataArray.findIndex((data) => data.id == listingId);

    if (listingIndex === -1) res.status(300).json({});

    listingDataArray[listingIndex].accepted = true;

    const personId = listingDataArray[listingIndex].ownerId;

    const personIndex = peopleDataArray.findIndex((data) => data.id === personId);

    peopleDataArray[personIndex].totalSales += bidDataArray[bidIndex].price;

    res.status(200).json(peopleDataArray[personIndex]);

})

app.delete("/deleteListing", (req, res) => {

    const { id }: any = req.query;






    const index = listingDataArray.findIndex((data) => {
        return data.id == id
    }
    );



    listingDataArray = listingDataArray.slice(0, index).concat(listingDataArray.slice(index + 1))

    // should delete it out of persons listings array as well..... 
    // also all bids associated with it sould be deleted

    res.status(200).json({});




})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
