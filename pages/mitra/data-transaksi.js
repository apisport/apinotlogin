export default function tableBuku() {
    function myFunction() {
        var x = document.getElementById("searchInput");
        var y = document.getElementById("filterInput")
        if (y.value === "tglBooking" || y.value === "tglPesan") {
            x.type = "date";
        } else {
            x.type = "password";
        }
    }
    return (
        <div class="container-fluid">
            <div className="d-flex flex-row justify-content-center mb-5">
                <h1>Data Pembukuan Transaksi Lunas</h1>
            </div>

            <div class="row flex-row flex-nowrap mt-3">
                <div className="col-5 col-md-5 text-nowrap">
                    <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable"><label className="form-label">Show&nbsp;
                        <select className="d-inline-block form-select form-select-sm" value='tes'>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                        </select>&nbsp;</label></div>
                </div>
                <div className="col-2 col-md-2">
                    <div className="text-md-end dataTables_filter" id="dataTable_filter">
                        <div>

                            <select className=" form-select" id="filterInput" onChange={event => { myFunction() }}>
                                <option>--Filter Search--</option>
                                <option>Semua</option>
                                <option>Nama Pemesan</option>
                                <option>Nama Tim</option>
                                <option value={'tglBooking'}>Tanggal Booking</option>
                                <option value={'tglPesan'}>Tanggal Pesan</option>
                                <option value={'lapangan'}>Lapangan</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-5 col-md-5">
                    <div className="text-md-end dataTables_filter" id="dataTable_filter">
                        <input type="search"
                            className="form-control form-control-md"
                            aria-controls="dataTable" placeholder="Search" id="searchInput"
                            onChange={event => { setSearchTerm(event.target.value) }} />
                    </div>
                </div>
            </div>
            {/* Tambahan Pagination Make Sure Math.ceil adalah searchArr.length */}
            <p>Memuat 13 data, Jumlah keseluruhan data adalah 1333 data</p>
            <div className='d-flex flex-row justify-content-center'>
                <table className="table table-responsive my-0" id="dataTable">
                    <thead>
                        <tr>
                            <th style={{ width: 56 }}>No</th>
                            <th>Nama Pemesan</th>
                            <th>Nama Tim</th>
                            <th>Tanggal Booking</th>
                            <th>Tanggal Main</th>
                            <th>Harga</th>
                            <th>Lapangan</th>
                            <th>Opsi Pembayaran</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Fadli Irawan Yasian Putro</td>
                            <td>Kertosari Yakin FC</td>
                            <td>28-03-2022</td>
                            <td>30-03-2022</td>
                            <td>Rp300.000</td>
                            <td>Lapangan 1</td>
                            <td>Bayar di Tempat</td>
                            <td>Belum Lunas</td>

                            <td><div className="btn-group-vertical btn-group-sm">
                                <button type="button" className="btn btn-primary mb-2">Update</button>
                                <button className="btn btn-success text-white mb-2"
                                    value="a"
                                    type="button"
                                    style={{ marginLeft: 'auto', background: 'green' }}
                                >Lihat Detail
                                </button>
                            </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}
