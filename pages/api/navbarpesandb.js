import Router from 'next/router';
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi

async function getTransaksiUser(req, res) {
    const { emailReq } = req.query
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        let pending = await db
            .collection('transaksi')
            .find({
                email: emailReq,
                status: 'pending'
            }, { projection: { 'status': 1 } })
            .sort({ idfavorit: -1 })
            .toArray();
        let diterima = await db
            .collection('transaksi')
            .find({
                email: emailReq,
                status: { $ne: 'pending' }
            }, { projection: { 'status': 1 } })
            .sort({ idfavorit: -1 })
            .toArray();
        let notifikasi = await db
            .collection('notifikasi')
            .find({
                email: emailReq,
                status: { $ne: 'pending' }
            }, { projection: { 'status': 1 } })
            .sort({ idfavorit: -1 })
            .toArray();
        let hasil = {}
        hasil['pending'] = pending,
        hasil['diterima'] = diterima
        hasil['notifikasi'] = notifikasi
        // return the posts
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(hasil)),
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
            return getTransaksiUser(req, res);
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