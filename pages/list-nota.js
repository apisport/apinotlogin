import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react'
import useSWR from 'swr';
import Link from 'next/link';
import Moment from 'react-moment';
import moment from 'moment';
import CardListNota from '../components/user/list-nota/CardListNota';

export default function ListNota() {
    const { data: session, status } = useSession()

    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = ''
    if (session) {
        url = `/api/listnotadb?emailReq=${session.user.email}`
    }
    const { data: data, error } = useSWR(url, fetcher)

    if (!data) {
        return <div>Anda tidak memilik akses untuk halaman ini</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    let transaksi = data['message']
    // console.log(transaksi)
    let notaBaru = []
    for (let i = 0; i < transaksi.length; i++) {
        var now = moment(new Date()); //todays date
        var end = moment(transaksi[i].tglMain); // another date
        var duration = moment.duration(now.diff(end));
        var days = Math.floor(duration.asDays());
        if(days <= 0 ){
            notaBaru.push(transaksi[i])
        }
    }
    console.log('Nota Baru')
    console.log(notaBaru)


    return (

        <div className="container my-2">
            <h1 className='mt-5'><b>List Nota yang telah Diterima</b></h1>
            <hr></hr>
            <h4><b>Nota Baru</b></h4>
            <hr></hr>
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
                <CardListNota props={notaBaru}/>
                

            </div>
            <hr></hr>
            <h4><b>Nota Lainnya</b></h4>
            <hr></hr>
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">

                <div className="shadow-sm col-12 col-lg-5 border border-2 mb-1 p-3 text-start">
                    <h3>Scudetto</h3>
                    <h4><b>Nama Pemesan:</b>{session.user.name}</h4>
                    <h4><b>Tim:</b>{session.user.name}</h4>
                    <h4><b>Lapangan:</b>{session.user.name}</h4>
                    <h4><b>Opsi Pembayaran:</b> {session.user.name}</h4>
                    <h4><b>Total Bayar:</b> {`Rp 300.000,-`}</h4>
                    <hr></hr>
                    <h5><b>Diterima:</b> {123}</h5>
                    <h5><b>Tanggal Main:</b> {123}</h5>
                    <hr></hr>
                    <h5 ><b>Status: Diterima</b></h5>
                    <hr></hr>
                    <a className="btn btn-success text-white p-3 mb-2">Lihat Nota</a>
                </div>
            </div>




        </div>
    )

}