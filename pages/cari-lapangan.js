import Pagination from '../components/Pagination'
import CardRekomendasi from '../components/user/lapangan/CardRekomendasi'
import { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'


export default function Lapangan() {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(6)
    const [filterSearch, setFilterSearch] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    let router = useRouter()
    const { search } = router.query
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: data, error } = useSWR(`/api/carilapangandb?namaVenueReq=${search}`, fetcher)

    if (!data) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    let lapangan = data['message']

    //Tambahan Pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    //Fixed Pagintion CurrentPosts hapus filter di bawah
    let currentPosts = searchArr.slice(indexOfFirstPost, indexOfLastPost)
    //Fixed Pagination CurrentPosts
    const howManyPages = Math.ceil(searchArr.length / postsPerPage)
    //Tambahan Pagination Current Post Map


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
                <div className="container my-4 text-black-50" >
                    <h2 style={{ color: 'black' }} className='fw-bold fst-italic'>{`Daftar Lapangan ${kategori}`}</h2>
                    <hr></hr>
                    <div className="row justify-content-center row-cols-1 row-cols-md-3">
                        {currentPosts.length === 0 ? (
                            <><h3>{`Tidak ada Data Lapangan ${kategori} ditemukan`}</h3></>
                        ) : (
                            <>

                                {currentPosts.map((data, i) => (
                                    <CardRekomendasi props={data} />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className='container d-flex mt-4 text-center justify-content-center'>
                <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
            </div>



        </>
    )
}
