import Head from 'next/head'
import Image from 'next/image'
import Helmet from 'react-helmet'
import Pagination from '../components/Pagination'
import CardVenue from '../components/user/cari/CardVenue'


export default function Lapangan() {
    return (
        <>
            <div className='container my-4'>
                <h1>Hasil Pencarian Lapangan</h1>
            </div>
            <div>
                <div className="container my-4">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="btn-group col-md-12">
                            <input type="text" className="form-control col-10 mt-2 col-md-10" placeholder="Cari Lapangan Disini" />
                            <a href='/cari-lapangan' className="form-control col-2 mt-2 col-sm-2 btn shadow-sm" style={{ backgroundColor: '#ffbe2e' }}><button ><i className="fa fa-search text-white"></i></button></a>
                        </div>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">

                    {/* <CardVenue /> */}
                </div>
            </div>
            <div className='container d-flex mt-4 text-center justify-content-center'>
                {/* <Pagination /> */}
            </div>



        </>
    )
}
