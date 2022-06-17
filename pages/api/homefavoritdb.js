const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi
async function getFavoritHome(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts

        // let favorit = await db
        //     .collection('favorit')
        //     .find({})
        //     .sort({ idfavorit: -1 })
        //     .toArray();
        // //[{"namaVenue": Scudetto, "alamat": Jalan WK}]
        // let lapangan = await db
        //     .collection('lapangan')
        //     .find({})
        //     .sort({ idfavorit: -1 })
        //     .toArray();
        // //[{"namaVenue": Scudetto, "namaLapangan": Lapangan 1}]
        // const mergeById = favorit.map(itm => ({
        //     ...lapangan.find((item) => (item.namaVenue === itm.namaVenue) && item),
        //     ...itm
        // }));
        //[{"namaVenue": Scudetto, "alamat": Jawer, {"namaLapangan": Lapangan, "alamat"}}]
        let favoritHome = await db
            .collection('favorit')
            .aggregate([{
                $lookup: {
                    from: "lapangan",
                    localField: "namaVenue",
                    foreignField: "namaVenue",
                    as: "lapanganVenue"
                }
            }])
            .toArray()
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(favoritHome)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// CRUD handler
export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getFavoritHome(req, res);
        }
        case 'POST': {
            return addFavorit(req, res);
        }
        case 'PUT': {
            return updateFavorit(req, res);
        }
        case 'DELETE': {
            return deleteFavorit(req, res);
        }
    }
}