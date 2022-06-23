const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi

async function getTransaksi(req, res) {
    const { namaVenueReq } = req.query
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        let transaksi = await db
            .collection('transaksi')
            .find({
                namaVenue: namaVenueReq
            })
            .sort({ idfavorit: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(transaksi)),
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

async function addTransaksi(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('transaksi').insertOne(JSON.parse(req.body));
        let id = await db.collection('transaksi').find(JSON.parse(req.body)).toArray()
        // return a message
        return res.json({
            message: id[0]._id,
            success: true,
        });
    } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function deleteTransaksi(req, res) {
    var ObjectId = require('mongodb').ObjectId;
    const { _id } = req.body;
    const convertedObjectId = new ObjectId(_id);
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();
        // Deleting the post
        await db.collection('transaksi').deleteOne({
            '_id': convertedObjectId
        });
        // returning a message
        return res.json({
            message: 'Post deleted successfully',
            success: true,
        });
    } catch (error) {
        // returning an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function updateTransaksi(req, res) {
    const { namaVenue,
        namaPemilikVenue,
        alamat,
        noWa,
        instagram,
        kategori,
        hariOperasional,
        jamOperasional,
        fasilitas,
        opsiBayar,
        rekening,
        DP,
        namaAdmin,
        noWaAdmin,
        email,
        fotoVenue,
        objectId,
        namaVenueLama } = req.body
    var ObjectId = require('mongodb').ObjectId;
    const convertedObjectId = new ObjectId(objectId);
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // update the published status of the post
        await db.collection('mitra').updateOne(
            {
                '_id': convertedObjectId
            },
            {
                $set: {
                    "_id": ObjectId("62b02b4b82fd6264f103e54e"),
                    "nama": "Anhar",
                    "email": "api.sport.team@gmail.com",
                    "lapangan": "Lapangan 2", "noWa": "123",
                    "tim": "Tim ABC",
                    "noRekening": "BCA - 18090213",
                    "opsiBayar": "Full Bayar Transfer",
                    "buktiBayar": "Screenshot (3).png",
                    "namaVenue": "Scuttod", "tglMain": "2022-06-20",
                    "jadwalMain": ["11.00-12.00"],
                    "harga": "3000",
                    "hargaDP": "-",
                    "diterima": "20/6/2022 | 15:9:44",
                }
            }
        );
        await db.collection('favorit').updateOne(
            {
                'namaVenue': namaVenueLama
            },
            {
                $set: {
                    'namaVenue': namaVenue,
                    'namaPemilikVenue': namaPemilikVenue,
                    'alamat': alamat,
                    'noWa': noWa,
                    'instagram': instagram,
                    'kategori': kategori,
                    'hariOperasional': hariOperasional,
                    'jamOperasional': jamOperasional,
                    'fasilitas': fasilitas,
                    'opsiBayar': opsiBayar,
                    'rekening': rekening,
                    'namaAdmin': namaAdmin,
                    'noWaAdmin': noWaAdmin,
                    'fotoVenue': fotoVenue
                }
            }
        );
        // return a message
        return res.json({
            message: 'Post updated successfully',
            success: true,
        });
    } catch (error) {
        // return an error
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
            return getTransaksi(req, res);
        }
        case 'POST': {
            return addTransaksi(req, res);
        }
        case 'PUT': {
            return updateTransaksi(req, res);
        }
        case 'DELETE': {
            return deleteTransaksi(req, res);
        }
    }
}